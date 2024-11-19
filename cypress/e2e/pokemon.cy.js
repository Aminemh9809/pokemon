// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('localhost:5173')
//   })
// })

describe('Pokemon Card Finder', () => {
  it('should display "Searching..." when loading', () => {
    cy.visit('localhost:5173'); // Adjust this if needed
    
    // cy.get('input[placeholder="search"]').type('Pikachu');
    
    // // Click the button to trigger loading
    // cy.get('[data-testid="search-button"]').click();

    

    // // Check that the button shows "Searching..."
    // cy.get('[data-testid="search-button"]').should('contain', 'Searching...');

    // // to check if cards appearing !
    // cy.get('.card-item').should('have.length.greaterThan', 0);
    // to check if the text appears
    cy.contains('il n’y a pas de résultat').should('not.exist');

    // Write an invalid search term
    cy.get('input[placeholder="search"]').type('INVALID_SEARCH');

    // Trigger the search
    cy.get('button[data-testid="search-button"]').click();

    // Verify that "no results" message appears
    cy.contains('il n’y a pas de résultat').should('exist');

  });
});
