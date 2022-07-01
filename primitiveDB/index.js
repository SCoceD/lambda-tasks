import inquirer from "inquirer";
import {PATH_TO_USERS_FILE} from "./src/constants/constants.js";
import fs from "fs";

const receiver = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Your Name',
            validate: (answer) => {
                if (answer === '') {
                    return false;
                }
                return true;
            }
        },
        {type: 'list', name: 'gender', message: 'Your gender', choices: ['male', 'female']},
        {type: 'input', name: 'age', message: 'Your age'}
    ]).then(answer => {
        const user = `\n{"name": "${answer.name}", "gender": "${answer.gender}", "age": "${answer.age}"}`;
        fs.appendFile(PATH_TO_USERS_FILE, user, (err) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log('done')
            }
        });
        receiver();
    })
}
receiver();
