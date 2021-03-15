import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, timer } from 'rxjs';
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
export class ConfiguratorAttributeQuantityComponent implements OnInit {
  quantity = new FormControl(1);
  @Input() quantityOptions: ConfiguratorAttributeQuantityComponentOptions;
  @Output() changeQuantity = new EventEmitter<Quantity>();

  constructor(protected config: ConfiguratorUISettings) {}

  ngOnInit(): void {
    this.quantity.setValue(this.quantityOptions?.initialQuantity?.quantity);
    // max to 2 changes are expected: 1) gets active, 2) gets disabled before update ==> take(2)
    this.quantityOptions.disableQuantityActions
      ?.pipe(distinct(), take(2))
      .subscribe((disable) => {
        if (disable) {
          this.quantity.disable();
        } else {
          this.quantity.enable();
        }
      });
    this.quantity.valueChanges
      .pipe(
        debounce(() =>
          timer(this.config?.rulebasedConfigurator?.quantityDebounceTime)
        ),
        take(1)
      )
      .subscribe(() => this.onChangeQuantity());
  }

  onChangeQuantity(): void {
    this.changeQuantity.emit({
      quantity: this.quantity?.value,
    });
  }
}
