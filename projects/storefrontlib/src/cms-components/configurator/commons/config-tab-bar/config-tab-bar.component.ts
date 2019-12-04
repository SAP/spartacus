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

    this.configuratorType$ = this.configRouterExtractorService.getConfiguratorType(
      routingService
    );
  }

  isOverviewPage(): Observable<boolean> {
    return this.configRouterExtractorService
      .isOverview(this.routingService)
      .pipe(map(isOverview => isOverview.isOverview));
  }
}
