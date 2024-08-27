/**
 * Summary. script to explore number sorting problems and the various techniques 
 * for dealing with a long list of unordered integers.
 * 
 * Description. This is a `safe space` to explore, create, and make as many 
 * complexities and runaway loops as any processor can manage...
 * To it then - enjoy.
 * 
 * @since 1.2.0
 * 
 * Sorting Algorithm reference
 * @link https://en.wikipedia.org/wiki/Sorting_algorithm
 * 
 * Array.sort() is a better choice for production code, but not nearly as fun.
 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 * 
 */ 

/** 
 * rando number set with repeating integers 
 * and irregular distribution of values
 */
const numberSet = [11,1,21,3,4,32,103,7,4,56,2,12];

/**
 * Summary. Evaluate left-hand-sides greater truethiness.
 * 
 * @param {Number} lhs value to evaluated.
 * @param {Number} rhs value to compare against.
 * 
 * @returns {Boolean} true when lhs is greater than rhs.
 */
function lhsIsGreater(lhs, rhs) {
    return (lhs > rhs) ?? rhs;
}


/**
 * Summary. Computes the standard deviation for the current tuple values.
 * The range ceiling and floor expands as numbers are evaluated. 
 * The middle has selection bias due to the most recent assignment 
 * and may not represent a true range mean value. Enter standard deviation!
 * 
 * @param {[Number]} array of current iterations [ceiling, middle, floor] value
 * 
 * @return {Number} value to use when computing a ranges intermediate middle
 */
function standardDeviation(array = new Array) {
    if (array.length < 2) { return undefined; }
    const n = array.length;
    const mean = array.reduce((a, b) => a + b) / n;
    let deviation = Math.sqrt(
        array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / (n - 1),
    );
    return Math.round(deviation);
}


/**
 * Summary. evaluates vals relative position compared to the current
 * tuple ceiling, middle, floor range. Uses a standard deviation 
 * to compute an intermidiate value for upper an lower range boundaries.
 * 
 * @param {Number} val integer to insert into outArr
 * @param {tuple} tuple of current iterations [ceiling, middle, floor] values
 * @param {[Number]} outArr number list sorted by descending order
 * * ex.  Array[103,56,32,21,12,11,7,4,3,1]
 * 
 * @return {Boolean} true on completed successfully
 */
function mainMerge(val, tuple, outArr, success = Boolean) {
    if (typeof val === undefined || val.length <= 0) {
        throw new Error(`required argument! val is empty or undefined.`);
    }
    // continue if repeat value 
    if (outArr.includes(val)) {
        console.log(`${mainMerge.name} value ${val} already sorted! Continue to next!`);
        return;
    }
    // calculates range intermediate middle value 
    let stdDev  = standardDeviation(tuple);

    if (val > tuple[0]) { // sets a new high
        outArr.unshift(val);
        tuple[2] = tuple[1];
        tuple[1] = tuple[0];
        tuple[0] = val;

    } else if (val < tuple[2] || tuple[2] === 'undefined') { // sets new low
        outArr.push(val);
        tuple[2] = val;

    } else if (val < tuple[0] && val > tuple[1]) {  // top half of range
        let msd = tuple[0] - stdDev;
        let si  = outArr.indexOf(tuple[1]);
        if(val > msd) si = 1;
        outArr.splice(si,0,val);
        tuple[1] = val;

    } else { // handle all other cases
        let ii  = outArr.indexOf(tuple[2]); // safe insert at index
        let bsd = (stdDev > tuple[1]) ? stdDev - tuple[1] : tuple[1] - stdDev;

        if (val > bsd && outArr.length >= 3) {
            outArr.splice(ii,0,val);
            // dont update tuple[2], val closer to middle
        } else {
            outArr.push(val);
            tuple[2] = val;
        } 
    }
    // console.log(`${mainMerge.name} outArr ${outArr}, stdDev ${stdDev}, tuple ${tuple}`);
    return success = true;
}


/**
 * Summary. Re-order subset array using a `compare to next` strategy.
 * The result of which overloading (inplace) the workArray element.
 *  
 * @param {Array} list un ordered list of numbers
 * @returns {Array} list numbers in descending order
 */
function sortList(list = new Array, vector = new Array) {
    const incr = 1;
    for (let i = 0; i < list.length; i++) {
        const idx = [i - incr, i, i + incr];
        const lhs = list[idx[1]];
        // console.log(`${sortList.name} lhs value ${lhs} from list at index ${idx[1]}!`);

        if (vector.length == 0) { // first time thru
            vector.push(lhs);

        } else {
            let lastIdx = vector.length - incr;
            if (lhsIsGreater(lhs,vector[0])) { // insert at beginning
                if (!vector.includes(lhs)) vector.unshift(lhs);

            } else if (!lhsIsGreater(lhs,vector[lastIdx])) { // push onto end
                if (!vector.includes(lhs)) vector.push(lhs);

            } else { // find needle in haystack
                let inc = 0;
                if (vector.length >= 3) {
                    vector = vector.flatMap((elm) => {
                        if (lhs > elm && !vector.includes(lhs)) {
                            inc++; // return elm after lhs has been mapped!
                            return (inc == 1) ? [lhs,elm] : elm;
                        } else {
                            return elm;
                        }
                    });
                }
            }
        }
    }

    // console.log(`- done: ${sortList.name} returns sorted vector ${vector}`);
    return vector;
}


