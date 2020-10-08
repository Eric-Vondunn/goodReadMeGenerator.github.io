

// initial variables
let axios = require("axios");
let path = require('path');
let inquirer = require("inquirer");
let fs = require('fs');


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
        console.log(userResponse);
        let userName = userResponse.userName;
        let projectTitle = userResponse.projectTitle;
        let projectDesc = userResponse.projectDesc;
        let installSteps = userResponse.installSteps;
        let userInstruction = userResponse.userInstruction;
        let userInstructionExamples = userResponse.userInstructionExamples;
        let projectLicense = userResponse.licenseName;
        let projectLicenseUrl = userResponse.licenseUrl;
        let testExamples = userResponse.testExamples;
            

        let gitHubResponse = await axios.get(`https://api.github.com/users/${userName}`);
        let gitHubData = gitResponse.data;
        let gitHubName = gitData.login;
        let gitHubEmail = gitData.email;
        let gitHublocation = gitData.location;
        let gitHubUrl = gitData.html_url;
        


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
This project is licensed under the ${projectlicense} - see the ${projectLicenseUrl} file for details
## Tests
${testExamples}
## Author 
\n**${gitHubName}**
\nEmail: ${gitHubEmail}
\nLocation:${gitHublocation}
\nGitHub: ${gitHubUrl}
`)

let writeResult = fs.writeFileSync(path.join(__dirname, '../GoodReadMeGenerator', 'readMe.md'), readMeOutPut )
console.log("Complete!")
    }
main();



