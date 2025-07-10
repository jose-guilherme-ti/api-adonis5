import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Gateways extends BaseSchema {
  protected tableName = 'gateways'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.boolean('is_active').notNullable().defaultTo(true)
      table.integer('priority').notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
