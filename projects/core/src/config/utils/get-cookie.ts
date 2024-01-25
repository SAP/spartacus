/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export function getCookie(cookie: string, name: string) {
  const regExp = new RegExp('(?:^|;\\s*)' + name + '=([^;]*)', 'g');
  const result: RegExpExecArray | null = regExp.exec(cookie);

  return (result && decodeURIComponent(result[1])) || '';
}
