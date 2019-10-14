export function clickOnConfigureButton() {
  cy.get('cx-configure-product a').click({ force: true });
}

export function verifyConfigurationPageIsDisplayed() {
  cy.get('cx-config-form').should('be.visible');
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
