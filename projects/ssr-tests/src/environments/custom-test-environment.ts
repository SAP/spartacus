/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Event, State } from 'jest-circus';
import { TestEnvironment as NodeEnvironment } from 'jest-environment-node';
import { getRawLogsPretty } from '../utils/log.utils';

/**
 * This is a custom Jest environment that adds the SSR logs to the test errors.
 * The logs are added to the error `cause` property for failed tests,
 * so those logs will be printed by Jest along with the test error.
 */
export default class CustomTestEnvironment extends NodeEnvironment {
  // For comparison, see the original source code of Jest-Circus:
  // https://github.com/jestjs/jest/blob/bd1c6db7c15c23788ca3e09c919138e48dd3b28a/packages/jest-circus/src/formatNodeAssertErrors.ts#L45
  async handleTestEvent(event: Event, _state: State) {
    if (event.name === 'test_done') {
      event.test.errors = event.test.errors.map((errors) => {
        if (Array.isArray(errors)) {
          const [originalError, asyncError] = errors;

          const ssrLogs = getSsrLogs();
          // Error's `cause` property is the only property printed by Jest
          // besides `message` that we can utilize for attaching logs.
          // No other custom properties are printed by Jest.
          // See their source code of their function `formatExecError`:
          // https://github.com/jestjs/jest/blob/bd1c6db7c15c23788ca3e09c919138e48dd3b28a/packages/jest-message-util/src/index.ts#L436
          addCauseToError({
            error: originalError, // e.g. error when an expect() fails
            cause: ssrLogs,
          });
          addCauseToError({
            error: asyncError, // e.g. error when a test timeout happens
            cause: ssrLogs,
          });
        }
        return errors;
      });
    }
  }
}

function addCauseToError({ error, cause }: { error: any; cause: any }) {
  // in some cases, the error might be a string, not an object
  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    'stack' in error
  ) {
    error.cause = cause;
  }
}

function getSsrLogs() {
  const readableLogs = getRawLogsPretty().join('\n');
  return `(more context below)\n--- SSR LOGS (with JSONs pretty-printed) ---\n${readableLogs}\n--- SSR LOGS END ---`;
}
