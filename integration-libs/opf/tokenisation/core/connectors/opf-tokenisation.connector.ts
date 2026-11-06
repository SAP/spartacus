/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';

/**
 * OPF Tokenisation Connector
 *
 * Central connector for OPF payment tokenisation operations.
 * Acts as an intermediary between the service layer and adapters.
 *
 * Currently delegates all payment operations to core UserPaymentService to avoid code duplication.
 * Can be extended to integrate OPF-specific adapters as needed.
 *
 */
@Injectable()
export class OpfTokenisationConnector {}
