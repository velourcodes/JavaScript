const buttons=document.querySelectorAll(".button");
const body=document.querySelector("body");

buttons.forEach((thisButton) =>
{
    thisButton.addEventListener('click', (event) =>
    {
        let thisID=event.target.id;
        switch(thisID)
        {
            case "violet":
                body.style.backgroundColor=thisID;
                break;
            case "red":
                body.style.backgroundColor=thisID;
                break;
            case "yellow":
                body.style.backgroundColor=thisID;
                break;
            case "green":
                body.style.backgroundColor=thisID;
                break;
        }
    }
    )
}
);