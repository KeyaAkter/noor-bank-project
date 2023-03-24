"use strict";

/////////////////////////////////////////////////////////////
// Data
/////////////////////////////////////////////////////////////

const accounts = [
  {
    owner: "Tanisha Tanvin",
    movements: [2500, 500, -750, 1200, 3200, -1500, 500, 1200, -1750, 1800],
    interestRate: 1.5, // %
    password: 1998,
    movementsDates: [
      "2021-11-18T21:31:17.178Z",
      "2021-12-23T07:42:02.383Z",
      "2022-01-28T09:15:04.904Z",
      "2022-04-01T10:17:24.185Z",
      "2022-07-08T14:11:59.604Z",
      "2022-09-09T17:01:17.194Z",
      "2022-09-12T23:36:17.929Z",
      "2022-09-23T12:51:31.398Z",
      "2022-09-27T06:41:26.190Z",
      "2022-09-28T08:11:36.678Z",
    ],
    currency: "USD",
    locale: "en-US",
  },

  {
    owner: "Taimur Rahman",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -300, 1500, -1850],
    interestRate: 1.3, // %
    password: 2022,
    movementsDates: [
      "2021-12-11T21:31:17.671Z",
      "2021-12-27T07:42:02.184Z",
      "2022-01-05T09:15:04.805Z",
      "2022-02-14T10:17:24.687Z",
      "2022-03-12T14:11:59.203Z",
      "2022-05-16T17:01:17.392Z",
      "2022-08-25T23:36:17.522Z",
      "2022-09-27T12:51:31.491Z",
      "2022-09-29T06:41:26.394Z",
      "2022-09-30T08:11:36.276Z",
    ],
    currency: "AUD",
    locale: "en-AU",
  },
  {
    owner: "Tahmina Akter Tanni",
    movements: [4500, 400, -1500, -590, -3010, 800, 8500, -300, -1500, 1950],
    interestRate: 1.3, // %
    password: 1997,
    movementsDates: [
      "2021-12-11T21:31:17.671Z",
      "2021-12-27T07:42:02.184Z",
      "2022-01-05T09:15:04.805Z",
      "2022-02-14T10:17:24.687Z",
      "2022-03-12T14:11:59.203Z",
      "2022-05-16T17:01:17.392Z",
      "2022-08-20T23:36:17.522Z",
      "2022-09-26T12:51:31.491Z",
      "2022-09-27T06:41:26.394Z",
      "2022-09-29T08:11:36.276Z",
    ],
    currency: "EUR",
    locale: "en-GB",
  },
];

/////////////////////////////////////////////////////////////
// ELEMENTS
/////////////////////////////////////////////////////////////

const labelNav = document.querySelector("nav");
const labelLogoMsg = document.querySelector(".welcome-logo");
const labelMsg = document.querySelector(".login-msg");
const labelWelcome = document.querySelector(".welcome");
const labelLogo = document.querySelector(".logo");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance-value");
const labelSumIn = document.querySelector(".summary-value-in");
const labelSumOut = document.querySelector(".summary-value-out");
const labelSumInterest = document.querySelector(".summary-value-interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login-btn");
const btnTransfer = document.querySelector(".form-btn-transfer");
const btnLoan = document.querySelector(".form-btn-loan");
const btnClose = document.querySelector(".form-btn-close");
const btnSort = document.querySelector(".btn-sort");

const inputLoginUsername = document.querySelector(".login-input-username");
const inputLoginPassword = document.querySelector(".login-input-password");
const inputTransferTo = document.querySelector(".form-input-to");
const inputTransferAmount = document.querySelector(".form-input-amount");
const inputLoanAmount = document.querySelector(".form-loan-amount");
const inputCloseUsername = document.querySelector(".form-input-username");
const inputClosePassword = document.querySelector(".form-input-password");

///////////////////////////////////////////////////////////////
// CREATE USERNAMES
///////////////////////////////////////////////////////////////

function creatUserNames(accounts) {
  accounts.forEach((account) => {
    account.username = account.owner
      .toLowerCase()
      .split(" ")
      .map((word) => word.at(0))
      .join("");
  });
}
creatUserNames(accounts);

///////////////////////////////////////////////////////////////
// DAYS CALCULATION
///////////////////////////////////////////////////////////////

function formatMoveDate(date, locale) {
  const calculateDays = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (24 * 60 * 60 * 1000));

  const daysPassed = calculateDays(new Date(), date);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

///////////////////////////////////////////////////////////////
// FORMATTING CURRENCIES
///////////////////////////////////////////////////////////////

function formatCurrency(value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
}

///////////////////////////////////////////////////////////////
// UPDATE NAVBAR
///////////////////////////////////////////////////////////////

