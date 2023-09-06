import {Readable, Transform, Writable} from 'node:stream'

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

class InverseNumber extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(transformed)))
    }
}

class MultiplyByTemSTream extends Writable {
    _write(chunk, encoding, callback){
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

new OneToHundredStrem()
.pipe(new InverseNumber())
.pipe(new MultiplyByTemSTream())



/*
((((((((((Entendendo Streams no Node))))))))))
>>>Exemplos de Streams

 - Neflix => Para videos
 - Spotify => para sons

 
>>>Conceito de straem

conseguir ler pequenas parte de pequenas coisas e ja conseguir trabalhar
com aqueles dados antes mesmo de ler o arquivo por completo

- Exemplo de sem conceito de streams

>>> Importação de clientes via CSV (Excel) 

1gb - 1.000.000 => ler o arquivo de 1gb
POST/ upload import.csv => depois que ler o arquivo e percorrer o arquivo ele termina ele vai fazer a leitura de cada um das operçoes descrita no banco de dados 

10mb/s - 100s(segundos) => vai ter q espera 100s pra todo o arquivo ser finalizado, pra o NOde.js começar a ler esse arquicvo e faezr a insercao dentro do banco de dados

100s => inserções no banco de dados

- Exemplo com streams

10mb/s => 10.000 => ler o arquivo enquanto o arquivo esta sendo enviado ao servidor eu ja começo a processar, enquanto ainda esta sendo feito o upload

((((((((((((((((Criando stream de leitura))))))))))))))))

No Node.js, toda entra e saida é automaticamente uma stream

 - process.stdin => tudo que o usuario digita no terminal

 - process.stdin.pipe => conecta o outra stream

 - process.stdin.pipe(process.stdout) => o retorno na aplicação no terminal

 this.push() - push() => metodo pra utiliza para uma stream, readable stream fornece informações que estiver consumindo ela

 const buf = Buffer.from(String(i)) - ele vai receber qual informação ele que converte nesse formato Buffer (OBS: Buffer não aceita numeros)

 setTimeout(() => { }, 1000) => a stream aos pouco, a cada 1 sec trabalhar com os dados retornados de uma a um antes de finalizar os dados

 (((((((((((((Stream de escrita e transformação)))))))))))))

 Writable = A stream de escrita => recebe dados de ums sctream de leitura como: 

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

new OneToHundredStrem().pipe(process.stdout)

e vai fazer alguma coisa com esses dados

 chunk => é o pedaço que a gente leu na stream de leitura, o que esta em "this.push(buf)"

 encoding => é como a informação esta codificada.

 callback => é uma função que a stream de escrita precisa chamar quando ela terminou de fazer, o que ela precisava fazer dentro daquela informação

 Transform = stream de transformação, pra tarnsforma um dado em outro. Um chunk em outro

 Buffer => é uma forma de transicionar dados entre streams




*/