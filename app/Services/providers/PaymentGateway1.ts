import axios from 'axios'

export default class PaymentGateway1 {
  private static baseUrl = 'http://gateway-mocks:3001'
  private static token: string | null = null

  private static async auth() {
    //console.log("Token fora:", this.token)

    if (!this.token) {
      //console.log("Token dentro antes:", this.token)

      try {
        const response = await axios.post(`${this.baseUrl}/login`, {
          email: 'dev@betalent.tech',
          token: 'FEC9BB078BF338F464F96B48089EB498'
        })

        //console.log("Response do login:", response.data)
        this.token = response.data.token
        //console.log("Token dentro depois:", this.token)

      } catch (error) {
        console.error("Erro no auth do PaymentGateway1:", error)
      }
    }

    return this.token
  }


  public static async process({ client, card, amount }) {
    console.log("Estou process da PaymentGateway1")
    const token = await this.auth()

    const response = await axios.post(`${this.baseUrl}/transactions`, {
      amount,
      name: client.name,
      email: client.email,
      cardNumber: card.number,
      cvv: card.cvv
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    /* console.log({
      amount,
      name: client.name,
      email: client.email,
      cardNumber: card.number,
      cvv: card.cvv
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }) */
    return response.data
  }

  public static async refund(id: string) {
    const token = await this.auth()
    const response = await axios.post(`${this.baseUrl}/transactions/${id}/charge_back`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  }
}
