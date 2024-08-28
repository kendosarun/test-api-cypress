describe('template spec', () => {

  beforeEach(() => {

  });

    it('passes', () => {
      cy.visit('')

      cy.get('#APjFqb').type('cypress{enter}');
      cy.contains(/cypress.io/);
    })

  afterEach(() => {

  });
})