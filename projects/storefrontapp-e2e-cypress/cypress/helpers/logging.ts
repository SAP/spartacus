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
 * Creates a Simple log messagge
 * @param message message to log
 */
export function log(message: string) {
  logWithContext(`----- ${message} -----`);
}

/**
 * Creates a Cypress log before function gets executed printing out name
 * and args and another log after finishing the function.
 * @param functionName Name of the function that should be logged
 * @param args Arguments the function will be called with
 * @param func The function that is called
 */
export function trace(functionName: string, args: Object, func: Function) {
  const argString = args ? ` with args\n${JSON.stringify(args)}` : '';
  logWithContext(`***** START function '${functionName}'${argString} *****`);
  func(); // execute the function
  logWithContext(`***** END function '${functionName} *****'`);
}
/**
 * Creates a Cypress log before function gets executd printing out name.
 * Creates another log after finishing the function.
 * @param functionName Name of the function that should be logged
 * @param func The function that is called
 */
export function traceNoArgs(functionName: string, func: Function) {
  trace(functionName, undefined, func);
}
