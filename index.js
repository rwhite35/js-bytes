// ES6 JavaScript Basics
//
// //\\ Primitive Types
//
// const & var - global primitives
const greeting = 'Hello';   // immutable, inits with value
var timesTried = 1;         // mutable, inits with value
if(timesTried === 1) {
    var timesTried = 4;
    console.log(timesTried);
}
console.log('How many times tried? ' + timesTried);

// let - dynamic type values can change
let name = 'jello';         // String wrapper
let age = 35;               // Number wrapper
let happy = true;           // Boolean wrapper
let maxSize = BigInt(Number.MAX_SAFE_INTEGER);
let stateOf;                // undefined - is both a type and var default value
let resetValue = null;      // is object with value of null
console.log(greeting +' '+ name); // Hello jello

// `var` and `let` have the same behavior
if(name === 'jello') {
    name = 'biafra';
    console.log(name);
}
console.log('What was that name? ' + name);

// use `typeof varName` to check a variable type.
name = resetValue;
console.log('reset name to ' + typeof name); // object w/ null value

// //\\ Reference Types
//
// Objects use curly braces
let sizeObject = {}     // object literal
const constObj = null;  // null object
const nameProp = "name";

// Objects - 
// uses keyword `let` or `const`, can have mutable properties.
const person = {
    name: 'biafra',
    age: 24
}
// ref value by square bracket or dot notation
console.log(person.name);
console.log(greeting +' '+ person[nameProp]);

// Arrays -
// Array is indexed, not associated key=value, Use Object(above) for that.
// items(aka elements) can dynamically change type ie sting to number.
let litArray = [];          // Array literal
let otherNames = ['Tom','Janet']; // zero-indexed, [0] = Tom
otherNames[2] = 'Peter';    // now length is three element long

// Array has built in methods like `forEach`, `every`, `find`, `length` etc
otherNames.forEach((element) => console.log(element)); // Tom, Janet, Peter
litArray = [
    ["Tina",["Ralph","Stanley"]],
    ["Pam","Sammy"]
]
// other usages
console.log('litArray copy length is ' + litArray.length); // 2 elements
console.log('litArray[0] length is ' + litArray[0].length); // 2 elements
console.log('Favorite name ' + litArray[0][1][1]);  // Stanley

// array-copy operations (ie from()) makes shallow copies of an array.
// here, the litArray2 ref points to litArray, they are the same
litArray2 = Array.from(litArray);
litArray[0][1][1] = "Sanford";
console.log(litArray2);

// here, a deep copy (removes ref pointer) is created
litArray3 = JSON.parse(JSON.stringify(litArray));
litArray[2] = "Steven"; // now 3 elements for both litArray & litArray2
console.log('deep copy array length ' + litArray3.length); // 2


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
// pass `litArray` argument for parameter `array`
console.log('array size ' + countElem(litArray)); // 3

// GOTCHA: didn't recurse beyond the top level (3),
// requires more logic to traverse all elements.

// compute number of object properties
Object.objsize = function(obj) { 
    let size = 0, key; 
  
    for (key in obj) { 
        if (obj.hasOwnProperty(key)) 
            size++; 
    } 
    return size; 
};
console.log("person size: " + Object.objsize(person));

// calling functions from function
function square(number) {
    return number * number;
}
console.log(square(3)); // 9
