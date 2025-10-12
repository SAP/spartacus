/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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
  SubscriptionActionsFacade,
  SubscriptionCancellationDetails,
  SubscriptionDetail,
  SubscriptionCancelData,
} from '@spartacus/subscription-billing/root';
import { I18nModule, UrlModule } from '@spartacus/core';
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
import { SubscriptionActionsModalComponentService } from './subscription-actions-modal-component.service';

@Component({
  selector: 'cx-subscription-actions-modal',
  standalone: true,
  templateUrl: './subscription-actions-modal.component.html',
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
export class SubscriptionActionsModalComponent {
  private cancelFacade = inject(SubscriptionActionsFacade);
  private launchDialogService = inject(LaunchDialogService);
  private destroyRef = inject(DestroyRef);
  private actionHandler = inject(SubscriptionActionsModalComponentService);

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
  cancelData = signal<SubscriptionCancelData | undefined>(undefined);

  iconTypes = ICON_TYPE;

  focusConfig: FocusConfig = {
    trap: false,
    block: false,
    autofocus: 'button',
    focusOnEscape: true,
  };
  constructor() {
    effect(() => {
      const mode = this.mode();
      const code = this.subscriptionCode();

      if (mode === 'cancel' && code) {
        this.cancelFacade
          .getEffectiveCancellationDate(code)
          .pipe(
            takeUntilDestroyed(this.destroyRef),
            catchError(() => {
              this.actionHandler.onError();
              return of(undefined);
            })
          )
          .subscribe((data) => {
            this.cancelData.set(data);
          });
      }
    });
  }

  onConfirm(): void {
    const mode = this.mode();
    const code = this.subscriptionCode();
    const detail = this.subscriptionDetailSignal();
    const cancelDataVal = this.cancelData();

    if (!code || !detail) {
      this.actionHandler.onError();
      return;
    }

    const handlers: Record<string, () => void> = {
      cancel: () => {
        if (!cancelDataVal?.subscriptionEndAt) {
          this.actionHandler.onError();
          return;
        }

        const payload: SubscriptionCancellationDetails = {
          subscriptionEndAt: cancelDataVal.subscriptionEndAt,
        };

        this.cancelFacade
          .cancelSubscription(payload, code)
          .pipe(
            takeUntilDestroyed(this.destroyRef),
            this.actionHandler.handleError(() => this.onDialogClose('error'))
          )
          .subscribe(
            this.actionHandler.handleSuccess(
              'subscriptionActions.cancelSuccess',
              () => this.onDialogClose('Success')
            )
          );
      },

      withdraw: () => {
        this.cancelFacade
          .withdrawSubscription({ subscriptionId: detail.id }, code)
          .pipe(
            takeUntilDestroyed(this.destroyRef),
            this.actionHandler.handleError(() => this.onDialogClose('error'))
          )
          .subscribe(
            this.actionHandler.handleSuccess(
              'subscriptionActions.withdrawSuccess',
              () => this.onDialogClose('Success')
            )
          );
      },

      resubscribe: () => {
        this.cancelFacade
          .reverseCancellation(code)
          .pipe(
            takeUntilDestroyed(this.destroyRef),
            this.actionHandler.handleError(() => this.onDialogClose('error'))
          )
          .subscribe(
            this.actionHandler.handleSuccess(
              'subscriptionActions.reverseCancellationSuccess',
              () => this.onDialogClose('Success')
            )
          );
      },
    };
    handlers[mode]?.();
  }
  onDialogClose(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }
}
