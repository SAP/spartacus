/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { of } from 'rxjs';

/** Mock: Angular Router events stream stub. */
export class MockConfiguratorRouter {
  events = of('');
}
