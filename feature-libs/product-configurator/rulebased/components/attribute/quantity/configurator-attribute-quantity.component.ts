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
import { Subscription, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { ConfiguratorUISettings } from '../../config/configurator-ui-settings';

export interface Quantity {
  quantity: number;
}

export interface ConfiguratorAttributeQuantityComponentOptions {
  allowZero?: boolean;
  initialQuantity?: Quantity;
  disableQuantityActions?: boolean;
}

@Component({
  selector: 'cx-configurator-attribute-quantity',
  templateUrl: './configurator-attribute-quantity.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeQuantityComponent
  implements OnDestroy, OnInit {
  quantity = new FormControl(1);
  protected sub: Subscription;

  @Input() quantityOptions: ConfiguratorAttributeQuantityComponentOptions;

  @Output() changeQuantity = new EventEmitter<Quantity>();

  constructor(protected config: ConfiguratorUISettings) {}

  ngOnInit() {
    this.quantity.setValue(this.quantityOptions?.initialQuantity?.quantity);

    if (this.quantityOptions?.disableQuantityActions) {
      this.quantity.disable();
    }

    const debounceQuantity = this.quantity.valueChanges.pipe(
      debounce(() =>
        timer(this.config?.rulebasedConfigurator?.quantityDebounceTime)
      )
    );

    this.sub = debounceQuantity.subscribe(() => this.onChangeQuantity());
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onChangeQuantity(): void {
    this.changeQuantity.emit({
      quantity: this.quantity?.value,
    });
  }
}
