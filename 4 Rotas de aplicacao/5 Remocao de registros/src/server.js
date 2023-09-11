import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'


const server = http.createServer(async (request, response) => {
    const {method, url} = request 

    await json(request, response)

    const route = routes.find(route =>  { 
        return route.method === method && route.path.test(url)
    })

    if (route) {
        const routePrams = request.url.match(route.path)
        request.params = {...routePrams.groups}
        return route.handler(request, response) 
    }
    
    return response.writeHead(404).end()
}) 

server.listen(3000) // localhost:3000

/*
Toda Regex tem um metodo chamado text = route.path.test pq no build-route-path.js chama o regex daqui

 request.url.math(route.path) => para executar a Regex na Url, pra saber quals são os dados que encontrou dentro da rota

*/

