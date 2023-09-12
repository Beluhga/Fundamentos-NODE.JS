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

    select(table, search) { // para passar as tabaleas que quer selecionar
        let data = this.#database[table] ?? []

        if (search) {
            data = data.filter(row => { // search é um objeto
                return Object.entries(search).some(([key, value]) => {
                    return row[key].toLowerCase().includes(decodeURIComponent(value.toLowerCase())) // local da busca // decodeURIComponent() para os acentos nos nomes
                })
            })
        }

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
    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id) // pecorre cada um dos registros do use, procurando se existe um usuario com o Id igual ao Id que estou querendo deletar

        if(rowIndex > -1) {
            this.#database[table][rowIndex] = {id, ...data} // [rowIndex] => sem colocar isso ele vai substituir toda a tabela do banco de dados
            this.#persist()
        }
    }
    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id) // pecorre cada um dos registros do use, procurando se existe um usuario com o Id igual ao Id que estou querendo deletar

        if(rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1) // o splice vai remover o obtido
            this.#persist() // para salvar o banco de dados com a solicitacao pedida
        }
    }
}

/*
 data = data.filter(row => { // search é um objeto
            return Object.entries(search).some(() => { ////////////////object.entries =>[['name', 'gatao], ['email', '@exemplo']]
                
some(() => {}) => Some: percorre uma array ele percorre uma array e se pelo menos um daquelas itens for true, deve ser incluido dentro do filtro

 if (search) {
            data = data.filter(row => { // search é um objeto
                return Object.entries(search).some(([key, value]) => {
                    return row[key].includes(value)
                ------ {name: "Gatao", email: "@exemplo"}                
                ------ [['name', 'gatao], ['email', '@exemplo']]
                ------ [key = name, value = gatao]
                })
            })
        }
*/
