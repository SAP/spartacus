/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Product } from '@spartacus/core';
import { Observable } from 'rxjs';

/**
 * Context for `ProductListItemComponent`.
 */
@Injectable()
export abstract class ProductListItemContext {
  readonly product$: Observable<Product>;
}
