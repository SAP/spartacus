import { Injectable, OnDestroy } from '@angular/core';
import {
  BASE_SITE_CONTEXT_ID,
  SiteContextParamsService,
  StatePersistenceService,
} from '@spartacus/core';
import { Observable, of, Subscription } from 'rxjs';
import { QuickOrderService } from './quick-order.service';

@Injectable({
  providedIn: 'root',
})
export class QuickOrderStatePersistenceService implements OnDestroy {
  protected subscription = new Subscription();

  constructor(
    protected quicOrderService: QuickOrderService,
    protected statePersistenceService: StatePersistenceService,
    protected siteContextParamsService: SiteContextParamsService
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
        state$: this.quicOrderService.getProducts(),
        context$: this.siteContextParamsService.getValues([
          BASE_SITE_CONTEXT_ID,
        ]),
        onRead: (state) => this.onRead(state),
      })
    );
  }

  /**
   * Initializes the synchronization between state and browser storage.
   */
  getProductsList(): boolean {
    console.log(this.readStateFromStorage());
    return this.readStateFromStorage();
  }

  /**
   * Function called on each browser storage read.
   * Used to update state from browser -> state.
   */
  protected onRead(state: any) {
    console.log('onRead', state);
    // TODO
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
