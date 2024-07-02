/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CheckoutStepService } from '@spartacus/checkout/base/components';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { CheckoutServiceSchedulePickerService } from '@spartacus/s4-service/core';
import { CheckoutServiceDetailsFacade } from '@spartacus/s4-service/root';
import {
  BehaviorSubject,
  map,
  Observable,
  combineLatest,
  distinctUntilChanged,
  Subscription,
  filter,
} from 'rxjs';

@Component({
  selector: 'cx-service-details',
  templateUrl: './checkout-service-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutServiceDetailsComponent implements OnInit, OnDestroy {
  protected activatedRoute = inject(ActivatedRoute);
  protected checkoutStepService = inject(CheckoutStepService);
  protected globalMessageService = inject(GlobalMessageService);
  protected checkoutServiceDetailsFacade = inject(CheckoutServiceDetailsFacade);
  protected service = inject(CheckoutServiceSchedulePickerService);
  protected fb = inject(UntypedFormBuilder);
  protected checkoutServiceSchedulePickerService = inject(
    CheckoutServiceSchedulePickerService
  );
  minServiceDate: string = this.service.getMinDateForService();

  scheduleTimes: string[] = this.service.getScheduledServiceTimes();
  form: UntypedFormGroup = this.fb.group({
    scheduleDate: [this.minServiceDate],
    scheduleTime: [this.scheduleTimes[0]],
  });

  protected subscription = new Subscription();

  selectedServiceDetails$ = this.checkoutServiceDetailsFacade
    .getSelectedServiceDetailsState()
    .pipe(
      filter((state) => !state.loading),
      map((state) => state.data)
    );

  ngOnInit(): void {
    this.selectedServiceDetails$.subscribe((selectedServiceDetails) => {
      if (
        selectedServiceDetails !== undefined &&
        selectedServiceDetails !== ''
      ) {
        const scheduledAt =
          this.checkoutServiceSchedulePickerService.convertDateTimeToReadableString(
            selectedServiceDetails
          );
        const info =
          this.checkoutServiceSchedulePickerService.getServiceDetailsFromDateTime(
            scheduledAt
          );
        this.form.patchValue({
          scheduleDate: info.date,
          scheduleTime: info.time,
        });
      }
    });
  }

  setScheduleTime(selectedTime: string): void {
    this.form.patchValue({
      scheduleTime: selectedTime,
    });
  }
  get backBtnText(): string {
    return this.checkoutStepService.getBackBntText(this.activatedRoute);
  }

  protected readonly isSetServiceDetailsHttpErrorSub = new BehaviorSubject(
    false
  );

  isSetServiceDetailsHttpError$ =
    this.isSetServiceDetailsHttpErrorSub.asObservable();

  protected busy$ = new BehaviorSubject(false);

  isUpdating$: Observable<boolean> = combineLatest([this.busy$]).pipe(
    map(([busy]) => busy),
    distinctUntilChanged()
  );

  next(): void {
    this.serviceProducts$.subscribe((products) => {
      if (products.length > 0) {
        const scheduleDate = this.form?.get('scheduleDate')?.value || '';
        const scheduleTime = this.form?.get('scheduleTime')?.value || '';
        const scheduleDateTime = this.service.convertToDateTime(
          scheduleDate,
          scheduleTime
        );
        this.subscription.add(
          this.checkoutServiceDetailsFacade
            .setServiceScheduleSlot(scheduleDateTime)
            .subscribe({
              next: () => {
                this.onSuccess();
                this.checkoutStepService.next(this.activatedRoute);
              },
              error: () => this.onError(),
            })
        );
      } else {
        this.checkoutStepService.next(this.activatedRoute);
      }
    });
  }

  back(): void {
    this.checkoutStepService.back(this.activatedRoute);
  }

  serviceProducts$ = this.checkoutServiceDetailsFacade.getServiceProducts();

  protected onSuccess(): void {
    this.isSetServiceDetailsHttpErrorSub.next(false);
    this.busy$.next(false);
  }

  protected onError(): void {
    this.globalMessageService?.add(
      { key: 'serviceOrderCheckout.unknownError' },
      GlobalMessageType.MSG_TYPE_ERROR
    );

    this.isSetServiceDetailsHttpErrorSub.next(true);
    this.busy$.next(false);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
