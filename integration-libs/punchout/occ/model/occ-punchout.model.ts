/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OccEndpoint } from '@spartacus/core';

export interface PunchoutOccEndpoints {
  punchoutSession?: string | OccEndpoint;
  punchoutRequisition?: string | OccEndpoint;
}

declare module '@spartacus/core' {
  interface OccEndpoints extends PunchoutOccEndpoints {}
}
