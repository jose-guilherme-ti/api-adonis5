
import { test } from '@japa/runner'
import User from 'App/Models/User'

test.group('Auth', (group) => {
  group.each.setup(async () => {
    await User.updateOrCreate(
      { email: 'admin@admin.com' },
      { password: 'secret', role: 'ADMIN' }
    )
  })

  test('pode fazer login com credenciais corretas', async ({ client, assert }) => {
    const response = await client.post('/login').json({
      email: 'admin@admin.com',
      password: 'secret'
    })

    response.assertStatus(200)
    assert.exists(response.body().token)
  })

  test('falha ao fazer login com senha errada', async ({ client }) => {
    const response = await client.post('/login').json({
      email: 'admin@admin.com',
      password: 'errada'
    })

    console.log('STATUS:', response.status())
    console.log('BODY:', response.body())

    response.assertStatus(401)
    response.assertBodyContains({ errors: [{ message: 'Wrong password' }] })
  })
})
