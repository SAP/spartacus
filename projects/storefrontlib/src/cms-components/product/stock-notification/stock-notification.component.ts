import { Component, OnInit } from '@angular/core';
import {
  UserInterestsService,
  UserNotificationPreferenceService,
  AuthService,
  OCC_USER_ID_ANONYMOUS,
  NotificationPreference,
  NotificationType,
  Product,
  AuthRedirectService,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { CurrentProductService } from '../current-product.service';

@Component({
  selector: 'cx-stock-notification',
  templateUrl: './stock-notification.component.html',
})
export class StockNotificationComponent implements OnInit {

  anonymous$: Observable<boolean>;
  subscribed$: Observable<boolean>;
  prefsEnabled$: Observable<boolean>;
  outOfStock$: Observable<boolean>;

  enabledPrefs: NotificationPreference[] = [];
  productCode: string;

  constructor(
    private authService: AuthService,
    private routingService: RoutingService,
    private authRedirectService: AuthRedirectService,
    private currentProductService: CurrentProductService,
    private interestsService: UserInterestsService,
    private notificationPrefService: UserNotificationPreferenceService
  ) {}

  ngOnInit() {
    this.outOfStock$ = this.currentProductService.getProduct().pipe(
      filter(Boolean),
      tap((product: Product) => {
        this.productCode = product.code;
        this.anonymous$ = this.authService.getOccUserId().pipe(
          map(userId => {
            if (userId !== OCC_USER_ID_ANONYMOUS) {
              this.hasSubscribed(product.code);
              this.hasEnabledPrefs();
              return false;
            }
            return true;
          })
        );
      }),
      map(
        (product: Product) =>
          !(
            !!product.stock &&
            product.stock.stockLevelStatus !== 'outOfStock' &&
            product.stock.stockLevel > 0
          )
      )
    );
  }

  subscribe(){
    this.anonymous$.subscribe(anoymous => {
      if(anoymous){
        this.authRedirectService.reportAuthGuard();
        this.routingService.go({ cxRoute: 'login' });
      }else{
        
      }
    });
  }

  unsubscribe(){
    
  }


  private hasSubscribed(productCode: string): void {
    this.subscribed$ = this.interestsService
      .getProdutInterests(0, productCode, NotificationType.BACK_IN_STOCK)
      .pipe(
        map(interests => !!interests.results && interests.results.length > 0)
      );
  }

  private hasEnabledPrefs(): void {
    this.notificationPrefService.loadPreferences();
    this.prefsEnabled$ = this.notificationPrefService.getPreferences().pipe(
      map(prefs => {
        this.enabledPrefs.splice(0, this.enabledPrefs.length);
        prefs.forEach(pref => {
          if (pref.enabled) {
            this.enabledPrefs.push(pref);
          }
        });
        return this.enabledPrefs.length > 0;
      })
    );
  }

}
