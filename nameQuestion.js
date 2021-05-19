// 1. Task
// Print out the name ex: "The curent name is: Jānis"
// Ask for a new name: "Please enter a new name: " (enters "Anna")
// Print out the name ex: "The new name is: Anna"
// exit
import { accessSync, readFileSync, writeFileSync } from "fs";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const filePath = `${process.cwd()}/currentName.json`;

const storeData = (nameToAsk) => {
  try {
    accessSync(filePath);
    decodedObject.name = nameToAsk;
    writeFileSync(filePath, JSON.stringify(decodedObject));
    console.log(`The new name is: ${decodedObject.name}`);
  } catch (err) {
    console.error("something went wrong", err);
  }
};

const jsonObject = readFileSync(filePath, "utf8");
const decodedObject = JSON.parse(jsonObject); // json object have to be decoded!
console.log(`The previous name was: ${decodedObject.name}`);

rl.question("Please enter a new name: ", (answer) => {
  storeData(answer);
  rl.close(); // readline closes the input, goes out from module
});
