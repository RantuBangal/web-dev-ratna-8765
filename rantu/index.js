let baseUrl = `https://mockserver-aq5n.onrender.com`;
let passbookUrl = `${baseUrl}/passbook`;
let userUrl = `${baseUrl}/users`;
let profilePicture = document.getElementById("profile-picture")
let passbookArray = document.querySelector(".transactions-wrapper");
let userName = document.querySelector("#user-name");
let totalBalance = document.querySelector(".total-balance-amount");
let passbookData;
let userData = JSON.parse(localStorage.getItem("user"));
let addToWallet = document.getElementById("wallet");


function appendToDOM(customers) {
    passbookArray.innerHTML = "";
    // let h3 = document.createElement("h3");
    // h3.id = "transaction";
    // h3.innerText = "Transactions";
    // passbookArray.append(h3);
    for(let i=customers.length-1; i>=customers.length-3 && i>-1; i--){
        let customer1 = singleCard(customers[i]);
        passbookArray.append(customer1)
    }
}


function singleCard(item) {
    let singleCard = document.createElement("div");
    singleCard.className = "singlecustomer";

    let imageBox = document.createElement("div")
    imageBox.className = "image_r";

    let image = document.createElement("img")
    image.src = "https://as2.ftcdn.net/v2/jpg/00/75/13/25/1000_F_75132523_xkLZqbPQkUvVzWSftTf3nAGBjBFkcKuP.jpg"
    image.alt = "customer";
    imageBox.append(image)

    let customerDetail = document.createElement("div");
    customerDetail.className = "customerDetails"

    let customerStatus = document.createElement("div");
    customerStatus.classList.add("name_status", "common");

    let name = document.createElement("h5");
    name.className = "h5";
    name.innerText = item.from ? item.from : userData.firstName ;

    let status = document.createElement("p");
    if(item.type === "debit"){
        status.innerText = `${item.title} to ${item.recipient}`;
    }else{
        status.innerText = `${item.title} from ${item.from}`;
    }
    customerStatus.append(name, status)

    let ammountBox = document.createElement("div");
    ammountBox.classList.add("amount", "common");

    let amount = document.createElement("h5")
    amount.className = "dollar";
    if (item.type === 'credit') {
        amount.innerText = `+$${item.amount} `
        amount.style.color = 'green'
    } else {
        amount.innerText = `-$${item.amount} `
        amount.style.color = 'red'
    }

    let date = document.createElement("p");
    date.innerText = item.date;
    ammountBox.append(amount, date)

    customerDetail.append(customerStatus, ammountBox)
    singleCard.append(imageBox, customerDetail)

    return singleCard
}

async function fetchData(id) {
    try {
        let res = await fetch(`${passbookUrl}/${id}`);
        let data = await res.json();
        passbookData = data;
        if(passbookData.transactions.length === 0){
            printEmpty();
        }else{
            appendToDOM(passbookData.transactions);
        }
        // appendToDOM(passbookData.transactions);
        profilePictureChange(userData)
        totalBalanceDynamic(passbookData);

        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
fetchData(userData.id);

function printEmpty(){
    return passbookArray.innerText = `No transactions yet!`;
}

function userCardDynamic(item){
    userName.innerText = `${item.firstName} ${item.lastName}.`;
}
userCardDynamic(userData);


function totalBalanceDynamic(item){
    console.log(item)
    totalBalance.innerText = `$${item.amount}.00`;
}

function profilePictureChange(userData){
    console.log(userData.userImage);
    profilePicture.src=`${userData.userImage}`
};

addToWallet.addEventListener("click", ()=>{
    localStorage.setItem("wallet", JSON.stringify(true));
})