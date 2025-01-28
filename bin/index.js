#!/usr/bin/env node

const chalk = require('chalk');
const open = require('open');

// Import data
const projects = require('../src/data/projects');
const links = require('../src/data/links');

// Import utilities
const { createHeader, createBox, displayTip } = require('../src/utils/display');

// Import menus
const mainMenu = require('../src/menus/mainMenu');
const projectsMenu = require('../src/menus/projectsMenu');

// Bio
const bio = chalk.italic('A Digital Alchemist forging code into reality with pure chaos and creativity');

// Create the content
const content = `
    ${bio}

    ${chalk.gray('Twitter:')}  ${chalk.magenta(links.twitter)}
    ${chalk.gray('GitHub:')}   ${chalk.green(links.github)}
    ${chalk.gray('Web:')}      ${chalk.cyan(links.web)}
`;

const handleAnswer = async (answer) => {
    switch(answer.action) {
        case 'projects':
            await projectsMenu(projects, links, main);
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
        // Clear console and show header
        console.clear();
        console.log(createHeader('Aneesh Paul'));

        // Show main content box
        console.log(createBox(content));

        // Show tip
        displayTip();

        // Show menu and handle selection
        const answer = await mainMenu();
        await handleAnswer(answer);
        
        // If we haven't exited, show the menu again
        main();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

// Start the app
main();
