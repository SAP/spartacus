import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {  catchError,  Subscription, throwError } from 'rxjs';
import {
  EventService,
  GlobalMessageService,
  GlobalMessageType,
  I18nModule,
  RoutingService,
  UrlModule,
} from '@spartacus/core';
import {
  CancelSubscriptionFacade,
  CancellationDetails,
  SubscriptionDetail,
  CancelData,
  GetSubscriptionByCodeReloadEvent,
} from '@spartacus/subscription-billing/root';
import {
  CardModule,
  FocusConfig,
  ICON_TYPE,
  IconModule,
  KeyboardFocusModule,
  LaunchDialogService,
} from '@spartacus/storefront';
import { RouterModule } from '@angular/router';
import {  toSignal } from '@angular/core/rxjs-interop';
import { CancelSubscriptionOrderAdapter, CancelSubscriptionOrderConnector, SubscriptionBillingAdapter, SubscriptionBillingCancelService, SubscriptionBillingConnector } from '@spartacus/subscription-billing/core';
import { OccCancelSubscriptionAdapter } from '@spartacus/subscription-billing/occ';
@Component({

  selector: 'cx-subscription-cancel',
  templateUrl: './subscription-cancel.component.html',
  imports: [
    CommonModule,
    CardModule,
    RouterModule,
    ReactiveFormsModule,
    I18nModule,
    UrlModule,
    IconModule,
    KeyboardFocusModule,
  ],
  providers: [
    SubscriptionBillingCancelService,SubscriptionBillingConnector,CancelSubscriptionOrderConnector,
    {
      provide: CancelSubscriptionFacade,
      useExisting: SubscriptionBillingCancelService,
    },
    {
      provide:SubscriptionBillingAdapter,
      useValue:  SubscriptionBillingConnector,
    },
    {
      provide:CancelSubscriptionOrderAdapter,
      useClass:  OccCancelSubscriptionAdapter,
    },

  ],
})

export class SubscriptionCancelComponent implements OnInit, OnDestroy {
  private cancelFacade = inject(CancelSubscriptionFacade);
  private globalMessageService = inject(GlobalMessageService);
  private launchDialogService = inject(LaunchDialogService);
  protected routingService = inject(RoutingService);

  protected eventService = inject(EventService);
  private subscriptions = new Subscription();

  cancelData = signal<CancelData | undefined>(undefined);
  subscriptionCode = signal<string | undefined>(undefined);
  subscriptionDetail = toSignal<
    SubscriptionDetail & { cancelData?: CancelData; code?: string }
  >(this.launchDialogService.data$);

  iconTypes = ICON_TYPE;
  focusConfig: FocusConfig = {
    trap: false,
    block: false,
    autofocus: 'button',
    focusOnEscape: true,
  };

  ngOnInit(): void {
    const detail = this.subscriptionDetail();
    if (!detail) {
      this.onError();
      return;
    }
    this.cancelData.set(detail.cancelData);
  }
getFormattedCancelValidTillDate(cancelData: CancelData | undefined): string {
  if (!cancelData?.subscriptionEndAt) {
    return '';
  }

  const date = new Date(cancelData.subscriptionEndAt);

  if (isNaN(date.getTime())) {
    return cancelData.subscriptionEndAt;
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

  onConfirm(): void {
    const detail = this.subscriptionDetail();
    const cancelData = detail?.cancelData;
    const subscriptionCode = detail?.code;
    const payload: CancellationDetails = {
      // subscriptionId: detail?.id,
      // version: detail?.version,
      // ratePlanId: detail?.ratePlanId,
      // subscriptionEndDate: cancelData?.endDate,
      subscriptionEndAt: cancelData?.subscriptionEndAt,
    };
    const sub = this.cancelFacade
      .cancelSubscription(payload, subscriptionCode)
      .pipe(
        catchError((err) => {
          this.onDialogClose('error');
          this.onError();
          return throwError(() => err);
        })
      )
      .subscribe({
        next: () => {
          this.onDialogClose('Success');
          this.eventService.dispatch({}, GetSubscriptionByCodeReloadEvent);
          this.globalMessageService.add(
            { key: 'cancelSubscription.cancelSuccess' },
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );
        },
      });

    this.subscriptions.add(sub);
  }
  private onError(): void {
    this.globalMessageService.add(
      { key: 'cancelSubscription.unknownError' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  onDialogClose(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }
}