function updatedNav() {
  labelNav.style.justifyContent = "space-between";
  labelLogoMsg.style.flexDirection = "row-reverse";
  labelLogoMsg.style.justifyContent = "space-between";
  labelLogoMsg.style.gap = "50rem";
  labelLogo.style.height = "6rem";
}

///////////////////////////////////////////////////////////////
// UPDATE UI
///////////////////////////////////////////////////////////////

function updateUI(currentAccount) {
  // DISPLAY MOVEMENTS
  displayMovements(currentAccount);

  // DISPLAY BALANCE
  displayBalance(currentAccount);

  // DISPLAY SUMMARY
  displaySummary(currentAccount);
}

///////////////////////////////////////////////////////////////
// IMPLEMENTING LOGIN
///////////////////////////////////////////////////////////////

let currentAccount, timer;

btnLogin.addEventListener("click", function (event) {
  event.preventDefault();
  currentAccount = accounts.find(
    (account) => account.username === inputLoginUsername.value
  );

  if (currentAccount?.password === Number(inputLoginPassword.value)) {
    setTimeout(() => {
      // UPDATE NAV
      updatedNav();

      // DISPLAY WELCOME MESSAGE
      labelMsg.textContent = `Welcome Back, ${currentAccount.owner
        .split(" ")
        .at(0)}`;
      labelMsg.style.color = "#159947";

      // ADD CURRENT DATE & TIME
      const now = new Date();

      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };

      labelDate.textContent = new Intl.DateTimeFormat(
        currentAccount.locale,
        options
      ).format(now);

      // RESET LOGOUT TIMER
      if (timer) clearInterval(timer);
      timer = logOut();

      // DISPLAY UI
      containerApp.style.opacity = 1;
      updateUI(currentAccount);
    }, 3000);
  } else {
    setTimeout(() => {
      // UPDATE NAV
      updatedNav();

      // DISPLAY WARNING MESSAGE
      labelMsg.textContent = "Login Failed!";
      labelMsg.style.color = "#f6bd60";

      // HIDE UI
      containerApp.style.opacity = 0;
    }, 3000);
  }

  // CLEAR INPUT FIELDS
  inputLoginUsername.value = inputLoginPassword.value = "";
  inputLoginPassword.blur();
});

///////////////////////////////////////////////////////////////
// DISPLAY MOVEMENTS
///////////////////////////////////////////////////////////////

