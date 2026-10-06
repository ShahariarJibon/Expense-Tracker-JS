const buttons = document.querySelectorAll(".bottom-nav button");
const capsule = document.querySelector(".active-capsule");
const balance= document.getElementById("balance");
const addMoneyButton = document.querySelector(".addMoney");
const addButton = document.querySelector(".addButton");
const addModal = document.querySelector(".addModal");
const closeModalButton = document.getElementById("closeModal");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const submitButton = document.getElementById("submit");
const balanceModal = document.querySelector(".balanceModal");
const closeBalanceModalButton = document.getElementById("closeBalanceModal");
const addAmountInput = document.getElementById("addAmount");
const addSubmitButton = document.getElementById("addSubmit");
const transactionList = document.getElementById("transaction-list");
const moneyPlus=document.querySelector("#money-plus");
const moneyMinus=document.querySelector("#money-minus");
const deleteCheckboxes = document.querySelectorAll(".deleteCheckbox");
const deleteButton = document.querySelector(".deleteButton");
const statisticsButton = document.querySelector(".statsButton");
const statisticsModal = document.querySelector(".statsModal");
const homeButton = document.querySelector(".homeButton");
const dailyButton = document.getElementById("daily");
const weeklyButton = document.getElementById("weekly");
const monthlyButton = document.getElementById("monthly");
const dailyExpense = document.querySelector(".dailyExpense");
const weeklyExpense = document.querySelector(".weeklyExpense");
const monthlyExpense = document.querySelector(".monthlyExpense");
const mainSection = document.querySelector(".mainSection");
const burgerButton= document.querySelector(".fa-bars")
const burgerMenuModal=document.querySelector(".burgerMenuModal");
const mcontainer=document.querySelector(".mcontainer");
const infoButton= document.querySelector(".info");
const appInfo=document.querySelector(".appInfo");
const developerButton= document.querySelector(".developer");
const devProfile=document.querySelector(".devProfile");
const resetButton = document.getElementById("resetBtn"); 
const resetModal=document.querySelector(".resetModal");
const fres=document.getElementById("fres");
const threeDot=document.querySelector(".fa-ellipsis-v");
const threeDotModal=document.querySelector(".threeDotModal");
const threeDotPage=document.querySelector(".threeDotPage");
const clearBalance=document.querySelector(".clearBalance");
const clearHistory=document.querySelector(".clearHistory");
const chooseButton=document.querySelector(".chooseButton");
const HistoryIDButton=document.querySelector("#HistoryID");
const DeleteIDButton=document.querySelector("#deleteID");
const settingsButton=document.querySelector(".fa-cog");
const settingsModal=document.querySelector(".settingsModal");
const checkbox = document.getElementById("check");



let plus=0, minus=0;

function saveData() {
    const data = {
        balance: balance.textContent,
        transactions: transactionList.innerHTML,
        MP: moneyPlus.textContent,
        MM:moneyMinus.textContent

    };

    localStorage.setItem("expenseTracker", JSON.stringify(data));
}

function loadData() {
    const savedData = localStorage.getItem("expenseTracker");

    if (savedData) {
        const data = JSON.parse(savedData);

        balance.textContent = data.balance;
        transactionList.innerHTML = data.transactions;
        moneyPlus.textContent = data.MP;
        moneyMinus.textContent = data.MM;

        plus = parseFloat(data.MP.replace('+$', '')) || 0;
        minus = parseFloat(data.MM.replace('-$', '')) || 0;
    }
}


closeModalButton.addEventListener("click", () => {
    addModal.style.display = "none";
    mcontainer.style.display="revert";
    homeButton.click();
});

closeBalanceModalButton.addEventListener("click", () => {
    balanceModal.style.display = "none";
});

addSubmitButton.addEventListener("click", () => {
    const amount = parseFloat(addAmountInput.value);

    if (!isNaN(amount)) {
        const currentBalance =
        parseFloat(balance.textContent.replace('$', ''));

        const newBalance = currentBalance + amount;

        balance.textContent = `$${newBalance.toFixed(2)}`;
        plus+=parseFloat(addAmountInput.value);


        saveData();

        balanceModal.style.display = "none";
        addAmountInput.value = "";
    } else {
        alert("Please enter a valid amount.");
    }
    moneyPlus.textContent="+$"+plus;
    
});

function moveCapsule(button) {
    const buttonCenter =
        button.offsetLeft + button.offsetWidth / 2;

    const capsuleCenter = capsule.offsetWidth / 2;

    capsule.style.transform =
        `translateX(${buttonCenter - capsuleCenter}px)`;
}

