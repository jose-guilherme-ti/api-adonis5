import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

export default class AuthService {
  public static async login({ email, password }, auth) {
    const user = await User.query().where('email', email).firstOrFail()

    if (!(await Hash.verify(user.password, password))) {
      throw new Error('Credenciais inválidas')
    }

    const token = await auth.use('api').generate(user)
    return { user, token }
  }
}
