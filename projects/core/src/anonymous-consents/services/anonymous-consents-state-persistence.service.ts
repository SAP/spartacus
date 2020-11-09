import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { StatePersistenceService } from '../../state/index';
import {
  SetAnonymousConsents,
  ToggleAnonymousConsentsBannerDissmissed,
  ToggleAnonymousConsentTemplatesUpdated,
} from '../store/actions/anonymous-consents.action';
import {
  AnonymousConsentsState,
  StateWithAnonymousConsents,
} from '../store/index';
import { getAnonymousConsentState } from '../store/selectors/feature.selector';

/**
 * Anonymous consents state synced to browser storage.
 */
export type SyncedAnonymousConsentsState = Partial<AnonymousConsentsState>;

/**
 * Responsible for saving the anonymous consents data in browser storage.
 */
@Injectable({
  providedIn: 'root',
})
export class AnonymousConsentsStatePersistenceService implements OnDestroy {
  protected subscription = new Subscription();

  constructor(
    protected statePersistenceService: StatePersistenceService,
    protected store: Store<StateWithAnonymousConsents>
  ) {}

  /**
   * Identifier used for storage key.
   */
  protected key = 'anonymous-consents';

  /**
   * Initializes the synchronization between state and browser storage.
   */
  public initSync() {
    this.subscription.add(
      this.statePersistenceService.syncWithStorage({
        key: this.key,
        state$: this.getAuthState(),
        onRead: (state) => this.onRead(state),
      })
    );
  }

  /**
   * Gets and transforms state from different sources into the form that should
   * be saved in storage.
   */
  protected getAuthState(): Observable<SyncedAnonymousConsentsState> {
    return this.store.select(getAnonymousConsentState);
  }

  /**
   * Function called on each browser storage read.
   * Used to update state from browser -> state.
   */
  protected onRead(state: SyncedAnonymousConsentsState) {
    if (state) {
      if (state.templates) {
      }
      if (state.consents) {
        this.store.dispatch(new SetAnonymousConsents(state.consents));
      }
      if (state.ui) {
        this.store.dispatch(
          new ToggleAnonymousConsentsBannerDissmissed(state.ui?.bannerDismissed)
        );
        this.store.dispatch(
          new ToggleAnonymousConsentTemplatesUpdated(state.ui?.updated)
        );
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
