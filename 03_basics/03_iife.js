// IMMEDIATELY INVOKED FUNCTION EXPRESSIONS

// AS A NORMALLY DECALRED IIFE - Named IIFE
(function testPrompt() {
    console.log("API Connected")
}) () - //parethesis outside of this parenthesis is the immediate call

// Arrow IIFE

( (username) => { console.log(`Hey ${username}! Your login was successful`)
}) ("Affan")