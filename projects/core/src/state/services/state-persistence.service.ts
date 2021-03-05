import { Injectable } from '@angular/core';
import { combineLatest, iif, Observable, of, Subscription } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { StorageSyncType } from '../../state/config/state-config';
import {
  generateKeyWithContext,
  getStorage,
  persistToStorage,
  readFromStorage,
  removeFromStorage,
} from '../../state/reducers/storage-sync.reducer';
import { ConsentService } from '../../user/facade/consent.service';
import { WindowRef } from '../../window/window-ref';

@Injectable({
  providedIn: 'root',
})
export class StatePersistenceService {
  /**
   * @deprecated since 3.3.0, Use constructor with WindowRef and ConsentService
   */
  // TODO (): Handle deprecation
  constructor(winRef: WindowRef);
  // tslint:disable-next-line: unified-signatures
  constructor(winRef: WindowRef, consentService?: ConsentService);
  constructor(
    protected winRef: WindowRef,
    protected consentService?: ConsentService
  ) {}

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
    ignoreConsent = false,
  }: {
    key: string;
    state$: Observable<T>;
    context$?: Observable<string | Array<string>>;
    storageType?: StorageSyncType;
    onRead?: (stateFromStorage: T) => void;
    ignoreConsent?: boolean;
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
            ) as T;
          }),
          tap((state) => onRead(state))
        )
        .subscribe()
    );

    // TODO (): Remove null check for consentService
    const stream$: Observable<T | [boolean, T]> = iif(
      () => ignoreConsent || !Boolean(this.consentService),
      state$,
      combineLatest([
        (this.consentService as ConsentService).checkConsentGivenByTemplateId(
          'STORE_USER_INFORMATION'
        ),
        state$,
      ])
    );

    subscriptions.add(
      stream$
        .pipe(withLatestFrom(context$))
        .subscribe(
          ([state, context]: [T | [Boolean, T], string | string[]]) => {
            if (Array.isArray(state)) {
              if (state[0]) {
                persistToStorage(
                  this.generateKeyWithContext(context, key),
                  state[1],
                  storage
                );
              } else {
                removeFromStorage(
                  this.generateKeyWithContext(context, key),
                  storage
                );
              }
            } else {
              persistToStorage(
                this.generateKeyWithContext(context, key),
                state,
                storage
              );
            }
          }
        )
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
  }): T {
    const storage = getStorage(storageType, this.winRef);

    return readFromStorage(
      storage,
      this.generateKeyWithContext(context, key)
    ) as T;
  }

  // TODO (): Remove and use global function instead
  protected generateKeyWithContext(
    context: string | Array<string>,
    key: string
  ): string {
    return generateKeyWithContext(context, key);
  }
}
