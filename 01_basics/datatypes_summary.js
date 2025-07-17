//Primitive Datatypes
//INCLUDE: number, bigint, string, boolean, symbol, null, undefined
//examples:
let num=34          //number
let name="Affan"    //String
let bigNum=450762n  //the 'n' at the end makes it of bigint type else 
                    //it is treated as number type
console.log(typeof bigNum) //bigint
let flag=true
let sym1=Symbol(21) //symbol
let sym2=Symbol(21) //symbol
console.log(sym1===sym2)
let myval           //undefined
const empty=null

//Reference (Non Primitive Datatypes)
//INCLUDE: Arrays, Objects, Functions
//examples:
let arr1=["Mixed",21,"array",true]
let myObject= {name:"Affan",age:19,"Lang":"JavaScript"}
const funcVar1= function testFunc() { 
    console.log("I am a func inside a variable") }
//or
const funcVar2= () => { 
    console.log("I am an arrow func inside a variable") } 
    //Arrow func notation
funcVar1()
funcVar2()

/*With or without a variable, if making & using func in JS ALWAYS have to
use function keyword or => notation*/

// Memory Allocation
// Stack (For Primitive)     & Heap (For Non Primitive)
// Copy is made address same | Two diff addresses point to same value in heap
let UID="anonymous@domain.com"
let UID_Dup=UID
console.log("Before:\n")
console.table([UID,UID_Dup])
UID_Dup="yourname@domain.com"
console.log("After:\n")
console.table([UID,UID_Dup]) //only UID_Dup gets affected here

let userData=
{
    user_name:"Affan",
    userID:"affan240@domain.com",
    city:"New Delhi"
}
let userRef=userData
console.log('Before\n')
console.table([userData,userRef])
userRef.userID="notfound@broken.com"
console.log("\n\nAfter\n")
console.table([userData,userRef]) //Both object fields get affected