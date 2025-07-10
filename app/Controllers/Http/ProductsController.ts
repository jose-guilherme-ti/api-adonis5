// app/Controllers/Http/ProductsController.ts
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import { CreateProductValidator, UpdateProductValidator } from 'App/Validators/ProductValidator'
import vine from '@vinejs/vine'

export default class ProductsController {
  public async index() {
    return await Product.all()
  }

  public async store({ request }: HttpContextContract) {
    const data = await vine.validate({ schema: CreateProductValidator, data: request.all() })
    return await Product.create(data)
  }

  public async show({ params }: HttpContextContract) {
    return await Product.findOrFail(params.id)
  }

  public async update({ params, request }: HttpContextContract) {
    const product = await Product.findOrFail(params.id)
    const data = await vine.validate({ schema: UpdateProductValidator, data: request.all() })
    product.merge(data)
    await product.save()
    return product
  }

  public async destroy({ params }: HttpContextContract) {
    const product = await Product.findOrFail(params.id)
    await product.delete()
    return { message: 'Product deleted' }
  }
}
