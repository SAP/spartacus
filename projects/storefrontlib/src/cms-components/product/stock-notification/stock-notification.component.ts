import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  UserInterestsService,
  UserNotificationPreferenceService,
  AuthService,
  OCC_USER_ID_ANONYMOUS,
  NotificationPreference,
  NotificationType,
  Product,
  GlobalMessageService,
  TranslationService,
  GlobalMessageType
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { map, filter, tap, first } from 'rxjs/operators';
import { CurrentProductService } from '../current-product.service';
import { ModalService } from '../../../shared';
import { StockNotificationDialogComponent } from './stock-notification-dialog/stock-notification-dialog.component';

@Component({
  selector: 'cx-stock-notification',
  templateUrl: './stock-notification.component.html',
})
export class StockNotificationComponent implements OnInit, OnDestroy {

  anonymous$: Observable<boolean>;
  subscribed$: Observable<boolean>;
  prefsEnabled$: Observable<boolean>;
  outOfStock$: Observable<boolean>;
  subscribeSuccess$: Observable<boolean>;
  unsubscribeLoading$: Observable<boolean>;
  unsubscribeSuccess$: Observable<boolean>;

  enabledPrefs: NotificationPreference[] = [];
  productCode: string;

  private subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private currentProductService: CurrentProductService,
    private globalMessageService: GlobalMessageService,
    private translationService: TranslationService,
    private interestsService: UserInterestsService,
    private modalService: ModalService,
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

    this.subscribeSuccess$ = this.interestsService.getAddProductInterestLoading();
    this.unsubscribeLoading$ = this.interestsService.getRemoveProdutInterestLoading();
    this.subscription.add(this.interestsService.getRemoveProdutInterestSuccess().subscribe(
      success => {
        if(success){
          this.subscription.add(
            this.translationService
              .translate('stockNotification.unsubscribeSuccess')
              .pipe(first())
              .subscribe(text =>
                this.globalMessageService.add(text, GlobalMessageType.MSG_TYPE_INFO)
              )
          )
        }
      }
    ))
  }

  subscribe(){
    this.interestsService.addProductInterest(this.productCode, NotificationType.BACK_IN_STOCK);
    this.openDialog();
  }

  unsubscribe(){
    this.interestsService.removeProdutInterest({
      product: {
        code: this.productCode
      },
      productInterestEntry: [{
        interestType: NotificationType.BACK_IN_STOCK
      }]
    });
  }

  private openDialog(){
    const modalInstance = this.modalService.open(StockNotificationDialogComponent, {
      centered: true,
      size: 'lg',
    }).componentInstance;

    modalInstance.subscribeSuccess$ = this.subscribeSuccess$;
    modalInstance.enabledPrefs = this.enabledPrefs;
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
