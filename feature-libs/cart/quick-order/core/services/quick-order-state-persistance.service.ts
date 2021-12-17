import { Injectable, OnDestroy } from '@angular/core';
import { QuickOrderFacade } from '@spartacus/cart/quick-order/root';
import {
  BASE_SITE_CONTEXT_ID,
  OrderEntry,
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

  protected onRead(state: OrderEntry[] | undefined): void {
    if (state) {
      this.quickOrderService.loadEntries(state);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
