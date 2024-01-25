/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AbstractControl } from '@angular/forms';

export function createCodeForEntityName(
  name: AbstractControl | null,
  code: AbstractControl | null
): void {
  if (!code?.value) {
    const codeFromName = name?.value?.replace(/\s+/g, '-').toLowerCase();
    code?.patchValue(codeFromName);
  }
}
