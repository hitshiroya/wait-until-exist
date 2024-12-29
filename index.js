/**
 * Waits until an element specified by a selector exists in the DOM.
 * @param {string} selector - The selector to find the element.
 * @param {number} [remainingAttempts=10] - The number of retry attempts before giving up.
 * @returns {Cypress.Chainable<JQuery>} The found element.
 * @throws {Error} Throws an error if the element is not found after the specified number of attempts.
 */
function waitUntilElementExist(selector, remainingAttempts = 10) {
    let $element = Cypress.$(selector);

    // If the element exists, return it immediately
    if ($element.length) {
        return $element;
    }

    // If there are remaining attempts, retry
    if (remainingAttempts > 0) {
        cy.log(`${selector} not found yet. Remaining attempts: ${remainingAttempts}`);

        // Requesting the page to reload (F5)
        cy.reload();

        // Wait a second for the server to respond and the DOM to be present
        return cy.wait(1000).then(() => {
            // Recursively call the function, decrementing remainingAttempts
            return waitUntilElementExist(selector, remainingAttempts - 1);
        });
    }

    // If all attempts are exhausted, throw an error
    throw new Error(`${selector} not found.`);
}

module.exports = waitUntilElementExist;