buttons.forEach(button => {
    button.addEventListener("click", () => {

        buttons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        moveCapsule(button);
    });
});

moveCapsule(document.querySelector(".active"));

addMoneyButton.addEventListener("click", () => {
    balanceModal.style.display = "flex";

});

addButton.addEventListener("click", () => {
    statisticsModal.style.display = "none";
    addModal.style.display = "flex";
    mainSection.style.display="none";
    burgerMenuModal.style.display="none";
    threeDotModal.style.display="none";
    settingsModal.style.display="none";
    
});

submitButton.addEventListener("click", () => {
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (description && !isNaN(amount)) {

        const currentBalance =
            parseFloat(balance.textContent.replace('$', ''));

        balance.textContent =
            `$${(currentBalance - amount).toFixed(2)}`;

            minus-=parseFloat(amountInput.value);

            const currentDate = new Date().toISOString();

        transactionList.innerHTML += `
    <li class="transaction" data-date="${currentDate}">
        <input type="checkbox" class="deleteCheckbox">
        <span class="description">${description}</span>
        <span class="amount">$${amount.toFixed(2)}</span>
    </li>
`;

        saveData();

        addModal.style.display = "none";
        descriptionInput.value = "";
        amountInput.value = "";

    } else {
        alert("Please enter a valid description and amount.");
    }
    moneyMinus.textContent="-$"+minus;
    homeButton.click();
});


deleteCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            const transaction = checkbox.closest(".transaction");
            const amountText = transaction.querySelector(".amount").textContent;
            const amount = parseFloat(amountText.replace('$', ''));

            const currentBalance =
                parseFloat(balance.textContent.replace('$', ''));

            balance.textContent =
                `$${(currentBalance + amount).toFixed(2)}`;

                minus+=parseFloat(amount);

            transaction.remove();

            saveData();
        }
    });
});


function updateDeleteButton() {
    const checked = document.querySelectorAll(
        ".deleteCheckbox:checked"
    );

    const deleteButton = document.querySelector(".deleteButton");

    if (checked.length > 0) {
        deleteButton.classList.add("show");
    } else {
        deleteButton.classList.remove("show");
    }
}

transactionList.addEventListener("change", (e) => {
    if (e.target.classList.contains("deleteCheckbox")) {
        updateDeleteButton();
    }
});

deleteButton.addEventListener("click", () => {

    const selectedCheckboxes =
        document.querySelectorAll(".deleteCheckbox:checked");

    selectedCheckboxes.forEach(checkbox => {
        checkbox.closest(".transaction").remove();
    });

    saveData();

    updateDeleteButton();
});

statisticsButton.addEventListener("click", () => {
    updateStats(); 
    statisticsModal.style.display = "flex";
    burgerMenuModal.style.display="none";
    threeDotModal.style.display="none";
    settingsModal.style.display="none";
});

homeButton.addEventListener("click", () => {
    statisticsModal.style.display = "none";
    mainSection.style.display="revert";
    addModal.style.display = "none";
    burgerMenuModal.style.display="none";
    threeDotModal.style.display="none";
    settingsModal.style.display="none";
});


dailyButton.addEventListener("click", () => {
    dailyExpense.style.display = "flex";
    weeklyExpense.style.display = "none";
    monthlyExpense.style.display = "none";
});

weeklyButton.addEventListener("click", () => {
    dailyExpense.style.display = "none";
    weeklyExpense.style.display = "flex";
    monthlyExpense.style.display = "none";
});

monthlyButton.addEventListener("click", () => {
    dailyExpense.style.display = "none";
    weeklyExpense.style.display = "none";
    monthlyExpense.style.display = "flex";
});

