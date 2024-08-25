// who doesnt love sorting algorithms?  Actually, they are becoming more 
// important as large language models and machine learning require huge
// data stores of structured and un structured data.  
// 
// That asside for the moment, this script experiments with a few common
// algorithms to tease out opportunities for efficiency and accuracy.
// this iteration is using Insertion Sort both logically and syntatically.
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
    return (lhs > rhs) ?? rhs;
}


/**
 * helper: merger mainia
 * @return {Boolean} true on completed successfully
 */
function mergerMania(val, tuple, outArr, success = Boolean) {
    if (typeof val === undefined || val.length <= 0) {
        throw new Error(`val argumentis empty or undefined!`);
    }
    // console.log(`${mergerMania.name} starting val ${val} with outArr ${outArr} and tuple ${tuple}`);

    if (val > tuple[0]) { // a new high
        if (!outArr.includes(val)) outArr.unshift(val); // DOES NOT already include val, added it.
        tuple[2] = tuple[1];
        tuple[1] = tuple[0];
        tuple[0] = val;

    } else if (val < tuple[2] || tuple[2] === 'undefined') { // a new low
        let bidx = outArr.indexOf(tuple[2]);
        if (!outArr.includes(val)) outArr[bidx] = val;
        tuple[2] = val;

    } else if(val < tuple[0] && val > tuple[1]) {   // top half
        let si = outArr.indexOf(tuple[1]); // splice in at middle index
        if (!outArr.includes(val)) outArr.splice(si,0,val);

        // reset tuple[1] middle value if val should replace current middle value
        tuple[1] = (tuple[1] < val) ? tuple[1] : val;

    } else { // bottom half
        outArr.push(val);
        tuple[2] = val;

    }

    // console.log(`${mergerMania.name} ending outArr ${outArr}, tuple ${tuple}`);
    return success = true;
}


/**
 * worker: uses an Insertion Sort algorithm to order a list of Numbers 
 * which are assigned in descending order to a new return array.
 * @param {Array} list un ordered list of numbers
 * @returns {Array} list numbers in descending order
 */
function sortList(list = new Array, vector = new Array) {
    // outter loop over all list elements
    const incr = 1;
    for (let i = 0; i < list.length; i++) {
        const idx = [i - incr, i, i + incr];    // rolling index pointers [current, left, right]
        const lhs = list[idx[1]];               // Number to evaluate and assign

        if (vector.length == 0) { // first time thru
            vector.push(lhs);

        } else { // insert value in sequential order
            let lastIdx = vector.length - incr; // ensures its last element added
            if (lhsIsGreater(lhs,vector[0])) {
                vector.unshift(lhs);    // at beginning

            } else if (!lhsIsGreater(lhs,vector[lastIdx])) {
                vector.push(lhs);       // at end

            } else { // needle in haystack, 
                // this using a `next to` strategy, is the next number greater than lhs?
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
 * worker: takes input array and chunks it into smaller work arrays. 
 * @param {Array} inArr one dimensional array of random numbers (integers).
 * @return {[Array],Number} one or more work arrays chunked from input array, last element is divisor for reference.
 */
function chunkWorkArray(inArr, workArr = new Array) {
    const totElms = inArr.length;
    const divisor = totElms >= 100 ? 4 : 2;
    const multiple = Math.abs(totElms / divisor);
    // console.log(`${chunkWorkArray.name} received array with ${totElms} numbers to chunk!`);

    let delta = divisor;
    while (delta > 0) { // chunk inArr into two or four sub arrays
        let start = (divisor == delta) ? 0 : delta * multiple; 
        let end = start + multiple;
        workArr.push(inArr.slice(start,end));
        delta = delta - 1;
    }

    // add divisor for reference, would be same as work array count.
    workArr.push(divisor);

    // console.log(`done chunking workArr: ${workArr}`);
    return workArr;
}


/**
 * worker: merge sanitize workArr, returning one array of ordered numbers
 */
function mergeWorkArray(workArr, outArr) {

    // workArr indexes for merging left-hand-side and right-hand-side
    const wid = { lhs: 0, rhs: 1 }
    const arrCnt = workArr.length
    let outterLoop = (workArr[wid.lhs].length == workArr[wid.rhs].length) ? workArr[wid.lhs].length : workArr[wid.rhs].length;

    // seeds tuple proxy with rolling value for outArr [0] high, [1] middle, [2] low
    // note tuple[2] doesn't seed a floor value, that will happen in the first loop.
    let tuple = [1,1,undefined];
    outArr.join(tuple);

    for (let i = 0; i < outterLoop; i++) {
        // console.log(`- loop ${i} workArr evals lhs ${workArr[wid.lhs][i]}, rhs ${workArr[wid.rhs][i]}`);
        try {
            let lhs  = (workArr[wid.lhs][i] !== undefined) ? workArr[wid.lhs][i] : 1;
            let rhs  = (workArr[wid.rhs][i] !== undefined) ? workArr[wid.rhs][i] : 1;
            // throws error
            mergerMania(lhs, tuple, outArr);
            mergerMania(rhs, tuple, outArr);
        }
        catch (err) {
            console.log(`WARN: ${mergeWorkArray.name} mergerMainia issue! ${err}`);
        }
    }
    return outArr;
}


/** 
 * accessor method: wraps and organizes work into a three step process
 * first: divide and conquer list of numbers into managable chucks of work;
 * next: re-order each workArr from high to low (descending);
 * finally: merge and sanitize workArr into a final list of sorted numbers.
 * 
 * @param {[Number]} inArr required, unordered list of integers
 * @returns {[Number]} sorted list of numbers in descending order
 * time complexity worst case is O(n^2)
 */
function goQuicksort(inArr, outArr = new Array) {
    let resetNull = null;
    let inCnt = inArr.length;
    console.log(`${goQuicksort.name} has input array ${inCnt} in length`);

    if (typeof inArr == 'undefined' || inCnt === 0) return outArr;

    // first: call chunkWorkArray(array) with argument inArr
    let workArr = chunkWorkArray(inArr);
    let divisor = workArr.pop();

    // next: call sortList(list) with each workArr[i] as argument
    for (let i = 0; i < divisor; i++) {
        workArr[i] = sortList(workArr[i]); // reassign at current position
    }

    // finally: merged work array into outArr for easy consumption.
    mergeWorkArray(workArr, outArr);

    console.log(`${goQuicksort.name} updated output array values: ${outArr}`);
    return outArr
}

sortedArr = goQuicksort(numberSet);
console.log(`These numbers were sorted ${sortedArr}`);



