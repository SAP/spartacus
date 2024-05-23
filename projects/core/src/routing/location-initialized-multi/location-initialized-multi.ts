/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';

/**
 * Wrapper InjectionToken for LOCATION_INITIALIZED token to allow multiple initializers.
 *
 * CAUTION: Don't use Router and don't perform any Router navigation in its implementations.
 * Only access the class `Location` from '@angular/common' if access to URL is needed.
 */
export const LOCATION_INITIALIZED_MULTI = new InjectionToken<
  (() => Promise<any>)[]
>('MULTI_LOCATION_INITIALIZED');
