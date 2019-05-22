import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {
  OccEndpointsService,
  ProductInterestService,
  NotificationType,
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  TranslationService,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { map, tap, first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationDialogComponent } from './notification-dialog/notification-dialog.component';

@Component({
  selector: 'cx-stock-notification',
  templateUrl: './stock-notification.component.html',
})
export class StockNotificationComponent implements OnInit, OnDestroy {
  @Input()
  productCode: string;

  userId: string;
  enabledChannels: any[] = [];
  modalInstance: any;

  logged$: Observable<boolean>;
  channelEnabled$: Observable<boolean>;
  subscribed$: Observable<boolean>;
  subscribeSuccess$: Observable<boolean>;
  unsubscribeLoading$: Observable<boolean>;

  private subscription = new Subscription();

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private ngbModal: NgbModal,
    private occEndpoints: OccEndpointsService,
    private productInterestService: ProductInterestService,
    private globalMessageService: GlobalMessageService,
    private translationService: TranslationService
  ) {}

  ngOnInit() {
    this.logged$ = this.auth.getUserToken().pipe(
      map(user => user.userId),
      tap(userId => {
        if (userId) {
          this.userId = userId;
          this.productInterestService.loadBackInStockSubscribed(
            userId,
            this.productCode,
            NotificationType.BACK_IN_STOCK
          );
        }
        this.channelEnabled$ = this.http
          .get<any>(this.notificationPrefUrl)
          .pipe(
            map((r: any) => {
              this.enabledChannels.splice(0, this.enabledChannels.length);
              r.preferences.forEach((p: any) => {
                if (p.enabled) {
                  this.enabledChannels.push(p);
                }
              });
              return this.enabledChannels.length > 0;
            })
          );
      }),
      map(userId => !!userId)
    );

    this.subscribed$ = this.productInterestService.getBackInStockSubscribed();
    this.subscribeSuccess$ = this.productInterestService.getCreateBackInStockSuccess();
    this.unsubscribeLoading$ = this.productInterestService.getDeleteBackInStockLoading();
    this.subscription.add(
      this.productInterestService
        .getDeleteBackInStockSuccess()
        .subscribe(success => this.onUnsubscribeSuccess(success))
    );
  }

  notify(): void {
    this.openDialog();
    this.productInterestService.createBackInStock(
      this.userId,
      this.productCode,
      NotificationType.BACK_IN_STOCK
    );
  }

  stopNotify(): void {
    this.productInterestService.deleteBackInStock(
      this.userId,
      this.productCode,
      NotificationType.BACK_IN_STOCK
    );
  }

  private onUnsubscribeSuccess(success: boolean): void {
    if (success) {
      this.subscription.add(
        this.translationService
          .translate('stockNotification.unsubscribeSuccess')
          .pipe(first())
          .subscribe(text =>
            this.globalMessageService.add(text, GlobalMessageType.MSG_TYPE_INFO)
          )
      );
      this.productInterestService.resetDeleteState();
    }
  }

  private openDialog(): void {
    this.modalInstance = this.ngbModal.open(NotificationDialogComponent, {
      centered: true,
      size: 'lg',
    }).componentInstance;
    this.modalInstance.subscribeSuccess$ = this.subscribeSuccess$;
    this.modalInstance.selectedChannels = this.enabledChannels;
  }

  get notificationPrefUrl(): string {
    return this.occEndpoints.getEndpoint(
      '/users/' + this.userId + '/notificationpreferences'
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.productInterestService.resetBackInStock();
  }
}
