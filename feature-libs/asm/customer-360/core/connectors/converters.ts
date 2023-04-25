/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Customer360Response } from '@spartacus/asm/customer-360/root';
import { Converter } from '@spartacus/core';

export const CUSTOMER_360_NORMALIZER = new InjectionToken<
  Converter<any, Customer360Response>
>('Customer360Normalizer');
