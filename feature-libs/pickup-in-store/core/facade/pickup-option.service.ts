/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  PickupOption,
  PickupOptionFacade,
} from '@spartacus/pickup-in-store/root';
import { Observable } from 'rxjs';
import {
  PickupOptionActions,
  PickupOptionSelectors,
  StateWithPickupOption,
} from '../store/index';

/**
 * A service for managing the page context and pickup option for a cart entry.
 */
@Injectable()
export class PickupOptionService implements PickupOptionFacade {
  constructor(protected store: Store<StateWithPickupOption>) {
    // Intentional empty constructor
  }

  setPageContext(pageContext: string): void {
    this.store.dispatch(
      PickupOptionActions.SetPageContext({
        payload: { pageContext },
      })
    );
  }

  getPageContext(): Observable<string> {
    return this.store.pipe(select(PickupOptionSelectors.getPageContext()));
  }

  setPickupOption(entryNumber: number, pickupOption: PickupOption): void {
    this.store.dispatch(
      PickupOptionActions.SetPickupOption({
        payload: { entryNumber, pickupOption },
      })
    );
  }

  getPickupOption(entryNumber: number): Observable<PickupOption | undefined> {
    return this.store.pipe(
      select(PickupOptionSelectors.getPickupOption(entryNumber))
    );
  }
}
