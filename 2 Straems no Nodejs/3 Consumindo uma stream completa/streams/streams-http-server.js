import http from 'node:http'
import {Transform} from 'node:stream'

class InverseNumber extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1

        console.log(transformed)

        callback(null, Buffer.from(String(transformed)))
    }
}

const server = http.createServer(async(require, response)=> {
    const buffers = []

    for await (const chunk of require) { // percorre cada peçado da stream e add dentro da array de buffers
        buffers.push(chunk)
    }

    const fullStreamContent = Buffer.concat(buffers).toString() // para ver o conteudo completo

    console.log(fullStreamContent)

    return response.end(fullStreamContent)



    //return require.pipe(new InverseNumber()).pipe(response)

})

server.listen(3004)

/*
req => ReadableStream
res => WritableStream

*/