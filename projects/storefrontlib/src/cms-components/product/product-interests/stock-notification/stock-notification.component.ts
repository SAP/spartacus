import { Component, OnInit, Input } from '@angular/core';
import { UserService, OccEndpointsService, ProductInterestService, NotificationType } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'cx-stock-notification',
  templateUrl: './stock-notification.component.html',
  styleUrls: ['./stock-notification.component.scss'],
})
export class StockNotificationComponent implements OnInit {
  @Input()
  productCode: string;

  logged$: Observable<boolean>;
  userId: string;
  channelEnabled$: Observable<boolean>;
  enabledChannels: any[];
  subscribed$: Observable<boolean>;

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private occEndpoints: OccEndpointsService,
    private productInterestService: ProductInterestService,
  ) { }

  ngOnInit() {
    this.logged$ = this.userService.get().pipe(
      tap(user => (this.userId = user.uid)),
      map(user => !!user.uid)
    );
    this.channelEnabled$ = this.http.get<any>(this.notificationPrefUrl).pipe(map((r: any) => {
      this.enabledChannels.splice(0, this.enabledChannels.length);
      r.preferences.forEach((p: any) => {
        if (p.enabled) {
          this.enabledChannels.push(p.channel);
        }
      });
      return this.enabledChannels.length > 0;
    }));
    this.subscribed$ = this.productInterestService
      .getBackInStockSubscribed(this.userId, this.productCode, NotificationType.BACK_IN_STOCK);
  }

  get notificationPrefUrl(): string {
    return this.occEndpoints.getEndpoint(
      '/users/' + this.userId + '/notificationpreferences'
    );
  }
}
