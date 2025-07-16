const accountID=592091
let accountEmail="random@gmail.com"
var accountPassword="207199"
accountCity="Hyderabad"
let accountState

// We should avoid the var keyword due to func and block scope issues
// Not using let/const before a variable is allowed but not recc
// Semicolon or without semicolon both are valid
// Variable initialised without values = undefined!

console.log("The account details are:")
console.table([accountID, accountEmail, accountPassword, accountCity,
    accountState
])