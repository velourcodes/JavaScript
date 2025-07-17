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