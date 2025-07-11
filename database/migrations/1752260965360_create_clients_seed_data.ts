import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { DateTime } from 'luxon'

export default class CreateClientsSeedData extends BaseSchema {
  public async up () {
    const now = DateTime.now().toSQL({ includeOffset: false })

    await this.db.table('clients').multiInsert([
      { name: 'José da Silva', email: 'jose@client.com', created_at: now, updated_at: now },
      { name: 'Maria Oliveira', email: 'maria@client.com', created_at: now, updated_at: now },
      { name: 'Carlos Souza', email: 'carlos@client.com', created_at: now, updated_at: now },
    ])
  }

  public async down () {
    await this.db.from('clients').whereIn('email', [
      'jose@client.com',
      'maria@client.com',
      'carlos@client.com',
    ]).delete()
  }
}
