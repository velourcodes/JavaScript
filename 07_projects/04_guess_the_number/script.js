let randomNum=Math.trunc(Math.random()*100 +1);
let playFlag=true;
let attempts=0;
const maxAttempts=10;
let prevAttempts=[];

const userGuess=document.querySelector("input");
const submit=document.getElementById("submit");
const newGame=document.getElementById("newGame");
const form=document.querySelector("form");
const hintTxt=document.getElementById("hint");
const attemptsTxt=document.getElementById("attempts");
const rem=document.getElementById("rem");

function startGame()
{
    form.addEventListener("submit", (event) =>
    {
        event.preventDefault();
        if(!playFlag) return;
        let guessValue=parseInt(userGuess.value);
        validateGuess(guessValue);
    });
}

function validateGuess(guessValue)
{
    if(isNaN(guessValue))
    {
        alert("Please enter a valid number!");
        return;
    }
    prevAttempts.push(guessValue);
    checkGuess(guessValue);
    displayGuess(guessValue);
}

function checkGuess(guessValue)
{
    if(randomNum === guessValue)
    {
        displayHint(`Congratulations! Your guess: ${guessValue} is correct`);
        endGame();
    }
    else if(guessValue < randomNum)
    {
        displayHint(`Your guess is tooooo low!`);
    }
    else
    {
        displayHint(`Your guess is tooooo high!`);
    }
}
function displayGuess(guessValue)
{
    userGuess.value='';
    attemptsTxt.innerHTML=`Previous Attempts: ${prevAttempts}`;
    attempts++;
    rem.innerHTML=`Remaining Attempts: ${maxAttempts-attempts}`;
}
function displayHint(message)
{
    hintTxt.innerHTML=`${message}`;
}
function endGame()
{
    userGuess.value='';
    userGuess.setAttribute("disabled","");
    submit.setAttribute("disabled","");
    // Note: Here as we have "" as pair of attribute disabled
    // the "" in JS is a falsy value, but it is a part of HTML
    // DOM attribute, for this prop, "" mean true
    // So later when we dont want it enabled we change
    // with a boolean false!
    playFlag=false;
    if(newGame) newGame.style.display='inline-block';
}
function resetGame()
{
    randomNum=Math.trunc(Math.random()*100 +1);
    userGuess.value='';
    attempts=0;
    hintTxt.innerHTML='';
    attemptsTxt.innerHTML='';

    userGuess.disabled=false;
    submit.disabled=false;
    playFlag=true;
    newGame.style.display='none';
    rem.innerHTML=`Remaining Attempts: ${maxAttempts-attempts}`;
}

if(newGame) 
{
    newGame.addEventListener("click", () => 
    (resetGame()));
}
startGame();