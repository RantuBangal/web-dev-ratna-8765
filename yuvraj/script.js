//base server url deployed on render
let baseUrl = `https://mockserver-aq5n.onrender.com`;
// url for fetching banks
let bankUrl = `${baseUrl}/banks`;
// url for fetching users
let userUrl = `${baseUrl}/users`;
// url for fetching passbooks
let passbookUrl = `${baseUrl}/passbook`;
//container where the card will be appended
let wrapper = document.querySelector(".wrapper");
//button to proceed after selecting bank;
let proceedButton = document.getElementById("proceed-button")
// close button
let closeButton = document.getElementById("close-button");
// details container
let detailsWrapper= document.getElementById("detail-wrapper")
//submit form button
let submitFormButton = document.getElementById("submit-form-button");

let accountNumberInput = document.getElementById("accountNumber");
let confirmAccountNumberInput = document.getElementById("confirmAccountNumber");
let ifscInput = document.getElementById("ifsc");
let branchInput = document.getElementById("branch");
let accountNumberError =document.getElementById("account-number-error");
let confirmAccountNumberError=document.getElementById("confirm-account-number-error");
let ifscError=document.getElementById("ifsc-error");
let branchError= document.getElementById("branch-error");

let userDetails;
let bankDetails;

//variable to store bank data after fetch
let bankData;

//function to fetch banks
async function fetchBank(){
    try{
        let res = await fetch(bankUrl);
        let data= await res.json();
        bankData=data;
        appendData(bankData)
        console.log(data);
    }
    catch(error){
        console.log(error);
    }
}

fetchBank();

//function to create card for each bank
function createCard(item){

    //bank card wrapper
    let bankCard =  document.createElement("div");
    bankCard.className="bank-card";
    bankCard.dataset.id=item.id;

//   let tick = document.createElement("div");
//   tick.classList.add("tick", "hidden");
//   tick.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
//   <path fill="#c8e6c9" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#4caf50" d="M34.586,14.586l-13.57,13.586l-5.602-5.586l-2.828,2.828l8.434,8.414l16.395-16.414L34.586,14.586z"></path>
//   </svg>`

    // eventlistener for toggling between cards
    bankCard.addEventListener("click",()=>{
        putBankIntoLocal(item);
        proceedButton.disabled=false;
        proceedButton.classList.remove("disabled");
        let allCards= document.querySelectorAll(".bank-card");
        bankCard.classList.add('selected');
        allCards.forEach((otherCard)=>{
            if(otherCard.dataset.id!=item.id){
                otherCard.classList.remove('selected');
            }
        })
    })

    //images of bank
    let img = document.createElement("img");
    img.src=item.image;
    img.alt=item.title
    img.className="bank-logo"

    //append imag in bankcard wrapper
    bankCard.append(img);

    return bankCard;
}

// function to append created card into our DOM
function appendData(data){
    // wrapper.innerHTML=""
    data.forEach((item)=>{
        wrapper.append(createCard(item));
    })
}

//put our bank in local storage
function putBankIntoLocal(data){
    localStorage.setItem("bank",JSON.stringify(data));
}

// eventlistener to close
closeButton.addEventListener("click",()=>{
    detailsWrapper.classList.toggle("hidden");
});

//iffe to disable the button on each refresh
(function(){proceedButton.disabled=true})();

proceedButton.addEventListener("click",()=>{
    console.log("click");
    detailsWrapper.classList.toggle("hidden");
})

// operations on submit data
submitFormButton.addEventListener("click",()=>{
    // addUser();
})

//add Users in db 
async function addUser(){
    try{
        let userData = {
            id:userDetails.id,
            firstName:userDetails.firstName,
            lastName:userDetails.lastName,
            password:userDetails.password,
            email:userDetails.email,
            phone:userDetails.phone,
            bankDetails:{
                passbookId:userDetails.bankDetails.passbookId,
                bankName:bankDetails.name,
                image:bankDetails.image,
                cardNumber:"",
                accountNumber:confirmAccountNumberInput.value,
                ifscCode:ifscInput.value,
                branch:branchInput.value
            }
        }
        let res = await fetch(`${userUrl}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userData)
        })
    }
    catch(error){
        console.log(error);
    }
}

// check input data
function checkInputData(){

}