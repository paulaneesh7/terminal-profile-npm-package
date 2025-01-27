const chalk = require('chalk');
const boxen = require('boxen');
const figlet = require('figlet');

const createHeader = (name) => {
    return chalk.magenta(
        figlet.textSync(name, {
            font: 'Standard',
            horizontalLayout: 'full'
        })
    );
};

const createBox = (content) => {
    return boxen(content, {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'blue'
    });
};

const displayProjects = (projects) => {
    console.clear();
    console.log(chalk.blue.bold('\n🚀 My Top Projects\n'));

    projects.forEach((project, index) => {
        console.log(chalk.blue(`${index + 1}. ${project.name}`));
        console.log(chalk.white(project.description));
        console.log(chalk.cyan(`🔗 ${project.link}\n`));
    });

    console.log(chalk.gray('Tip: Use cmd/ctrl + click to open the links directly\n'));
};

const displayTip = () => {
    console.log(chalk.gray('\nTip: Use'), chalk.magenta('cmd/ctrl + click'), chalk.gray('to open links directly\n'));
};

module.exports = {
    createHeader,
    createBox,
    displayProjects,
    displayTip
};
