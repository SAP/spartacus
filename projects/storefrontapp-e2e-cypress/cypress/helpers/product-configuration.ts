const nextGroupButtonSelector =
  'cx-config-previous-next-buttons div div:last button';
const previousGroupButtonSelector =
  'cx-config-previous-next-buttons div div:first button';

export function clickOnConfigureButton() {
  cy.get('cx-configure-product a').click({ force: true });
}

export function clickOnNextGroupButton() {
  cy.get(nextGroupButtonSelector).click({
    force: true,
  });
}

export function clickOnPreviousGroupButton() {
  cy.get(previousGroupButtonSelector).click({
    force: true,
  });
}

export function verifyConfigurationPageIsDisplayed() {
  cy.get('cx-config-form').should('be.visible');
}

export function verifyPreviousGroupButtonIsEnabled() {
  cy.get(previousGroupButtonSelector).should('be.not.disabled');
}

export function verifyPreviousGroupButtonIsDisabled() {
  cy.get(previousGroupButtonSelector).should('be.disabled');
}

export function verifyNextGroupButtonIsEnabled() {
  cy.get(nextGroupButtonSelector).should('be.not.disabled');
}

export function verifyNextGroupButtonIsDisabled() {
  cy.get(nextGroupButtonSelector).should('be.disabled');
}

export function verifyAttributeIsDisplayed(
  attributeName: string,
  uiType: string
) {
  const attributeId = getAttributeId(attributeName, uiType);
  cy.get(`#${attributeId}`).should('be.visible');
}

export function verifyAttributeIsNotDisplayed(
  attributeName: string,
  uiType: string
) {
  const attributeId = getAttributeId(attributeName, uiType);
  cy.get(`#${attributeId}`).should('be.not.visible');
}

export function verifyAttributeValueIsDisplayed(
  attributeName: string,
  uiType: string,
  valueName: string
) {
  const attributeId = getAttributeId(attributeName, uiType);
  const valueId = `${attributeId}--${valueName}`;
  cy.get(`#${valueId}`).should('be.visible');
}

export function verifyAttributeValueIsNotDisplayed(
  attributeName: string,
  uiType: string,
  valueName: string
) {
  const attributeId = getAttributeId(attributeName, uiType);
  const valueId = `${attributeId}--${valueName}`;
  cy.get(`#${valueId}`).should('be.not.visible');
}

export function getAttributeId(attributeName: string, uiType: string) {
  return `cx-config--${uiType}--${attributeName}`;
}

export function selectAttribute(
  attributeName: string,
  uiType: string,
  valueName: string,
  value?: string
) {
  const attributeId = getAttributeId(attributeName, uiType);
  const valueId = `${attributeId}--${valueName}`;

  switch (uiType) {
    case 'radioGroup':
      cy.get(`#${valueId}`).click({ force: true });
      break;
    case 'dropdown':
      cy.get(`#${attributeId} ng-select`).ngSelect(valueName);
      return;

    case 'input':
      cy.get(`#${valueId}`)
        .clear()
        .type(value);
  }
}

export function verifyGroupMenuIsDisplayed() {
  cy.get('cx-config-group-menu').should('be.visible');
}

export function verifyGroupMenuIsNotDisplayed() {
  cy.get('cx-config-group-menu').should('not.be.visible');
}

export function verifyCategoryNavigationIsDisplayed() {
  cy.get('cx-category-navigation').should('be.visible');
}

export function verifyCategoryNavigationIsNotDisplayed() {
  cy.get('cx-category-navigation').should('not.be.visible');
}

export function verifyTotalPrice(formattedPrice) {
  cy.get('.cx-price-summary-total-price .cx-summary-amount').should($div => {
    expect($div).to.contain(formattedPrice);
  });
}

export function clickOnGroup(groupIndex: number) {
  cy.get('.cx-config-menu-item')
    .eq(groupIndex)
    .children('a')
    .click({ force: true });
}

export function clickHamburger() {
  cy.get('cx-hamburger-menu [aria-label="Menu"]').click();
}

export function verifyHamburgerIsDisplayed() {
  cy.get('cx-hamburger-menu [aria-label="Menu"]').should('be.visible');
}
