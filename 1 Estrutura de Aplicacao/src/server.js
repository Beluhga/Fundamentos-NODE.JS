// const http = require('http') - CommonJS => require


// Aplicações HTTP => APIs
// CommonJS => require
// ESModule => import/export (tem que colocar "type": "module" dentro do arquivo package.json pra pode usar)

// import http from 'http' - ESModule => import/export (tb pode ser um module de terceiro)

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

// request = requisição - Criar usuario (nome, email, senha) - requisição de queme sta chamando o servidor
// response = resposta - criar um respota pra quem esta chamando essa requisição

/* Mudar no package.json - Substituir o "test" pelo ""dev": "node --watch src/server.js" que esta em "scripts" 
depois e so fazer o "npm run dev"

(((((((((((( (Rotas de criação e listagem (Métodos HTTP) )))))))))))))
rotas:
- Criar usuarios
- Listagem usuario
- Edição de usuarios
- Remoção de usuarios

HTTP (requisição HTTP)
 -- Metodo HTTP
 -- URL
 const {method, url} = request

METODOS QUE VAMOS UTILIZAR:
 >> GET, POST, PUT, PATCH, DELETE <<

 GET => Buscar um recurso do back-end
 POST => Criar um recurso no back-end
 PUT => Atualizar um recurso no back-end
 PATCH => Atualizar um informação especifica de um recurso no back-end
 DELETE => Deletar um recurso do back-end

 // GET /users => Buscando usuarios do back-end
 // POST /users => Criar um usuario no back-end

((((((((((((((((( Salvando usuários em memória (Headers) ))))))))))))))))))))

 Stateful = ela sempre vai ter algum tipo de informação guardada em memoria.
 Stateless = ela não salva nada em memoria, ela salva as informações em dispositivos externos como banco de dados, arquivos de textos...

 JSON - Javascript Object Notation
 usado para converte uma "array" para "string"

 Cabeçalhos (Headers) (requisição/resposta) => Metadados = são informaçoes pra que tanto o back-end e front-end saiba lidar com a requisição com a melhor forma

 .setHeader('Content-type', 'application/json') => tipo de conteudo que estamos retornando do tipo "json" por exemplo
 enviando do back-end para o front-end pra devolver a respota do front-end

 (((((((((((((((((((((Conhecendo HTTP status codes)))))))))))))))))))))

 HTTP Status Code











*/

