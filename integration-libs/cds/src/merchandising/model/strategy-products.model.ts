/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { StrategyRequest } from '../../cds-models';
import { Observable } from 'rxjs';

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

export interface StrategyResponseV2 {
  products?: Observable<StrategyProduct>;
  metadata?: { [metadataAttributeName: string]: string };
}
