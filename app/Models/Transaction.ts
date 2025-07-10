import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, manyToMany, BelongsTo, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import Gateway from './Gateway'
import Product from './Product'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public clientId: number

  @column()
  public gatewayId: number

  @column()
  public externalId: string

  @column()
  public status: 'SUCCESS' | 'FAILED' | 'REFUNDED'

  @column()
  public amount: number

  @column()
  public cardLastNumbers: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Client)
  public client: BelongsTo<typeof Client>

  @belongsTo(() => Gateway)
  public gateway: BelongsTo<typeof Gateway>

  @manyToMany(() => Product, {
    pivotTable: 'transaction_products',
    pivotColumns: ['quantity'],
  })
  public products: ManyToMany<typeof Product>
}
