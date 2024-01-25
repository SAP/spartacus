/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpErrorModel } from '../model/misc.model';

/**
 * A helper function for detecting JaloObjectNoLongerValidError errors
 */
export function isJaloError(err: HttpErrorModel): boolean {
  return err.details?.[0]?.type === 'JaloObjectNoLongerValidError';
}
