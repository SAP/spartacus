import { Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { RoutingService } from '@spartacus/core';
import { ConfiguratorModelUtils } from '@spartacus/product-configurator/common';
import { Subscription } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { StateWithConfigurator } from '../../state/configurator-state';
import { ConfiguratorSelectors } from '../../state/selectors';
import { ConfiguratorCommonsService } from '../configurator-commons.service';

@Injectable({ providedIn: 'root' })
export class ConfiguratorRouterListener implements OnDestroy {
  protected subscription = new Subscription();
  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected routingService: RoutingService,
    protected store: Store<StateWithConfigurator>
  ) {
    this.observeRouterChanges();
  }

  protected observeRouterChanges(): void {
    this.subscription.add(
      this.routingService.getRouterState().subscribe((routerState) => {
        if (!this.isConfiguratorRelatedRoute(routerState.state.semanticRoute)) {
          this.deleteProductBoundConfigurations();
        }
      })
    );
  }

  protected isConfiguratorRelatedRoute(semanticRoute?: string): boolean {
    return semanticRoute ? semanticRoute.includes('configure') : false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected deleteProductBoundConfigurations() {
    this.store
      .pipe(
        select(ConfiguratorSelectors.getConfigurationsState),
        filter((state) => state !== undefined),
        switchMap(() =>
          this.store.pipe(
            select(ConfiguratorSelectors.getConfigurationState),
            map((state) => state.entities)
          )
        ),
        take(1)
      )
      .subscribe((entities) => {
        for (const entity in entities) {
          if (entity.startsWith('product')) {
            const owner = ConfiguratorModelUtils.createInitialOwner();
            owner.key = entity;
            this.configuratorCommonsService.removeConfiguration(owner);
          }
        }
      });
  }
}
