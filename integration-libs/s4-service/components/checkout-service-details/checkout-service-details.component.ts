/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CheckoutStepService } from '@spartacus/checkout/base/components';
import {
  BaseSiteService,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { ServiceOrderConfig } from '@spartacus/s4-service/root';
import {
  BehaviorSubject,
  map,
  Observable,
  combineLatest,
  distinctUntilChanged,
  of,
} from 'rxjs';

@Component({
  selector: 'cx-service-details',
  templateUrl: './checkout-service-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutServiceDetailsComponent {
  protected activatedRoute = inject(ActivatedRoute);
  protected checkoutStepService = inject(CheckoutStepService);
  protected globalMessageService = inject(GlobalMessageService);
  protected baseSiteService = inject(BaseSiteService);

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
    this.checkoutStepService.next(this.activatedRoute);
  }

  back(): void {
    this.checkoutStepService.back(this.activatedRoute);
  }

  protected onSuccess(): void {
    this.isSetServiceDetailsHttpErrorSub.next(false);
    this.busy$.next(false);
  }

  protected onError(): void {
    this.globalMessageService?.add(
      { key: 'setDeliveryMode.unknownError' },
      GlobalMessageType.MSG_TYPE_ERROR
    );

    this.isSetServiceDetailsHttpErrorSub.next(true);
    this.busy$.next(false);
  }
  // serviceOrderConfig$: Observable<ServiceOrderConfig | undefined> =
  //   this.baseSiteService
  //     .get()
  //     .pipe(map((baseSite) => baseSite?.baseStore?.serviceOrderConfiguration));

  sampleServiceOrderConfiguration: ServiceOrderConfig = {
    leadDays: 2,
    serviceScheduleTimes: [
      '09:00',
      '09:30',
      '10:00',
      '10:30',
      '11:00',
      '11:30',
      '12:00',
      '12:30',
      '13:00',
      '13:30',
      '14:00',
      '14:30',
      '15:00',
      '15:30',
      '16:00',
      '16:30',
      '17:00',
      '17:30',
      '18:00',
    ],
  };
  serviceOrderConfig$: Observable<ServiceOrderConfig | undefined> = of(
    this.sampleServiceOrderConfiguration
  );
}
