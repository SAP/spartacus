/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, Optional } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActiveCartFacade, CartOutlets } from '@spartacus/cart/base/root';
import { CheckoutDeliveryModesFacade } from '@spartacus/checkout/base/root';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { CheckoutConfigService } from '../services/checkout-config.service';
import { CheckoutStepService } from '../services/checkout-step.service';

@Component({
  selector: 'cx-delivery-mode',
  templateUrl: './checkout-delivery-mode.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutDeliveryModeComponent {
  protected busy$ = new BehaviorSubject(false);
  protected readonly isSetDeliveryModeHttpErrorSub = new BehaviorSubject(false);

  readonly CartOutlets = CartOutlets;

  isSetDeliveryModeHttpError$ =
    this.isSetDeliveryModeHttpErrorSub.asObservable();

  selectedDeliveryModeCode$ = this.checkoutDeliveryModesFacade
    .getSelectedDeliveryModeState()
    .pipe(
      filter((state) => !state.loading),
      map((state) => state.data),
      map((deliveryMode) => deliveryMode?.code)
    );

  supportedDeliveryModes$ = this.checkoutDeliveryModesFacade
    .getSupportedDeliveryModes()
    .pipe(
      filter((deliveryModes) => !!deliveryModes?.length),
      withLatestFrom(this.selectedDeliveryModeCode$),
      tap(([deliveryModes, code]) => {
        if (
          !code ||
          !deliveryModes.find((deliveryMode) => deliveryMode.code === code)
        ) {
          code =
            this.checkoutConfigService.getPreferredDeliveryMode(deliveryModes);
        }
        if (code) {
          this.mode.controls['deliveryModeId'].setValue(code);
          this.changeMode(code);
        }
      }),
      map(([deliveryModes]) =>
        deliveryModes.filter((mode) => mode.code !== 'pickup')
      )
    );

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

  // TODO(CXSPA-3976): make globalMessageService a required dependency
  constructor(
    fb: UntypedFormBuilder,
    checkoutConfigService: CheckoutConfigService,
    activatedRoute: ActivatedRoute,
    checkoutStepService: CheckoutStepService,
    checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade,
    activeCartFacade: ActiveCartFacade,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    globalMessageService: GlobalMessageService
  );
  /**
   * @deprecated since 6.2
   */
  constructor(
    fb: UntypedFormBuilder,
    checkoutConfigService: CheckoutConfigService,
    activatedRoute: ActivatedRoute,
    checkoutStepService: CheckoutStepService,
    checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade,
    activeCartFacade: ActiveCartFacade
  );
  constructor(
    protected fb: UntypedFormBuilder,
    protected checkoutConfigService: CheckoutConfigService,
    protected activatedRoute: ActivatedRoute,
    protected checkoutStepService: CheckoutStepService,
    protected checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade,
    protected activeCartFacade: ActiveCartFacade,
    @Optional() protected globalMessageService?: GlobalMessageService
  ) {}

  changeMode(code: string | undefined): void {
    if (!code) {
      return;
    }

    this.busy$.next(true);

    this.checkoutDeliveryModesFacade.setDeliveryMode(code).subscribe({
      complete: () => this.onSuccess(),
      error: () => this.onError(),
    });
  }

  next(): void {
    this.checkoutStepService.next(this.activatedRoute);
  }

  back(): void {
    this.checkoutStepService.back(this.activatedRoute);
  }

  getAriaChecked(code: string | undefined): boolean {
    return code === this.mode.controls['deliveryModeId'].value;
  }

  protected onSuccess(): void {
    this.isSetDeliveryModeHttpErrorSub.next(false);
    this.busy$.next(false);
  }

  protected onError(): void {
    this.globalMessageService?.add(
      { key: 'setDeliveryMode.unknownError' },
      GlobalMessageType.MSG_TYPE_ERROR
    );

    this.isSetDeliveryModeHttpErrorSub.next(true);
    this.busy$.next(false);
  }
}
