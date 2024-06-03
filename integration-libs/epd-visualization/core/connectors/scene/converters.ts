/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { NodesResponse } from './nodes-response';

export const NODES_RESPONSE_NORMALIZER = new InjectionToken<
  Converter<any, NodesResponse>
>('NodesResponseNormalizer');
