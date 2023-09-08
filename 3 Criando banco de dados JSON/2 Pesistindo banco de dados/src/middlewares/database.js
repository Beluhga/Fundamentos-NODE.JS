import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
    #database = {}

    constructor(){
        fs.readFile(databasePath, 'utf8')
        .then(data => { // depois que ele termina de ler o arquivo completo, pega os dados(data) e salvar no banco de dados
            this.#database = JSON.parse(data)

        }) // é uma promise por causa do .then 
        .catch(() => {
            this.#persist() // para criar o arquivo mesmo q vazio
        })

    }

    #persist(){
        fs.writeFile(databasePath, JSON.stringify(this.#database))// para colocar o db.json no local correto
    }

    select(table) { // para passar as tabaleas que quer selecionar
        const data = this.#database[table] ?? []

        return data
    }

    insert(table, data) { // recebe a tabela(table) que quer fazer a insercao e os dados(data) que que fazer a insercao
        if (Array.isArray(this.#database[table])){ // se ja existe uma array ja inserida nessa tabela(table)
            this.#database[table].push(data) // para adicionar um nono item dentro da tabela(table)
        } else {
            this.#database[table] = [data] // para criar um novo array se nao tiver nada inserido na tabela
        }

        this.#persist()

        return data
    }
}



/*
JSON.stringify(this.#database) => para converte o banco de dados em uma estrutura JSOn

constructor () = Em vez disso, ele faz parte do paradigma de 
programação orientada a objetos em JavaScript, que é a linguagem
 usada para desenvolver aplicativos no Node.js.

O método constructor() é um construtor especial que você pode definir 
em uma classe JavaScript para inicializar objetos dessa classe quando eles 
são instanciados. É usado para configurar os atributos e o estado inicial do 
objeto. Aqui está um exemplo genérico de como você pode definir um construtor 
em uma classe JavaScript:

class Pessoa {
  constructor(nome, idade) {
    this.nome = nome;
    this.idade = idade;
  }

  saudacao() {
    console.log(`Olá, meu nome é ${this.nome} e eu tenho ${this.idade} anos.`);
  }
}

const pessoa1 = new Pessoa("João", 30);
pessoa1.saudacao(); // Saída: Olá, meu nome é João e eu tenho 30 anos.


*/