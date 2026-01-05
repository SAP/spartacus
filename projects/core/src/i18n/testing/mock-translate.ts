/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export function mockTranslate(
  key: string | string[] | undefined,
  options: any = {}
) {
  const keyString = Array.isArray(key) ? key.join(',') : key;
  const optionsString = Object.keys(options)
    .sort()
    .map((optionName) => `${optionName}:${options[optionName]}`)
    .join(' ');

  return optionsString ? `${keyString} ${optionsString}` : keyString;
}
