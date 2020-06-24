import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Configurator,
  ConfiguratorCommonsService,
  RoutingService,
} from '@spartacus/core';
import { ConfigurationRouter } from '../../generic/service/config-router-data';
import { ConfigRouterExtractorService } from '../../generic/service/config-router-extractor.service';
import { switchMap } from 'rxjs/operators';
import { BreakpointService } from '../../../../layout/breakpoint/breakpoint.service';
import { BREAKPOINT } from '../../../../layout';

@Component({
  selector: 'cx-config-overview-loading',
  templateUrl: './config-overview-loading.component.html',
  styles: [],
})
export class ConfigOverviewLoadingComponent implements OnInit {
  routerData$: Observable<ConfigurationRouter.Data>;
  breakpoint$: Observable<BREAKPOINT>;
  configuration$: Observable<Configurator.Configuration>;

  constructor(
    private routingService: RoutingService,
    private configRouterExtractorService: ConfigRouterExtractorService,
    private configuratorCommonsService: ConfiguratorCommonsService,
    private breakpointService: BreakpointService
  ) {}

  ngOnInit(): void {
    this.breakpoint$ = this.breakpointService.breakpoint$;

    this.routerData$ = this.configRouterExtractorService.extractRouterData(
      this.routingService
    );

    this.configuration$ = this.routerData$.pipe(
      switchMap((routerData) =>
        this.configuratorCommonsService.getConfiguration(routerData.owner)
      )
    );
  }
}
