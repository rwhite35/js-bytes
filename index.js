// ES6 JavaScript Basics
//
// //\\ Primitive Types
//
// const & var - global primitives
const count     = 10;
const greeting  = 'Hello';  // immutable, inits with value
var timesTried  = 1;        // mutable, inits with value

if(timesTried === 1) {
    var timesTried = 4;
    console.log(timesTried);
}

// let - dynamic type values can change
let name        = 'jello';  // String wrapper
let age         = 35;       // Number wrapper
let happy       = true;     // Boolean wrapper
let maxSize     = BigInt(Number.MAX_SAFE_INTEGER);
let stateOf;                // undefined - is both a type and var default value
let resetValue  = null;     // is object with value of null

// `var` and `let` have the same behavior
if(name === 'jello') {
    name = 'biafra';
    console.log(name);
}
name = resetValue;


// //\\ Reference Types
//
// Objects use curly braces
let sizeObject  = {}        // object literal
const constObj  = null;     // null object
const nameProp  = "name";


// Objects - 
// uses keyword `let` or `const`, can have mutable properties.
const person = {
    name: 'biafra',
    age: 24
}
// ref value by square bracket or dot notation
console.log(greeting +' '+ person[nameProp]);

// Arrays -
// Array is indexed, not associated key=value, Use Object(above) for that.
// items(aka elements) can dynamically change type ie sting to number.
let litArray    = [];       // Array literal
let otherNames  = ['Tom','Janet'];  // zero-indexed, [0] = Tom
otherNames[2]   = 'Peter';  // now length is three element long

// Array has built in methods like `forEach`, `every`, `find`, `length` etc
otherNames.forEach((element) => console.log(element)); // Tom, Janet, Peter
litArray = [
    ["Tina",["Ralph","Stanley"]],
    ["Pam","Sammy"]
]

// array-copy operations (ie from()) makes shallow copies of an array.
// here, the litArray2 ref points to litArray, they are the same
litArray2 = Array.from(litArray);
litArray[0][1][1] = "Sanford";
console.log(litArray2);

// here, a deep copy (removes ref pointer) is created
litArray3 = JSON.parse(JSON.stringify(litArray));
litArray[2] = "Steven"; // now 3 elements for both litArray & litArray2


// //\\ Functions -
//
// perform task or calculate values
function countElem(array) {
    let count = 0, idx;

    for (idx in array) {
        if(array.hasOwnProperty(idx))
            count++;
    }
    return count;
}
// GOTCHA: is a shallow iteration over the top level elements.
// recursions would require condition logic (ie. is element an array type?)
// and another looping function for true conditions.

// compute number of object properties
Object.objsize = function(obj) { 
    let size = 0, key; 
  
    for (key in obj) { 
        if (obj.hasOwnProperty(key)) 
            size++; 
    } 
    return size; 
};
// console.log("person size: " + Object.objsize(person));

// calling functions from function
function square(number) { return number * number; }
// console.log(square(3)); // 9


// // \\ Loop Guru
//
// Its a lonely blue nowhere for `Lil Steven`. 
// In this example `for` loops over 3 litArray[[0]:[], [1]:[], [2]:''] 
// bracket level elms, and uses `constraint condition` to consoles 
// only non-Array elements.
let retort = document.querySelector("#notMyName");
for (key in litArray) {
    if (!Array.isArray(litArray[key])) {
        let str = `But I'm Lil ${litArray[key]}! :-(`;
        retort.textContent = str;
    }
}

let charArr = ['A','B','C','D','E','F'];
let inout = [];
let half = charArr.length / 2;
let a = charArr.slice(0,half);
let b = charArr.slice(half,charArr.length);
b.reverse();
for (let i = 0; i < half; i++) {
    inout.push(a[i]);
    inout.push(b[i]);
}
// prints a vals A,B,C, b vals F,E,D, result A,F,B,E,C,D
console.log(`a vals ${a}, b vals ${b}, result ${inout}`);


// `while` loops evaluate the continue condition before the
// next iteration. BONUS: `c` would count down (or up) in 
// non-negative whole numbers. The current loop count value
// is available at loop start for additional abuse.
/*
let c = count;
while (c > 0) {
    c--;
    if (c % 2 == 0) continue;
    console.log(`${c} gurus looping!`); // 9, 7, 5, 3, 1
}
/*

// `for` loop evaluate the continue loop condition 
// (ie. the after expression) at end of iteration 
/*
for (let i = 0; i < count; i++) {
    console.log(`${i} gurus iterating!`); // 0,1,..9
}
*/