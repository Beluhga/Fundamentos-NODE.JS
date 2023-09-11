import { Database} from './middlewares/database.js'
import {randomUUID} from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
    {
        method: 'GET', // metodo pra chama a rota
        path: buildRoutePath('/users'), // caminho da rota
        handler: (request, response) => { // o que ira acontecer quando a rota for chamada
            const users = database.select('users') // para buscar todos os usuario do banco de dados

            return response
           // .setHeader('Content-type', 'application/json')
            .end(JSON.stringify(users))
        }
    },
    {
        method: 'POST', // metodo pra chama a rota
        path: buildRoutePath('/users'), // caminho da rota
        handler: (request, response) => { // o que ira acontecer quando a rota for chamada
            const {name, email} = request.body 

        const user = {
            id: randomUUID(),
            name,
            email,
        }

        database.insert('users', user) // 'users' é o nome da tabela, user é a informação que deseja inserir (const user = {})

        return response.writeHead(201).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/users/:id'),
        handler: (request, response) => {
            return response.end()
        },
    },

]

/*

 - : => significa que ira receber um padrao dinamico, exemp: /users/':' => /users/:

*/