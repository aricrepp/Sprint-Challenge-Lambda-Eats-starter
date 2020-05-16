/* global cy */
describe("Testing our form inputs", () => {
    beforeEach(function() {
        cy.visit("http://localhost:3000");
    })

    //pulling url from beforeEach
    it("Input name into the name input", () => {
        //Arrange - Get the element
        //Act - Mimic user interaction
        //Assert - Test / Verify
       
        cy.get('#pizza').click()
        cy.get('#sizes').select('Medium')
        cy.get('#sauces').select('Pesto')
        cy.get('#extra')
        .type("Please leave the pizza at my door")
        .should("have.value", "Please leave the pizza at my door")

        cy.get("form").submit();

        cy.get('.users')
        .should('exist')
        
    });
});