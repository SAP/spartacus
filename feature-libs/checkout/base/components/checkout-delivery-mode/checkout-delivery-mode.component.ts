import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CheckoutDeliveryModesFacade } from '@spartacus/checkout/base/root';
import { DeliveryMode } from '@spartacus/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
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

  supportedDeliveryModes$: Observable<DeliveryMode[]>;
  selectedDeliveryMode$: Observable<DeliveryMode>;
  continueButtonPressed = false;

  backBtnText = this.checkoutStepService.getBackBntText(this.activatedRoute);

  mode: FormGroup = this.fb.group({
    deliveryModeId: ['', Validators.required],
  });

  changeDeliveryModeInProgress$: Observable<boolean> = new BehaviorSubject(
    false
  );

  constructor(
    protected fb: FormBuilder,
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

    this.subscriptions.add(
      this.supportedDeliveryModes$
        .pipe(
          withLatestFrom(
            this.checkoutDeliveryModesFacade
              .getSelectedDeliveryModeState()
              .pipe(
                filter((state) => !state.loading),
                map((state) => state.data),
                map((deliveryMode) => deliveryMode?.code)
              )
          )
        )
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
    (this.changeDeliveryModeInProgress$ as BehaviorSubject<boolean>).next(true);

    this.checkoutDeliveryModesFacade.setDeliveryMode(code).subscribe({
      complete: () => this.onSuccess(),
      error: () => this.onError(),
    });
  }

  protected onSuccess(): void {
    (this.changeDeliveryModeInProgress$ as BehaviorSubject<boolean>).next(
      false
    );
  }

  protected onError(): void {
    (this.changeDeliveryModeInProgress$ as BehaviorSubject<boolean>).next(
      false
    );
  }

  next(): void {
    if (this.mode.valid && this.mode.value) {
      this.continueButtonPressed = true;
      this.checkoutStepService.next(this.activatedRoute);
    }
  }

  back(): void {
    this.checkoutStepService.back(this.activatedRoute);
  }

  get deliveryModeInvalid(): boolean {
    return this.mode.controls['deliveryModeId'].invalid;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
