import http from 'node:http'
import {Transform} from 'node:stream'

class InverseNumber extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1

        console.log(transformed)

        callback(null, Buffer.from(String(transformed)))
    }
}

const server = http.createServer((require, response)=> {
    return require.pipe(new InverseNumber()).pipe(response)
})

server.listen(3004)

/*
req => ReadableStream
res => WritableStream

*/