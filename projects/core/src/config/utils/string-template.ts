/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export class StringTemplate {
  /**
   * Populates the given template with the variables provided
   *
   * @param templateString template of the OCC endpoint
   * @param templateVariables variables to replace in the template
   * @param encodeVariable encode variable before placing it in the template
   */
  static resolve(
    templateString: string,
    templateVariables: Object,
    encodeVariable?: boolean
  ): string {
    for (const variableLabel of Object.keys(templateVariables)) {
      const placeholder = new RegExp('\\${' + variableLabel + '}', 'g');
      templateString = templateString.replace(
        placeholder,
        // TODO 4.0: default to encodeVariable = true
        encodeVariable
          ? encodeURIComponent(templateVariables[variableLabel as keyof object])
          : templateVariables[variableLabel as keyof object]
      );
    }
    return templateString;
  }
}
