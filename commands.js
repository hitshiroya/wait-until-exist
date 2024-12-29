// commands.js
const waitUntilExist = require('./index');

Cypress.Commands.add('waitUntilExist', (selector, timeout = 30000) => {
    return waitUntilExist(selector, timeout);
});
