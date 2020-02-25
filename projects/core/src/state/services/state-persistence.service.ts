import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  take,
  withLatestFrom,
} from 'rxjs/operators';
import { SiteContextParamsService } from '../../site-context/services/site-context-params.service';
import { StorageSyncType } from '../../state/config/state-config';
import {
  getStorage,
  persistToStorage,
  readFromStorage,
} from '../../state/reducers/storage-sync.reducer';
import { WindowRef } from '../../window/window-ref';

@Injectable({
  providedIn: 'root',
})
export class StatePersistenceService {
  emptyContext$: Observable<string>;

  constructor(
    protected winRef: WindowRef,
    protected siteContextParamService: SiteContextParamsService
  ) {
    this.emptyContext$ = combineLatest(
      this.siteContextParamService
        .getContextParameters()
        .map(contextParam =>
          this.siteContextParamService
            .getSiteContextService(contextParam)
            .getActive()
        )
    ).pipe(
      filter(contextValues => contextValues.every(param => !!param)),
      map(() => ''),
      take(1)
    );
  }

  /**
   * Helper to synchronize state to more persistent storage (localStorage, sessionStorage).
   * It is context aware, so you can keep different state for te same feature based on specified context.
   *
   * Eg. cart is valid only under the same base site. So you want to synchronize cart only with the same base site.
   * Usage for that case: `syncWithStorage('cart', activeCartSelector$, [BASE_SITE_CONTEXT_ID])`.
   * Active cart for the `electronics` base site will be stored under `spartacus-electronics-cart` and for apparel under `spartacus-apparel-cart`.
   *
   * On each base site change returned observable will emit state from storage for that particular base site.
   *
   * Omitting contextParams will synchronize state for all context parameters combinations under the same key.
   *
   * @param storageKey Key to use in storage for the synchronized state. Should be unique for each feature.
   * @param stateToSync State to be saved and later restored.
   * @param contextParams Context parameters that specify separate state instances.
   * @param storageType Storage type to be used to persist state
   *
   * @returns Observable that will emit on each context change with saved state
   */
  syncWithStorage<T>(
    storageKey: string,
    stateToSync: Observable<T>,
    contextParams: string[] = [],
    storageType: StorageSyncType = StorageSyncType.LOCAL_STORAGE
  ): Observable<T> {
    function keyWithContext(context) {
      return `spartacus-${context}-${storageKey}`;
    }
    const storage = getStorage(storageType, this.winRef);

    const contextForProvidedParams$ = combineLatest(
      contextParams.map(contextParam =>
        this.siteContextParamService
          .getSiteContextService(contextParam)
          .getActive()
      )
    ).pipe(
      filter(contextValues => contextValues.every(param => !!param)),
      map(contextValues => contextValues.join('-')),
      distinctUntilChanged()
    );

    const context$ =
      contextParams.length > 0 ? contextForProvidedParams$ : this.emptyContext$;

    stateToSync.pipe(withLatestFrom(context$)).subscribe(([state, context]) => {
      persistToStorage(keyWithContext(context), state, storage);
    });

    return context$.pipe(
      map(context => {
        return readFromStorage(storage, keyWithContext(context)) as T;
      })
    );
  }
}
