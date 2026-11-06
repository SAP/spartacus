/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';

/**
 * OPF Tokenisation Adapter
 *
 * Reserved for OPF-specific HTTP operations related to payment tokenisation.
 * Currently unused as all payment operations are delegated to the core UserPaymentService to avoid code duplication.
 * However, this adapter serves as a placeholder for any future OPF-specific tokenisation logic that may arise as the feature evolves.
 *
 */
@Injectable()
export class OpfTokenisationAdapter {}
