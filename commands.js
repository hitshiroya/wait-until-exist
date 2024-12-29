// commands.js
import waitUntilExist from './index';

Cypress.Commands.add('waitUntilExist', (selector, attempts = 10) => {
    return waitUntilExist(selector, attempts);
});
