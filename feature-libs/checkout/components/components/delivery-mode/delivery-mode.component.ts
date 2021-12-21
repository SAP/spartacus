import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CheckoutDeliveryFacade } from '@spartacus/checkout/root';
import { DeliveryMode } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  takeWhile,
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

  deliveryModeSetInProcess$ =
    this.checkoutDeliveryService.getSetDeliveryModeInProcess();

  deliveryModeSub: Subscription;

  mode: FormGroup = this.fb.group({
    deliveryModeId: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private checkoutDeliveryService: CheckoutDeliveryFacade,
    private checkoutConfigService: CheckoutConfigService,
    private activatedRoute: ActivatedRoute,
    protected checkoutStepService: CheckoutStepService
  ) {}

  ngOnInit() {
    this.supportedDeliveryModes$ = this.checkoutDeliveryService
      .getSupportedDeliveryModes()
      .pipe(
        filter((deliveryModes: DeliveryMode[]) => !!deliveryModes?.length),
        distinctUntilChanged(
          (current: DeliveryMode[], previous: DeliveryMode[]) => {
            return JSON.stringify(current) === JSON.stringify(previous);
          }
        )
      );

    // Reload delivery modes on error
    this.checkoutDeliveryService
      .getLoadSupportedDeliveryModeProcess()
      .pipe(takeWhile((state) => state?.success === false))
      .subscribe((state) => {
        if (state.error && !state.loading) {
          this.checkoutDeliveryService.loadSupportedDeliveryModes();
        }
      });

    this.deliveryModeSub = this.supportedDeliveryModes$
      .pipe(
        withLatestFrom(
          this.checkoutDeliveryService
            .getSelectedDeliveryMode()
            .pipe(
              map(
                (deliveryMode: DeliveryMode | null | undefined) =>
                  deliveryMode?.code
              )
            )
        )
      )
      .subscribe(
        ([deliveryModes, code]: [DeliveryMode[], string | undefined]) => {
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
            this.checkoutDeliveryService.setDeliveryMode(code);
          }
        }
      );
  }

  changeMode(code: string): void {
    this.checkoutDeliveryService.setDeliveryMode(code);
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
