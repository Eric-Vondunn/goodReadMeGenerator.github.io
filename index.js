

// initial variables
const axios = require("axios");
const path = require('path');
const inquirer = require("inquirer");
const fs = require('fs');


//asynchronous function
async function main(){
    console.log(`Begin`);


    //array of questions for user input
    const questionsForUserInput = await inquirer
    .prompt([
        {
            type: "input",
            message: "What is your GitHub username?",
            name: "userName"
        },
        {
            type: "input",
            message: "What the title of your project?",
            name: "projectTitle"
        },
        {
            type: "input",
            message: "Enter a detailed description of the project in question",
            name: "projectDesc"
        },
        {
            type: "input",
            message: "Please provide the steps required to run this program",
            name: "installSteps"
        },
        {
            type: "input",
            message: "Please provide detailed instructions for future users",
            name: "userInstruction"
        },
        {
            type: "input",
            message: "Please provide any relevant examples for clarity",
            name: "userInstructionExamples"
        },
        {
            type: "input",
            message: "Please provide the applicable license name",
            name: "projectLicense"
        },
        {
            type: "input",
            message: "Please provide the applicable license url",
            name: "projectLicenseUrl"
        },
      
        {
            type: "input",
            message: "Please provide examples on how to run tests.",
            name: "testExamples"
        }
        ]);



        console.log(`Generating`);
        console.log(questionsForUserInput);
        let userName = questionsForUserInput.userName;
        let projectTitle = questionsForUserInput.projectTitle;
        let projectDesc = questionsForUserInput.projectDesc;
        let installSteps = questionsForUserInput.installSteps;
        let userInstruction = questionsForUserInput.userInstruction;
        let userInstructionExamples = questionsForUserInput.userInstructionExamples;
        let projectLicense = questionsForUserInput.projectLicense;
        let projectLicenseUrl = questionsForUserInput.projectLicenseUrl;
        let testExamples = questionsForUserInput.testExamples;
            

        let gitHubResponse = await axios.get(`https://api.github.com/users/${userName}`);
        let gitHubData = gitHubResponse.data;
        let gitHubName = gitHubData.login;
        let gitHubEmail = gitHubData.email;
        let gitHubUrl = gitHubData.html_url;
        


    //final read me output 
        let readMeOutPut = (`
# ${projectTitle} 
${projectDesc}
\n* [Installation](#Installation)
\n* [Instructions](#Instructions)
\n* [License](#License)
\n* [Author](#Author)
\n* [Tests](#Tests)
## Installation
${installSteps}
## Instructions
${userInstruction}
\`\`\`
${userInstructionExamples}
\`\`\`
## License 
This project is licensed under ${projectLicense} - URL ${projectLicenseUrl}
## Tests
${testExamples}
## Author 
\n**${gitHubName}**
\nEmail: ${gitHubEmail}
\nGitHub: ${gitHubUrl}
`)

let writeResult = fs.writeFileSync(path.join(__dirname, '../GoodReadMeGenerator', 'readMe.md'), readMeOutPut )
console.log("Complete!")
    }
main();



