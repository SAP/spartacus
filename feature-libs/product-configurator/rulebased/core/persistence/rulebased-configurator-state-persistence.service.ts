import { Injectable, OnDestroy } from '@angular/core';
import {
  BASE_SITE_CONTEXT_ID,
  SiteContextParamsService,
  StatePersistenceService,
} from '@spartacus/core';
import { Observable, of, Subscription } from 'rxjs';

interface ActiveConfiguration {
  productCode: string;
  configurationId: string;
}

@Injectable({
  providedIn: 'root',
})
export class RulebasedConfiguratorStatePersistenceService implements OnDestroy {
  protected subscription = new Subscription();

  constructor(
    protected statePersistenceService: StatePersistenceService,

    protected siteContextParamsService: SiteContextParamsService
  ) {}

  public initSync() {
    this.subscription.add(
      this.statePersistenceService.syncWithStorage({
        key: 'configuratorRulebased',
        state$: this.getConfiguratorState(),
        context$: this.siteContextParamsService.getValues([
          BASE_SITE_CONTEXT_ID,
        ]),
        onRead: (state) => this.onRead(state),
      })
    );
  }

  protected getConfiguratorState(): Observable<ActiveConfiguration> {
    console.log('CHHI get state ');
    return of({
      configurationId: 'edf13facf4a12',
      productCode: 'CONF_HOME_THEATER',
    });
  }

  protected onRead(state: ActiveConfiguration | undefined) {
    console.log('CHHI onRead ' + JSON.stringify(state));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
