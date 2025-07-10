// app/Validators/UserValidator.ts
import vine from '@vinejs/vine'

export const CreateUserValidator = vine.object({
  email: vine.string().email(),
  password: vine.string().minLength(6),
  role: vine.enum(['ADMIN', 'MANAGER', 'FINANCE', 'USER'] as const),
})

export const UpdateUserValidator = vine.object({
  email: vine.string().email().optional(),
  password: vine.string().minLength(6).optional(),
  role: vine.enum(['ADMIN', 'MANAGER', 'FINANCE', 'USER'] as const).optional(),
})
