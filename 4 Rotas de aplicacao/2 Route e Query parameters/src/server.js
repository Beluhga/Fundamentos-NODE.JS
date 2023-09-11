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

/*
Diferença em 3 formas de enviar as informações para a API

- Query Parameters => são parametros nomiados que a gente envia no proprio entedereço na requisição, exempl: //http://localhost:3000/users?usersId=1 
usado quando precisa de uma URL Statefull (filtros, paginação, não-obrigatorios)

- Routy Parameters => são parametros não nomeados, que tambem estao na rota, exempl: //http://localhost:3000/users/1 (1 é ao Id: 1)
serve para identificação de recurso

- Request Body => Envio de informações de um formulario (passa pelo HTTPs) Tb é o metodo mais seguro



*/
