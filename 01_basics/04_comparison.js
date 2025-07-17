console.log(null > 0) //false
console.log(null == 0) //false
console.log(null <= 0) //true
/*Comparisons convert null to a number, 
treating it as 0. That's why null <= 0 is true 
and null > 0 is false. (NOTE: == doesnt convert though)*/

console.log(4=="4") //true, converts "2" to 2
console.log(3==="3") //fasle vals=>same but dtype=>diff
// === operator gives true only when dtype && val is equal! unlike ==
