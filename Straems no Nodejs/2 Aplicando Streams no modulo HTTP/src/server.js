import http from 'node:http' // Module interno do Node, não de terceiros

const users = []

const server = http.createServer((request, response) => {
    const {method, url} = request

    if(method === "GET" && url === "/users"){
       //  return response.end(users) não pode ser executado dessa forma, portanto converte ele assim
        return response
        .setHeader('Content-type', 'application/json')
        .end(JSON.stringify(users))
    }

    if(method === "POST" && url === "/users"){
        users.push({
            id: 1,
            name: "Michael Albuquerque",
            email: 'michael@exemplo.com'
        })
        return response.writeHead(201).end()
    }


    return response.writeHead(404).end()
}) // servidor criado

server.listen(3000) // localhost:3000
