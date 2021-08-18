import { Injectable, OnDestroy } from '@angular/core';
import { QuickOrderFacade } from '@spartacus/cart/quick-order/root';
import {
  BASE_SITE_CONTEXT_ID,
  SiteContextParamsService,
  StatePersistenceService,
  StorageSyncType,
} from '@spartacus/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuickOrderStatePersistenceService implements OnDestroy {
  protected subscription = new Subscription();

  constructor(
    protected quickOrderService: QuickOrderFacade,
    protected siteContextParamsService: SiteContextParamsService,
    protected statePersistenceService: StatePersistenceService
  ) {}

  /**
   * Identifier used for storage key.
   */
  protected key = 'quick-order';

  /**
   * Initializes the synchronization between state and browser storage.
   */
  initSync(): void {
    this.subscription.add(
      this.statePersistenceService.syncWithStorage({
        key: this.key,
        state$: this.quickOrderService.getEntries(),
        context$: this.siteContextParamsService.getValues([
          BASE_SITE_CONTEXT_ID,
        ]),
        storageType: StorageSyncType.SESSION_STORAGE,
        onRead: (state) => this.onRead(state),
      })
    );
  }

  /**
   * Function called on each browser storage read.
   * Used to update state from browser -> state.
   */
  protected onRead(state: any): void {
    this.quickOrderService.loadEntries(state);
  }

  /**
   * Reads synchronously state from storage and returns it.
   */
  protected readStateFromStorage() {
    return this.statePersistenceService.readStateFromStorage<any>({
      key: this.key,
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
