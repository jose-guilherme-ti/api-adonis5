// app/Controllers/Http/ClientsController.ts
import Client from 'App/Models/Client'

export default class ClientsController {
  public async index() {
    return await Client.all()
  }

  public async show({ params }: { params: { id: number } }) {
    return await Client.query()
      .where('id', params.id)
      .preload('transactions', (tx) => tx.preload('products'))
      .firstOrFail()
  }
}
