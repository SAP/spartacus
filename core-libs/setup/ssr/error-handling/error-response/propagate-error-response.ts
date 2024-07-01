/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';

/**
 * Function that will propagate the raw error captured in SSR to the CxCommonEngine.
 */
export const PROPAGATE_ERROR_TO_SERVER = new InjectionToken<
  (error: unknown) => void
>('PROPAGATE_ERROR_RESPONSE');
