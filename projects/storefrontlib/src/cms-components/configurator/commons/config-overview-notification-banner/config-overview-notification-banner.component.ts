import { Component } from '@angular/core';
import {
  ActiveCartService,
  GenericConfigurator,
  OrderEntry,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { ConfigRouterExtractorService } from '../../generic/service/config-router-extractor.service';

@Component({
  selector: 'cx-config-overview-notification-banner',
  templateUrl: './config-overview-notification-banner.component.html',
  styles: [],
})
export class ConfigOverviewNotificationBannerComponent {
  entry$: Observable<OrderEntry> = this.activeCartService.getEntries().pipe(
    filter((entries) => entries.length > 0),
    switchMap((entries) =>
      this.configRouterExtractorService
        .extractRouterData()
        .pipe(
          filter(
            (routerData) =>
              routerData.owner.type === GenericConfigurator.OwnerType.CART_ENTRY
          )
        )
        .pipe(
          map((routerData) => {
            return entries.find(
              (entry) => entry.entryNumber === Number(routerData.owner.id)
            );
          })
        )
    )
  );

  constructor(
    private activeCartService: ActiveCartService,
    private configRouterExtractorService: ConfigRouterExtractorService
  ) {}
}