function displayMovements(account, sort = false) {
  containerMovements.innerHTML = "";

  const moves = sort
    ? account.movements.slice(0).sort((a, b) => a - b)
    : account.movements;

  moves.forEach((move, i) => {
    const type = move > 0 ? "deposits" : "withdrawals";

    const formattedMove = formatCurrency(
      move,
      account.locale,
      account.currency
    );

    const date = new Date(account.movementsDates[i]);
    const displayDate = formatMoveDate(date, account.locale);

    const html = `
        <div class="movements-row">
          <div class="movements-type ${type}">${i + 1} ${type}</div>
          <div class="movements-date">${displayDate}</div>
          <div class="movements-value">${formattedMove}</div>
        </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
}

///////////////////////////////////////////////////////////////
// DISPLAY BALANCE
///////////////////////////////////////////////////////////////

function displayBalance(account) {
  account.balance = account.movements.reduce((acc, move) => acc + move, 0);

  labelBalance.textContent = formatCurrency(
    account.balance,
    account.locale,
    account.currency
  );
}

///////////////////////////////////////////////////////////////
// DISPLAY SUMMARY
///////////////////////////////////////////////////////////////

function displaySummary(account) {
  //INCOMES
  const incomes = account.movements
    .filter((move) => move > 0)
    .reduce((acc, deposit) => acc + deposit, 0);

  labelSumIn.textContent = formatCurrency(
    incomes,
    account.locale,
    account.currency
  );

  //OUTCOMES
  const outcomes = account.movements
    .filter((move) => move < 0)
    .reduce((acc, withdrawal) => acc + withdrawal, 0);

  labelSumOut.textContent = formatCurrency(
    Math.abs(outcomes),
    account.locale,
    account.currency
  );

  //INTERESTS
  const interest = account.movements
    .filter((move) => move > 0)
    .map((deposit) => (deposit * account.interestRate) / 100)
    .filter((interest) => interest >= 1)
    .reduce((acc, interest) => acc + interest, 0);

  labelSumInterest.textContent = formatCurrency(
    interest,
    account.locale,
    account.currency
  );
}

///////////////////////////////////////////////////////////////
// IMPLEMENTING TRANSFERS
///////////////////////////////////////////////////////////////

btnTransfer.addEventListener("click", function (event) {
  event.preventDefault();

  const receiverAccount = accounts.find(
    (account) => account.username === inputTransferTo.value
  );

  const amount = Number(inputTransferAmount.value);

  // CLEAR INPUT FIELDS
  inputTransferTo.value = inputTransferAmount.value = "";
  inputTransferAmount.blur();

  if (
    amount > 0 &&
    amount <= currentAccount.balance &&
    receiverAccount &&
    currentAccount.username !== receiverAccount.username
  ) {
    setTimeout(() => {
      // TRANSFER MONEY
      currentAccount.movements.push(-amount);
      receiverAccount.movements.push(amount);

      // ADD TRANSFER DATE & TIME
      currentAccount.movementsDates.push(new Date().toISOString());
      receiverAccount.movementsDates.push(new Date().toISOString());

      // UPDATE UI
      updateUI(currentAccount);

      // DISPLAY SUCCESS MESSAGE
      labelMsg.textContent = "Transaction Successful!";
      labelMsg.style.color = "#159947";
    }, 3000);

    // RESET LOGOUT TIMER
    if (timer) clearInterval(timer);
    timer = logOut();
  } else {
    setTimeout(() => {
      // DISPLAY WARNING MESSAGE
      labelMsg.textContent = "Transaction Failed!";
      labelMsg.style.color = "#f6bd60";
    }, 3000);

    // RESET LOGOUT TIMER
    if (timer) clearInterval(timer);
    timer = logOut();
  }
});

///////////////////////////////////////////////////////////////
// IMPLEMENTING LOAN
///////////////////////////////////////////////////////////////

btnLoan.addEventListener("click", function (event) {
  event.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((move) => move >= amount * 0.1)
  ) {
    setTimeout(() => {
      // ADD POSITIVE MOVEMENTS INTO CURRENT ACCOUNT
      currentAccount.movements.push(amount);

      // ADD CURRENT DATE & TIME
      currentAccount.movementsDates.push(new Date().toISOString());

      // UPDATE UI
      updateUI(currentAccount);

      // DISPLAY SUCCESS MESSAGE
      labelMsg.textContent = "Successful Loan!";
      labelMsg.style.color = "#159947";
    }, 3000);

    // RESET LOGOUT TIMER
    if (timer) clearInterval(timer);
    timer = logOut();
  } else {
    setTimeout(() => {
      // DISPLAY WARNING MESSAGE
      labelMsg.textContent = "Unsuccessful Loan!";
      labelMsg.style.color = "#f6bd60";
    }, 3000);

    // RESET LOGOUT TIMER
    if (timer) clearInterval(timer);
    timer = logOut();
  }

  // CLEAR INPUT FIELDS
  inputLoanAmount.value = "";
  inputLoanAmount.blur();
});

///////////////////////////////////////////////////////////////
// CLOSE ACCOUNT
///////////////////////////////////////////////////////////////

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.password === Number(inputClosePassword.value)
  ) {
    const index = accounts.findIndex(
      (account) => account.username === currentAccount.username
    );

    setTimeout(() => {
      // DELETE ACCOUNT
      accounts.splice(index, 1);

      // HIDE UI
      containerApp.style.opacity = 0;

      // DISPLAY SUCCESS MESSAGE
      labelMsg.textContent = "Account Deleted!";
      labelMsg.style.color = "#159947";
    }, 3000);

    // RESET LOGOUT TIMER
    if (timer) clearInterval(timer);
    timer = logOut();
  } else {
    setTimeout(() => {
      // DISPLAY WARNING MESSAGE
      labelMsg.textContent = "Delete Is Not Acceptable!";
      labelMsg.style.color = "#f6bd60";
    }, 3000);

    // RESET LOGOUT TIMER
    if (timer) clearInterval(timer);
    timer = logOut();
  }

  // CLEAR INPUT FIELDS
  inputCloseUsername.value = inputClosePassword.value = "";
  inputClosePassword.blur();
});

///////////////////////////////////////////////////////////////
// SORTING
///////////////////////////////////////////////////////////////

let sortedMove = false;

btnSort.addEventListener("click", function (e) {
  e.preventDefault();

  displayMovements(currentAccount, !sortedMove);
  sortedMove = !sortedMove;
});

///////////////////////////////////////////////////////////////
// IMPLEMENTING LOGOUT TIMER
///////////////////////////////////////////////////////////////

function logOut() {
  labelTimer.textContent = "";

  let time = 120; // 120s = 2min

  const clock = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}: ${sec}`;

    if (time === 0) {
      clearInterval(timer);

      // DISPLAY LOGOUT MESSAGE
      labelMsg.textContent = "You've been logged out!";
      labelMsg.style.color = "#f6bd60";

      // UPDATE UI
      containerApp.style.opacity = 0;
    }
    time--;
  };

  clock();

  timer = setInterval(clock, 1000);

  return timer;
}

///////////////////////////////////////////////////////////////
// COPYRIGHT YEAR
///////////////////////////////////////////////////////////////

document.querySelector(".copyright-year").textContent =
  new Date().getFullYear();
