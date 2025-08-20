const arr=["ek","do","teen","ek laakh"]
// for(const rakam of arr)
// {
//     console.log(rakam)
// }
// NOTE: for of with Arrays and Strings gives us values directly
// NOTE: for in with gives directly indices for both Array & Sring

const message="Ghar jane wala hoon"
// for(const char of message)
// {
//     if(char==" ") continue;
//     else
//     {
//         console.log(char)
//     }
    
// }

// Maps
const googleMap=new Map()
googleMap.set('A',1)
googleMap.set('B',2)
// console.log(googleMap)

// console.log(googleMap.get('A')) // returns the value at key passed
// console.log(googleMap.size) // returns no of mapped pairs

googleMap.delete('A')
googleMap.delete('B')
// console.log(googleMap)

googleMap.set('OpenAI','ChatGPT')
googleMap.set("Alphabet","Google")
// console.log(googleMap)

const country=new Map()
country.set("IN","India")
country.set("UK","United Kingdom")
country.set("PL","Palestine")
// console.log(country)

for(const [key,value] in country)
{
    console.log(key)
}

// NOTE: this for of with only 1 var in map prints [key,value] pairs


// for(const [key,value] of country)
// {
//     console.log(value)
// }

// NOTE: this for of with 2 vars in map prints either key or val or both
// NOTE: for of doesnt work with objects*****

const package={app_name: "UtilGo",version: "1.9.4 gamma",
    type: ".xapk", chalega: true}
// for(const [key,attribute.package] of package)
// {
//     console.log(`${key} holds ${attribute.package}`)
// } ERROR
// NOTE: FOR OF DOESNT WORK WITH OBJECTS AT ALL

// Traversing objects
// for(const key in package)
// {
//     console.log(`${key} has value ${package.key}`)
// }

//for in with Arrays

// for(const index in arr)
// {
//     console.log(arr[index])
// }
/* NOTE: for in with one var gives directly indices
 to print arr[index] (value) use this notion */

 