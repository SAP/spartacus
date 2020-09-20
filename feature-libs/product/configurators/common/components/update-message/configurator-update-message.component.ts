import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { MessageConfig } from '../config/message-config';
import { ConfiguratorRouterExtractorService } from '../service/configurator-router-extractor.service';

@Component({
  selector: 'cx-configurator-update-message',
  templateUrl: './configurator-update-message.component.html',
})
export class ConfiguratorUpdateMessageComponent {
  protected hasPendingChanges$: Observable<
    boolean
  > = this.configRouterExtractorService.extractRouterData().pipe(
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
                this.config?.updateConfigurationMessage?.waitingTime || 1000
              )
            ) // delay information if its loading
          : of(isLoading) // inform immediately if it's not loading anymore
    )
  );

  visibleClass$: Observable<string> = this.hasPendingChanges$.pipe(
    map((hasPendingChangesOrIsLoading) =>
      hasPendingChangesOrIsLoading ? 'visible' : ''
    )
  );

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected config: MessageConfig
  ) {}
}
