import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Configurator } from '@spartacus/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';

@Component({
  selector: 'cx-config-price-summary',
  templateUrl: './configurator-price-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorPriceSummaryComponent {
  configuration$: Observable<
    Configurator.Configuration
  > = this.configRouterExtractorService.extractRouterData().pipe(
    switchMap((routerData) => {
      return this.configuratorCommonsService.getConfiguration(routerData.owner);
    })
  );

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService
  ) {}
}
