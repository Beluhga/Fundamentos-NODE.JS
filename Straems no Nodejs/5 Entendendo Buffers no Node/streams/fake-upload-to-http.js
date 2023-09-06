import {Readable} from 'node:stream'

class OneToHundredStrem extends Readable {
    index = 1

    _read() {
        const i = this.index++

        setTimeout(() => {
            if ( i > 5){
                this.push(null) 
    
            } else {
                const buf = Buffer.from(String(i))
                this.push(buf)
            }
        },1000)
    }
}

fetch('http://localhost:3004', { // para dizer que esta enviando uma informação ao poucos
    method: 'POST', // so pode ser o metodo POST ou PUT
    body: new OneToHundredStrem(),
    duplex: 'half'
}).then(response => {
    return response.text()
}).then(data => {
    console.log(data)
})

