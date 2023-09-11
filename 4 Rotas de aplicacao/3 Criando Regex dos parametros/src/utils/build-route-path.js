export function buildRoutePath(path){
    const routeParametersRegex = /:([a-zA-Z]+)/g

    //return new RegExp()

    console.log(Array.from(path.matchAll(routeParametersRegex)))
}

/*
 - Regex: é uma expressao regular

 - Expressao Regular: é uma forma de encontrar textos que segui um formato especifico
 dentro de um texto que é muito maior

 - /g => procura todos os regex globais da aplicação
*/