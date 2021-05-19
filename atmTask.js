// 2. ATM
// Asks for action "Please tell me what to do": + | -
// Asks for amount "How much? "
// Print out current ballance "Current ballance is: 100"
import { accessSync, readFileSync, writeFileSync } from "fs";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const filePath = `${process.cwd()}/atmBalance.json`;

const changeBalance = (action, enteredMoney) => {
  try {
    accessSync(filePath);
    let currentMoney = JSON.parse(readFileSync(filePath, "utf8"));

    if (action === "+") {
      const newMoneyAmount =
        parseInt(currentMoney.balance) + parseInt(enteredMoney); // convert into number
      currentMoney.balance = JSON.stringify(newMoneyAmount); // put new value into json file object, convert it into string
      writeFileSync(filePath, JSON.stringify(currentMoney)); // overwrite new value into json file
      console.log(`Current account balanse is: ${currentMoney.balance} Eur`);
    } else if (action === "-") {
      currentMoney.balance = JSON.stringify(
        parseInt(currentMoney.balance) - parseInt(enteredMoney)
      );
      writeFileSync(filePath, JSON.stringify(currentMoney));
      console.log(`Current account balanse is: ${currentMoney.balance} Eur`);
    } else {
      console.log(`Please choose correct action: + or -`);
    }
  } catch (err) {
    console.error("Something went wrong", err);
  }
};

let currentMoney = JSON.parse(readFileSync(filePath, "utf8"));
console.log(`Your balance is: ${currentMoney.balance}`);

rl.question("Please enter action + or - : ", (answer) => {
  rl.question("Please enter money amount: ", (answer2) => {
    changeBalance(answer, answer2);
    rl.close();
  });
});
