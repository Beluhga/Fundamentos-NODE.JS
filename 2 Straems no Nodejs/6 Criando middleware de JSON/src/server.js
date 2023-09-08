import http from 'node:http'
import { json } from './middlewares/json.js'

const users = []

const server = http.createServer(async (request, response) => {
    const {method, url} = request //funcao chegando

    await json(request, response) // funcao sendo interceptada

    if(method === "GET" && url === "/users"){
        return response
        .setHeader('Content-type', 'application/json')
        .end(JSON.stringify(users))
    }

    if(method === "POST" && url === "/users"){
        const {name, email} = request.body 
        users.push({
            id: 1,
            name,
            email,
        })
        return response.writeHead(201).end()
    }

    return response.writeHead(404).end()
}) 

server.listen(3000) // localhost:3000


/*

await json(request, response) => await pq na funcao dentro de json.js a funcao e asyc, e tem q espera ele ler a funcao pra poder executar

middlewares => interceptador, dentro do Node, uma funcao q vai intercepta a nossa funcao por outro arquivo
os middlewares sempre sera representado pelo request e o response ou (req, res)
*/