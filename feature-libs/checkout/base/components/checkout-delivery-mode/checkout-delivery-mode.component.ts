/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DeliveryMode } from '@spartacus/cart/base/root';
import { CheckoutDeliveryModesFacade } from '@spartacus/checkout/base/root';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  withLatestFrom,
} from 'rxjs/operators';
import { CheckoutConfigService } from '../services/checkout-config.service';
import { CheckoutStepService } from '../services/checkout-step.service';

@Component({
  selector: 'cx-delivery-mode',
  templateUrl: './checkout-delivery-mode.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutDeliveryModeComponent implements OnInit, OnDestroy {
  protected subscriptions = new Subscription();
  protected busy$ = new BehaviorSubject(false);

  selectedDeliveryModeCode$: Observable<string | undefined>;
  supportedDeliveryModes$: Observable<DeliveryMode[]>;

  backBtnText = this.checkoutStepService.getBackBntText(this.activatedRoute);

  mode: UntypedFormGroup = this.fb.group({
    deliveryModeId: ['', Validators.required],
  });

  isUpdating$: Observable<boolean> = combineLatest([
    this.busy$,
    this.checkoutDeliveryModesFacade
      .getSelectedDeliveryModeState()
      .pipe(map((state) => state.loading)),
  ]).pipe(
    map(([busy, loading]) => busy || loading),
    distinctUntilChanged()
  );

  get deliveryModeInvalid(): boolean {
    return this.mode.controls['deliveryModeId'].invalid;
  }

  constructor(
    protected fb: UntypedFormBuilder,
    protected checkoutConfigService: CheckoutConfigService,
    protected activatedRoute: ActivatedRoute,
    protected checkoutStepService: CheckoutStepService,
    protected checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade
  ) {}

  ngOnInit(): void {
    this.supportedDeliveryModes$ = this.checkoutDeliveryModesFacade
      .getSupportedDeliveryModes()
      .pipe(
        filter((deliveryModes) => !!deliveryModes?.length),
        distinctUntilChanged((current, previous) => {
          return JSON.stringify(current) === JSON.stringify(previous);
        })
      );

    this.selectedDeliveryModeCode$ = this.checkoutDeliveryModesFacade
      .getSelectedDeliveryModeState()
      .pipe(
        filter((state) => !state.loading),
        map((state) => state.data),
        map((deliveryMode) => deliveryMode?.code)
      );

    this.subscriptions.add(
      this.supportedDeliveryModes$
        .pipe(withLatestFrom(this.selectedDeliveryModeCode$))
        .subscribe(([deliveryModes, code]) => {
          if (
            !(
              code &&
              !!deliveryModes.find((deliveryMode) => deliveryMode.code === code)
            )
          ) {
            code =
              this.checkoutConfigService.getPreferredDeliveryMode(
                deliveryModes
              );
          }
          if (code) {
            this.mode.controls['deliveryModeId'].setValue(code);
            this.changeMode(code);
          }
        })
    );
  }

  changeMode(code: string): void {
    this.busy$.next(true);

    this.checkoutDeliveryModesFacade.setDeliveryMode(code).subscribe({
      complete: () => this.onSuccess(),
      error: () => this.onError(),
    });
  }

  next(): void {
    if (this.mode.valid && this.mode.value) {
      this.checkoutStepService.next(this.activatedRoute);
    }
  }

  back(): void {
    this.checkoutStepService.back(this.activatedRoute);
  }

  getAriaChecked(code: string): boolean {
    return code === this.mode.controls['deliveryModeId'].value;
  }

  protected onSuccess(): void {
    this.busy$.next(false);
  }

  protected onError(): void {
    this.busy$.next(false);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
