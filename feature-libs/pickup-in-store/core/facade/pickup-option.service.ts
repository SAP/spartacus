/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
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

// TODO jsdoc

@Injectable()
export class PickupOptionService implements PickupOptionFacade {
  constructor(protected readonly store: Store<StateWithPickupOption>) {
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
    return this.store.select(PickupOptionSelectors.getPageContext());
  }

  setPickupOption(entryNumber: number, pickupOption: PickupOption): void {
    this.store.dispatch(
      PickupOptionActions.SetPickupOption({
        payload: { entryNumber, pickupOption },
      })
    );
  }

  getPickupOption(entryNumber: number): Observable<PickupOption> {
    return this.store.select(
      PickupOptionSelectors.getPickupOption(entryNumber)
    );
  }
}
