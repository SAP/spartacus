/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { S4omConfig } from '../config';

export function getTestConfig(): S4omConfig {
  return {
    s4om: {
      previewMimeTypes: ['application/pdf'],
    },
  };
}
