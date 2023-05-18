/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { OpfUi } from '@spartacus/opf/payment/root';

import { Observable } from 'rxjs';
import { OpfActions } from '../store/actions/index';
import { OpfSelectors, StateWithOpf } from '../store/index';

@Injectable({
  providedIn: 'root',
})
export class OpfService {
  constructor(protected store: Store<StateWithOpf>) {}

  /**
   * Updates the state of the OPF UI
   */
  updateOpfUiState(opfUi: OpfUi): void {
    this.store.dispatch(new OpfActions.OpfUiUpdate(opfUi));
  }

  /**
   * Clears the state of the OPF UI
   */
  clearOpfUiState(): void {
    this.store.dispatch(new OpfActions.OpfUiClear());
  }

  /**
   * Get the state of the OPF UI
   */
  getOpfUiState(): Observable<OpfUi> {
    return this.store.pipe(select(OpfSelectors.getOpfUi));
  }
}
