import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Transactions extends BaseSchema {
  protected tableName = 'transactions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('client_id').unsigned().references('id').inTable('clients').onDelete('CASCADE')
      table.integer('gateway_id').unsigned().references('id').inTable('gateways').onDelete('SET NULL')
      table.string('external_id').notNullable()
      table.enum('status', ['SUCCESS', 'FAILED', 'REFUNDED']).notNullable()
      table.decimal('amount', 10, 2).notNullable()
      table.string('card_last_numbers', 4).notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
