/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckoutEvent } from '@spartacus/checkout/base/root';

/**
 * An abstract event for all the service details related events.
 */
export abstract class CheckoutServiceDetailsEvent extends CheckoutEvent {}
