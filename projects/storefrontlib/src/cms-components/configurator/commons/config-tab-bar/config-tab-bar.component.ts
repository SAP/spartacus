import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-config-tab-bar',
  templateUrl: './config-tab-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigTabBarComponent {
  productCode$: Observable<string>;
  configuratorType$: Observable<string>;

  constructor(private routingService: RoutingService) {
    this.productCode$ = routingService
      .getRouterState()
      .pipe(map(routingData => routingData.state.params.rootProduct));

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
