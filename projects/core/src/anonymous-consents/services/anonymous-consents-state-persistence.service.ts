import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { StatePersistenceService } from '../../state/index';
import { AnonymousConsentsService } from '../facade/index';
import { LoadAnonymousConsentTemplatesSuccess } from '../store/actions/anonymous-consents-group';
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
    protected store: Store<StateWithAnonymousConsents>,
    protected anonymousConsentsService: AnonymousConsentsService
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
      if (state.templates && state.templates.success) {
        this.store.dispatch(
          new LoadAnonymousConsentTemplatesSuccess(state.templates.value)
        );
      }
      if (state.consents) {
        this.anonymousConsentsService.setConsents(state.consents);
      }
      if (state.ui) {
        this.anonymousConsentsService.toggleBannerDismissed(
          state.ui?.bannerDismissed
        );
        this.anonymousConsentsService.toggleTemplatesUpdated(state.ui?.updated);
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
