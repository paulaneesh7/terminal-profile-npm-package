#!/usr/bin/env node

const chalk = require('chalk');
const boxen = require('boxen');
const figlet = require('figlet');
const inquirer = require('inquirer');
const open = require('open');

// Create the header
console.clear();
console.log(
    chalk.magenta(
        figlet.textSync('Aneesh Paul', {
            font: 'Standard',
            horizontalLayout: 'full'
        })
    )
);

// Personal information
const bio = chalk.italic('A code-crafting enthusiast who turns ideas into digital reality');

const links = {
    twitter: 'https://twitter.com/vincenzo7v2',
    github: 'https://github.com/paulaneesh7',
    web: 'https://paulaneesh7.in/',
    email: 'aneesh16117@gmail.com'
};

// Projects data
const projects = [
    {
        name: 'Stayz',
        description: 'Developing a hotel booking app enabling users to discover and reserve accommodations, with a unique feature allowing users to list their own properties for rent.',
        link: 'https://stayz.vercel.app/'
    },
    {
        name: 'PolyConverse',
        description: 'PolyConverse is a cutting-edge AI-based language translation application designed to bridge the gap between different languages, fostering seamless communication across the globe.',
        link: 'https://polyconverse.paulaneesh7.in/'
    },
    {
        name: 'SummAIze',
        description: 'SummAIze is a powerful AI-based content summarization tool that allows you to quickly generate concise summaries of lengthy articles, blogs, and web content. Say goodbye to information overload and save time with SummAIze!',
        link: 'https://sumze.vercel.app/'
    }
];

// Create the content
const content = `
    ${bio}

    ${chalk.gray('Twitter:')}  ${chalk.magenta(links.twitter)}
    ${chalk.gray('GitHub:')}   ${chalk.green(links.github)}
    ${chalk.gray('Web:')}      ${chalk.cyan(links.web)}
`;

// Create the box
console.log(
    boxen(content, {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'blue'
    })
);

// Display projects
const displayProjects = () => {
    console.clear();
    console.log(chalk.blue.bold('\n🚀 My Top Projects\n'));

    projects.forEach((project, index) => {
        console.log(chalk.blue(`${index + 1}. ${project.name}`));
        console.log(chalk.white(project.description));
        console.log(chalk.cyan(`🔗 ${project.link}\n`));
    });

    console.log(chalk.gray('Tip: Use cmd/ctrl + click to open the links directly\n'));
};

// Projects submenu
const projectsMenu = async () => {
    displayProjects();
    
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
        return projectsMenu();
    } else {
        const projectIndex = parseInt(answer.action.split('_')[1]);
        await open(projects[projectIndex].link);
        return projectsMenu();
    }
};

// Tip for users
console.log(chalk.gray('\nTip: Use'), chalk.magenta('cmd/ctrl + click'), chalk.gray('to open links directly\n'));

// Interactive menu
const questions = [
    {
        type: 'list',
        name: 'action',
        message: '🚀 What would you like to do?',
        choices: [
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
        ]
    }
];

const handleAnswer = async (answer) => {
    switch(answer.action) {
        case 'projects':
            await projectsMenu();
            break;
        case 'portfolio':
            await open(links.web);
            break;
        case 'email':
            await open(`mailto:${links.email}`);
            break;
        case 'github':
            await open(links.github);
            break;
        case 'exit':
            console.log(chalk.yellow('\nThanks for stopping by! 👋\n'));
            process.exit(0);
    }
};

const main = async () => {
    try {
        const answer = await inquirer.prompt(questions);
        await handleAnswer(answer);
        // If we haven't exited, show the menu again
        main();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

// Start the interactive menu
main();
