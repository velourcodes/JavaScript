//Number type functions

const value=new Number(581.671) //Creates non primitive Number Obj
//With this object we can also add attributes with '.' operator
console.log(value.valueOf()) // gives primitve value of it => 581
console.log(value.toPrecision(4)) //581.7
let lakhVal=100000
console.log(lakhVal.toLocaleString("en-IN")) //"en-IN" is to disp result
//as per IND num system not international

// -----------------

//Math library functions

const euler_num=Math.E.toPrecision(3)
// console.log(euler_num) //2.72
// console.log(Math.PI) //3.14 till n
let x=-510
console.log(Math.abs(x)) //510
let anyNum=917.731
console.log(Math.ceil(anyNum)) //918
let genVal=(Math.random()*10)+1
console.log(genVal)
let min=20
let max=30
let anyVal = Math.floor(Math.random() * (max - min + 1)) + min;
console.log(anyVal)
// Math.random()           → [0, 1)
// * (max - min + 1)       → [0, max - min + 1)  → a float in this range
// Math.floor(...)         → [0, max - min]      → an integer
// + min                   → [min, max]          → final value