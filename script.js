const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const form = document.getElementById("form");
const list = document.getElementById("list");
const btn = document.getElementById("btn");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// const dummyTransactions = [
//   { id: 1, text: "Flower", amount: -20 },
//   { id: 2, text: "Salary", amount: 300 },
//   { id: 3, text: "Book", amount: -10 },
//   { id: 4, text: "Camera", amount: 150 },
// ];

// let transactions = dummyTransactions;

let transactions = [

];

function savedata(){
    localStorage.getItem("transaction");
}

function updatelocalstorage(){
    localStorage.setItem("transactions", transactions);
}





function addTransaction(e){
    e.preventDefault();
    if(text.value.trim()==='' || amount.value.trim()===''){
        alert("Please enter a text and value");
    }
    else{
        const transaction = {
            id:generateID(),
            text:text.value,
            amount:+amount.value
        }

        transactions.push(transaction);
        addTransactionDOM(transaction);
        updatelocalstorage();
        updateValues();
        text.value = "";
        amount.value = "";
    }
    savedata();
}

function generateID(){
    return Math.floor(Math.random() * 100000000);
}


function addTransactionDOM(transaction){
    const sign = transaction.amount < 0 ? "-" : "+" ;
    const item = document.createElement("li");

    item.classList.add(
        transaction.amount < 0 ? "minus" : "plus" 
    );

    item.innerHTML = `
    ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick = "removetransaction(${
    transaction.id})">X</button>
    `;
    list.appendChild(item);
}

function removetransaction(id){
    transactions = transactions.filter(transaction => transaction.id !== id);
    Init();
    updatelocalstorage();
    savedata();
}


function updateValues(){
    const amounts = transactions.map(
        (transaction)=>transaction.amount
    );
    const total = amounts.reduce((acc,item) => (acc+=item),0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc,item) => (acc+=item),0).toFixed(2);
    const expense =  ( amounts.filter(item => item<0).reduce((acc,item) => (acc+=item), 0) * -1 ).toFixed(2);
    balance.innerText=`$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
    savedata();

}


function Init(){
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
}
Init();
form.addEventListener("submit", addTransaction);
savedata();














