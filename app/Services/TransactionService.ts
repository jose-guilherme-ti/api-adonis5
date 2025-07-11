import Transaction from 'App/Models/Transaction'
import TransactionProduct from 'App/Models/TransactionProduct'
import Product from 'App/Models/Product'
import Gateway from 'App/Models/Gateway'
import ClientService from './ClientService'
import PaymentGatewayService from './PaymentService'

interface TransactionPayload {
  client: {
    name: string
    email: string
  }
  card: {
    number: string
    cvv: string
  }
  products: {
    product_id: number
    quantity: number
  }[]
}

export default class TransactionService {
  public static async list() {
    return await Transaction.query()
      .preload('client')
      .preload('gateway')
      .preload('products')
  }

  public static async getById(id: number) {
    return await Transaction.query()
      .where('id', id)
      .preload('client')
      .preload('gateway')
      .preload('products')
      .firstOrFail()
  }

  public static async create(payload: TransactionPayload) {
    const client = await ClientService.findOrCreate(payload.client)
    let amount = 0
    for (const item of payload.products) {
      const product = await Product.findOrFail(item.product_id)
      amount += product.amount * item.quantity
    }

    const gateways = await Gateway.query()
      .where('is_active', true)
      .orderBy('priority', 'asc')
    

    let response: { id: string } | null = null
    let usedGateway: Gateway | null = null

    for (const gateway of gateways) {
      try {
        response = await PaymentGatewayService.process(gateway, {
          client: payload.client,
          card: payload.card,
          amount,
        })
        if (response) {
          usedGateway = gateway
          break
        }
      } catch (_) {
        // ignora erro e tenta próximo
      }
    }
    if (!response || !usedGateway) {
      throw new Error('Nenhum gateway pôde processar a compra.')
    }

    const transaction = await Transaction.create({
      clientId: client.id,
      gatewayId: usedGateway.id,
      externalId: response.id,
      status: 'SUCCESS',
      amount,
      cardLastNumbers: payload.card.number.slice(-4),
    })

    for (const item of payload.products) {
      await TransactionProduct.create({
        transactionId: transaction.id,
        productId: item.product_id,
        quantity: item.quantity,
      })
    }

    return transaction
  }

  public static async refund(id: number) {
    const transaction = await Transaction.query()
      .where('id', id)
      .preload('gateway')
      .firstOrFail()

    if (!transaction.gateway) {
      throw new Error('Gateway não encontrado para esta transação.')
    }

    await PaymentGatewayService.refund(transaction.gateway, transaction.externalId)
    transaction.status = 'REFUNDED'
    await transaction.save()

    return transaction
  }
}
