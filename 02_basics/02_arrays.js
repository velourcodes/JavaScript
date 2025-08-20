// More about arrays

// concat v/s push array into array
const arr1=[1,2,3,4]
const arr2=[5,6,7,8]
// arr1.push(arr2)
// console.log(arr1)
// const merged_arr12=arr1.concat(arr2)
// console.log(merged_arr12)

// Spread Operator <...array_name> - spreads elements of all arrays
const arr3=["Python","C++","JavaScript","PHP"]
const spreadArr=[...arr1,...arr2,...arr3]
// console.log(spreadArr)

const multidim_arr=["1D",4,19,"IQ",["2D",77,14,0,["3D","OMG",98,-25]]]
const flat_array=multidim_arr.flat(3)
// console.log(flat_array)
// flat() returns recur flattened array concat into 
// 1 flat arr upto a given depth

// console.log(Array.isArray(arr3))
// console.log(Array.isArray(22)) // Interesting case
// console.log(Array.from("Affan"))
// console.log(Array.from({brand: "Nothing"})) // Interesting case
// console.log(Array.from({length: 3}))
// console.log(Array.from({length: 6}, (_,i)=>i))
// console.log(Array.of(25,"anything",38))

// of() vs from()
// It creates an array from individual elements exactly as given
// It takes only iterable or Array-like objects - else creates []