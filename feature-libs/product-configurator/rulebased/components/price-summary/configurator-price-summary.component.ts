import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';

@Component({
  selector: 'cx-configurator-price-summary',
  templateUrl: './configurator-price-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorPriceSummaryComponent {
  configuration$: Observable<Configurator.Configuration> =
    this.configRouterExtractorService.extractRouterData().pipe(
      switchMap((routerData) => {
        return this.configuratorCommonsService.getConfiguration(
          routerData.owner
        );
      })
    );

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService
  ) {}
}
