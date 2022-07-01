export const digitFromBiggest = (param) => {
    const result = param.replace(/\D+/g, ' ').trim().split(' ').map(e => parseInt(e)).sort((a, b) => {
        return b - a;
    });
    console.log(result);
}
