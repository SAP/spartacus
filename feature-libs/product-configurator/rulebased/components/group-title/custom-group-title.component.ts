import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import {
  ConfiguratorCommonsService,
  ConfiguratorGroupsService,
  ConfiguratorGroupTitleComponent,
} from '@spartacus/product-configurator/rulebased';

@Component({
  selector: 'custom-configurator-group-title',
  templateUrl: './configurator-group-title.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomGroupTitleComponent extends ConfiguratorGroupTitleComponent {
  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configuratorGroupsService: ConfiguratorGroupsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService
  ) {
    super(
      configuratorCommonsService,
      configuratorGroupsService,
      configRouterExtractorService
    );
    this.configuration$.subscribe();
  }
}
