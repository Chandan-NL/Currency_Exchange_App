import { countryList } from './code.js';

const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies`

const dropDowns = document.querySelectorAll(".dropdown select")

const btn = document.querySelector("form button");

const formCurr = document.querySelector(".form select");
const toCurr = document.querySelector(".to select");

const msg = document.querySelector(".msg");


// for(let code in countryList){
//     console.log(code, countryList[code]);
// }



for(let select of dropDowns){
    for(let currency_code in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currency_code;
        newOption.value = currency_code;

        if(select.name === 'form' && currency_code === 'USD'){
            newOption.selected = 'selected';
        }else if(select.name === 'to' && currency_code === 'INR'){
            newOption.selected = 'selected';
        }
        select.append(newOption)
    }

    select.addEventListener("click", (Event) => {
        UpdFlag(Event.target);
    });
}

const updateExchangeRate = async() =>{
    let amt = document.querySelector(".amount input");
    let amtValue = amt.value;
    
    if(amtValue === "" || amtValue < 1){
        amtValue = 1;
        amt.Value = "1";
        // amt.innerText = amtValue;
        console.log(amtValue);
    }

    // console.log(formCurr.value, toCurr.value)
    const URL = `${url}/${formCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let resopnse = await fetch(URL);
    let data = await resopnse.json();
    let rate = data[toCurr.value.toLowerCase()];
    // console.log(rate);

    let finalAmt = amtValue * rate;
    msg.innerText = `${amtValue} ${formCurr.value} = ${finalAmt} ${toCurr.value}`
    // console.log(finalAmt);
    // console.log(formCurr.value);


}

const UpdFlag = (element) => {

    let currency_code = element.value;
    let country_code = countryList[currency_code];
    let newSrc = `https://flagsapi.com/${country_code}/flat/64.png`
    // console.log(currency_code)
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;
}


btn.addEventListener("click", (eve) =>{
    eve.preventDefault();

    updateExchangeRate();

});

window.addEventListener("load", ()=> {
    updateExchangeRate();
})
