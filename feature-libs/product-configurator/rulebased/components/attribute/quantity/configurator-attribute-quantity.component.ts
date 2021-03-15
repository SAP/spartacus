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
import { ConfiguratorUISettings } from '../../config/configurator-ui-settings';

export interface Quantity {
  quantity: number;
}

export interface ConfiguratorAttributeQuantityComponentOptions {
  allowZero?: boolean;
  initialQuantity?: Quantity;
  disableQuantityActions?: Observable<boolean>;
}

@Component({
  selector: 'cx-configurator-attribute-quantity',
  templateUrl: './configurator-attribute-quantity.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeQuantityComponent
  implements OnDestroy, OnInit {
  quantity = new FormControl(1);
  managedSubscriptions: Subscription = new Subscription();
  @Input() quantityOptions: ConfiguratorAttributeQuantityComponentOptions;
  @Output() changeQuantity = new EventEmitter<Quantity>();

  constructor(protected config: ConfiguratorUISettings) {}

  ngOnInit(): void {
    this.quantity.setValue(this.quantityOptions?.initialQuantity?.quantity);
    // max to 2 changes are expected: 1) gets active, 2) gets disabled before update ==> take(2)
    this.managedSubscriptions.add(
      this.quantityOptions.disableQuantityActions
        ?.pipe(distinct(), take(2))
        .subscribe((disable) => {
          if (disable) {
            this.quantity.disable();
          } else {
            this.quantity.enable();
          }
        })
    );
    this.managedSubscriptions.add(
      this.quantity.valueChanges
        .pipe(
          debounce(() =>
            timer(this.config?.rulebasedConfigurator?.quantityDebounceTime)
          ),
          take(1)
        )
        .subscribe(() => this.onChangeQuantity())
    );
  }

  ngOnDestroy() {
    this.managedSubscriptions.unsubscribe();
  }

  onChangeQuantity(): void {
    this.changeQuantity.emit({
      quantity: this.quantity?.value,
    });
  }
}
