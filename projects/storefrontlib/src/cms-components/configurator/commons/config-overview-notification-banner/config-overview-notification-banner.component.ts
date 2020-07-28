import { Component, OnInit } from '@angular/core';
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
export class ConfigOverviewNotificationBannerComponent implements OnInit {
  entry$: Observable<OrderEntry>;

  constructor(
    protected activeCartService: ActiveCartService,
    private configRouterExtractorService: ConfigRouterExtractorService
  ) {}

  ngOnInit(): void {
    this.entry$ = this.configRouterExtractorService.extractRouterData().pipe(
      filter(
        (routerData) =>
          routerData.owner.type === GenericConfigurator.OwnerType.CART_ENTRY
      ),
      switchMap((routerData) =>
        this.activeCartService.getEntries().pipe(
          map((entries) => {
            return entries.find(
              (entry) => entry.entryNumber === Number(routerData.owner.id)
            );
          })
        )
      )
    );
  }
}
