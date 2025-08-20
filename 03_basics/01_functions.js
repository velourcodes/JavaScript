// functions in JS
function randomComp(num1, num2) // parameters
{
    console.log(num1%num2)
}
// randomComp(10,3) // arguments

function loginMessage(username = "admin") // a min default val
{
    return `${username} just logged in, system is ready!`
}
// passing multiple arguments to a func
function Q1_Income(val1,...inc)
{
    return inc
}
// console.log(Q1_Income(2500,3000,1560,4310))

const car={brand: "Morris Garages",modelname:"Hector",
    fuelType:"EV",year: 2024}
function objFunc(yourObj)
{
    console.log(`Your car's model name is: ${yourObj.modelname}`)
}
objFunc(car)