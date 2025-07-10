import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'

export default class AddAdminUserSeed extends BaseSchema {
  public async up () {
    const hashedPassword = await Hash.make('admin123')

    await this.db.table('users').insert({
      email: 'admin@admin.com',
      password: hashedPassword,
      role: 'ADMIN',
      created_at: DateTime.now().toSQL({ includeOffset: false }), // ✅ Corrigido
      updated_at: DateTime.now().toSQL({ includeOffset: false }), // ✅ Corrigido
    })
  }

  public async down () {
    await this.db.from('users').where('email', 'admin@admin.com').delete()
  }
}