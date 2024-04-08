/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';

/**
 * Wrapper InjectionToken for LOCATION_INITIALIZED token to allow multiple initializers.
 */
export const LOCATION_INITIALIZED_MULTI = new InjectionToken<
  (() => Promise<any>)[]
>('MULTI_LOCATION_INITIALIZED');
