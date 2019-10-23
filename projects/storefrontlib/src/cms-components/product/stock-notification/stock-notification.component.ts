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
  subscribeFail$: Observable<boolean>;
  unsubscribeLoading$: Observable<boolean>;

  enabledPrefs: NotificationPreference[] = [];
  productCode: string;

  private subscriptions = new Subscription();

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
        this.subscribed$ = this.interestsService
          .getProductInterests()
          .pipe(
            map(
              interests => !!interests.results && interests.results.length === 1
            )
          );
        this.anonymous$ = this.authService.getOccUserId().pipe(
          map(userId => userId === OCC_USER_ID_ANONYMOUS),
          tap(anonymous => {
            if (!anonymous) {
              this.notificationPrefService.loadPreferences();
              this.interestsService.loadProductInterests(
                null,
                null,
                null,
                product.code,
                NotificationType.BACK_IN_STOCK
              );
            }
          })
        );
      }),
      map(
        (product: Product) =>
          !!product.stock && product.stock.stockLevelStatus === 'outOfStock'
      )
    );

    this.subscribeSuccess$ = this.interestsService.getAddProductInterestSuccess();
    this.unsubscribeLoading$ = this.interestsService.getRemoveProdutInterestLoading();
    this.prefsEnabled$ = this.notificationPrefService
      .getEnabledPreferences()
      .pipe(
        tap(prefs => (this.enabledPrefs = prefs)),
        map(prefs => prefs.length > 0)
      );

    this.subscriptions.add(
      this.interestsService.getAddProductInterestError().subscribe(error => {
        if (error) {
          this.onInterestAddingError();
        }
      })
    );
    this.subscriptions.add(
      this.interestsService
        .getRemoveProdutInterestSuccess()
        .subscribe(success => {
          if (success) {
            this.onInterestRemovingSuccess();
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

  private onInterestRemovingSuccess() {
    this.subscriptions.add(
      this.translationService
        .translate('stockNotification.unsubscribeSuccess')
        .pipe(first())
        .subscribe(text =>
          this.globalMessageService.add(text, GlobalMessageType.MSG_TYPE_INFO)
        )
    );
    this.interestsService.resetRemoveInterestState();
  }

  private onInterestAddingError() {
    this.modalService.dismissActiveModal();
    this.interestsService.resetAddInterestState();
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.interestsService.clearProductInterests();
    this.notificationPrefService.clearPreferences();
  }
}
