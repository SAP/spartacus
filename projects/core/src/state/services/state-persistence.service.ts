import { Injectable } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { StorageSyncType } from '../../state/config/state-config';
import { WindowRef } from '../../window/window-ref';
import {
  getStorage,
  persistToStorage,
  readFromStorage,
} from '../utils/browser-storage';

@Injectable({
  providedIn: 'root',
})
export class StatePersistenceService {
  constructor(protected winRef: WindowRef) {}

  /**
   * Helper to synchronize state to more persistent storage (localStorage, sessionStorage).
   * It is context aware, so you can keep different state for te same feature based on specified context.
   *
   * Eg. cart is valid only under the same base site. So you want to synchronize cart only with the same base site.
   * Usage for that case: `syncWithStorage({ key: 'cart', state$: activeCartSelector$, context$: this.siteContextParamsService.getValues([BASE_SITE_CONTEXT_ID]), onRead: (state) => setCorrectStateInStore(state) })`.
   * Active cart for the `electronics` base site will be stored under `spartacus⚿electronics⚿cart` and for apparel under `spartacus⚿apparel⚿cart`.
   *
   * On each context change onRead function will be executed with state from storage provided as a parameter.
   *
   * Omitting context$ will trigger onRead only once at initialization.
   *
   * @param key Key to use in storage for the synchronized state. Should be unique for each feature.
   * @param state$ State to be saved and later restored.
   * @param context$ Context for state
   * @param storageType Storage type to be used to persist state
   * @param onRead Function to be executed on each storage read after context change
   *
   * @returns Subscriptions for reading/writing in storage on context/state change
   */
  syncWithStorage<T>({
    key,
    state$,
    context$ = of(''),
    storageType = StorageSyncType.LOCAL_STORAGE,
    onRead = () => {},
  }: {
    key: string;
    state$: Observable<T>;
    context$?: Observable<string | Array<string>>;
    storageType?: StorageSyncType;
    onRead?: (stateFromStorage: T | undefined) => void;
  }): Subscription {
    const storage = getStorage(storageType, this.winRef);

    const subscriptions = new Subscription();

    // Do not change order of subscription! Read should happen before write on context change.
    subscriptions.add(
      context$
        .pipe(
          map((context) => {
            return readFromStorage(
              storage,
              this.generateKeyWithContext(context, key)
            ) as T | undefined;
          }),
          tap((state) => onRead(state))
        )
        .subscribe()
    );

    subscriptions.add(
      state$.pipe(withLatestFrom(context$)).subscribe(([state, context]) => {
        persistToStorage(
          this.generateKeyWithContext(context, key),
          state,
          storage
        );
      })
    );

    return subscriptions;
  }

  /**
   * Helper to read state from persistent storage (localStorage, sessionStorage).
   * It is useful if you need synchronously access state saved with `syncWithStorage`.
   *
   * @param key Key to use in storage for state. Should be unique for each feature.
   * @param context Context value for state
   * @param storageType Storage type from to read state
   *
   * @returns State from the storage
   */
  readStateFromStorage<T>({
    key,
    context = '',
    storageType = StorageSyncType.LOCAL_STORAGE,
  }: {
    key: string;
    context?: string | Array<string>;
    storageType?: StorageSyncType;
  }): T | undefined {
    const storage = getStorage(storageType, this.winRef);

    return readFromStorage(
      storage,
      this.generateKeyWithContext(context, key)
    ) as T | undefined;
  }

  protected generateKeyWithContext(
    context: string | Array<string>,
    key: string
  ): string {
    return `spartacus⚿${([] as Array<string>)
      .concat(context)
      .join('⚿')}⚿${key}`;
  }
}
