/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, queueScheduler } from 'rxjs';
import { filter, map, observeOn } from 'rxjs/operators';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { isNotUndefined } from '../../../util/type-guards';
import { ClientToken } from '../models/client-token.model';
import { ClientAuthActions } from '../store/actions/index';
import { StateWithClientAuth } from '../store/client-auth-state';
import { ClientAuthSelectors } from '../store/selectors/index';

/**
 * Serves a role of a facade on client token store.
 */
@Injectable({
  providedIn: 'root',
})
export class ClientTokenService {
  constructor(protected store: Store<StateWithClientAuth>) {}

  /**
   * Returns a client token. The client token from the store is returned if there is one.
   * Otherwise a new token is fetched from the backend and saved in the store.
   */
  getClientToken(): Observable<ClientToken | undefined> {
    return this.store.pipe(
      select(ClientAuthSelectors.getClientTokenState),
      observeOn(queueScheduler),
      filter((state: LoaderState<ClientToken>) => {
        if (this.isClientTokenLoaded(state)) {
          return true;
        } else {
          if (!state.loading) {
            this.store.dispatch(new ClientAuthActions.LoadClientToken());
          }
          return false;
        }
      }),
      map((state: LoaderState<ClientToken>) => state.value)
    );
  }

  /**
   * Fetches a clientToken from the backend and saves it in the store where getClientToken can use it.
   * The new clientToken is returned.
   */
  refreshClientToken(): Observable<ClientToken> {
    this.store.dispatch(new ClientAuthActions.LoadClientToken());

    return this.store.pipe(
      select(ClientAuthSelectors.getClientTokenState),
      filter((state: LoaderState<ClientToken>) =>
        this.isClientTokenLoaded(state)
      ),
      map((state: LoaderState<ClientToken>) => state.value),
      filter(isNotUndefined)
    );
  }

  protected isClientTokenLoaded(state: LoaderState<ClientToken>): boolean {
    return Boolean((state.success || state.error) && !state.loading);
  }
}
