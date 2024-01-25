/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { StrategyRequest } from '../../cds-models';

export interface StrategyProduct {
  id?: string;
  metadata?: { [metadataAttributeName: string]: string };
}

export interface Paged {
  from?: number;
  size?: number;
}

export interface StrategyProducts {
  resultCount?: number;
  products?: StrategyProduct[];
  paged?: Paged;
  metadata?: { [metadataAttributeName: string]: string };
}

export interface StrategyResponse {
  request: StrategyRequest;
  products: StrategyProducts;
}
