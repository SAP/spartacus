context('Outlets', () => {
  it('should work for templates', () => {
    cy.visit('test/outlet/template');
    cy.get('.ContentPage1Template').within($ContentPage1Template => {
      cy.wrap($ContentPage1Template.children()).should('have.length', 3);
      cy.get('p:nth-child(1)').should(
        'contain',
        'Before slot 1, slots: 2, template: ContentPage1Template, sections: null'
      );
      cy.get('p:nth-child(2)').should(
        'contain',
        'Replace slot 1, slots: 2, template: ContentPage1Template, sections: null'
      );
      cy.get('p:nth-child(3)').should(
        'contain',
        'After slot 1, slots: 2, template: ContentPage1Template, sections: null'
      );
    });
  });
  it('should work for slots', () => {
    cy.visit('test/outlet/slot');
    cy.get('.ContentPage1Template').within(() => {
      cy.get('.Section2A').within($Section2A => {
        cy.wrap($Section2A.children()).should('have.length', 3);
        cy.get('p:nth-child(1)').should(
          'contain',
          'Before slot 1, components: 1'
        );
        cy.get('p:nth-child(2)').should(
          'contain',
          'Replace slot 1, components: 1'
        );
        cy.get('p:nth-child(3)').should(
          'contain',
          'After slot 1, components: 1'
        );
      });
      cy.get('.Section2B').within($Section2B => {
        cy.wrap($Section2B.children()).should('have.length', 3);
        cy.get('p:nth-child(1)').should(
          'contain',
          'Before slot 2, components: 0'
        );
        cy.get('p:nth-child(2)').should(
          'contain',
          'Replace slot 2, components: 0'
        );
        cy.get('p:nth-child(3)').should(
          'contain',
          'After slot 2, components: 0'
        );
      });
    });
  });

  it('should work for components', () => {
    cy.visit('test/outlet/component');
    cy.get('.ContentPage1Template').within(() => {
      cy.get('.Section2A').within($Section2A => {
        cy.wrap($Section2A.children()).should('have.length', 3);
        cy.get('p:nth-child(1)').should(
          'contain',
          'Before component, uid: Paragraph1Component'
        );
        cy.get('p:nth-child(2)').should(
          'contain',
          'Replace component, uid: Paragraph1Component'
        );
        cy.get('p:nth-child(3)').should(
          'contain',
          'After component, uid: Paragraph1Component'
        );
      });
    });
  });

  it('should work on cxOutlet input template change', () => {
    cy.visit('test/outlet/template');
    cy.get('cx-test-outlet-template a').click();
    cy.get('.LandingPage2Template').within(() => {
      cy.get('h1').should('contain', 'TestOutletComponent');
      cy.get('a').click();
    });
    cy.get('.ContentPage1Template').within(() => {
      cy.get('h1').should('not.exist');
    });
  });
});
