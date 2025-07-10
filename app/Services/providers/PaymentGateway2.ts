import axios from 'axios'

export default class PaymentGateway2 {
  static baseUrl = 'http://gateway-mocks:3002'

  static async process({ client, card, amount }) {
    console.log("🚀 [PaymentGateway2] Enviando transação para", this.baseUrl)

    const response = await axios.post(`${this.baseUrl}/transacoes`, {
      valor: amount,
      nome: client.name,
      email: client.email,
      numeroCartao: card.number,
      cvv: card.cvv
    }, {
      headers: {
        'Gateway-Auth-Token': 'tk_f2198cc671b5289fa856',
        'Gateway-Auth-Secret': '3d15e8ed6131446ea7e3456728b1211f'
      }
    })

    console.log("✅ [PaymentGateway2] Resposta:", response.data)
    return response.data
  }

  static async refund(externalId: string) {
    console.log("🚀 [PaymentGateway2] Reembolsando transação:", externalId)

    const response = await axios.post(`${this.baseUrl}/transacoes/reembolso`, {
      id: externalId
    }, {
      headers: {
        'Gateway-Auth-Token': 'tk_f2198cc671b5289fa856',
        'Gateway-Auth-Secret': '3d15e8ed6131446ea7e3456728b1211f'
      }
    })

    console.log("✅ [PaymentGateway2] Reembolso:", response.data)
    return response.data
  }
}