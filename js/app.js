let login_label = document.querySelector('.login_label');
let popup = document.querySelector('.popup');
let left = document.querySelector('.left');
let closeForm = document.querySelector('.close');


let username = document.querySelector('.username');
let pin = document.querySelector('.pin');
let login_form = document.querySelector('.login_form');
let content = document.querySelector('.content');
let total_mov = document.querySelector('.total_mov');
let total_deposit = document.querySelector('.total_deposit');
let total_withdraw = document.querySelector('.total_withdraw');
let accountTest;

let trans_money_btn = document.querySelector('.trans_money_btn');
let amount = document.querySelector('.amount');
let transfare_to = document.querySelector('.transfare_to');



// Data
const account1 = {
    owner: 'Ali',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
    current: 5000
};



const account2 = {
    owner: 'Saja',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Joo',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah',
    movements: [430, 1000, 700, 50, 90, -200, 500],
    interestRate: 1,
    pin: 4444,

};
const accounts = [account1, account2, account3, account4]; // true account1


function display(selector, states) {
    if (states === 'show') {
        selector.classList.remove('hidden');
    } else {
        selector.classList.add('hidden');
    }
}

login_label.addEventListener('click', () => {
    display(popup, 'show');
    username.value = "";
    pin.value = "";
    transfare_to.value = "";
    amount.value = "";
});

closeForm.addEventListener('click', () => {
    display(popup, 'hidden');
});

login_form.addEventListener('click', () => {
    checkUser();
});



function checkUser() {
    let user_name = username.value;
    let user_pin = Number(pin.value);

    let checkUserCorrect = accounts.find((value) => {
        return value.owner === user_name;
    });

    if (checkUserCorrect != undefined) {
        if (checkUserCorrect.pin === user_pin) {
            display(popup, 'hidden');
            display(content, 'show');
            displayTotalMovements(checkUserCorrect);
            displayTotalDeposit(checkUserCorrect);
            displayTotalWithdraw(checkUserCorrect);
            displayMovements(checkUserCorrect);
            accountTest = checkUserCorrect;
        } else {
            alert('User name or pin is incorrect');
        }
    } else {
        alert('User name or pin is incorrect');
    }
}

function displayTotalMovements(account) {

    total_mov.textContent = account.movements.map((value) => Math.abs(value)).reduce((acc, curr) => acc + curr);
}

function displayTotalDeposit(account) {

    total_deposit.textContent = account.movements.filter((value) => value).reduce((acc, curr) => acc + curr);
}

function displayTotalWithdraw(account) {

    total_withdraw.textContent = account.movements.filter((value) => value < 0).reduce((acc, curr) => acc + curr);
}

function displayMovements(account) {
    left.innerHTML = "";
    account.movements.reverse().forEach((movement) => {
        let type = movement > 0 ? 'deposit' : 'withdraw';
        let htmlCode = `<div class="card type-${type}">
        <div class="${type}">${type}</div>
        <p class="mov">${movement}</p>
        </div>`
        left.insertAdjacentHTML("afterbegin", htmlCode);
    });
}

trans_money_btn.addEventListener("click", () => {
    transMoney(accountTest);
});

function transMoney(accountTest) {
    let user_name = transfare_to.value;
    let user_amount = Number(amount.value);

    let checkUserCorrect = accounts.find((value) => {
        return value.owner === user_name;
    });
    
    if (checkUserCorrect != undefined) {
        if (user_name != accountTest.owner) {
            if (user_amount != 0 && Number(total_deposit.textContent) >= user_amount) {
                accountTest.movements.push(-user_amount);
                checkUserCorrect.movements.push(user_amount);
                displayMovements(accountTest);
                displayTotalMovements(accountTest);
                displayTotalDeposit(accountTest);
                displayTotalWithdraw(accountTest);
                transfare_to.value = "";
                amount.value = "";
            } else {
                alert('Amount must be greater than zero and must be less or equal than Current Balance');
            }
        } else {
            alert('You can not transfer money to yourself');
        }
    } else {
        alert('User name incorrect');
    }
}




accounts.forEach((account) => {
    console.log(account.owner, account.pin);
});

