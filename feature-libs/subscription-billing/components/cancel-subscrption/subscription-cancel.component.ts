import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { catchError, of, Subscription, throwError } from 'rxjs';
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
  SpinnerModule,
} from '@spartacus/storefront';
import { RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'cx-subscription-cancel',
  templateUrl: './subscription-cancel.component.html',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    RouterModule,
    ReactiveFormsModule,
    I18nModule,
    UrlModule,
    IconModule,
    KeyboardFocusModule,
    SpinnerModule,
  ],
})
export class SubscriptionCancelComponent implements OnInit, OnDestroy {
  private cancelFacade = inject(CancelSubscriptionFacade);
  private globalMessageService = inject(GlobalMessageService);
  private launchDialogService = inject(LaunchDialogService);
  protected routingService = inject(RoutingService);
  protected eventService = inject(EventService);
  private subscriptions = new Subscription();

// Signals
  cancelData = signal<CancelData | undefined>(undefined);
  subscriptionCode = signal<string | undefined>(undefined);
  mode = signal<'cancel' | 'withdraw' | 'resubscribe'>('cancel');

  subscriptionDetail = toSignal<SubscriptionDetail & { code?: string; mode?: 'cancel' | 'withdraw' }>(
    this.launchDialogService.data$
  );

  iconTypes = ICON_TYPE;
  focusConfig: FocusConfig = {
    trap: false,
    block: false,
    autofocus: 'button',
    focusOnEscape: true,
  };

  ngOnInit(): void {
    const detail = this.subscriptionDetail();
    const code = detail?.code;
    const currentMode = detail?.mode || 'cancel';

    if (!code) {
      this.onError();
      return;
    }

    this.subscriptionCode.set(code);
    this.mode.set(currentMode);

    // ✅ Only call API if in cancel mode
    if (currentMode === 'cancel') {
      const sub = this.cancelFacade
        .cancellationSubscriptionEffectiveDate(code)
        .pipe(
          catchError(() => {
            this.onError();
            return of(undefined);
          })
        )
        .subscribe((data) => {
          if (data) {
            this.cancelData.set(data);
          }
        });

      this.subscriptions.add(sub);
    }
  }

  onConfirm(): void {
    const code = this.subscriptionCode();
    const cancelData = this.cancelData();
    const detail = this.subscriptionDetail();

    if (!code || !detail) {
      this.onError();
      return;
    }

    if (this.mode() === 'cancel') {
      if (!cancelData?.subscriptionEndAt) {
        this.onError();
        return;
      }

      const payload: CancellationDetails = {
        subscriptionEndAt: cancelData.subscriptionEndAt,
      };

      const sub = this.cancelFacade
        .cancelSubscription(payload, code)
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

    if (this.mode() === 'withdraw') {
      const payload = {
        subscriptionId: detail.id,
      };

      const sub = this.cancelFacade
        .withdrawal(payload, code)
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
              { key: 'cancelSubscription.withdrawSuccess' },
              GlobalMessageType.MSG_TYPE_CONFIRMATION
            );
          },
        });

      this.subscriptions.add(sub);
    }
    if (this.mode() === 'resubscribe') {
  const code = this.subscriptionCode();
  const sub = this.cancelFacade
    .reverseCancellation(code)
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
          { key: 'cancelSubscription.reverseCancellationSuccess' },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
      },
    });

  this.subscriptions.add(sub);
}

  }

  getFormattedCancelValidTillDate(cancelData: CancelData | undefined): string {
    if (!cancelData?.subscriptionEndAt) return '';
    const date = new Date(cancelData.subscriptionEndAt);
    if (isNaN(date.getTime())) return cancelData.subscriptionEndAt;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  onDialogClose(reason: string): void {
    this.launchDialogService.closeDialog(reason);
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
}
