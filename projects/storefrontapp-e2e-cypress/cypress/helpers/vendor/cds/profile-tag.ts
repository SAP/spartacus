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
      cy.log('dispatching event');
      const event = new CustomEvent('profiletag_loaded');
      win.dispatchEvent(event);
    });
  },

  profileTagScriptResponse: {},
};
