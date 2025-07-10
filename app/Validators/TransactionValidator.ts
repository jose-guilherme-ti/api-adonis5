// app/Validators/TransactionValidator.ts
import vine from '@vinejs/vine'

export const CreateTransactionValidator = vine.object({
  client: vine.object({
    name: vine.string(),
    email: vine.string().email(),
  }),
  products: vine.array(
    vine.object({
      product_id: vine.number(),
      quantity: vine.number().min(1),
    })
  ),
  card: vine.object({
    number: vine.string().minLength(16).maxLength(16),
    cvv: vine.string().minLength(3).maxLength(3),
  }),
})
