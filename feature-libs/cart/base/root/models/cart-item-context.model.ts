/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { OrderEntry } from '../models/cart.model';
import { CartItemComponentOptions, PromotionLocation } from './cart.model';

/**
 * Context for `CartItemComponent`.
 */
@Injectable()
export abstract class CartItemContext {
  readonly compact$: Observable<boolean>;

  readonly readonly$: Observable<boolean>;

  readonly item$: Observable<OrderEntry>;

  readonly quantityControl$: Observable<UntypedFormControl>;

  readonly location$: Observable<PromotionLocation>;

  readonly options$: Observable<CartItemComponentOptions>;
}
