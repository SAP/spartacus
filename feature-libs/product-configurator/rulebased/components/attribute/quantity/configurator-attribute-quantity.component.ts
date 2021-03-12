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
import { debounce } from 'rxjs/operators';
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
  protected managedSubscriptions: Subscription = new Subscription();

  @Input() quantityOptions: ConfiguratorAttributeQuantityComponentOptions;

  @Output() changeQuantity = new EventEmitter<Quantity>();

  constructor(protected config: ConfiguratorUISettings) {}

  ngOnInit() {
    this.quantity.setValue(this.quantityOptions?.initialQuantity?.quantity);
    const sub = this.quantityOptions.disableQuantityActions?.subscribe(
      (disable) => {
        if (disable) {
          this.quantity.disable();
        } else {
          this.quantity.enable();
        }
      }
    );
    if (sub) this.managedSubscriptions.add(sub);

    const debounceQuantity = this.quantity.valueChanges.pipe(
      debounce(() =>
        timer(this.config?.rulebasedConfigurator?.quantityDebounceTime)
      )
    );
    this.managedSubscriptions.add(
      debounceQuantity.subscribe(() => this.onChangeQuantity())
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
