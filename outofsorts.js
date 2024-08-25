// who doesnt love sorting algorithms?  Actually, they are becoming more 
// important as large language models and machine learning require huge
// data stores of structured and un structured data.  
// 
// That asside for the moment, this script experiments with a few common
// algorithms to tease out opportunities for efficiency and accuracy.
//
// see https://en.wikipedia.org/wiki/Sorting_algorithm


// rando number set
const numberSet = [11,1,21,3,4,32,103,7,4,56,2,12];


/**
 * helper: evaluates left-hand-side as greater than right-hand-side.
 * if lhs isnt greater than, returns right-hand-side.
 */
function leftIsGreater(lhs, rhs) {
    console.log(`${leftIsGreater.name} received values left ${lhs}, right ${rhs}`);
    return (lhs > rhs) ?? rhs;
}


/**
 * sort high to low
 */
function sortList(list = new Array, vector = new Array) {
    const incr = 1;
    // loop through each list element
    for (let i = 0; i < list.length; i++) {
        const idx = [i - incr, i, i + incr];    // tuple index[prev, left, right]
        const lhs = list[idx[1]];               // current Number to eval
        const rhs = list[idx[2]];               // next Number to compare
        console.log(`${sortList.name} current ${idx[1]} list has lhs ${lhs}, rhs ${rhs}!`);

        // lookback at previous saved value vs rhs value.
        // assumes last loop pushed the next highest value by ascending order.
        if (vector.length >= 1) {
            let save = vector[idx[0]];
            let tuple = [,,];
            tuple[0] = (leftIsGreater(save,lhs) && leftIsGreater(save, rhs)) ? save : (leftIsGreater(lhs,rhs)) ? lhs : rhs;
            tuple[1] = (leftIsGreater(lhs,save)) ? lhs : save;
            tuple[2] = lhs;
            console.log(`- work: concat vector with tuple values ${tuple}`);

            vector.concat(tuple);

        } else { // first time thru, push lhs onto vector stack
            vector.push(lhs);
        }
        console.log(vector);
    }

    console.log(`- done: returns sorted list as vector`);
    return vector;
}


/**
 * helper: takes input array and chunks it into smaller array 
 * @param {any[]} inArr one dimensional array of of unordered numbers
 * @return {array} workArr array with two or more sub arrays mapped from inArr.
 */
function chunkWorkArray(inArr, workArr = new Array) {
    const totElms = inArr.length;
    const divisor = totElms >= 100 ? 4 : 2;
    const multiple = Math.abs(totElms / divisor);
    console.log(`${chunkWorkArray.name} working...`);
    console.log(` inArr.length: ${totElms}, divisor: ${divisor}, index multiple: ${multiple}`);

    let delta = divisor;
    while (delta > 0) { // chunk inArr into two or four sub arrays
        let start = (divisor == delta) ? 0 : delta * multiple; 
        let end = start + multiple;
        workArr.push(inArr.slice(start,end));
        delta = delta - 1;
    }
    // add divisor as last element for convenient access
    workArr.push(divisor);
    console.log(`done chunking workArr: ${workArr}`);
    return workArr;
}


/** algo: Quicksort - probably the most common sorting algorithm.
 * the process divides and conquers by splitting the work into chucks.
 * then through multiple rounds of comparing one value to another,
 * orders a random set of numbers into an ordered list (asc or desc).
 * The time complexity worst case is O(n^2).
 * @param {*} inArr unordered array of numbers
 * @param {String} order sort order is `asc`ending (default), or `desc`ending
 * @returns {Array} list of numbers in ascending or descending order
 */
function goQuicksort(inArr, order = 'asc', outArr = new Array) {
    let resetNull = null;
    let inCnt = inArr.length;
    console.log(`${goQuicksort.name} array arg. length ${inCnt}`);

    if (typeof inArr == 'undefined' || inCnt === 0) return outArr;

    // first: break work into smaller chunks
    let tempArr = chunkWorkArray(inArr);
    let divisor = tempArr.pop();
    console.log(`tempArr.length ${tempArr.length}, divisor ${divisor}`);

    // next: evaluate each array chuck using sortList() for comparison
    let vector = [];
    for (let i = 0; i < divisor; i++) { // outter array 
        let list = tempArr[i];          // inner array proto[1,32,56,..]
        vector = sortList(list);
        
        // last, concat this vector into workArr and reset vars for next outter loop
        console.log(` - done: finally, concat this vector ${vector} onto workArray`);
        outArr.concat(vector);
        vector = []
        list = resetNull;
    }
    return outArr
}

sortedArr = goQuicksort(numberSet);
console.log(`These numbers are sorted ${sortedArr}`);



