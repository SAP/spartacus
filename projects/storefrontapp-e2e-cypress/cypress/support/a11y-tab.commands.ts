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
       * When this command is first called, it will fail the test and create a draft snapshot file as indicated by the error message.
       *
       * It is up to the developer to verify elements of the page at the current state are accessible by the TAB key.
       *
       * Once verified, the developer can move the generated draft snapshot file into the snapshot folder for the test to pass this assertation.
       *
       * Upon any DOM change that might affect the accessibility of the keyboard at the asserted state, the test will fail and a new draft snapshot will be generated to be verified once again.
       *
       * @memberof Cypress.Chainable
       */
      domSnapshot: (config?: DomSnapshotConfig) => void;
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

export interface DomSnapshotConfig {
  /**
   * Tag name for element in which to perform snapshots within.
   * @default 'body'
   */
  container: string;
  /**
   * Appended to file name to identify unique states in a test with multiple snapshots.
   */
  scenario?: string;
}

Cypress.Commands.add(
  'domSnapshot',
  (config: DomSnapshotConfig = { container: 'body' }) => {
    const FILE_NAME = `${getViewport()}/${Cypress.spec.name}${
      config.scenario ? `-${config.scenario}` : ''
    }.json`;
    const DRAFT_FILE = `cypress/fixtures/a11y/snapshots/drafts/${FILE_NAME}`;
    const SNAPSHOT_FILE = `cypress/fixtures/a11y/snapshots/${FILE_NAME}`;
    const GENERATION_MESSAGE = `Draft generated at '${DRAFT_FILE}'. Verify that keyboard accessibility is correct and move to '${SNAPSHOT_FILE}' to pass assertion.`;

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

      cy.task('readFile', SNAPSHOT_FILE).then((file: string) => {
        if (file?.length) {
          const json = JSON.parse(file);
          if (JSON.stringify(json) === JSON.stringify(focusable)) {
            console.log(`DOM Snapshot verified for: '${FILE_NAME}''`);
          } else {
            cy.writeFile(DRAFT_FILE, JSON.stringify(focusable)).then(() => {
              throw new Error(
                `DOM not matching snapshot. ${GENERATION_MESSAGE}`
              );
            });
          }
        } else {
          cy.writeFile(DRAFT_FILE, JSON.stringify(focusable)).then(() => {
            throw new Error(
              `No a11y keyboard snapshot found. ${GENERATION_MESSAGE}`
            );
          });
        }
      });
    });
  }
);
