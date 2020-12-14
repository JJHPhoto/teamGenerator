const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeList = [];

//Ask for manager info: name, id, email, office number.
function askForManagerInfo() {
  return inquirer
    .prompt([
      {
        message: "What is your name?",
        name: "name",
        type: "input",
      },
      {
        message: "What is your ID?",
        name: "id",
        type: "input",
      },
      {
        message: "What is your email?",
        name: "email",
        type: "input",
      },
      {
        message: "What is your office number?",
        name: "officeNumber",
        type: "input",
      },
    ])
    .then((managerData) => {
      const newManager = new Manager(
        managerData.name,
        managerData.id,
        managerData.email,
        managerData.officeNumber
      );
      console.log(newManager);

      employeeList.push(newManager);
      // writeHTMLFile();
      //Restart here!
      askForEmployeeRole();
    });
}

//Ask user for next employee type: 3 options(engineer, intern, no more team members)

function askForEmployeeRole() {
  return inquirer
    .prompt([
      {
        message: "What is your role?",
        name: "role",
        type: "list",
        choices: ["Engineer", "Intern", "No more employees needed"],
      },
    ])
    .then((answer) => {
      console.log(answer.role);
      if (answer.role === "Engineer") {
        askForEngineerInfo();
      }
      if (answer.role === "Intern") {
        askForInternInfo();
      }
      if (answer.role === "No more employees needed") {
        writeHTMLFile();
      }
    });
}

//After adding engineer
//Ask user for engineer info (name, id, email, github)
function askForEngineerInfo() {
  return inquirer
    .prompt([
      {
        message: "What is your full name?",
        name: "name",
        type: "input",
      },
      {
        message: "What is your ID?",
        name: "id",
        type: "input",
      },
      {
        message: "What is your email?",
        name: "email",
        type: "input",
      },
      {
        message: "What is your Github?",
        name: "github",
        type: "input",
      },
    ])
    .then((engineerData) => {
      const newEngineer = new Engineer(
        engineerData.name,
        engineerData.id,
        engineerData.email,
        engineerData.github
      );
      employeeList.push(newEngineer);
      askForEmployeeRole();
    });
}
//After adding intern
//Ask user for intern info (name, id, email, school)
function askForInternInfo() {
  return inquirer
    .prompt([
      {
        message: "What is your name?",
        name: "name",
        type: "input",
      },
      {
        message: "What is your ID?",
        name: "id",
        type: "input",
      },
      {
        message: "What is your email?",
        name: "email",
        type: "input",
      },
      {
        message: "What school did you go to?",
        name: "school",
        type: "input",
      },
    ])
    .then((internData) => {
      const newIntern = new Intern(
        internData.name,
        internData.id,
        internData.email,
        internData.school
      );
      employeeList.push(newIntern);
      askForEmployeeRole();
    });
}

askForManagerInfo();

function writeHTMLFile() {
  const createHTML = render(employeeList);

  fs.writeFile(outputPath, createHTML, (err) => {
    if (err) throw err;

    // console.log(employeeList);
  });
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
