import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import { IconModule } from '@spartacus/storefront';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';

@Component({
  selector: 'cx-configuration-conflict-and-error-messages',
  templateUrl: './configurator-conflict-and-error-messages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorConflictAndErrorMessagesComponent {
  iconTypes = IconModule;
  configuration$: Observable<Configurator.Configuration> = this.configRouterExtractorService
    .extractRouterData()
    .pipe(
      switchMap((routerData) =>
        this.configuratorCommonsService.getConfiguration(routerData.owner)
      )
    );

  showWarnings = false;

  toggleWarnings(): void {
    this.showWarnings = !this.showWarnings;
  }

  showErrors = false;

  toggleErrors(): void {
    this.showErrors = !this.showErrors;
  }

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService
  ) {}
}
