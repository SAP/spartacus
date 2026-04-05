/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaymentDetails as CorePaymentDetails } from '@spartacus/core';

/**
 * OPF Tokenisation payment details model.
 * Re-exports core PaymentDetails for use within OPF tokenisation library.
 * This provides a single import point and allows future customization if needed.
 */
export type OpfPaymentDetails = CorePaymentDetails;
