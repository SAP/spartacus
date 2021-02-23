/**
 * Checks if a string input is defined and returns it in this case.
 * Throws exception if undefined
 *
 * @param input
 * @returns {string} - input if defined
 */
export function ensureStringDefined(input: string | undefined): string {
  if (input) {
    return input;
  } else throw Error('String input must be defined');
}
