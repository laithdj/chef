export function genrateQueryParams(params: any){
    let queryParams = '';
    if(params){
        let keys =  Object.entries(params).reduce((old: string[], value)=>{
            old.push( value.join('='))
            return old
        }, [])

        queryParams = keys.length ? `?${keys.join('&')}` : '';
    }
    return queryParams;
}