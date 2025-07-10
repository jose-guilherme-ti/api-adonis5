// app/Controllers/Http/UsersController.ts
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { CreateUserValidator, UpdateUserValidator } from 'App/Validators/UserValidator'
import vine from '@vinejs/vine'

export default class UsersController {
  public async index() {
    return await User.all()
  }

  public async store({ request }: HttpContextContract) {
    const data = await vine.validate({ schema: CreateUserValidator, data: request.all() })
    console.log(data)
    return await User.create(data)
  }

  public async show({ params }: HttpContextContract) {
    return await User.findOrFail(params.id)
  }

  public async update({ params, request }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    const data = await vine.validate({ schema: UpdateUserValidator, data: request.all() })
    user.merge(data)
    await user.save()
    return user
  }

  public async destroy({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await user.delete()
    return { message: 'User deleted' }
  }
}
