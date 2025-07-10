import Route from '@ioc:Adonis/Core/Route'

/*
|--------------------------------------------------------------------------
| Rotas Públicas
|--------------------------------------------------------------------------
*/

// Login
Route.post('/login', 'AuthController.login')

// Realizar compra informando o produto
Route.post('/purchase', 'TransactionsController.store')

/*
|--------------------------------------------------------------------------
| Rotas Privadas (autenticadas)
|--------------------------------------------------------------------------
*/
Route.group(() => {
  // CRUD de usuários
  Route.resource('users', 'UsersController')
    .apiOnly()
    .middleware({ '*': ['role:ADMIN,MANAGER'] })

  // CRUD de produtos
  Route.resource('products', 'ProductsController')
    .apiOnly()
    .middleware({ '*': ['role:ADMIN,MANAGER,FINANCE'] })

  // Gateways
  Route.get('/gateways', 'GatewaysController.index')
  Route.patch('/gateways/:id/activate', 'GatewaysController.activate')
    .middleware(['role:ADMIN'])
  Route.patch('/gateways/:id/priority', 'GatewaysController.updatePriority')
    .middleware(['role:ADMIN'])

  // Clientes
  Route.get('/clients', 'ClientsController.index')
  Route.get('/clients/:id', 'ClientsController.show')

  // Compras (transações)
  Route.get('/transactions', 'TransactionsController.index')
  Route.get('/transactions/:id', 'TransactionsController.show')
  Route.post('/transactions/:id/refund', 'TransactionsController.refund')
    .middleware(['role:FINANCE'])

}).prefix('/api').middleware(['auth'])
