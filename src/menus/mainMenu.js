const chalk = require('chalk');
const inquirer = require('inquirer');
const open = require('open');

const mainMenuChoices = [
    {
        name: `${chalk.blue('📂')} View my Projects`,
        value: 'projects'
    },
    {
        name: `${chalk.cyan('🌐')} Visit my Portfolio`,
        value: 'portfolio'
    },
    {
        name: `${chalk.green('📧')} Send me an Email`,
        value: 'email'
    },
    {
        name: `${chalk.magenta('🐙')} Check out my GitHub`,
        value: 'github'
    },
    {
        name: `${chalk.red('🚪')} Exit`,
        value: 'exit'
    }
];

const mainMenu = async () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: '🚀 What would you like to do?',
            choices: mainMenuChoices
        }
    ]);
};

module.exports = mainMenu;
