"use strict";

// Data

const account1 = {
  name: "Test-1",
  email: "testacc1@gmail.com",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  password: "test-1",
};

const account2 = {
  name: "Test-2",
  email: "testacc2@gmail.com",
  movements: [405, 304, -290, -654, 2134, -500],
  password: "test-2",
};

const account3 = {
  name: "Test-3",
  email: "testacc3@gmail.com",
  movements: [403, -102, -445, 120, 30, 1, -6.5],
  password: "test-3",
};

const account4 = {
  name: "Test-4",
  email: "testacc4@gmail.com",
  movements: [100, -20, 4.5, 140, 504, 103, 50, 1, 25, -5, 4.65],
  password: "test-4",
};

const allAccounts = [account1, account2, account3, account4];
let i = 3;
// Retrieving Acc
const Email = document.querySelector(".login--user");
const Password = document.querySelector(".login--password");

// Signing Up (Modal)
// const modal = document.querySelector(".modal");
const signUp = document.querySelector(".modal-sign-up");
const modalName = document.querySelector(".modal-name");
const modalEmail = document.querySelector(".modal-email");
const modalPassword = document.querySelector(".modal-password");
const modalError = document.querySelector(".error-insert");
console.log(modalError);

signUp.addEventListener("click", function (e) {
  e.preventDefault();
  const newaccount = {
    name: modalName.value,
    email: modalEmail.value,
    movements: [10],
    password: modalPassword.value,
  };

  if (newaccount.email.includes("@") && newaccount.password.length > 5) {
    modalError.innerHTML = "";
    modal.classList.toggle("hidden");
    modalBackground.classList.toggle("hidden");
    allAccounts.push(newaccount);
    console.log(allAccounts);
    return newaccount;
  }
  const html = `<div class="modal-error">
    <p class="text-main">The Form was Filled Out Incorrectly</p>
    ${
      newaccount.email.includes("@")
        ? ""
        : '<p class="text-main">There is no @ in the email</p>'
    }
    ${
      newaccount.password.length > 5
        ? ""
        : '<p class="text-main">Your Password is too small</p>'
    }
  </div>`;
  modalError.innerHTML = html;
});

// Display Movements
const movementRow = document.querySelector(".movement-row");
console.log(movementRow);

function displayMovements(movements) {
  movementRow.innerHTML = "";

  movements.forEach(function (mov, index) {
    const type = mov > 0 ? "deposit" : "withdrawl";
    const html = `<div class="movement-item">
  <span class="movement-${type}">${index + 1} ${type}</span>
  <p class="text-main">${mov}$</p>
</div>`;

    movementRow.insertAdjacentHTML("afterbegin", html);
  });
}

// Calculating All
const movementNums = document.querySelector(".movements-nums");
const movementPos = document.querySelector(".movements-positive");
const movementNeg = document.querySelector(".movements-negative");
console.log(movementNums);
function calcSummaryDisplay(account) {
  const all_movements = account.movements.reduce(function (acc, cur, i, arr) {
    return acc + cur;
  });

  const pos_movements = account.movements.reduce(function (acc, cur, i, arr) {
    if (cur > 0) {
      return acc + cur;
    } else {
      return acc + 0;
    }
  });
  let neg_movements = 0;
  for (const mov of account.movements) {
    if (mov < 0) {
      neg_movements += mov;
    }
  }
  movementNums.textContent = `${all_movements}$`;
  movementPos.textContent = `${pos_movements}$`;
  movementNeg.textContent = `${neg_movements * -1}$`;
}

// UpdateUI function

function UpdateUI(acc) {
  calcSummaryDisplay(acc);
  displayMovements(acc.movements);
}
// Logging In
const btnLogin = document.querySelector(".login--btn");
const loginUser = document.querySelector(".login--user");
const loginPassword = document.querySelector(".login--password");
const app = document.querySelector(".app");
const UserName = document.querySelector(".app-balance");

