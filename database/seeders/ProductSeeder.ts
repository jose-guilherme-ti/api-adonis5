import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Product from 'App/Models/Product'

export default class ProductSeeder extends BaseSeeder {
  public async run () {
    await Product.createMany([
      {
        name: 'Produto X',
        amount: 100.00,
      },
      {
        name: 'Produto Y',
        amount: 150.00,
      },
      {
        name: 'Produto Z',
        amount: 200.00,
      },
    ])
  }
}
