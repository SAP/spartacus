import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorMessageConfig } from '../config/configurator-message.config';

@Component({
  selector: 'cx-configurator-update-message',
  templateUrl: './configurator-update-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorUpdateMessageComponent {
  hasPendingChanges$: Observable<boolean> = this.configRouterExtractorService
    .extractRouterData()
    .pipe(
      switchMap((routerData) =>
        this.configuratorCommonsService.hasPendingChanges(routerData.owner)
      ),
      distinctUntilChanged() // avoid subsequent emissions of the same value from the source observable
    );

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected config: ConfiguratorMessageConfig
  ) {}
}
