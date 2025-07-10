
import Gateway from 'App/Models/Gateway'
import PaymentGateway1 from './providers/PaymentGateway1'
import PaymentGateway2 from './providers/PaymentGateway2'

export default class PaymentGatewayService {
  public static async process(gateway: Gateway, payload: any) {
    if (gateway.name === 'Gateway 1') {
      return await PaymentGateway1.process(payload)
    } else if (gateway.name === 'Gateway 2') {
      return await PaymentGateway2.process(payload)
    }
    throw new Error('Gateway não suportado')
  }

  public static async refund(gateway: Gateway, externalId: string) {
    if (gateway.name === 'Gateway 1') {
      return await PaymentGateway1.refund(externalId)
    } else if (gateway.name === 'Gateway 2') {
      return await PaymentGateway2.refund(externalId)
    }
    throw new Error('Gateway não suportado')
  }
}