// request limit has to be defined here
let requestAllowed;
let currentAccount;
btnLogin.addEventListener("click", function (e) {
  console.log("login has been clicked");
  e.preventDefault();

  for (const item of allAccounts) {
    if (
      loginUser.value === item.email &&
      loginPassword.value === item.password
    ) {
      console.log(`the user has been logged in`);

      app.classList.remove("hidden");

      // Setting the current account equal to the account in array
      currentAccount = item;
      UserName.textContent = item.name;
      console.log(currentAccount);

      // clearing input field
      loginUser.value = "";
      loginPassword.value = "";
      UpdateUI(currentAccount);

      // requestAllowed and reseting requestLimit
      requestAllowed = 0;
      for (const mov of currentAccount.movements) {
        requestAllowed += mov;
      }
      requestAllowed *= 0.1;
      requestLimit.innerHTML = "";
      requestError.innerHTML = "";
      // Action reset
      appAction.innerHTML = "";
      break;
    } else {
      console.log("not logged in");
    }
  }
});

// Transferring
const transferTo = document.querySelector(".transfer-user");
const transferAmount = document.querySelector(".transfer-amount");
const transferBtn = document.querySelector(".operation-transfer");
const transferError = document.querySelector(".transfer-error");

transferBtn.addEventListener("click", function (e) {
  e.preventDefault();

  // Set Transfer-Error to empty
  transferError.innerHTML = "";

  // obtaining transfer values
  const transferName = transferTo.value;
  const amount = Number(transferAmount.value);
  console.log(amount);

  const transferAcc = allAccounts.find(function (acc) {
    return acc.name === transferName;
  });

  // checking if valid
  if (
    amount >= 0.01 &&
    transferAcc &&
    transferAcc?.name !== currentAccount.name &&
    amount <
      currentAccount.movements.reduce(function (acc, mov, i) {
        return acc + mov;
      })
  ) {
    transferAcc.movements.push(amount);
    currentAccount.movements.push(amount * -1);
    displayActions("transfer", amount, undefined, currentAccount, transferAcc);
    UpdateUI(currentAccount);
  } else {
    transferError.innerHTML =
      "<p>There is an Error In This Form, Please Check info again!</p>";
  }

  transferTo.value = "";
  transferAmount.value = "";
});

// Requesting Loan
const requestBtn = document.querySelector(".operation-request");
const requestAmount = document.querySelector(".request-input");
const requestLimit = document.querySelector(".request-limit");
const requestError = document.querySelector(".request-error");

requestBtn.addEventListener("click", function (e) {
  e.preventDefault();

  requestError.innerHTML = "";
  requestLimit.innerHTML = "";
  let amount = Number(requestAmount.value);

  if (amount > 0.01 && amount && amount !== NaN && requestAllowed !== 0) {
    if (requestAllowed <= amount) {
      // If amount requested is higher than request amount limit, then it will add
      // the rest of the request limit to the movements
      currentAccount.movements.push(requestAllowed);

      UpdateUI(currentAccount);
      displayActions("request", requestAllowed, 0, currentAccount);
      requestAllowed = 0;

      requestLimit.innerHTML = `<p>Maximum Request Limit Reached</p>`;
      requestAmount.innerHTML = "";
      return 0;
    }

    requestAllowed -= amount;
    console.log(requestAllowed);
    currentAccount.movements.push(amount);
    UpdateUI(currentAccount);
    displayActions("request", amount, requestAllowed, currentAccount);
  } else {
    console.log(`hello`);
    requestError.innerHTML =
      "<p>Request Unable to Be Completed, Check for Errors.</p>";
  }
  requestAmount.innerHTML = "";
});

// all Movements In Account
const appAction = document.querySelector(".actions");

function displayActions(type, amount, requestlim, currentAcc, acc2) {
  if (type === "transfer") {
    const html = `<div class="action-item">
    <p>${currentAcc.name} has commited a transfer to ${acc2.name} of $${amount}</p>
  </div>`;
    appAction.insertAdjacentHTML("afterbegin", html);
  }

  if (type === "request") {
    console.log(`this is a request`);
    const html = `<div class="action-item">
    <p>${currentAcc.name} has requested $${amount}. Remaining amount allowed to request: $${requestlim}</p>
  </div>`;
    appAction.insertAdjacentHTML("afterbegin", html);
  }
}
