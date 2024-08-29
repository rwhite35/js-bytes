### JavaScript - ES6 (ECMAS2015)

Vanilla JavaScript for experimentation and explanation. In most cases each script has a standalone complex and will only do one task.
Also, these scripts are very combustible and make great firelighters when printed on paper!

Scripts are tested and run from command line using Node.js(V8 engine) at version 22.6.0. But can also run from the browser when included in HTML as a source reference.<br />
cmd: `node fileName.js`

--

### SETUP & PREREQUISITES

1. [Node.js] (https://nodejs.org/en/download/package-manager) includes the Node installer and used Node Version Manager (nvm) to set a target runtime version.

NOTE: MacOS 14 and Homebrew's Node distro may have conflicts with other system resources, it was better to install Node.js from nodejs.org. See above link.

--

### TRY IT AND SEE

1. [index.js] (https://github.com/rwhite35/js-bytes/blob/master/index.js)<br />
   Random JavaScript code that runs from the browser HTML page request from index.html. There's really no purpose to this script other than fanboying on one of the most under rated American recording artists - if ever there was one.

2. [composites.js] (https://github.com/rwhite35/js-bytes/blob/master/composites.js)<br />
   `function mandelBrotsCurse(inArr, outArr = new Array) {}`
   Traverse through a number set array of unknown size and structure to return only composite (three or more factors) numbers in a new array. The return array can be undefined (default), empty, or has one or more numbers. This method has a time complexity of O^1 or constant time.

3. [outofsorts.js] (https://github.com/rwhite35/js-bytes/blob/master/outofsorts.js)<br />
   Example of Insertion Sort algorithm for reordering a list of numbers and having an unknown length and range. Builds on some of the traversing work in composite.js, and includes logic for handling different use cases. Chucks larger work into small work, sorts and merges number data. Gracefully handles issues `undefined` or `empty` values.<br />
   WARN: hasn't been stress tested NOT production ready. Be that as it may:

   - input: `11,1,21,3,4,32,103,7,4,56,2,12,2`
   - output: `103,56,32,21,12,11,7,4,3,2,1`

   \*\* Duplicates removed, list in descending order, what more could any 64 bit CPU ever ask for?

4. [leavetochance.js] (https://github.com/rwhite35/js-bytes/blob/master/leavetochance.js)
   Seeking some relief for a determinsitic universe? Try this coin toss on you next big "life choice" decision. Whats interesting about the algorithn is it run 12 trials, each trial representing a coin toss resulting in head or tails. So you're not actually getting one chance at "free will", but rather a distribution of probabilities
   that may or may not work out in your favor. Its really still just a 50 / 50 change - in the long run.

   - ![Coin Toss Example](https://github.com/rwhite35/js-bytes/blob/master/img/coinToss_example.png)

Enjoy!
