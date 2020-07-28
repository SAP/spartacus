import { Component } from '@angular/core';
import { ConfiguratorCommonsService } from '@spartacus/core';
import { ConfigRouterExtractorService } from '@spartacus/storefront';
import { interval, Observable } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'cx-config-message',
  templateUrl: './config-message.component.html',
})
export class ConfigMessageComponent {
  protected hasPendingChanges$: Observable<
    Boolean
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

  visibleClass$: Observable<string> = interval(1000).pipe(
    withLatestFrom(this.hasPendingChanges$),
    map((hasPendingChangesOrIsLoading) =>
      hasPendingChangesOrIsLoading[1] ? 'visible' : ''
    )
  );

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfigRouterExtractorService
  ) {}
}
