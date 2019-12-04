import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Configurator, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigRouterExtractorService } from '../service/config-router-extractor.service';

@Component({
  selector: 'cx-config-tab-bar',
  templateUrl: './config-tab-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigTabBarComponent {
  owner$: Observable<Configurator.Owner>;
  configuratorType$: Observable<string>;

  constructor(
    private routingService: RoutingService,
    private configRouterExtractorService: ConfigRouterExtractorService
  ) {
    this.owner$ = this.configRouterExtractorService.extractConfigurationOwner(
      this.routingService
    );

    this.configuratorType$ = routingService
      .getRouterState()
      .pipe(
        map(routingData => this.getConfiguratorType(routingData.state.url))
      );
  }

  isOverviewPage(): Observable<boolean> {
    return this.routingService
      .getRouterState()
      .pipe(map(routingData => routingData.state.url.includes('Overview')));
  }

  getConfiguratorType(url: string): string {
    let configuratorType: string;
    if (url.includes('configureOverview')) {
      configuratorType = url.split('configureOverview')[1].split('/')[0];
    } else if (url.includes('configure')) {
      configuratorType = url.split('configure')[1].split('/')[0];
    }

    return configuratorType;
  }
}
