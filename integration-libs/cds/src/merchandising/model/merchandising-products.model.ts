/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from '@spartacus/core';
import { MerchandisingMetadata } from './merchandising-metadata.model';

export interface MerchandisingProduct extends Product {
  metadata?: MerchandisingMetadata;
}

export interface MerchandisingProducts {
  metadata?: MerchandisingMetadata;
  products?: MerchandisingProduct[];
}
