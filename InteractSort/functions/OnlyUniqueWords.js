export const uniqueWords = (param) => {
    let result = param.sort(a => typeof a === 'string')
    result = new Set(result);
    console.log(result);
}
