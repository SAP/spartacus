import { Component } from '@angular/core';
import { ConfigRouterExtractorService } from '@spartacus/storefront';
import { interval, Observable } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { ConfiguratorCommonsService } from './../../core/facade/configurator-commons.service';
import { MessageConfig } from './../config/message-config';

@Component({
  selector: 'cx-config-message',
  templateUrl: './config-message.component.html',
})
export class ConfigMessageComponent {
  protected hasPendingChanges$: Observable<
    boolean
  > = this.configRouterExtractorService
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
      )
    );

  visibleClass$: Observable<string> = interval(
    this.config?.updateConfigurationMessage?.waitingTime || 1000
  ).pipe(
    withLatestFrom(this.hasPendingChanges$),
    map(([_, hasPendingChangesOrIsLoading]) =>
      hasPendingChangesOrIsLoading ? 'visible' : ''
    )
  );

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfigRouterExtractorService,
    protected config: MessageConfig
  ) {}
}
