import {Readable} from 'node:stream'

class OneToHundredStrem extends Readable {
    index = 1

    _read() {
        const i = this.index++

        setTimeout(() => {
            if ( i > 100){
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
})

/*

 Fetch Api => è uma API completa que trabalha com requisiçoes e respostas dentro da web;

}

*/