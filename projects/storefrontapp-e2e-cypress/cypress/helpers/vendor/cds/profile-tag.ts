export const profileTagHelper = {
  interceptProfileTagJs(contentWindow) {
    const oldAppendChild = contentWindow.document.head.appendChild;
    contentWindow.document.head.appendChild = <T extends Node>(newChild): T => {
      if (
        newChild &&
        (<HTMLScriptElement>(<any>newChild)).src &&
        (<HTMLScriptElement>(<any>newChild)).src.indexOf('profile-tag') !== -1
      ) {
        return newChild;
      }
      return oldAppendChild(newChild);
    };
  },
  triggerLoaded() {
    cy.window().then(win => {
      const event = new CustomEvent('profiletag_loaded');
      win.dispatchEvent(event);
    });
  },
  triggerConsentReferenceLoaded() {
    cy.window().then(win => {
      const event = new CustomEvent('profiletag_consentReferenceLoaded', {
        detail: { consentReference: profileTagHelper.testCr },
      });
      win.dispatchEvent(event);
    });
  },
  waitForCMSComponents(timeout = 5000) {
    cy.get('cx-profiletag', { timeout });
  },
  testCr: '123-1bc',
  profileTagScriptResponse: {},
};
