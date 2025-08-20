// object literals (not singleton)
const sym1=Symbol("Symbol Value")
const admin_User=
{name: "Affan", age: 19, location: "New Delhi", 
isLoggedIn: true, IP: "1.0.4.255", [sym1]: "SymVal"} 
// [] to use Symbol as Symbol datatype in another object & ACCESSING ALSO

// Syntax for accessing objects:
// console.log(admin_User.IP)
// console.log(admin_User["IP"])
// console.log(admin_User[sym1])

admin_User.greet_user=function()
{
    console.log(`Good Evening, ${this.name}!`) // this is used to refer
    // to a specifc object out of mutliple
}
console.log(admin_User.greet_user())
