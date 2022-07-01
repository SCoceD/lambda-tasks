export const digitFromSmallest = (param) => {
    const result = param.replace(/\D+/g, ' ').trim().split(' ').map(e => parseInt(e)).sort();
    console.log(result);
}
