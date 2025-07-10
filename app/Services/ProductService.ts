import Product from 'App/Models/Product'

export default class ProductService {
  public static async create(payload) {
    return await Product.create(payload)
  }

  public static async update(id: number, payload) {
    const product = await Product.findOrFail(id)
    product.merge(payload)
    await product.save()
    return product
  }

  public static async delete(id: number) {
    const product = await Product.findOrFail(id)
    await product.delete()
  }

  public static async list() {
    return await Product.all()
  }

  public static async getById(id: number) {
    return await Product.findOrFail(id)
  }
}
