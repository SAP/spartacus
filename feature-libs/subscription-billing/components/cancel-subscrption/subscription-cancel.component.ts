import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  signal,
} from '@angular/core';
import { catchError, of, Observable } from 'rxjs';
import {
  CancelSubscriptionFacade,
  CancellationDetails,
  SubscriptionDetail,
  CancelData,
  GetSubscriptionByCodeReloadEvent,
} from '@spartacus/subscription-billing/root';
import {
  EventService,
  GlobalMessageService,
  GlobalMessageType,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
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
import { toSignal, takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'cx-subscription-cancel',
  standalone: true,
  templateUrl: './subscription-cancel.component.html',
  imports: [
    CommonModule,
    CardModule,
    RouterModule,
    I18nModule,
    UrlModule,
    IconModule,
    KeyboardFocusModule,
    SpinnerModule,
  ],
})
export class SubscriptionCancelComponent {
  // === Inject services ===
  private cancelFacade = inject(CancelSubscriptionFacade);
  private globalMessageService = inject(GlobalMessageService);
  private launchDialogService = inject(LaunchDialogService);
  private eventService = inject(EventService);
  private destroyRef = inject(DestroyRef);

  // === Signals ===
  private subscriptionDetailSignal = toSignal(
    this.launchDialogService.data$ as Observable<
      SubscriptionDetail & {
        code?: string;
        mode?: 'cancel' | 'withdraw' | 'resubscribe';
      }
    >
  );

  mode = computed(() => this.subscriptionDetailSignal()?.mode ?? 'cancel');
  subscriptionCode = computed(
    () => this.subscriptionDetailSignal()?.code ?? ''
  );
  cancelData = signal<CancelData | undefined>(undefined);

  iconTypes = ICON_TYPE;

  focusConfig: FocusConfig = {
    trap: false,
    block: false,
    autofocus: 'button',
    focusOnEscape: true,
  };
  constructor() {
    // === Reactive loader for cancel data ===
    effect(() => {
      const mode = this.mode();
      const code = this.subscriptionCode();

      if (mode === 'cancel' && code) {
        this.cancelFacade
          .cancellationSubscriptionEffectiveDate(code)
          .pipe(
            takeUntilDestroyed(this.destroyRef),
            catchError(() => {
              this.onError();
              return of(undefined);
            })
          )
          .subscribe((data) => {
            this.cancelData.set(data);
          });
      }
    });
  }
  // === Confirm button handler ===
  onConfirm(): void {
    const mode = this.mode();
    const code = this.subscriptionCode();
    const detail = this.subscriptionDetailSignal();
    const cancelDataVal = this.cancelData();

    if (!code || !detail) {
      this.onError();
      return;
    }

    const handlers: Record<string, () => void> = {
      cancel: () => {
        if (!cancelDataVal?.subscriptionEndAt) {
          this.onError();
          return;
        }

        const payload: CancellationDetails = {
          subscriptionEndAt: cancelDataVal.subscriptionEndAt,
        };

        this.cancelFacade
          .cancelSubscription(payload, code)
          .pipe(takeUntilDestroyed(this.destroyRef), this.handleError())
          .subscribe(this.handleSuccess('cancelSubscription.cancelSuccess'));
      },

      withdraw: () => {
        this.cancelFacade
          .withdrawal({ subscriptionId: detail.id }, code)
          .pipe(takeUntilDestroyed(this.destroyRef), this.handleError())
          .subscribe(this.handleSuccess('cancelSubscription.withdrawSuccess'));
      },

      resubscribe: () => {
        this.cancelFacade
          .reverseCancellation(code)
          .pipe(takeUntilDestroyed(this.destroyRef), this.handleError())
          .subscribe(
            this.handleSuccess('cancelSubscription.reverseCancellationSuccess')
          );
      },
    };

    handlers[mode]?.();
  }

  // === Common error and success handlers ===
  private handleError() {
    return catchError(() => {
      this.onDialogClose('error');
      this.onError();
      return of(undefined);
    });
  }

  private handleSuccess(messageKey: string) {
    return {
      next: () => {
        this.onDialogClose('Success');
        this.eventService.dispatch({}, GetSubscriptionByCodeReloadEvent);
        this.globalMessageService.add(
          { key: messageKey },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
      },
    };
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
}
