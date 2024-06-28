export const factorial = (num) => {
    if(num === 0) return 1;
    let res = 1
    for(let i=1; i<=num; i++) {
        res *= i
    }
    return res
}

export class InclusiveSet {

    constructor(elements=[]) {
        this.hashablesToElements = {};
        for(let element of elements) {
            this.add(element)
        }
        
    }


    add(element) {
        const hashable = this.elementToHashable(element)
        this.hashablesToElements[hashable] = element;
    }

    delete(element) {
        delete this.hashablesToElements[element.hashable]
    }

    elementToHashable(element) {
        return JSON.stringify(element)
    }

    getElements() {
        return Object.values(this.hashablesToElements)
    }

    getSize() {
        return Object.values(this.hashablesToElements).length
    }
}
