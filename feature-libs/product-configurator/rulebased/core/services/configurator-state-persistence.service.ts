import { Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  BASE_SITE_CONTEXT_ID,
  SiteContextParamsService,
  StatePersistenceService,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilKeyChanged, filter, map } from 'rxjs/operators';
import { StateWithConfigurator } from '../state/configurator-state';
import { ConfiguratorSelectors } from '../state/selectors';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorStatePersistenceService implements OnDestroy {
  protected subscription = new Subscription();

  constructor(
    protected statePersistenceService: StatePersistenceService,
    protected store: Store<StateWithConfigurator>,
    protected siteContextParamsService: SiteContextParamsService
  ) {}

  public initSync() {
    this.subscription.add(
      this.statePersistenceService.syncWithStorage({
        key: 'cart',
        state$: this.getCartState(),
        context$: this.siteContextParamsService.getValues([
          BASE_SITE_CONTEXT_ID,
        ]),
        onRead: (state) => this.onRead(state),
      })
    );
  }

  protected getCartState(): Observable<{ active: string }> {
    return this.store.pipe(
      select(ConfiguratorSelectors.getConfigurationState),
      filter((state) => !!state),
      distinctUntilKeyChanged('entities'),
      map((state) => {
        return {
          active: state.entities,
        };
      })
    );
  }

  protected onRead(state: { active: string } | undefined) {
    this.store.dispatch(new CartActions.ClearCartState());
    if (state) {
      this.store.dispatch(new CartActions.SetActiveCartId(state.active));
    } else {
      this.store.dispatch(new CartActions.SetActiveCartId(''));
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
