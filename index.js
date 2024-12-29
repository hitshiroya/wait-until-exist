// index.js
function waitUntilExist(selector, timeout = 30000) {
    const startTime = Date.now();

    return cy.then(() => {
        function checkExistence() {
            const $element = Cypress.$(selector);

            if ($element.length) {
                // Element found, return the jQuery object.
                return cy.wrap($element);
            }

            if (Date.now() - startTime > timeout) {
                // Timeout exceeded, throw an error.
                throw new Error(`Element not found: ${selector} within ${timeout}ms`);
            }

            // Log and retry after waiting for 1 second.
            cy.log(`Element not found: ${selector}, retrying...`);
            return cy.wait(1000).then(checkExistence);
        }

        // Start the recursive check.
        return checkExistence();
    });
}

module.exports = waitUntilExist;
