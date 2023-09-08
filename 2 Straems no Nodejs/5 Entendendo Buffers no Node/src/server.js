import http from 'node:http' // Module interno do Node, não de terceiros

const users = []

const server = http.createServer(async (request, response) => {
    const {method, url} = request

    const buffers = [] // leitura da stream

    for await (const chunk of request) {  // leitura da stream
        buffers.push(chunk)
    }

    try { // para tentar executar o codigo abaixo // transforma o corpo em um objeto javascript
         request.body = JSON.parse(Buffer.concat(buffers).toString()) // para ver o conteudo completo 
    } catch { 
        request.body = null
    }


    if(method === "GET" && url === "/users"){
       //  return response.end(users) não pode ser executado dessa forma, portanto converte ele assim
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
}) // servidor criado

server.listen(3000) // localhost:3000


/*

const body => são os dados dentro do insonia

JSON.parse(Buffer.concat(buffers).toString()) => para transforma o JSON ja criado, em uma estrutura legel para o javascript (exemplo: de tipo primitivo: um objeto, uma array )
 console.log(body.name) => desse modo pode colocar o body.name, para achar o nome da pessoa dentro do JSON

 request.body => para aplicar um body dentro do "request"


*/