import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Client from 'App/Models/Client'

export default class ClientSeeder extends BaseSeeder {
  public async run () {
    await Client.createMany([
      {
        name: 'José da Silva',
        email: 'jose@client.com',
      },
      {
        name: 'Maria Oliveira',
        email: 'maria@client.com',
      },
      {
        name: 'Carlos Souza',
        email: 'carlos@client.com',
      },
    ])
  }
}
