import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { DateTime } from 'luxon'

export default class CreateGatewaysSeedData extends BaseSchema {
  public async up () {
    const now = DateTime.now().toSQL({ includeOffset: false })

    await this.db.table('gateways').multiInsert([
      { name: 'Gateway 1', is_active: true, priority: 1, created_at: now, updated_at: now },
      { name: 'Gateway 2', is_active: true, priority: 2, created_at: now, updated_at: now },
      { name: 'Gateway 3', is_active: false, priority: 3, created_at: now, updated_at: now },
    ])
  }

  public async down () {
    await this.db.from('gateways').whereIn('name', [
      'Gateway 1',
      'Gateway 2',
      'Gateway 3',
    ]).delete()
  }
}
