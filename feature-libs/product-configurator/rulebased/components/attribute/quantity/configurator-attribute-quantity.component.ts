/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { TranslatePipe } from '@spartacus/core';
import { ItemCounterComponent } from '@spartacus/storefront';
import { Observable, Subscription, timer } from 'rxjs';
import { debounce, distinct, take } from 'rxjs/operators';
import { ConfiguratorUISettingsConfig } from '../../config/configurator-ui-settings.config';

export interface ConfiguratorAttributeQuantityComponentOptions {
  allowZero?: boolean;
  initialQuantity?: number;
  disableQuantityActions$?: Observable<boolean>;
  /**
   * If set to `true`, a reduction of the quantity to `0` is still reported to
   * the parent (so it can react, e.g. by showing a message), but the control is
   * afterwards snapped back to `initialQuantity` and the change subscription is
   * re-armed. Used when the parent refuses the removal (e.g. a required value
   * that must not be deselected).
   */
  resetToInitialQuantityOnZero?: boolean;
}

@Component({
  selector: 'cx-configurator-attribute-quantity',
  templateUrl: './configurator-attribute-quantity.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ItemCounterComponent, TranslatePipe],
})
export class ConfiguratorAttributeQuantityComponent
  implements OnDestroy, OnInit
{
  quantity = new UntypedFormControl(1);
  optionsChangeSub: Subscription = new Subscription();
  quantityChangeSub: Subscription = new Subscription();
  @Input() quantityOptions: ConfiguratorAttributeQuantityComponentOptions;
  @Output() changeQuantity = new EventEmitter<number>();

  constructor(protected config: ConfiguratorUISettingsConfig) {}

  ngOnInit(): void {
    this.quantity.setValue(this.quantityOptions?.initialQuantity);
    this.optionsChangeSub.add(
      this.quantityOptions.disableQuantityActions$
        ?.pipe(distinct())
        .subscribe((disable) => {
          // stepper always emits an value when it gets enabled regardless, if the original value was changed.
          // so we subscribe to quantity change when stepper gets enabled and unsubscribe when it gets disabled
          // this way we will not get the unwanted emission on enabling the stepper.
          if (disable) {
            this.quantity.disable();
            this.quantityChangeSub.unsubscribe();
          } else {
            this.quantity.enable();
            this.quantityChangeSub.add(this.subscribeToQuantityChange());
          }
        })
    );
  }

  protected subscribeToQuantityChange(): Subscription {
    return this.quantity.valueChanges
      .pipe(
        debounce(() =>
          timer(
            this.config.productConfigurator?.updateDebounceTime?.quantity ?? 0
          )
        ),
        take(1)
      )
      .subscribe(() => this.onChangeQuantity());
  }

  ngOnDestroy(): void {
    this.optionsChangeSub.unsubscribe();
    this.quantityChangeSub.unsubscribe();
  }

  onChangeQuantity(): void {
    const value = this.quantity?.value;
    this.changeQuantity.emit(value);
    if (!value && this.quantityOptions?.resetToInitialQuantityOnZero) {
      this.resetToInitialQuantity();
    }
  }

  /**
   * Resets the quantity control back to `initialQuantity` without emitting a
   * change event and re-arms the change subscription. The regular subscription
   * created by `subscribeToQuantityChange` is `take(1)`, so after it emitted
   * once it stays completed until a disable/enable round trip; when the parent
   * refuses the removal no such round trip happens, so we re-arm here to keep
   * the stepper responsive for further attempts.
   */
  protected resetToInitialQuantity(): void {
    this.quantity.setValue(this.quantityOptions?.initialQuantity, {
      emitEvent: false,
    });
    if (this.quantityChangeSub.closed) {
      this.quantityChangeSub = new Subscription();
    }
    this.quantityChangeSub.add(this.subscribeToQuantityChange());
  }
}
