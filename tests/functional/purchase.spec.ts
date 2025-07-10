
import { test } from '@japa/runner'
import Product from 'App/Models/Product'

test.group('Purchase', (group) => {
  group.setup(async () => {
    await Product.updateOrCreate(
      { name: 'Produto Teste' },
      { amount: 1000 }
    )
  })

  test('realiza uma compra com sucesso', async ({ client }) => {
    const response = await client.post('/purchase').json({
      client: { name: 'Fulano', email: 'fulano@teste.com' },
      products: [ { product_id: 1, quantity: 2 } ],
      card: { number: '5569000000006063', cvv: '010' }
    })

    response.assertStatus(200)
    response.assertBodyContains({ status: 'SUCCESS' })
  })
})
