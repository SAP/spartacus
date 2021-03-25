import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ConfiguratorRouterExtractorService } from '../../../common/components/service/configurator-router-extractor.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import { IconModule } from '@spartacus/storefront';

@Component({
  selector: 'cx-configuration-conflict-and-error-messages',
  templateUrl: './configurator-conflict-and-error-messages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorConflictAndErrorMessages {
  iconTypes = IconModule;
  configuration$: Observable<Configurator.Configuration> = this.configRouterExtractorService
    .extractRouterData()
    .pipe(
      switchMap((routerData) =>
        this.configuratorCommonsService.getConfiguration(routerData.owner)
      )
    );

  showWarnings = true;

  toggleWarnings(): void {
    this.showWarnings = !this.showWarnings;
  }

  showErrors = true;

  toggleErrors(): void {
    this.showErrors = !this.showErrors;
  }

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService
  ) {}
}
