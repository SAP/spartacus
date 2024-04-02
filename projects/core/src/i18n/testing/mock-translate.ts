/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export function mockTranslate(key: string | undefined, options: any = {}) {
  const optionsString = Object.keys(options)
    .sort()
    .map((optionName) => `${optionName}:${options[optionName]}`)
    .join(' ');
  return optionsString ? `${key} ${optionsString}` : key;
}
