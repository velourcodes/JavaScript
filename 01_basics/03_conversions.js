let num=78
let boolOfnum=Boolean(num) // becomes true
//any non zero number var gets conv to true
let name="Mathew Bucket"
let num_Name=Number(name) //Any string that cant be converted to any number
//becomes NaN (not a number)
// "204" becomes 204 via Number("204") and vice verse
// "404NotFound" -> NaN via Number("404NotFound")
let flag=true
let flagNumber=Number(flag) //becomes 1
let flagStr=String(flag) //becomes "true"

let dummy=null
let numDummy=Number(dummy) //Becomes 0

let notVal=NaN
let strNotVal=String(notVal) //Becomes "NaN" in the bg

//[] is an object, and all objects are always truthy in JS.
//if any special num like null,NaN -> become the same 
// withquotes eg NaN is "NaN"

//OPERATIONS
let str1="New", str2=" Delhi"
let str3=str1+str2