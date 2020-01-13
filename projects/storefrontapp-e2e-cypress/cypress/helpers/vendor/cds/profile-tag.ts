export const ProfileTagHelper = {
  assertPageViewEvent(xhr: Cypress.WaitXHR) {
    expect(xhr.requestHeaders['consent-reference']).not.be.undefined;
    expect(xhr.requestBody).not.be.undefined;
    expect(xhr.requestBody);
  },
};
