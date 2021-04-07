import { Injectable } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { AuthService } from '../../auth';
import { EventService } from '../../event/event.service';
import { ANONYMOUS_CONSENT_STATUS, Consent } from '../../model/index';
import { StorageSyncType } from '../../state/config/state-config';
import {
  getStorage,
  persistToStorage,
  readFromStorage,
} from '../../state/reducers/storage-sync.reducer';
import {
  AnonymousConsentsSetEvent,
  ConsentGivenEvent,
  ConsentWithdrawnEvent,
  UserConsentsLoadedEvent,
} from '../../user/events/consent.events';
import { WindowRef } from '../../window/window-ref';

@Injectable({
  providedIn: 'root',
})
export class ConsentStatePersistenceService {
  // TODO: create a type to reuse
  protected stateMeta = new Map<string, any[]>();

  constructor(
    protected winRef: WindowRef,
    protected eventService: EventService,
    protected auth: AuthService
  ) {
    // TODO: get rid of subscriptions
    eventService.get(UserConsentsLoadedEvent).subscribe((event) => {
      console.log(event);
      for (const consent of event.consentTemplates) {
        if (
          consent.currentConsent &&
          !this.isConsentGiven(consent.currentConsent)
        )
          this.clearStorageForWidthDrawnConsent(consent.id as string);
        else if (
          consent.currentConsent &&
          this.isConsentGiven(consent.currentConsent)
        )
          this.writeStorageForConsentGiven(consent.id as string);
      }
    });

    // TODO: validate use case when going from authenticated to anonymous
    eventService
      .get(AnonymousConsentsSetEvent)
      .pipe(
        withLatestFrom(this.auth.isUserLoggedIn()),
        filter(([, isUserLoggedIn]) => !isUserLoggedIn)
      )
      .subscribe(([event]) => {
        console.log(event);
        for (const consent of event.consentTemplates) {
          if (consent.consentState === ANONYMOUS_CONSENT_STATUS.WITHDRAWN)
            this.clearStorageForWidthDrawnConsent(
              consent.templateCode as string
            );
          else this.writeStorageForConsentGiven(consent.templateCode as string);
        }
      });

    eventService.get(ConsentGivenEvent).subscribe((event) => {
      console.log('given', event);
      this.writeStorageForConsentGiven(event.consent);
    });
    eventService.get(ConsentWithdrawnEvent).subscribe((event) => {
      console.log('withdrawn', event);
      this.clearStorageForWidthDrawnConsent(event.consent);
    });
  }

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
    consentId = 'STORE_USER_INFORMATION',
    skipConsent = false,
    onPersist,
    onRemove,
  }: {
    key: string;
    state$: Observable<T>;
    context$?: Observable<string | Array<string>>;
    storageType?: StorageSyncType;
    onRead?: (stateFromStorage: T) => void;
    consentId?: string;
    skipConsent?: boolean;
    onPersist: (sub: Subscription) => void;
    onRemove: () => void;
  }): void {
    if (skipConsent) {
      this.persist({
        key,
        state$,
        context$,
        storageType,
        onRead,
        onPersist,
        consentId,
      });
    } else {
      this.addToMeta({
        key,
        state$,
        context$,
        storageType,
        onRead,
        onPersist,
        consentId,
        onRemove,
      });
    }
  }

  protected persist<T>({
    key,
    state$,
    context$,
    storageType,
    onRead,
    onPersist,
    consentId,
  }: {
    key: string;
    state$: Observable<T>;
    context$: Observable<string | Array<string>>;
    storageType: StorageSyncType;
    onRead: (stateFromStorage: T) => void;
    onPersist: (subscription: Subscription) => void;
    consentId?: string;
  }): void {
    const storage = getStorage(storageType, this.winRef);

    const subscriptions = new Subscription();

    // Do not change order of subscription! Read should happen before write on context change.
    subscriptions.add(
      context$
        .pipe(
          map((context) => {
            return readFromStorage(
              storage,
              this.generateKeyWithContext(context, key, consentId)
            ) as T;
          }),
          tap((state) => onRead(state))
        )
        .subscribe()
    );

    subscriptions.add(
      state$.pipe(withLatestFrom(context$)).subscribe(([state, context]) => {
        persistToStorage(
          this.generateKeyWithContext(context, key, consentId),
          state,
          storage
        );
      })
    );

    // Callback to handler service
    onPersist(subscriptions);
  }

  protected addToMeta<T>({
    key,
    state$,
    context$,
    storageType,
    onRead,
    onPersist,
    consentId,
    onRemove,
  }: {
    key: string;
    state$: Observable<T>;
    context$: Observable<string | Array<string>>;
    storageType: StorageSyncType;
    onRead: (stateFromStorage: T) => void;
    onPersist: (subscription: Subscription) => void;
    consentId: string;
    onRemove: () => void;
  }) {
    const stateInfo = {
      key,
      state$,
      context$,
      storageType,
      onRead,
      onPersist,
      onRemove,
    };

    if (this.stateMeta.get(consentId)) {
      const states = this.stateMeta.get(consentId) as any[];
      states.push(stateInfo);
      this.stateMeta.set(consentId, states);
    } else {
      this.stateMeta.set(consentId, [stateInfo]);
    }
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

  protected clearStorageForWidthDrawnConsent(consentId: string): void {
    console.log('removed', consentId);
    for (const key of Object.keys(localStorage)) {
      if (key.endsWith(`⚿consent=${consentId}`)) localStorage.removeItem(key);
    }

    for (const key of Object.keys(sessionStorage)) {
      if (key.endsWith(`⚿consent=${consentId}`)) sessionStorage.removeItem(key);
    }

    if (Boolean(this.stateMeta.get(consentId))) {
      const stateForConsentId = this.stateMeta.get(consentId) as any[];
      for (const state of stateForConsentId) {
        state.onRemove();
      }
    }
  }

  protected writeStorageForConsentGiven(consentId: string): void {
    if (Boolean(this.stateMeta.get(consentId))) {
      const stateForConsentId = this.stateMeta.get(consentId) as any[];
      for (const state of stateForConsentId) {
        this.persist({
          key: state.key,
          state$: state.state$,
          context$: state.context$,
          storageType: state.storageType,
          onPersist: state.onPersist,
          onRead: state.onRead,
          consentId,
        });
      }
    }
  }

  protected getConsentIdsFromStorage(): string[] {
    const consentIds = [];
    for (const key of Object.keys(localStorage)) {
      if (key.includes('⚿consent=')) consentIds.push(key.split('⚿consent=')[1]);
    }

    for (const key of Object.keys(sessionStorage)) {
      if (key.includes('⚿consent=')) consentIds.push(key.split('⚿consent=')[1]);
    }

    return consentIds.filter(
      (value, index, self) => self.indexOf(value) === index
    );
  }

  protected generateKeyWithContext(
    context: string | Array<string>,
    key: string,
    consentId?: string
  ): string {
    const storageKey = `spartacus⚿${([] as string[])
      .concat(context)
      .join('⚿')}⚿${key}`;

    if (consentId) return storageKey.concat(`⚿consent=${consentId}`);
    return storageKey;
  }

  // TODO: move but don't add dependency to ConsentService
  protected isConsentGiven(consent: Consent): boolean {
    return (
      Boolean(consent) &&
      Boolean(consent.consentGivenDate) &&
      !Boolean(consent.consentWithdrawnDate)
    );
  }
}
