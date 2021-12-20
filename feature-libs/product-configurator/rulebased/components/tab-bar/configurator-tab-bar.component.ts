import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import {} from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';

@Component({
  selector: 'cx-configurator-tab-bar',
  templateUrl: './configurator-tab-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorTabBarComponent {
  routerData$: Observable<ConfiguratorRouter.Data> =
    this.configRouterExtractorService.extractRouterData();

  //TODO GHOST Better method name
  isReady$: Observable<boolean> = this.routerData$.pipe(
    switchMap((routerData) =>
      this.configuratorCommonsService.isGhostConfiguration(routerData.owner)
    ),
    map((isGhost) => !isGhost)
  );

  isOverviewPage$: Observable<boolean> = this.routerData$.pipe(
    map(
      (routerData) =>
        routerData.pageType === ConfiguratorRouter.PageType.OVERVIEW
    )
  );

  //TODO GHOST add to breaking changes issue
  constructor(
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected configuratorCommonsService: ConfiguratorCommonsService
  ) {}
}
