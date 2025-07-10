import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class TransactionProduct extends BaseModel {
  public static table = 'transaction_products'

  @column({ isPrimary: true })
  public id: number

  @column()
  public transactionId: number

  @column()
  public productId: number

  @column()
  public quantity: number
}
