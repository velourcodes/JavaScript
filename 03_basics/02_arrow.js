// this operator - refers to current context (good practice)
const user_details={ name: "Sam Altman", 
    API_Name: "OpenAI",isLoggedin: false,
    loginMessage: function() {
        console.log(`${this.name}, your system is ready!`)
    }
}
// user_details.loginMessage()
//console.log(this) //Returns {} (empty object, global scope)
//NOTE: for browser env - window obj is returned for global scope this
function testMessage(){
    let username = "admin"
    console.log(this.username);
}
/*NOTE: this.attribute cannot be done for any func which is not a part
of an object - returns undefined*/

// funcVar() - a func inside a vari doesnt allow us to call before def
const funcVar =  () => {
    let username = "Dairy"
    console.log(this); //arrow func - even 'this' returns {}
    return
}
const addTwo = (num1, num2) => {
    return num1 + num2
}

// ( (num1,num2) => { console.log(num1*num2) } ) (5,10)

const func_store= (num1, num2) => ({username:"Affan",class:"Object"})
// console.log(func_store())
let arrOfVals=[52,19,0,-87]
/* Array_name.forEach() displays side effects of an array
returns undefined, similar to for traversal - can print 
and modify objects within array */

// arrOfVals.forEach((element,index,Array) => console.log(`Value: ${element}, Index: ${index}, Array: ${Array}`))

// another use case of forEach()
// arrOfVals.forEach(nums => console.log(nums)) // consoles all elements

let sum=0 // updating another variable with this method
// arrOfVals.forEach(nums => sum+=1)
// console.log(sum) // sum is 4 now

const arrObj=[{appName: "Gemini", founder: "Google"},
    {appName: "ChatGPT", founder: "OpenAI"},
    {appName: "Claude", founder: "Anthropic"}
]
arrObj.forEach((item) => console.log(item.appName))
// Used to easily acess property of an object of an array