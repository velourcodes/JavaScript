const form=document.getElementById("BMI-Form");

form.addEventListener("click",
    (event) => 
    {
    // NOTE - event.preventDefault(); - we would use this if and only if
    // the button type is submit (default), event is SUBMIT, and
    // we wish to prevent the page from reloading

    const height = parseInt(document.getElementById("height").value);
    const weight = parseInt(document.getElementById("weight").value);
    const result = document.getElementById("result");
    let BMI=0;
    if(height<=0 || isNaN(height))
    { 
        result.innerHTML="<b>Error: Please enter a valid height!</b>";
    }
    else if(weight<=0 || isNaN(weight))
    {
        result.innerHTML="<b>Error: Please enter a valid weight!</b>";
    }
    else
    {
        BMI = (weight/((height*height)/10000)).toFixed(2);
        result.innerHTML=`<b>BMI is: ${BMI}</b>`
    }
    console.log("BMI:", BMI);
    const analysis=document.querySelector("#analysis");
    console.log("Analysis element:", document.getElementById("analysis"));
    if(BMI<18.6)
    {
        analysis.innerHTML="You are underweight!";
    }
    else if(BMI>=18.6 && BMI<=24.9)
    {
        analysis.innerHTML="Congratulations! You are healthy";
    }
    else
    {
        analysis.innerHTML="You are overweight!";
    }
})
// To stop the page's default action - i.e. submitting our entered data to the server's URL