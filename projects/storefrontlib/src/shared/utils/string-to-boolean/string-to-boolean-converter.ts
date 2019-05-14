/**
 * Utility class when working with 'string' booleans.
 */
export class StringConverter {
  /**
   *
   * Checks is the `stringBoolean` field valid in the provided `string`.
   *
   * If string is a 'string' boolean, return proper boolean value
   *
   * @param stringBoolean a field name
   */

  static stringToBoolean(stringBoolean: string): boolean {
    if (!stringBoolean || stringBoolean.toLowerCase() === 'false') {
      return false;
    } else {
      return true;
    }
  }
}
