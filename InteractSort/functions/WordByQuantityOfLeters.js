export const wordByQuantityOfLetters = (param) => {
    const result = param.sort((a, b) => {
        return a.length - b.length;
    });
    console.log(result);
}
