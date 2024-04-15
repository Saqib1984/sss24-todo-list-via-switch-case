import inquirer from "inquirer";
import chalk from "chalk";
// array
let todoList = [];
// function
let mainMenu = async () => {
    let { action } = await inquirer.prompt({
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: ["Add Task", "View Task", "Completed Task", "Delete Task", "Exit"],
    });
    switch (action) {
        case "Add Task":
            await add();
            break;
        case "View Task":
            view();
            break;
        case "Completed Task":
            await completed();
            break;
        case "Delete Task":
            await deleted();
            break;
        case "Exit":
            console.log(chalk.yellow.bold("Good Bye"));
            return;
    }
    mainMenu();
};
let add = async () => {
    let { task } = await inquirer.prompt({
        type: "input",
        name: "task",
        message: chalk.green.bold("Enter The Task"),
    });
    todoList.push({ task, completed: false });
    console.log(chalk.green.bold("Task added Successfully"));
};
let view = () => {
    console.log(chalk.yellow.bold("\t *** My TO DO List *** \t"));
    todoList.forEach((item, index) => {
        console.log(`(${index + 1}). ${item.task} ${item.completed ? chalk.green.bold("=>  Done [ \u2714 ]") : ""} `);
    });
    console.log(chalk.yellow.bold("\t *** THANK YOU  *** \t"));
};
let completed = async () => {
    let { index } = await inquirer.prompt({
        type: "number",
        name: "index",
        message: chalk.blue.bold("Enter the index of the task you want to mark as completed"),
    });
    if (index < 1 || index > todoList.length) {
        console.log(chalk.bgRed("Invalid Task Number. Please Try Again."));
        return;
    }
    todoList[index - 1].completed = true;
    console.log(chalk.green("Task Completed Successfully"));
};
let deleted = async () => {
    let { index } = await inquirer.prompt({
        type: "number",
        name: "index",
        message: chalk.red.bold("Enter the index of the task you want to delete"),
    });
    if (index < 1 || index > todoList.length) {
        console.log(chalk.bgRed("Invalid Task Number. Please Try Again."));
        return;
    }
    todoList.splice(index - 1, 1);
    console.log("Task Deleted Successfully");
};
mainMenu();
