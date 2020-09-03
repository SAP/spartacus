import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Configurator } from '@spartacus/core';
import { ConfigRouterExtractorService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ConfiguratorCommonsService } from './../../core/facade/configurator-commons.service';

@Component({
  selector: 'cx-config-price-summary',
  templateUrl: './config-price-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigPriceSummaryComponent {
  configuration$: Observable<
    Configurator.Configuration
  > = this.configRouterExtractorService.extractRouterData().pipe(
    switchMap((routerData) => {
      return this.configuratorCommonsService.getConfiguration(routerData.owner);
    })
  );

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfigRouterExtractorService
  ) {}
}
