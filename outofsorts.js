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
 * helper: evaluates left-hand-side for greater than right-hand-side.
 * @param {Number} lhs list value being evaluated
 * @param {Number} rhs value to compare lhs against
 * @returns {Boolean} true when lhs is greater than rhs.
 */
function lhsIsGreater(lhs, rhs) {
    // console.log(`${lhsIsGreater.name} comparing vals lhs ${lhs} to rhs ${rhs}`);
    return (lhs > rhs) ?? rhs;
}


/**
 * worker: uses an Insertion Sort algorithm to order a list of Numbers 
 * which are assigned in descending order to a return array.
 * @param {Array} list un ordered list of numbers
 * @returns {Array} list numbers in descending order
 */
function sortList(list = new Array, vector = new Array) {
    // outter loop over all list elements
    const incr = 1;
    for (let i = 0; i < list.length; i++) {
        const idx = [i - incr, i, i + incr];    // rolling index pointers [current, left, right]
        const lhs = list[idx[1]];               // Number to evaluate and assign
        // console.log(`${sortList.name} outter loop ${idx[1]} for lhs value ${lhs}!`);

        if (vector.length == 0) {
            vector.push(lhs); // first time thru

        } else { // insert value in sequential order
            let lastIdx = vector.length - incr; // ensures its last element added
            if (lhsIsGreater(lhs,vector[0])) {
                vector.unshift(lhs);    // at beginning

            } else if (!lhsIsGreater(lhs,vector[lastIdx])) {
                vector.push(lhs);       // at end

            } else { // needle in haystack, 
                // this using a `next to` strategy - is the next number greater than lhs?
                if (vector.length >= 3) {
                    vector = vector.flatMap( (elm) => (lhs > elm && !vector.includes(lhs)) ? [lhs,elm] : elm );
                }
            }
        }
        // done. let see what we've got...
        // console.log(vector);
    }
    return vector;
}


/**
 * helper: takes input array and chunks it into smaller work arrays. 
 * @param {Array} inArr one dimensional array of random numbers (integers).
 * @return {[Array],Number} one or more work arrays chunked from input array, last element is divisor for reference.
 */
function chunkWorkArray(inArr, workArr = new Array) {
    const totElms = inArr.length;
    const divisor = totElms >= 100 ? 4 : 2;
    const multiple = Math.abs(totElms / divisor);
    console.log(`${chunkWorkArray.name} received array with ${totElms} numbers to chunk!`);

    let delta = divisor;
    while (delta > 0) { // chunk inArr into two or four sub arrays
        let start = (divisor == delta) ? 0 : delta * multiple; 
        let end = start + multiple;
        workArr.push(inArr.slice(start,end));
        delta = delta - 1;
    }

    // add divisor for reference, would be same as work array count.
    workArr.push(divisor);

    console.log(`done chunking workArr: ${workArr}`);
    return workArr;
}


/** 
 * method: Quicksort using an insertion algorithm.
 * first the process divides and conquers, splitting work into chucks;
 * next re-order each work array from high to low (descending);
 * finally merges work arrays into final list of sorted numbers.
 * 
 * @param {[Number]} inArr required, unordered list of integers
 * @returns {[Number]} sorted list of numbers in descending order
 * time complexity worst case is O(n^2)
 */
function goQuicksort(inArr, outArr = new Array) {
    let resetNull = null;
    let inCnt = inArr.length;
    console.log(`${goQuicksort.name} has array of ${inCnt} length`);

    if (typeof inArr == 'undefined' || inCnt === 0) return outArr;

    // first: break work into chunks, 
    // - calls chunkWorkArray(array) passing inArr argument
    let workArr = chunkWorkArray(inArr);
    let divisor = workArr.pop();
    // console.log(`tempArr.length ${tempArr.length}, divisor ${divisor}`);

    // next: process chucks using sortList()
    // - calls sortList(list) passing this workArr[i] as argument
    for (let i = 0; i < divisor; i++) { // outter array 
        let list = workArr[i];          // inner array proto[1,32,56,..]
        workArr[i] = sortList(list);    // re - assign at current position
    }
    console.log(`- workArr reordered numbers completed`);
    console.log(workArr);

    // finally: merge workArrs into one output array
    return outArr
}

sortedArr = goQuicksort(numberSet);
console.log(`These numbers are sorted ${sortedArr}`);



