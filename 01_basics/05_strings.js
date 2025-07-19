//In JS strings are both within '' or ""
// STRINGS & THEIR FUNCTIONS

let appName="Calliberate Now"
console.log(appName.slice(-3,)) //Now
console.log(appName.indexOf('a')) //1
console.log(appName.replace("Now","India")) //Calliberate India
console.log(appName.at(-1)) //w
//at() returns undefined if no match found, supp -ve indexing unlike 
// charAt()
console.log(appName.charAt(1)) //returns "" if not found, doesnt supp -ve
let inputURL="https://www.youtube.com/watch?v==7118s"
console.log(inputURL.replace('==',""))
//https://www.youtube.com/watch?v7118s
console.log(inputURL.includes(".com")) //true
console.log(inputURL.includes(".in")) //false
let urlParts=inputURL.split('/') 
//[ 'https:', '', 'www.youtube.com', 'watch?v==7118s' ]
console.log(urlParts[2]) //'www.youtube.com'

console.log(`All variables with new formatting: ${appName}, ${inputURL}`)
//IF WANNA CONC, JUST DISP ANY VAR INSIDE STR MSG, USE BACKTICKS `` 
//'' & "" wont work!