import { getViewport } from '../helpers/viewport-context';
import { focusableSelectors, getNextFocusableElement } from './utils/a11y-tab';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Tab through the app
       *
       * @memberof Cypress.Chainable
       *
       * @example
        ```
        cy.pressTab()
        ```
       */
      pressTab: () => void;
      /**
       * Verifies use of the TAB key to iterate through elements on the page at the state this command is called.
       *
       * When this command is first called, it will fail the test and create a draft config file as indicated by the error message.
       *
       * It is up to the developer to verify elements of the page at the current state are accessible by the TAB key.
       *
       * Once verified, the developer can move the generated draft config file into the config folder for the test to pass this assertation.
       *
       * Upon any DOM change that might affect the accessibility of the keyboard at the asserted state, the test will fail and a new draft config will be generated to be verified once again.
       *
       * @memberof Cypress.Chainable
       */
      tabScreenshot: (config?: TabScreenshotConfig) => void;
    }
  }
}

Cypress.Commands.add('pressTab', () => {
  cy.document().then((document) => {
    const elements = Array.from(
      <NodeListOf<HTMLElement>>(
        document.querySelectorAll(focusableSelectors.join(','))
      )
    ).filter((element) => element.offsetParent !== null);

    const activeElementIndex = elements.indexOf(
      document.activeElement as HTMLElement
    );

    getNextFocusableElement(elements, activeElementIndex).focus();
  });
});

export interface TabScreenshotConfig {
  /**
   * Tag name for element in which to perform screenshot within.
   * @default 'body'
   */
  container: string;
  /**
   * Appended to file name to identify unique states in a test with multiple screenshots.
   */
  scenario?: string;
}

Cypress.Commands.add(
  'tabScreenshot',
  (config: TabScreenshotConfig = { container: 'body' }) => {
    const FILE_NAME = `${getViewport()}/${Cypress.spec.name}${
      config.scenario ? `-${config.scenario}` : ''
    }.json`;
    const DRAFT_FILE = `cypress/fixtures/a11y/tab/drafts/${FILE_NAME}`;
    const CONFIG_FILE = `cypress/fixtures/a11y/tab/configs/${FILE_NAME}`;
    const GENERATION_MESSAGE = `Draft generated at '${DRAFT_FILE}'. Verify with screenshots that keyboard accessibility is correct and move to '${CONFIG_FILE}' to pass assertion.`;

    cy.document().then((document) => {
      const focusable = Array.from(
        <NodeListOf<HTMLElement>>(
          document
            .getElementsByTagName(config.container)[0]
            .querySelectorAll(focusableSelectors.join(','))
        )
      )
        .filter((element) => element.offsetParent !== null)
        .map((el) => ({
          element: el.outerHTML,
          child: el.innerHTML,
        }));

      cy.task('readFile', CONFIG_FILE).then((file: string) => {
        if (file?.length) {
          const json = JSON.parse(file);
          if (JSON.stringify(json) === JSON.stringify(focusable)) {
            console.log(`Tab screenshot verified for: '${FILE_NAME}''`);
          } else {
            cy.writeFile(DRAFT_FILE, JSON.stringify(focusable)).then(() => {
              // console.log(
              //   `FIRST:::::   ${JSON.stringify(json)} ${
              //     JSON.stringify(json).length
              //   }`,
              //   `\n\nSECOND:::::    ${JSON.stringify(focusable)} ${
              //     JSON.stringify(focusable).length
              //   }`,
              //   JSON.stringify(json) === JSON.stringify(focusable)
              // );

              function getDifference(a, b) {
                var i = 0;
                var j = 0;
                var result = '';

                while (j < b.length) {
                  if (a[i] != b[j] || i == a.length) result += b[j];
                  else i++;
                  j++;
                }
                return result;
              }
              console.log(
                getDifference(JSON.stringify(json), JSON.stringify(focusable))
              );
              throw new Error(`DOM not matching config. ${GENERATION_MESSAGE}`);
            });
          }
        } else {
          cy.writeFile(DRAFT_FILE, JSON.stringify(focusable)).then(() => {
            throw new Error(
              `No a11y keyboard config found. ${GENERATION_MESSAGE}`
            );
          });
        }
      });
    });
  }
);
