export const factorial = (num) => {
    if(num === 0) return 1;
    res = 1
    for(let i=1; i<=num; i++) {
        res *= i
    }
    return res
}