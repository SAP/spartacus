/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable } from 'rxjs';
import {
  MerchandisingMetadata,
  MerchandisingProduct,
} from '../../../model/index';

export interface MerchandisingCarouselModel {
  id: string;
  items$: Observable<MerchandisingProduct>[];
  productIds: string[];
  metadata: MerchandisingMetadata;
  title: string;
  backgroundColor: string | Object | undefined;
  textColor: string | Object | undefined;
}
