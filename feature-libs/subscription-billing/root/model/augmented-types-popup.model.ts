/*
 * Copyright (C) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { LAUNCH_CALLER } from '@spartacus/storefront';

declare module '@spartacus/storefront' {
  enum LAUNCH_CALLER {
    SUBSCRIPTION_CONFIRMATION = 'SUBSCRIPTION_CONFIRMATION',
  }
}

(LAUNCH_CALLER as any)['SUBSCRIPTION_CONFIRMATION'] =
  'SUBSCRIPTION_CONFIRMATION';
