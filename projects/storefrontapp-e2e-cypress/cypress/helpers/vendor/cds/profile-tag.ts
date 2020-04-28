import { clickAllowAllFromBanner } from '../../../helpers/anonymous-consents';

export const profileTagHelper = {
  interceptProfileTagJs(contentWindow) {
    const oldAppendChild = contentWindow.document.head.appendChild;
    contentWindow.document.head.appendChild = function (newChild) {
      if (
        newChild &&
        (<HTMLScriptElement>(<any>newChild)).src &&
        (<HTMLScriptElement>(<any>newChild)).src.indexOf('profile-tag') !== -1
      ) {
        return newChild;
      }
      return oldAppendChild.call(this, newChild);
    };
  },
  profileTagScriptResponse: {},
};

export function grantConsent() {
  cy.route('POST', '/consent/*/consentReferences').as(
    'consentReferenceCreation'
  );
  clickAllowAllFromBanner();
  cy.wait('@consentReferenceCreation');
}
