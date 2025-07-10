// app/Validators/GatewayValidator.ts
import vine from '@vinejs/vine'

export const UpdateGatewayValidator = vine.object({
  is_active: vine.boolean().optional(),
  priority: vine.number().min(1).optional(),
})
