import { Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  BASE_SITE_CONTEXT_ID,
  SiteContextParamsService,
  StatePersistenceService,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilKeyChanged } from 'rxjs/operators';
import { Configurator } from '../model/configurator.model';
import { ConfiguratorActions } from '../state/actions';
import { StateWithConfigurator } from '../state/configurator-state';
import { ConfiguratorSelectors } from '../state/selectors';

@Injectable({
  providedIn: 'root',
})
export class RulebasedConfiguratorStatePersistenceService implements OnDestroy {
  protected subscription = new Subscription();

  constructor(
    protected statePersistenceService: StatePersistenceService,
    protected store: Store<StateWithConfigurator>,
    protected siteContextParamsService: SiteContextParamsService
  ) {}

  public initSync() {
    this.subscription.add(
      this.statePersistenceService.syncWithStorage({
        key: 'configuratorRulebased',
        state$: this.getActiveConfiguration(),
        context$: this.siteContextParamsService.getValues([
          BASE_SITE_CONTEXT_ID,
        ]),
        onRead: (state) => this.onRead(state),
      })
    );
  }

  protected getActiveConfiguration(): Observable<Configurator.ActiveConfiguration> {
    console.log('CHHI get state ');
    return this.store.pipe(
      select(ConfiguratorSelectors.getActiveConfiguration),
      distinctUntilKeyChanged('configurationId')
    );
  }

  protected onRead(state: Configurator.ActiveConfiguration | undefined) {
    console.log('CHHI onRead ' + JSON.stringify(state));
    if (state) {
      this.store.dispatch(
        new ConfiguratorActions.SetActiveConfiguration(state)
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
