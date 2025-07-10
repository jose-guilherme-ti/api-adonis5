import Client from 'App/Models/Client'

export default class ClientService {
  public static async findOrCreate(data) {
    return await Client.firstOrCreate(
      { email: data.email },
      { name: data.name }
    )
  }

  public static async list() {
    return await Client.query().preload('transactions')
  }

  public static async getDetails(id: number) {
    return await Client.query()
      .where('id', id)
      .preload('transactions', (t) => t.preload('products').preload('gateway'))
      .firstOrFail()
  }
}
