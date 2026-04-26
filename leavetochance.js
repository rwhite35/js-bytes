
// was getting a sore thumb from flipping a coin to work out
// some probability and thought this would be a fun exercise.
// And, save my thumb for something more important like
// hitchhiking around the gallaxy...

const trials = 12;
const ceiling = 24;
const headsCoin = document.querySelector("#heads");
const tailsCoin = document.querySelector("#tails");
const tossResult = document.querySelector("#tossResult");

// value range is -24 to 24 for a 50/50 chance
// that either even or odd number will result.
function randomNumber(min,max) {
    const computed  = Math.ceil((min - max) + min);
    const scaler    = (min % 2 == 0) ? computed : max;
    console.log(`- randomNumber min ${min}, max ${max}, computed ${computed}, scaler ${scaler}!`);
    return Math.floor(Math.random() * scaler)
}

function coinToss() {
    let headCnt = 0;
    let tailCnt = 0;
    for(let i = 0; i < trials; i++) {
        let lowerCeiling = ceiling - i;
        let num = randomNumber(i,lowerCeiling);
        let res = (num % 2 == 0) ? 'heads' : 'tails';
        console.log(`- coinToss random num ${num}, coin face ${res.toUpperCase()}`);
        switch (res) {
            case 'heads': 
                headCnt++;
                break;
            case 'tails': 
                tailCnt++;
                break;
        }
    }
    // update ui
    let result = (headCnt > tailCnt) ? 'Heads' : (tailCnt > headCnt) ? 'Tails' : 'Tie';
    let resultStr = '';
    switch (result) {
        case 'Heads': 
            resultStr = `${result} wins ${headCnt} out of ${trials} tosses!`;
            break;
        case 'Tails':
            resultStr = `${result} wins ${tailCnt} out of ${trials} tosses!`;
            break;
        case 'Tie':
            resultStr = `Yikes! Its a ${result}. Maybe decide this one on your own?`;
            break;
    }
    // update divs
    tossResult.textContent = resultStr;

    if(result === 'Heads') {
        headsCoin.style.display = "block";
        tailsCoin.style.display = "none";
    } else if (result === 'Tails') {
        tailsCoin.style.display = "block";
        headsCoin.style.display = "none";
    } else {
        headsCoin.style.display = "none";
        tailsCoin.style.display = "none";
    }
}
// coinToss();