/**
 * Description. Takes input argument as source date and chunks it into 
 * smaller subsets of work. workArr is an indexed array of indexed arrays
 * with the divisor pushed on the end for convenient access later. 
 *  
 * @param {Array} inArr indexed array of random natural numbers(integer).
 * * NOTE: as of v1.2.0 only sorts numbers between 1 and N,
 *        and ignores negative and zero or undefined values.
 *        
 * @return {[Array],Number} one or more array subsets, divisor integer.
 * * ex.   Array[[11,1,21,3,4,32],[103,7,4,56,2,12],2]
 */
function chunkWorkArray(inArr, workArr = new Array) {
    const totElms = inArr.length;
    const evenodd = (totElms % 2 == 0) ? 'even' : 'odd';
    const divisor = totElms >= 100 ? 4 : 2;
    const multiple = Math.round(Math.abs(totElms / divisor));
    let delta = divisor;

    while (delta > 0) { // chunk input into subsets of array
        let start = (divisor == delta) ? 0 : delta * multiple; 
        let end = start + multiple;
        workArr.push(inArr.slice(start,end));
        delta = delta - 1;
    }
    // for quick reference
    workArr.push(divisor);

    // console.log(`- done: ${chunkWorkArray.name} returns workArr: ${workArr}`);
    return workArr;
}


/**
 * Summary. Merges workArr lists into one array of ordered numbers. 
 * depends on a tuple for search and sort logic, as well as computing
 * one standard of deviation. Calls the actual merge function (mainMerge).
 * 
 * @param {[Array]Number} array of arrays produced from original number input.
 * @param {[Number]} number array with intermediate sorted values. 
 *         this array is constantly updated (inplace) as the process runs.
 * 
 * @return {[Number]} final array of sorted values, will throw error and end process.
 */
function mergeWorkArray(workArr, outArr) {
    const wid = { lhs: 0, rhs: 1 }
    const arrCnt = workArr.length
    let outerLoop = (workArr[wid.lhs].length == workArr[wid.rhs].length) 
    ? workArr[wid.lhs].length : workArr[wid.rhs].length;

    // tuple[,,] is a proxy for current ordinal ceiling, middle, floor values
    // tuple values are actual numbers and used to position input values.
    let tuple = [1,1,undefined];
    outArr.join(tuple);

    for (let i = 0; i < outerLoop; i++) {
        try {
            let lhs  = (workArr[wid.lhs][i] !== undefined) ? workArr[wid.lhs][i] : -1;
            let rhs  = (workArr[wid.rhs][i] !== undefined) ? workArr[wid.rhs][i] : -1;

            if(lhs > 0) mainMerge(lhs, tuple, outArr);
            if(rhs > 0) mainMerge(rhs, tuple, outArr);
        }
        catch (err) {
            console.log(`WARN: ${mergeWorkArray.name} mainMerge issues! ${err}`);
        }
    }
    // console.log(`- done: ${mergeWorkArray.name} returns outArr ${outArr}!`);
    return outArr;
}


/** 
 * Summary. Wrapper to organize work into a three step process.
 * main process has a worst case time complexity of O(n^2).
 * first: divide and conquer a list of numbers into managable chucks of work;
 * next:  re-order each work array from high to low (descending);
 * last:  merge work arrays into one final list of sorted numbers.
 * 
 * @param {[Number]} inArr required, unordered list of integers
 * 
 * @returns {[Number]} sorted list of numbers in descending order
 */
function goQuicksort(inArr, outArr = new Array) {
    let resetNull = null;
    let inCnt = inArr.length;
    // console.log(`${goQuicksort.name} input array has ${inCnt} elements to sort.`);

    if (typeof inArr == 'undefined' || inCnt === 0) return outArr;

    // first: divide all numbers into smaller chunks of work
    let workArr = chunkWorkArray(inArr);
    let divisor = workArr.pop();

    // next: sort each chunk in decending order, overloads original list
    for (let i = 0; i < divisor; i++) {
        workArr[i] = sortList(workArr[i]); // reassign at current position
    }

    // last: merge workArray lists into one output array of sorted values.
    mergeWorkArray(workArr, outArr);

    // console.log(`${goQuicksort.name} - done: array with sorted values: ${outArr}`);
    return outArr
}

sortedArr = goQuicksort(numberSet);
console.log(`All sorted out! ${sortedArr}`);



