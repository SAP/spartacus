import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription, timer } from 'rxjs';
import { debounce, distinct, take } from 'rxjs/operators';
import { ConfiguratorUISettingsConfig } from '../../config/configurator-ui-settings.config';

export interface ConfiguratorAttributeQuantityComponentOptions {
  allowZero?: boolean;
  initialQuantity?: number;
  disableQuantityActions$?: Observable<boolean>;
}

@Component({
  selector: 'cx-configurator-attribute-quantity',
  templateUrl: './configurator-attribute-quantity.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeQuantityComponent
  implements OnDestroy, OnInit
{
  quantity = new FormControl(1);
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
          timer(this.config.productConfigurator?.updateDebounceTime?.quantity)
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
    this.changeQuantity.emit(this.quantity?.value);
  }
}
