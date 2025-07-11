import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Hash from '@ioc:Adonis/Core/Hash'
import { DateTime } from 'luxon'

export default class CreateUsersSeedData extends BaseSchema {
  public async up () {
    const now = DateTime.now().toSQL({ includeOffset: false })

    await this.db.rawQuery('SET FOREIGN_KEY_CHECKS = 0;')
    await this.db.from('users').delete()
    await this.db.rawQuery('SET FOREIGN_KEY_CHECKS = 1;')

    await this.db.table('users').multiInsert([
      {
        email: 'admin@admin.com',
        password: '$scrypt$n=16384,r=8,p=1$dh1P1l5KbZYobFQFBTZubQ$2KSwffsV+qQzc8N7dFe3UjwX9UDS3BJUxsaypNRJEp1XLOlagmGzbcR8KLm4lYp1DDeHaSg+DPYXREDANKYOfg',
        role: 'ADMIN',
        created_at: now,
        updated_at: now,
      },
      {
        email: 'manager@admin.com',
        password: await Hash.make('secret'),
        role: 'MANAGER',
        created_at: now,
        updated_at: now,
      },
      {
        email: 'finance@admin.com',
        password: await Hash.make('secret'),
        role: 'FINANCE',
        created_at: now,
        updated_at: now,
      },
      {
        email: 'user@admin.com',
        password: await Hash.make('secret'),
        role: 'USER',
        created_at: now,
        updated_at: now,
      },
    ])
  }

  public async down () {
    await this.db.from('users').whereIn('email', [
      'admin@admin.com',
      'manager@admin.com',
      'finance@admin.com',
      'user@admin.com',
    ]).delete()
  }
}
