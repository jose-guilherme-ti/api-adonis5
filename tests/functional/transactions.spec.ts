
import { test } from '@japa/runner'

test.group('Transactions', () => {
  test('lista todas as transações', async ({ client }) => {
    const login = await client.post('/login').json({
      email: 'admin@admin.com',
      password: 'secret'
    })
    const token = login.body().token

    const response = await client.get('/api/transactions')
      .bearerToken(token)

    response.assertStatus(200)
    response.assertBodyContains([]) // vazio no início
  })
})
