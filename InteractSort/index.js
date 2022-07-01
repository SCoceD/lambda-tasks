import {ASK_ENTER_WORDS, ASK_WHAT_DO_WITH} from "./constants/constants.js";
import readline from "readline";
import {wordByName} from "./functions/WordByName.js";
import {digitFromSmallest} from "./functions/DigitFromSmallest.js";
import {digitFromBiggest} from "./functions/DigitFromBiggest.js";
import {wordByQuantityOfLetters} from "./functions/WordByQuantityOfLeters.js";
import {uniqueWords} from "./functions/OnlyUniqueWords.js";
import {uniqueValues} from "./functions/UniqueValues.js";

const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    }
)
let input = [];
const start = () =>
    rl.question(ASK_ENTER_WORDS, line1 => {
        if (line1 === 'exit') rl.close();
        input = line1.split(' ');
        rl.question(ASK_WHAT_DO_WITH, (line2) => {
            switch (line2) {
                case 'exit':
                    rl.close();
                    break
                case '1':
                    wordByName(input);
                    break;
                case '2':
                    digitFromSmallest(line1);
                    break;
                case '3':
                    digitFromBiggest(line1);
                    break;
                case '4':
                    wordByQuantityOfLetters(input);
                    break;
                case '5':
                    uniqueWords(input);
                    break;
                case '6':
                    uniqueValues(input);
                    break;
                default:
                    console.log("Wrong command");
            }
            start();
        })
    });
start();

rl.on('close', function () {
    console.log('\nBYE BYE !!!');
    process.exit(0);
});
