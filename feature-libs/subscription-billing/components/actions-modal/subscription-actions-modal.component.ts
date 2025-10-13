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
  UNLIMITED_EXTEND_DURATION_OPTION_VALUE,
  SubscriptionExtensionEffectiveDate,
} from '@spartacus/subscription-billing/root';
import { I18nModule, UrlModule } from '@spartacus/core';
import {
  CardModule,
  FocusConfig,
  FormRequiredAsterisksComponent,
  ICON_TYPE,
  IconModule,
  KeyboardFocusModule,
  LaunchDialogService,
  SpinnerModule,
} from '@spartacus/storefront';
import { RouterModule } from '@angular/router';
import { toSignal, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SubscriptionActionsModalComponentService } from './subscription-actions-modal-component.service';
import { extendSubscriptionFrequencyDropdownOptions } from './extend-subscription-frequency-dropdown-options';
import { NgSelectModule } from '@ng-select/ng-select';

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
    NgSelectModule,
    FormRequiredAsterisksComponent
  ],
})
export class SubscriptionActionsModalComponent {
  private actionsFacade = inject(SubscriptionActionsFacade);
  private launchDialogService = inject(LaunchDialogService);
  private destroyRef = inject(DestroyRef);
  private actionHandler = inject(SubscriptionActionsModalComponentService);

  private subscriptionDetailSignal = toSignal(
    this.launchDialogService.data$ as Observable<
      SubscriptionDetail & {
        code?: string;
        mode?: 'cancel' | 'withdraw' | 'resubscribe' | 'extend';
      }
    >
  );

  extendDuration: number;
  isUnlimitedDurationSelected: boolean = false;
  isExtendSubscriptionBtnClicked = signal<boolean>(false);
  isExtensionEffectiveDateAvailable = signal<boolean>(false);
  extensionEffectiveDate = signal<SubscriptionExtensionEffectiveDate | undefined>(undefined);
  subscriptionContractFrequency: string = this.subscriptionDetailSignal()?.contractFrequency ?? 'Months';
  extendFrequencyMaxOptions: {
    [key: string]: number;
  } = extendSubscriptionFrequencyDropdownOptions;
  extendDurationOptions: string[];
  UNLIMITED_DURATION = 'Unlimited';

  mode = computed(() => this.subscriptionDetailSignal()?.mode ?? 'cancel');
  subscriptionCode = computed(
    () => this.subscriptionDetailSignal()?.code ?? ''
  );
  cancelData = signal<SubscriptionCancelData | undefined>(undefined);
  extensionData = signal<SubscriptionExtensionEffectiveDate | undefined>(undefined);

  iconTypes = ICON_TYPE;

  focusConfig: FocusConfig = {
    trap: false,
    block: false,
    autofocus: 'button',
    focusOnEscape: true,
  };
  constructor() {
    this.registerSubscriptionCancellationEffect();
    const maxOptions = this.extendFrequencyMaxOptions[this.subscriptionContractFrequency] + 1; // +1 to include the unlimited duration option
      this.extendDurationOptions = Array.from({ length: maxOptions }, (_, i) =>
        i + 1 === maxOptions
          ? this.UNLIMITED_DURATION
          : (i + 1).toString() + ' ' + this.subscriptionContractFrequency
      );
  }
  protected registerSubscriptionCancellationEffect(): void {
    effect(() => {
      const mode = this.mode();
      const code = this.subscriptionCode();

      if (mode === 'cancel' && code) {
        this.actionsFacade
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

  getExtensionEffectiveDate(): void {
    this.isExtendSubscriptionBtnClicked;
    this.actionsFacade
      .getExtensionEffectiveDate(
        this.extendDuration,
        this.isUnlimitedDurationSelected,
        this.subscriptionCode()
      )
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError(() => {
          this.actionHandler.onError();
          return of(undefined);
        })
      )
      .subscribe((extensionEffectiveDate) => {
          this.extensionEffectiveDate.set(extensionEffectiveDate);
          this.isExtensionEffectiveDateAvailable.set(true);
        }
      );
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

        this.actionsFacade
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
        this.actionsFacade
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
        this.actionsFacade
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

      extend: () => {
        const confirmedExtendDuration = this.isUnlimitedDurationSelected
          ? UNLIMITED_EXTEND_DURATION_OPTION_VALUE
          : this.extendDuration;
        this.actionsFacade
          .extendSubscription(
            confirmedExtendDuration,
            this.isUnlimitedDurationSelected,
            code
          )
          .pipe(
            takeUntilDestroyed(this.destroyRef),
            this.actionHandler.handleError(() => this.onDialogClose('error'))
          )
          .subscribe(
            this.actionHandler.handleSuccess(
              'subscriptionActions.extendedSuccessfully',
              () => {
                this.isExtendSubscriptionBtnClicked.set(true);
                this.onDialogClose('subscriptionActions.extendedSuccessfully')
              }
            )
          );
      }
    };
    handlers[mode]?.();
  }

  onExtendActionDurationChange(durationSelected: string): void {
    const duration = durationSelected.split(' ')[0];
    if (duration === this.UNLIMITED_DURATION) {
      this.isUnlimitedDurationSelected = true;
    } else {
      this.isUnlimitedDurationSelected = false;
      this.extendDuration = parseInt(duration, 10);
    }
  }

  onDialogClose(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }
}
