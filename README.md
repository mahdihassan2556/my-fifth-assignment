1️.... Difference Between var, let, and const

var

Function-scoped.

Can be redeclared and updated.

Hoisted and initialized with undefined.

let

Block-scoped ({ }).

Can be updated but cannot be redeclared in the same scope.

Hoisted but not initialized.

const

Block-scoped.

Cannot be updated or redeclared.

Must be initialized when declared.




2️⃣... What is the Spread Operator (...)?

The spread operator (...) is used to expand elements of an array or object into individual elements.

Uses:

Copy arrays

Merge arrays

Pass multiple values





3️⃣..... Difference Between map(), filter(), and forEach()
./Method/	            ./Purpose Returns/
map()	             Transform each element	New array
filter()	         Select elements based on condition	New array
forEach()	         Execute a function for each element	Nothing (undefined)





4️⃣.... What is an Arrow Function?

An arrow function is a shorter syntax for writing functions in JavaScript using =>.

Example:

// Normal function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;




5️⃣ .....What are Template Literals?

Template literals allow you to create strings using backticks ( ) and embed variables using ${}.

Example:

const name = "John";
const age = 25;

const message = `My name is ${name} and I am ${age} years old.`;

console.log(message);