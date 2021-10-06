import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import {} from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-configurator-tab-bar',
  templateUrl: './configurator-tab-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorTabBarComponent {
  routerData$: Observable<ConfiguratorRouter.Data> =
    this.configRouterExtractorService.extractRouterData();

  isOverviewPage$: Observable<boolean> = this.routerData$.pipe(
    map(
      (routerData) =>
        routerData.pageType === ConfiguratorRouter.PageType.OVERVIEW
    )
  );

  constructor(
    protected configRouterExtractorService: ConfiguratorRouterExtractorService
  ) {}
}
