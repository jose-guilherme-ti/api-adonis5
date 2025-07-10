// database/seeders/UserSeeder.ts
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    // 1) Desabilita checagens de FK e limpa a tabela
    await Database.rawQuery('SET FOREIGN_KEY_CHECKS = 0;')
    await Database.from('users').delete()
    await Database.rawQuery('SET FOREIGN_KEY_CHECKS = 1;')

    // 2) Insere do zero todos os perfis com senha 'secret'
    await User.createMany([
      {
        email: 'admin@admin.com',
        password: '$scrypt$n=16384,r=8,p=1$dh1P1l5KbZYobFQFBTZubQ$2KSwffsV+qQzc8N7dFe3UjwX9UDS3BJUxsaypNRJEp1XLOlagmGzbcR8KLm4lYp1DDeHaSg+DPYXREDANKYOfg',
        //password: await Hash.make('secret'),
        role: 'ADMIN',
      },
      {
        email: 'manager@admin.com',
        password: await Hash.make('secret'),
        role: 'MANAGER',
      },
      {
        email: 'finance@admin.com',
        password: await Hash.make('secret'),
        role: 'FINANCE',
      },
      {
        email: 'user@admin.com',
        password: await Hash.make('secret'),
        role: 'USER',
      },
    ])
  }
}
