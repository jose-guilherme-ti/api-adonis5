import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { DateTime } from 'luxon'

export default class CreateProductsSeedData extends BaseSchema {
  public async up () {
    const now = DateTime.now().toSQL({ includeOffset: false })

    await this.db.table('products').multiInsert([
      { name: 'Produto X', amount: 100.00, created_at: now, updated_at: now },
      { name: 'Produto Y', amount: 150.00, created_at: now, updated_at: now },
      { name: 'Produto Z', amount: 200.00, created_at: now, updated_at: now },
    ])
  }

  public async down () {
    await this.db.from('products').whereIn('name', [
      'Produto X',
      'Produto Y',
      'Produto Z',
    ]).delete()
  }
}
