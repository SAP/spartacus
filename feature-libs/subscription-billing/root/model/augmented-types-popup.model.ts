/*
 * Copyright (C) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { LAUNCH_CALLER } from '@spartacus/storefront';

export const EXTENDED_LAUNCH_CALLER = {
  ...LAUNCH_CALLER,
  SUBSCRIPTION_CONFIRMATION: 'SUBSCRIPTION_CONFIRMATION',
  // add other new callers here
} as const;

export type ExtendedLaunchCaller =
  (typeof EXTENDED_LAUNCH_CALLER)[keyof typeof EXTENDED_LAUNCH_CALLER];
