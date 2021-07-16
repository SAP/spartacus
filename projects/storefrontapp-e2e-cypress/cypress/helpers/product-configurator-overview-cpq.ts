/**
 * Verifies whether the group header displayed.
 */
export function checkGroupHeaderDisplayed(
  groupName: string,
  groupIdx: number
): void {
  cy.get('cx-configurator-overview-form .cx-group h2')
    .eq(groupIdx)
    .should('contain.text', groupName);
}

/**
 * Verifies whether the group header is not displayed.
 */
export function checkGroupHeaderNotDisplayed(groupName: string): void {
  cy.get('cx-configurator-overview-form .cx-group').should(
    'not.contain.text',
    groupName
  );
}

/**
 * Verifies whether the attribute name and value are displayed at the given position.
 */
export function checkAttrDisplayed(
  attributeName: string,
  valueName: string,
  attributeIdx: number
): void {
  cy.get(
    'cx-configurator-cpq-overview-attribute, cx-configurator-overview-attribute'
  )
    .eq(attributeIdx)
    .within(() => {
      cy.log('Attribute name: ' + attributeName);
      if (attributeName) {
        cy.get('.cx-attribute-label').should('contain.text', attributeName);
      } else {
        cy.get('.cx-attribute-label').should('not.be.visible');
      }
      cy.log('Value name: ' + valueName);
      cy.get('.cx-value-info, .cx-attribute-value').should(
        'contain.text',
        valueName
      );
    });
}

/**
 * Verifies whether the attribute price is displayed at the given position.
 */
export function checkAttrPriceDisplayed(
  priceString: string,
  attributeIdx: number
): void {
  cy.get(
    'cx-configurator-cpq-overview-attribute, cx-configurator-overview-attribute'
  )
    .eq(attributeIdx)
    .within(() => {
      if (priceString) {
        cy.get('cx-configurator-price').should('contain.text', priceString);
      } else {
        cy.get('cx-configurator-price').should('not.be.visible');
      }
    });
}

/**
 * Verifies whether the attribute name and value are displayed at the given position.
 */
export function checkAttrType(
  attributeType: 'product' | 'simple',
  attributeIdx: number
): void {
  const expected =
    attributeType === 'product' ? 'have.class' : 'not.have.class';
  cy.get('.cx-attribute-value-pair')
    .eq(attributeIdx)
    .should(expected, 'bundle');
}
