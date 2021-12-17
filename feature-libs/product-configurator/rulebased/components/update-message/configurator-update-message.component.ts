import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { Observable, of } from 'rxjs';
import { delay, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
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
        this.configuratorCommonsService
          .hasPendingChanges(routerData.owner)
          .pipe(
            switchMap((hasPendingChanges) =>
              this.configuratorCommonsService
                .isConfigurationLoading(routerData.owner)
                .pipe(map((isLoading) => hasPendingChanges || isLoading))
            )
          )
      ),
      distinctUntilChanged(), // avoid subsequent emissions of the same value from the source observable
      switchMap(
        (isLoading) =>
          isLoading
            ? of(isLoading).pipe(
                delay(
                  this.config.productConfigurator?.updateConfigurationMessage
                    ?.waitingTime || 1000
                )
              ) // delay information if its loading
            : of(isLoading) // inform disappears immediately if it's not loading anymore
      )
    );

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected config: ConfiguratorMessageConfig
  ) {}
}
