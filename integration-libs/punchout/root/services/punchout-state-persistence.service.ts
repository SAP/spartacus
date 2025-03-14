import { inject, Injectable, OnDestroy } from '@angular/core';
import { RoutingService, StatePersistenceService } from '@spartacus/core';
import { map, Observable, Subscription, take } from 'rxjs';
import { PunchoutFacade } from '../facade';
import { PunchoutState } from '../model';
import { PunchoutDetectionService } from './punchout-detection.service';
import { PunchoutStoreService } from './punchout-store.service';

@Injectable({ providedIn: 'root' })
export class PunchoutStatePersistanceService implements OnDestroy {
  protected punchoutStatePersistenceService = inject(StatePersistenceService);
  protected punchoutStoreService = inject(PunchoutStoreService);
  protected routingService = inject(RoutingService);
  protected subscription = new Subscription();
  protected punchoutFacade = inject(PunchoutFacade);
  protected punchoutDetectionService = inject(PunchoutDetectionService);
  /**
   * Identifier used for storage key.
   */
  protected key = 'punchout';

  /**
   * Initializes the synchronization between state and browser storage.
   */
  public initSync() {
    this.subscription.add(
      this.punchoutStatePersistenceService.syncWithStorage({
        key: this.key,
        state$: this.getPunchoutSessionId(),
        onRead: (state) => this.onRead(state),
      })
    );
  }

  /**
   * Gets and transforms state from different sources into the form that should
   * be saved in storage.
   */
  protected getPunchoutSessionId(): Observable<PunchoutState> {
    return this.punchoutStoreService.getPunchoutState().pipe(
      map((punchoutState) => {
        //  const { token, ...stateSession } = punchoutSession?.session;
        return { sessionId: punchoutState.sessionId };
      })
    );
  }

  /**
   * Function called on each browser storage read.
   * Used to update state from browser -> state.
   */
  protected onRead(state: PunchoutState | undefined) {
    console.log('flo onRead0');
    if (
      state?.sessionId &&
      !this.punchoutDetectionService.isPunchoutSessionPage()
    ) {
      console.log('flo onRead1');
      this.punchoutFacade
        .getPunchoutSession(state?.sessionId, true)
        .pipe(take(1))
        .subscribe(() => {
          console.log('flo onRead2');
        });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