function updateStats() {
    const transactions = document.querySelectorAll(".transaction");
    let dailyData = {}, weeklyData = {}, monthlyData = {};

    transactions.forEach(transaction => {
        const dateStr = transaction.getAttribute("data-date");
        if (!dateStr) return; 

        const date = new Date(dateStr);
        const amountText = transaction.querySelector(".amount").textContent;
        const amount = parseFloat(amountText.replace('$', ''));

        const dayKey = date.toISOString().split('T')[0];
        dailyData[dayKey] = (dailyData[dayKey] || 0) + amount;

        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthKey = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
        monthlyData[monthKey] = (monthlyData[monthKey] || 0) + amount;

        const currentDayDate = new Date(date);
        const firstDayOfWeek = new Date(currentDayDate.setDate(currentDayDate.getDate() - currentDayDate.getDay()));
        const lastDayOfWeek = new Date(currentDayDate.setDate(currentDayDate.getDate() + 6));
        const weekKey = `${firstDayOfWeek.toLocaleDateString()} - ${lastDayOfWeek.toLocaleDateString()}`;
        weeklyData[weekKey] = (weeklyData[weekKey] || 0) + amount;
    });

    const renderList = (dataObj, container, titleText) => {
        let html = `<p>${titleText}</p><ul style="list-style: none; padding: 0; width: 100%; margin-top: 15px;">`;
        for (let key in dataObj) {
            html += `
            <li style="display: flex; justify-content: space-between; padding: 10px 15px; border-bottom: 1px solid #ccc; width: 100%; box-sizing: border-box;">
                <span style="text-align: left;">${key}</span>
                <span style="text-align: right; margin-left: auto;">$${dataObj[key].toFixed(2)}</span>
            </li>`;
        }
        html += `</ul>`;
        container.innerHTML = html;
    };

    renderList(dailyData, dailyExpense, "Daily Expense");
    renderList(weeklyData, weeklyExpense, "Weekly Expense");
    renderList(monthlyData, monthlyExpense, "Monthly Expense");
}

let isClicked=false;
burgerButton.addEventListener("click",()=>{

    if(!isClicked){
    homeButton.click();
    burgerMenuModal.style.display="revert";
    isClicked=true;
    
    }else{
        burgerMenuModal.style.display="none";
        isClicked=false;
        appInfo.style.display="none";
        devProfile.style.display="none";
        resetModal.style.display="none";
    }
})

infoButton.addEventListener("click",()=>{
    devProfile.style.display="none";
    resetModal.style.display="none";
    appInfo.style.display="revert";
})

developerButton.addEventListener("click",()=>{
    appInfo.style.display="none";
    resetModal.style.display="none";
    devProfile.style.display="revert";
})

function resetApplication() {
    localStorage.removeItem("expenseTracker");

    plus = 0;
    minus = 0;

    balance.textContent = "$0.00";
    moneyPlus.textContent = "+$0.00";
    moneyMinus.textContent = "-$0.00";
    transactionList.innerHTML = "";

    statisticsModal.style.display = "none";
    burgerMenuModal.style.display = "none";
    isClicked = false;

}

resetButton.addEventListener("click", () => {
    
    appInfo.style.display="none";
    devProfile.style.display="none";
    resetModal.style.display="revert";

    fres.addEventListener("click",()=>{
        resetApplication();
    })
        
    
});

let isThreeDot=false;
threeDot.addEventListener("click",()=>{
    homeButton.click();
    if(!isThreeDot){
         threeDotModal.style.display="revert";
         isThreeDot=true;
    }else{
        threeDotModal.style.display="none";
        isThreeDot=false;
        chooseButton.textContent="";
        threeDotPage.style.display="none";
        currentMode="";
    }

})
let currentMode="";

clearBalance.addEventListener("click",()=>{
    chooseButton.textContent="Reset Balance";
    threeDotPage.style.display="revert";
    currentMode="clearBalance";
    
})

clearHistory.addEventListener("click",()=>{
    chooseButton.textContent="Reset History";
    threeDotPage.style.display="revert";
    currentMode="clearHistory";
})


chooseButton.addEventListener("click", () => {

    if(currentMode=="clearBalance"){
    localStorage.removeItem("expenseTracker");

    balance.textContent = "$0.00";
    moneyPlus.textContent = "+$0.00";
    moneyMinus.textContent = "-$0.00";
    
    transactionList.innerHTML = "";

    plus = 0;
    minus = 0;

    burgerMenuModal.style.display = "none";
    isClicked = false;
    statisticsModal.style.display = "none";
    mainSection.style.display = "revert";

    
    } else if(currentMode=="clearHistory"){
        transactionList.innerHTML = "";
    moneyMinus.textContent = "-$0.00";
    minus = 0;
    
    saveData();
    }


    threeDot.click();
});

settingsButton.addEventListener("click",()=>{
    addModal.style.display = "none";
    settingsModal.style.display="revert";
})

checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
        document.body.classList.add("dark-theme");
        localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.remove("dark-theme");
        localStorage.setItem("theme", "light");
    }
});

window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        checkbox.checked = true;
    }
});






loadData();

