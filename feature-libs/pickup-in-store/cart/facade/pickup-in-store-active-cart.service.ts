/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  ActiveCartService,
  getCartIdByUserId,
} from '@spartacus/cart/base/core';
import { MultiCartFacade } from '@spartacus/cart/base/root';
import { UserIdService } from '@spartacus/core';
import { IntendedPickupLocationFacade } from '@spartacus/pickup-in-store/root';
import { withLatestFrom } from 'rxjs/operators';

/**
 * An override of the active cart service that can add a product for pickup in store.
 */
@Injectable()
export class PickupInStoreActiveCartService extends ActiveCartService {
  constructor(
    protected userIdService: UserIdService,
    protected multiCartFacade: MultiCartFacade,
    protected intendedPickupLocationFacade: IntendedPickupLocationFacade
  ) {
    super(multiCartFacade, userIdService);
  }

  addEntry(productCode: string, quantity: number): void {
    this.requireLoadedCart()
      .pipe(
        withLatestFrom(
          this.userIdService.getUserId(),
          this.intendedPickupLocationFacade.getIntendedLocation(productCode)
        )
      )
      .subscribe(([cart, userId, location]) => {
        this.multiCartFacade.addEntry(
          userId,
          getCartIdByUserId(cart, userId),
          productCode,
          quantity,
          location && location.pickupOption === 'pickup'
            ? location.name
            : undefined
        );
      });
  }
}
