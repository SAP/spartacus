import { verifyProductDetails } from '../../../helpers/product-details';

const DEFAULT_SCRIPT_LOCATION = '/assets/qualtricsIntegration.js';

function injectDummyScript(): void {
  cy.document().then((doc) => {
    const qualtricsScript = doc.createElement('script');
    qualtricsScript.type = 'text/javascript';
    qualtricsScript.src = DEFAULT_SCRIPT_LOCATION;
    doc.getElementsByTagName('head')[0].appendChild(qualtricsScript);
  });
}

context('Qualtrics integration', () => {
  let loadSpy: Cypress.Agent<sinon.SinonSpy>;
  let runSpy: Cypress.Agent<sinon.SinonSpy>;
  const mockQsiJsApi = {
    API: {
      unload: (): void => {},
      load: () => {
        return {
          done: (_intercept: Function) => {},
        };
      },
      run: (): void => {},
    },
  };

  beforeEach(() => {
    cy.visit('/product/266685');
  });

  after(() => {
    // cleanup the QSI API
    cy.window().then((win) => (win['QSI'] = undefined));
    // cleanup the dummy script
    cy.document().then((doc) => {
      const scriptNode = doc.querySelector(
        `script[src="${DEFAULT_SCRIPT_LOCATION}"]`
      );
      scriptNode.parentNode.removeChild(scriptNode);
    });
  });

  describe(`when 'qsi_js_loaded' event is fired`, () => {
    beforeEach(() => {
      verifyProductDetails();
      injectDummyScript();

      cy.window().then((win) => {
        win['QSI'] = mockQsiJsApi;

        loadSpy = cy.spy(win['QSI'].API, 'load');
        runSpy = cy.spy(win['QSI'].API, 'run');
      });

      cy.window().then((win) => win.dispatchEvent(new Event('qsi_js_loaded')));
    });
    it('should call the QSI API load() and run() functions', () => {
      expect(loadSpy).to.have.been.called;
      expect(runSpy).to.have.been.called;
    });
  });
});
