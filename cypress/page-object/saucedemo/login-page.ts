export class LoginPage {

    InvalidUser(userName: string, password: string) {
        cy.title().should('include', 'Swag Labs');

            cy.get('#root > div > div.login_logo').should('be.visible').should('have.text', 'Swag Labs');

            cy.get(`[data-test="username"]`).type(userName);
            cy.get(`[data-test="password"]`).type(password);

            cy.get(`[data-test="login-button"]`).should('be.enabled').click();

            //Expect Result
            cy.get(`[data-test="error"]`).should('have.text', 'Epic sadface: Username and password do not match any user in this service');
    }
}