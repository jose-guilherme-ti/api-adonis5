import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

export default class UserService {
  public static async create(payload) {
    payload.password = await Hash.make(payload.password)
    return await User.create(payload)
  }

  public static async update(id: number, payload) {
    const user = await User.findOrFail(id)
    if (payload.password) {
      payload.password = await Hash.make(payload.password)
    }
    user.merge(payload)
    await user.save()
    return user
  }

  public static async delete(id: number) {
    const user = await User.findOrFail(id)
    await user.delete()
  }

  public static async list() {
    return await User.all()
  }

  public static async getById(id: number) {
    return await User.findOrFail(id)
  }
}
