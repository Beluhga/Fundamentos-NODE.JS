export function buildRoutePath(path){
    const routeParametersRegex = /:([a-zA-Z]+)/g
    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\ _-]+)')

    const pathRegex = new RegExp(`^${pathWithParams}`)

    return pathRegex
}

/*
path.replaceAll(routeParameterRegex, '([a-z0-9\ _-]+)') => replace = encontra todos os locais onde contenha algum parametro dinamico,e vai substituir por uma string

("?<id>"["a-z0-9\ _-]+) => ?<id> vai focar no id do grupo

*/