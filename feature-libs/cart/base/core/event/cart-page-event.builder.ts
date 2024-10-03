/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CartPageEvent } from '@spartacus/cart/base/root';
import { createFrom, EventService } from '@spartacus/core';
import { NavigationEvent } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartPageEventBuilder {
  constructor(protected eventService: EventService) {
    this.register();
  }

  protected register(): void {
    this.eventService.register(CartPageEvent, this.buildCartPageEvent());
  }

  protected buildCartPageEvent(): Observable<CartPageEvent> {
    return this.eventService.get(NavigationEvent).pipe(
      filter((navigationEvent) => navigationEvent.semanticRoute === 'cart'),
      map((navigationEvent) =>
        createFrom(CartPageEvent, {
          navigation: navigationEvent,
        })
      )
    );
  }
}
