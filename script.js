let yearInput = document.querySelector("#birth_year");
let monthInput = document.querySelector("#birth_month");
let dayInput = document.querySelector("#birth_day");

let yearLabel = document.querySelector(".label-year");
let monthLabel = document.querySelector(".label-month");
let dayLabel = document.querySelector(".label-day");

let yearError = document.querySelector(".error-year");
let monthError = document.querySelector(".error-month");
let dayError = document.querySelector(".error-day");


let yearOutput = document.querySelector(".output-years output");
let monthOutput = document.querySelector(".output-months output");
let dayOutput = document.querySelector(".output-days output");


let form = document.querySelector("#birthdayForm");
form.addEventListener("submit", calculateAge);

function calculateAge(e){
    e.preventDefault();


    let year = yearInput.value;
    let month = monthInput.value;
    let day = dayInput.value;
    let today = new Date();

    if (validateDate(day, month, year, today)){
        return;
    };

    // let birthday = new Date("1999-11-01")
    let birthday = new Date(year.toString() + "-" + month.toString() + "-" + day.toString())


    let yearsBetween = today.getFullYear() - birthday.getFullYear();
    let monthsBetween = today.getMonth() - birthday.getMonth();
    let daysBetween = today.getDate() - birthday.getDate();

    if(monthsBetween < 0 || (monthsBetween === 0 && daysBetween < 0)) {
        yearsBetween--;
        if (monthsBetween === 0) {
            monthsBetween = 11;
        } else {
            monthsBetween = 12 + monthsBetween;
        }
        daysBetween = 30 +daysBetween;
    }

    yearOutput.innerText = yearsBetween;
    monthOutput.innerText = monthsBetween;
    dayOutput.innerText = monthsBetween;


}


function validateDate(day, month, year, today) {
    let errors = 0;
    let tempDate = year.toString() + "-" + month.toString() + "-" + day.toString();
    
    if (year === "" || month === ""){
        tempDate = "2015-02-" + day;
    }

    let testDate = Date.parse(tempDate);
    
    console.log(tempDate);



    if (year === ""){
        yearError.innerText = "This value is required";
        errors ++;
        yearLabel.classList.add("error-toggle");
        yearInput.classList.add("error-toggle");
    } else if (year > today.getFullYear()){
        yearError.innerText = "Must be in the past";
        errors ++; 
        yearLabel.classList.add("error-toggle");
        yearInput.classList.add("error-toggle");
    } else {
        yearError.innerText = "";
        yearLabel.classList.remove("error-toggle");
        yearInput.classList.remove("error-toggle");
    }
    
    if (month === ""){
        monthError.innerText = "This value is required";
        errors ++;
        monthLabel.classList.add("error-toggle");
        monthInput.classList.add("error-toggle");
    } else if (month <= 0 || month > 12){
        monthError.innerText = "Must be a valid month";
        errors ++; 
        monthLabel.classList.add("error-toggle");
        monthInput.classList.add("error-toggle");
    } else {
        if(monthError.innerText != ""){}
        monthError.innerText = "";
        monthLabel.classList.remove("error-toggle");
        monthInput.classList.remove("error-toggle");
    }
    
    if (day === ""){
        dayError.innerText = "This value is required";
        errors ++;
        dayLabel.classList.add("error-toggle");
        dayInput.classList.add("error-toggle");
    } else if (day <= 0 || day > 31 || isNaN(testDate)){
        dayError.innerText = "Must be a valid day";
        errors ++; 
        dayLabel.classList.add("error-toggle");
        dayInput.classList.add("error-toggle");
    } else {
        dayError.innerText = "";
        dayLabel.classList.remove("error-toggle");
        dayInput.classList.remove("error-toggle");
    }




    //stops calculateAge() from continuing if errors were found
    if (errors > 0){
        return true;
    }



}