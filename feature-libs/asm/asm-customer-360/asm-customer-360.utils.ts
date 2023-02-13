/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { formatDate } from '@angular/common';

export function formatEpochTime(time: number): string {
  return formatDate(time, 'dd-MM-yy hh:mm a', 'en-US');
}

export function combineStrings(
  string1?: string,
  string2?: string,
  delimiter: string = ''
): string | undefined {
  return string1 || string2
    ? `${string1 || ''}${delimiter}${string2 || ''}`
    : undefined;
}
