import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfiguratorCommonsService, RoutingService } from '@spartacus/core';
import { ConfigurationRouter } from '../generic/service/config-router-data';
import { ConfigRouterExtractorService } from '../generic/service/config-router-extractor.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-config-loading',
  templateUrl: './config-loading.component.html',
  styleUrls: ['./config-loading.component.css'],
})
export class ConfigLoadingComponent implements OnInit {
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

    this.isConfigurationLoading$ = this.routerData$.pipe(
      switchMap((routerData) =>
        this.configuratorCommonsService.isConfigurationLoading(routerData.owner)
      )
    );
  }
}
