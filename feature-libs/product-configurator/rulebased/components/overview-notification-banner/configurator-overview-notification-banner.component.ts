import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  CommonConfigurator,
  CommonConfiguratorUtilsService,
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';

@Component({
  selector: 'cx-configurator-overview-notification-banner',
  templateUrl: './configurator-overview-notification-banner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorOverviewNotificationBannerComponent {
  routerData$: Observable<ConfiguratorRouter.Data> =
    this.configRouterExtractorService.extractRouterData();

  configuration$: Observable<Configurator.Configuration> =
    this.routerData$.pipe(
      filter(
        (routerData) =>
          routerData.owner.type === CommonConfigurator.OwnerType.PRODUCT ||
          routerData.owner.type === CommonConfigurator.OwnerType.CART_ENTRY
      ),
      switchMap((routerData) =>
        this.configuratorCommonsService.getConfiguration(routerData.owner)
      )
    );

  configurationOverview$: Observable<Configurator.Overview | undefined> =
    this.configuration$.pipe(map((configuration) => configuration.overview));

  numberOfIssues$: Observable<number> = this.configuration$.pipe(
    map((configuration) => {
      //In case overview carries number of issues: We take it from there.
      //otherwise configuration's number will be accurate
      if (configuration.overview?.totalNumberOfIssues) {
        return configuration.overview.totalNumberOfIssues;
      } else
        return configuration.totalNumberOfIssues
          ? configuration.totalNumberOfIssues
          : 0;
    })
  );

  iconTypes = ICON_TYPE;

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected commonConfigUtilsService: CommonConfiguratorUtilsService
  ) {}
}
