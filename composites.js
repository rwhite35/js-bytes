// the Mandelbrot Set is a famous equation(z ≠ z^2 + c) that
// produces a complex number set which combine to create fractals.
// its also an example of iteration and recursion within a boundary.
// To that end, give it up for Robert Brooks, Peter Matelski, and
// Benoit Mandelbrot, whose work has made many a developer cringe ;-)
// 
// see https://en.wikipedia.org/wiki/Mandelbrot_set


// rando prime and composite numbers
const numberSet = [
    [2,[3,5]],
    [7,6,10],
    11,13,21
]

/**
 * logic: Primes only have a two factors, 1 (num/1) and the 
 * number (num/num) itself. Composites have three or more factors. 
 * factors divide evenly into a number or expression. 1 and `number` 
 * divisors are given, so checks divisors of 2 and greater.
 * @return {Boolean} if number has three or more factors, otherwise false
 */
function isComposite(num) {
    console.log(`${isComposite.name} checking ${num}`);
    let beta = false;
    
    // skip 1...3, generally accepted as primes
    if (num <= 3) return beta;

    // if i divides evenly into number, 
    // its a factor, ergo number is composite!
    for (let i = 2; i < num; i++) {
        if (num % i == 0) {
            beta = true;
            break;
        }
    }
    return beta;
}


/** 
 * traverse through an unknown number set array and return 
 * only the composite numbers in an array. 
 * should have a time complexity of O^1 or constant time.
 * @param {Array} inArr any set of rando primes and composite
 * @return {Numbers} Array of composite numbers, or empty if not found.
 */ 
function mandelbrotsCurse(inArr, outArr = new Array) {
    let inCnt = inArr.length;
    console.log(`${mandelbrotsCurse.name} array arg. length ${inCnt}`);

    if (typeof inArr == 'undefined' || inCnt === 0) return outArr;

    for (let i = 0; i < inCnt; i++) { // traverse outter array
        if (Array.isArray(inArr[i])) { // traverse inner arrays
            let j = inArr[i].length;
            // console.log(`element ${i} is array w length ${j}`);

            while (j > 0) { // loop through array element
                j = j - 1;
                if (inArr[i][j].length > 1) { // traverse inner inner array
                    inArr[i][j].forEach((elm) => {
                        // console.log(`inner array ${j} has value ${elm}`);
                        if (isComposite(elm)) outArr.push(elm);
                    });
                } 
                else {
                    // console.log(`inner array ${j} has value ${inArr[i][j]}`);
                    if(isComposite(inArr[i][j])) outArr.push(inArr[i][j]);
                }
            }
        } 
        else {
            // console.log(`element ${i} is number ${inArr[i]}`);
            if(isComposite(inArr[i])) outArr.push(inArr[i]);
        }
    }
    return outArr;
}

composites = mandelbrotsCurse(numberSet);
console.log(`These are composite numbers ${composites}`); // 10,6,21
