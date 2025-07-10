// app/Validators/ProductValidator.ts
import vine from '@vinejs/vine'

export const CreateProductValidator = vine.object({
  name: vine.string(),
  amount: vine.number().min(1),
})

export const UpdateProductValidator = vine.object({
  name: vine.string().optional(),
  amount: vine.number().min(1).optional(),
})
