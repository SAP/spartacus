import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
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
  GlobalMessageType,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { map, filter, tap, first } from 'rxjs/operators';
import { CurrentProductService } from '../current-product.service';
import { ModalService } from '../../../shared';
import { StockNotificationDialogComponent } from './stock-notification-dialog/stock-notification-dialog.component';

@Component({
  selector: 'cx-stock-notification',
  templateUrl: './stock-notification.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

    this.subscribeSuccess$ = this.interestsService.getAddProductInterestSuccess();
    this.unsubscribeLoading$ = this.interestsService.getRemoveProdutInterestLoading();
    this.subscription.add(
      this.interestsService
        .getRemoveProdutInterestSuccess()
        .subscribe(success => {
          if (success) {
            this.subscription.add(
              this.translationService
                .translate('stockNotification.unsubscribeSuccess')
                .pipe(first())
                .subscribe(text =>
                  this.globalMessageService.add(
                    text,
                    GlobalMessageType.MSG_TYPE_INFO
                  )
                )
            );
            this.interestsService.resetRemoveInterestState();
          }
        })
    );
  }

  subscribe() {
    this.openDialog();
    this.interestsService.addProductInterest(
      this.productCode,
      NotificationType.BACK_IN_STOCK
    );
  }

  unsubscribe() {
    this.interestsService.removeProdutInterest(
      {
        product: {
          code: this.productCode,
        },
        productInterestEntry: [
          {
            interestType: NotificationType.BACK_IN_STOCK,
          },
        ],
      },
      true
    );
  }

  private openDialog() {
    const modalInstance = this.modalService.open(
      StockNotificationDialogComponent,
      {
        centered: true,
        size: 'lg',
      }
    ).componentInstance;
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
    this.prefsEnabled$ = this.notificationPrefService
      .getEnabledPreferences()
      .pipe(
        tap(prefs => (this.enabledPrefs = prefs)),
        map(prefs => prefs.length > 0)
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.interestsService.clearProductInterests();
  }
}
