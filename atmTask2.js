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

try {
  const filePath = `${process.cwd()}/atmBalance.json`;
  accessSync(filePath);
  const currentMoney = readFileSync(filePath, "utf8");
  let currentMoneyDecoded = JSON.parse(currentMoney);
  console.log(`Your balance is: ${currentMoneyDecoded.balance}`);

  rl.question("Enter action + or - : ", (action) => {
    if (action !== "+" && action !== "-") {
      console.log(`Please choose correct action: + or -`);
      return rl.close();
    }
    rl.question("Enter amount of money: ", (moneyAmount) => {
      if (action === "+") {
        currentMoneyDecoded.balance += parseInt(moneyAmount);
      } else {
        currentMoneyDecoded.balance -= parseInt(moneyAmount);
      }
      console.log(`Current account balance is: ${currentMoneyDecoded.balance}`);
      writeFileSync(filePath, JSON.stringify(currentMoneyDecoded));
      rl.close();
    });
  });
} catch (error) {
  console.error("There was an error: ", error);
  rl.close();
}
