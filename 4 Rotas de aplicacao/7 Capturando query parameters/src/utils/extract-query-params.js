

export function extractQueryParams(query) {
    return query.substr(1).split('&').reduce((queryParams, item) => {
        const [key, value] = item.split('=')

        queryParams[key] = value

        return queryParams

    }, {})
}


/*
query.substr(1).split('&') = ['search=Gatao', 'page=2'] 

 key = ['search=Gatao']
 value =['page=2']


*/