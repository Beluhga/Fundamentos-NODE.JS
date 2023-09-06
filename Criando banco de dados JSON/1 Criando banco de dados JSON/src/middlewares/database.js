
export class Database {
    #database = {}

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

        return data
    }
}

/*
// {"user" : [...]}
uma chave = user

 const data = this.#database[table] ?? [] => para procura se existe uma chave dentro do banco de dados "database" com o nome table, se não retorna uma array vazia

 #database => "#" serve para deixar a propriedade privada naquele arquivo
 */