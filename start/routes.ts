/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

/**
 * Rotas públicas
 */
Route.group(() => {
  // Login de usuário (gera JWT ou sessão)
  Route.post('/login', 'AuthController.login')

  // Compra simples informando produto
  Route.post('/purchase', 'ShopController.create')
}).prefix('/api')

/**
 * Rotas privadas protegidas por autenticação
 */
Route.group(() => {
  /** Gateways */
  Route.patch('/gateways/:id/activate', 'GatewayAdminController.toggleActive')
    .middleware(['auth', 'role:ADMIN'])

  Route.patch('/gateways/:id/priority', 'GatewayAdminController.updatePriority')
    .middleware(['auth', 'role:ADMIN'])

  /** Usuários */
  Route.resource('/users', 'UsersController').apiOnly()
    .middleware({
      '*': ['auth', 'role:ADMIN,MANAGER']
    })

  /** Produtos */
  Route.resource('/products', 'ProductsController').apiOnly()
    .middleware({
      '*': ['auth', 'role:ADMIN,MANAGER,FINANCE']
    })

  /** Clientes */
  Route.get('/clients', 'ClientsController.index').middleware(['auth', 'role:ADMIN,MANAGER'])
  Route.get('/clients/:id', 'ClientsController.show').middleware(['auth', 'role:ADMIN,MANAGER'])

  /** Compras */
  Route.get('/transactions', 'TransactionController.index').middleware(['auth', 'role:ADMIN,FINANCE'])
  Route.get('/transactions/:id', 'TransactionController.show').middleware(['auth', 'role:ADMIN,FINANCE'])

  /** Reembolso */
  Route.post('/transactions/:id/refund', 'RefundController.refund')
    .middleware(['auth', 'role:FINANCE'])
}).prefix('/api')