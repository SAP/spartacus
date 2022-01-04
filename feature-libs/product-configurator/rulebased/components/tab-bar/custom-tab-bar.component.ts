import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import {
  ConfiguratorCommonsService,
  ConfiguratorTabBarComponent,
} from '@spartacus/product-configurator/rulebased';
import {} from '@spartacus/storefront';

@Component({
  selector: 'custom-configurator-tab-bar',
  templateUrl: './configurator-tab-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomTabBarComponen extends ConfiguratorTabBarComponent {
  constructor(
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    configuratorCommonsService: ConfiguratorCommonsService
  ) {
    super(configRouterExtractorService, configuratorCommonsService);
  }
}
