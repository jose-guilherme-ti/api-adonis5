// app/Controllers/Http/TransactionsController.ts
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TransactionService from 'App/Services/TransactionService'
import { CreateTransactionValidator } from 'App/Validators/TransactionValidator'
import vine from '@vinejs/vine'

export default class TransactionsController {
  public async index() {
    return await TransactionService.list()
  }

  public async store({ request }: HttpContextContract) {
    const data = await vine.validate({ schema: CreateTransactionValidator, data: request.all() })
    return await TransactionService.create(data)
  }

  public async show({ params }: HttpContextContract) {
    return await TransactionService.getById(params.id)
  }

  public async refund({ params }: HttpContextContract) {
    return await TransactionService.refund(params.id)
  }

}
