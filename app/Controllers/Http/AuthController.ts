import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

export default class AuthController {
  public async login({ request, auth, response }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.findByOrFail('email', email)

    const isPasswordValid = await Hash.verify(user.password, password)
    if (!isPasswordValid) {
      return response.unauthorized({ message: 'Credenciais inválidas' })
    }

    const token = await auth.use('api').generate(user)

    return {
      user,
      token,
    }
  }
}
