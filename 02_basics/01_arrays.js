//Arrays in JS
const arr1=[11,12,13,14]
const arr2=[21,22,23,24]
const objArr=new Array(56,9,8)
//console.log(objArr)

//Array Methods

arr1.push(15)
arr1.push(16) //adds this element to end, returns updated length
arr1.pop() //returns del element/ if not found - returns undefined

arr1.unshift(10,16) //adds this element to start, returns updated length
arr1.shift() //del & returns 1st element/ 
// if not found - returns undefined

//console.log(arr1)
//console.log(arr1.includes(1))
//console.log(arr2.indexOf(23))

const strOf_arr2=arr2.join()
console.log(strOf_arr2) //Converts array into a string with commas included

// Slice v/s Splice

console.log("A ",arr2)
const new1=arr2.slice(0,2)
console.log(new1)
console.log("B ",arr2)
const new2=arr2.splice(0,2)
console.log("C ",arr2)
console.log(new2)

//slice() - returns a copy of sub array from start to n-1 (doesnt
// modify old)
//splice() - deletes & returns a portion from array start 
// to deleteCount (modifies old)