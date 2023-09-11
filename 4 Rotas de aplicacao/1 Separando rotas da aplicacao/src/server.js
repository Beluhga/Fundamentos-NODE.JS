import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'


const server = http.createServer(async (request, response) => {
    const {method, url} = request 

    await json(request, response)

    const route = routes.find(route =>  { 
        return route.method === method && route.path === url
    })

    if (route) {
        return route.handler(request, response) // é a funcao da rota em "routes"
    }
    
    return response.writeHead(404).end()
}) 

server.listen(3000) // localhost:3000
