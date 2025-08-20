// singleton objects (from constructor)
// Object.create()
const uberUser=new Object()
uberUser.name="Talib Qureshi"
uberUser.age=37
uberUser.location="Bangaluru"
uberUser.totalTrips=53
uberUser.id="Talib1972@uber.com"

const randomUser=new Object()
randomUser.email="randomname.57@hisdomain.org"
randomUser.fullname={firstname:"Veer",middlename:{m1:"Singh",m2:"Khurana"},
lastname:"Rajput"}
// console.log(randomUser.fullname.middlename.m2)
randomUser.email="veersingh_kr@microsoft.com"
Object.freeze(randomUser) // Prevents us from making any changes, 
// it doesnt raise an error if we try to change though
randomUser.email="broken_id@error.com" // doesnt change
// console.log(randomUser)
// NOTE: nested objects are frozen upto only top layer/dimension

// Merging objects using assign(target, source)

const obj1={1:"a",2:"b"}
const obj2={3:"c",4:"d"}
const obj3={5:"e",6:"f"}
let bigObj=Object.assign({},obj1,obj2,obj3)

const obj4={name:"Affan",age:19}
const obj5={name:"Amjad",age:27}
bigObj=Object.assign(obj4,obj5)
// console.log(obj4) // obj4 modified and a modified copy returned too
let spreadObj={...obj1,...obj2,...obj3}
// spread operator same as assign with {} as target

// retrieving keys & values from object
// console.log(Object.keys(uberUser)[1]) // returns an array of all keys
// console.log(Object.values(uberUser)) // returns an array of all values
// console.log(Object.entries(uberUser)) 
// [returns an array of array of all [key,value] pair]

// Checking for properties using in vs hasOwnProperty()
// console.log("toString" in uberUser)
// console.log(uberUser.hasOwnProperty("toString"))

// NOTE: an obj can inherit properties from its prototype
// in operator returns true for inherited properties too
// hasOwnProperty() is stricter, only returns true if we put a prop in it

// Destructuring an object
let {totalTrips: TNo} = uberUser
console.log(TNo) // Same as uberUser.totalTrips as TNo

// API handling intro - we recieve a JSON/XML file as data
// JS Object Notation file syntax can be of two types:
/* 
{
    key:value
} 
    or
[
    {},
    {}
]
*/