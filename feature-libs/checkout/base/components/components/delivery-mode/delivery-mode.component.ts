import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CheckoutDeliveryModesFacade } from '@spartacus/checkout/base/root';
import { DeliveryMode, FeatureConfigService } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  withLatestFrom,
} from 'rxjs/operators';
import { CheckoutConfigService } from '../../services/checkout-config.service';
import { CheckoutStepService } from '../../services/checkout-step.service';

@Component({
  selector: 'cx-delivery-mode',
  templateUrl: './delivery-mode.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeliveryModeComponent implements OnInit, OnDestroy {
  supportedDeliveryModes$: Observable<DeliveryMode[]>;
  selectedDeliveryMode$: Observable<DeliveryMode>;
  continueButtonPressed = false;

  backBtnText = this.checkoutStepService.getBackBntText(this.activatedRoute);

  deliveryModeSub: Subscription;

  mode: FormGroup = this.fb.group({
    deliveryModeId: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private checkoutConfigService: CheckoutConfigService,
    private activatedRoute: ActivatedRoute,
    protected checkoutStepService: CheckoutStepService,
    protected checkoutDeliveryModesService: CheckoutDeliveryModesFacade,
    protected featureConfigService: FeatureConfigService
  ) {}

  ngOnInit(): void {
    this.supportedDeliveryModes$ = this.checkoutDeliveryModesService
      .getSupportedDeliveryModesState()
      .pipe(
        map((state) => state.data ?? []),
        filter((deliveryModes) => !!deliveryModes?.length),
        distinctUntilChanged((current, previous) => {
          return JSON.stringify(current) === JSON.stringify(previous);
        })
      );

    this.deliveryModeSub = this.supportedDeliveryModes$
      .pipe(
        withLatestFrom(
          this.checkoutDeliveryModesService.getSelectedDeliveryModeState().pipe(
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
            this.checkoutConfigService.getPreferredDeliveryMode(deliveryModes);
        }
        if (code) {
          this.mode.controls['deliveryModeId'].setValue(code);
          this.changeMode(code);
        }
      });
  }

  changeMode(code: string): void {
    this.checkoutDeliveryModesService.setDeliveryMode(code);
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
    if (this.deliveryModeSub) {
      this.deliveryModeSub.unsubscribe();
    }
  }
}
