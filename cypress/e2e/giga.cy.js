describe("Login", () => {
    it("should log in the user", () => {
        cy.visit("http://localhost:5500/index.html");
        cy.get('.text-end button[data-auth="login"]').click();
        cy.get('#loginModal').within(() => {
            cy.get('#loginForm').within(() => {
                cy.get('#loginEmail').type('jonnet01270@stud.noroff.no');
                cy.get("#loginPassword").type("password");
            });
            cy.get('button[type="submit"]').click();
        })
        cy.url().should('include', 'profile&name=');
    });
    it('should give me invalid login message', () => {
        cy.visit("http://localhost:5500/index.html");
        cy.get('.text-end button[data-auth="login"]').click();
        cy.get('#loginModal').within(() => {
            cy.get('#loginForm').within(() => {
                cy.get('#loginEmail').type('jonnet01270@stud.noroff.no');
                cy.get("#loginPassword").type("wrongpassword");
            });
            cy.get('button[type="submit"]').click();
        });
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.equal('Either your username was not found or your password is incorrect');
        })
    });
    it('should log me out', () => {
        cy.visit("http://localhost:5500/index.html");
        cy.get('.text-end button[data-auth="login"]').click();
        cy.get('#loginModal').within(() => {
            cy.get('#loginForm').within(() => {
                cy.get('#loginEmail').type('jonnet01270@stud.noroff.no');
                cy.get("#loginPassword").type("password");
            });
            cy.get('button[type="submit"]').click();
        })
        cy.url().should('include', 'profile&name=');
        cy.get('button[data-auth="logout"]').click();
    });
});