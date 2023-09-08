import http from 'node:http'
import {randomUUID} from 'node:crypto'
import { json } from './middlewares/json.js'
import { Database } from './middlewares/database.js'

// UUID => ID unico e universal

const database = new Database()

const server = http.createServer(async (request, response) => {
    const {method, url} = request 

    await json(request, response) 

    if(method === "GET" && url === "/users"){
        const users = database.select('users') // para buscar todos os usuario do banco de dados

        return response
        .setHeader('Content-type', 'application/json')
        .end(JSON.stringify(users))
    }

    if(method === "POST" && url === "/users"){
        const {name, email} = request.body 

        const user = {
            id: randomUUID(),
            name,
            email,
        }

        database.insert('users', user) // 'users' é o nome da tabela, user é a informação que deseja inserir (const user = {})

        return response.writeHead(201).end()
    }

    return response.writeHead(404).end()
}) 

server.listen(3000) // localhost:3000


/*


*/