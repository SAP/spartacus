/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { NodesResponse } from './nodes-response';

/**
 * @deprecated since v221121.5.0 - The epd-visualization integration library will be removed in the future.
 */
export const NODES_RESPONSE_NORMALIZER = new InjectionToken<
  Converter<any, NodesResponse>
>('NodesResponseNormalizer');
