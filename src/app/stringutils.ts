const anyNonDigit = /\D/g

export const stringToNumber = (str: string): number => {
    if(anyNonDigit.test(str))
        throw new Error('Not a number')

    const belowZero = str.indexOf('-') == 0
    if(belowZero) {
        str = str.substring(1)
    }

    if(str.indexOf('.') >= 0) {
        return Number(str)
    }

    if(str.indexOf(',') >= 0) {
        return Number(str.replace(',', '.'))
    }

    if(belowZero) {
        return -Number(str)
    }

    return Number(str)
}