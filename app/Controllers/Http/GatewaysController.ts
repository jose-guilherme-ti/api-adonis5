// app/Controllers/Http/GatewaysController.ts
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Gateway from 'App/Models/Gateway'
import { UpdateGatewayValidator } from 'App/Validators/GatewayValidator'
import vine from '@vinejs/vine'

export default class GatewaysController {
  public async index() {
    return await Gateway.all()
  }

  public async update({ params, request }: HttpContextContract) {
    const gateway = await Gateway.findOrFail(params.id)
    const data = await vine.validate({ schema: UpdateGatewayValidator, data: request.all() })
    gateway.merge(data)
    await gateway.save()
    return gateway
  }

  public async activate({ params }: HttpContextContract) {
    const gateway = await Gateway.findOrFail(params.id)
    gateway.is_active = !gateway.is_active
    await gateway.save()
    return gateway
  }

  public async updatePriority({ params, request }: HttpContextContract) {
    const gateway = await Gateway.findOrFail(params.id)
    const priority = request.input('priority')

    if (typeof priority !== 'number') {
      return { error: 'Priority deve ser um número' }
    }

    gateway.priority = priority
    await gateway.save()
    return gateway
  }
}
