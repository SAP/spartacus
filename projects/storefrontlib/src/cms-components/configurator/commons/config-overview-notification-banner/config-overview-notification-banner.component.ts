import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActiveCartService, OrderEntry } from '@spartacus/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'cx-config-overview-notification-banner',
  templateUrl: './config-overview-notification-banner.component.html',
  styles: [
  ]
})
export class ConfigOverviewNotificationBannerComponent implements OnInit {
  entries$: Observable<OrderEntry[]>;

  constructor( protected activeCartService: ActiveCartService) { }

  ngOnInit(): void {
    this.entries$ = this.activeCartService
      .getEntries()
      .pipe(filter((entries) => entries.length > 0));
  }

}
