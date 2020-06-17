import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  ConfiguratorCommonsService,
  GenericConfigurator,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ConfigurationRouter } from '../../generic/service/config-router-data';
import { ConfigRouterExtractorService } from '../../generic/service/config-router-extractor.service';

@Component({
  selector: 'cx-config-tab-bar',
  templateUrl: './config-tab-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigTabBarComponent implements OnInit {
  owner$: Observable<GenericConfigurator.Owner>;
  configuratorType$: Observable<string>;
  routerData$: Observable<ConfigurationRouter.Data>;
  isConfigurationLoading$: Observable<Boolean>;

  constructor(
    private routingService: RoutingService,
    private configRouterExtractorService: ConfigRouterExtractorService,
    private configuratorCommonsService: ConfiguratorCommonsService
  ) {}

  ngOnInit(): void {
    this.routerData$ = this.configRouterExtractorService.extractRouterData(
      this.routingService
    );

    this.owner$ = this.routerData$.pipe(map((routerData) => routerData.owner));

    this.configuratorType$ = this.routerData$.pipe(
      map((routerData) => routerData.configuratorType)
    );

    this.isConfigurationLoading$ = this.owner$.pipe(
      switchMap((owner) =>
        this.configuratorCommonsService.isConfigurationLoading(owner)
      )
    );
  }

  isOverviewPage(): Observable<boolean> {
    return this.configRouterExtractorService
      .extractRouterData(this.routingService)
      .pipe(
        map(
          (routerData) =>
            routerData.pageType === ConfigurationRouter.PageType.OVERVIEW
        )
      );
  }
}
