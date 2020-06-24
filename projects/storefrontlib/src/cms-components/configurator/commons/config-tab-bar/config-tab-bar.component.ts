import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GenericConfigurator, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    private configRouterExtractorService: ConfigRouterExtractorService
  ) {}

  ngOnInit(): void {
    this.routerData$ = this.configRouterExtractorService.extractRouterData(
      this.routingService
    );

    this.owner$ = this.routerData$.pipe(map((routerData) => routerData.owner));

    this.configuratorType$ = this.routerData$.pipe(
      map((routerData) => routerData.configuratorType)
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
