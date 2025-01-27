const chalk = require('chalk');
const inquirer = require('inquirer');
const open = require('open');
const { displayProjects } = require('../utils/display');

const projectsMenu = async (projects, links, main) => {
    displayProjects(projects);
    
    const choices = [
        ...projects.map((project, index) => ({
            name: `Visit ${project.name}`,
            value: `visit_${index}`
        })),
        {
            name: `${chalk.blue('📂')} View more projects`,
            value: 'more'
        },
        {
            name: `${chalk.red('←')} Back to main menu`,
            value: 'back'
        }
    ];

    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: '💡 What would you like to do?',
            choices
        }
    ]);

    if (answer.action === 'back') {
        console.clear();
        return main();
    } else if (answer.action === 'more') {
        await open(links.github);
        return projectsMenu(projects, links, main);
    } else {
        const projectIndex = parseInt(answer.action.split('_')[1]);
        await open(projects[projectIndex].link);
        return projectsMenu(projects, links, main);
    }
};

module.exports = projectsMenu;
