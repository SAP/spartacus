const getTestTitle = (
  test: Mocha.Suite = (Cypress as any).mocha.getRunner().suite.ctx.test
): string =>
  test.parent?.title
    ? `${getTestTitle(test.parent)} - ${test.title}`
    : test.title;

/**
 * Creates a Cypress log output
 * @param functionName Name of the function that should be logged
 * @param title Title of the test
 */
 function logWithContext(message: string) {
  cy.log(`##### ${getTestTitle()} #####\n${message}`);
}

/**
 * simple log
 * @param message message to log
 */
export function log(message: string) {
    logWithContext(`----- ${message} -----`);
}

/**
 * Creates a Cypress log before function gets executed printing out name
 * and args and another log after finishing the function.
 */
export function trace(functionName: string, args: Object, func: Function) {
  const argString = args ? ` with args\n${JSON.stringify(args)}` : '';
  logWithContext(
    `***** START function '${functionName}'${argString} *****`
  );
  func(); // execute the function
  logWithContext(`***** END function '${functionName} *****'`);
}

export function traceNoArgs(functionName: string, func: Function) {
    trace(functionName, undefined, func);
}
