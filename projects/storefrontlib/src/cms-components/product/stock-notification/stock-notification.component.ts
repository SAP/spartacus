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
import { Observable, Subscription, combineLatest } from 'rxjs';
import { map, filter, tap, first } from 'rxjs/operators';
import { CurrentProductService } from '../current-product.service';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { StockNotificationDialogComponent } from './stock-notification-dialog/stock-notification-dialog.component';

@Component({
  selector: 'cx-stock-notification',
  templateUrl: './stock-notification.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockNotificationComponent implements OnInit, OnDestroy {
  hasProductInterests$: Observable<boolean>;
  prefsEnabled$: Observable<boolean>;
  outOfStock$: Observable<boolean>;
  isRemoveInterestLoading$: Observable<boolean>;
  anonymous = true;

  private enabledPrefs: NotificationPreference[] = [];
  private productCode: string;
  private subscribeSuccess$: Observable<boolean>;
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
    this.outOfStock$ = combineLatest([
      this.currentProductService.getProduct().pipe(filter(Boolean)),
      this.authService.getOccUserId(),
    ]).pipe(
      tap(([product, userId]: [Product, String]) => {
        this.productCode = product.code;
        if (userId !== OCC_USER_ID_ANONYMOUS) {
          this.anonymous = false;
          this.notificationPrefService.loadPreferences();
          this.interestsService.loadProductInterests(
            null,
            null,
            null,
            product.code,
            NotificationType.BACK_IN_STOCK
          );
        }
      }),
      map(
        ([product]: [Product, String]) =>
          !!product.stock && product.stock.stockLevelStatus === 'outOfStock'
      )
    );

    this.hasProductInterests$ = this.interestsService
      .getProductInterests()
      .pipe(
        map(interests => !!interests.results && interests.results.length === 1)
      );
    this.subscribeSuccess$ = this.interestsService.getAddProductInterestSuccess();
    this.isRemoveInterestLoading$ = this.interestsService.getRemoveProdutInterestLoading();
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
