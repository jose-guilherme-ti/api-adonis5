// app/Controllers/Http/AuthController.ts
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import { LoginValidator } from 'App/Validators/LoginValidator'

export default class AuthController {
  public async login({ request, auth, response }: HttpContextContract) {
    // validação dos dados
    const { email, password } = await LoginValidator.validate(request.all())

    // busca o usuário
    const user = await User.findBy('email', email)
    if (!user) {
      return response.unauthorized({ errors: [{ message: 'User not found' }] })
    }

    // DEBUG: imprima o hash do DB e a senha recebida
    console.log('--- DEBUG LOGIN ---')
    console.log('Hash do DB:', user.password)
    console.log('Senha recebida:', JSON.stringify(password))
    const isValid = await Hash.verify(user.password, password)
    console.log('Hash.verify result:', isValid)
    console.log('-------------------')
    const testeHash = await Hash.make(password)
    console.log('Hash:', testeHash)
    const isValid2 = await Hash.verify(testeHash, password)
     console.log('Hash.verify2 result:', isValid2)
    console.log('-------------------')

    if (!isValid) {
      return response.unauthorized({ errors: [{ message: 'Wrong password' }] })
    }

    // tudo certo, gera token
    const token = await auth.use('api').login(user)
    return response.ok(token)
  }
}
