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
import { debounce, distinct } from 'rxjs/operators';
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
  protected qunatitySubscription: Subscription = new Subscription();

  @Input() quantityOptions: ConfiguratorAttributeQuantityComponentOptions;

  @Output() changeQuantity = new EventEmitter<Quantity>();

  constructor(protected config: ConfiguratorUISettings) {}

  ngOnInit(): void {
    this.quantity.setValue(this.quantityOptions?.initialQuantity?.quantity);
    const sub = this.quantityOptions.disableQuantityActions
      ?.pipe(distinct())
      .subscribe((disable) => {
        if (disable) {
          this.quantity.disable();
          this.qunatitySubscription.unsubscribe();
        } else {
          // enabling will emit actual value, regardless if it was changed. Hence
          // we subscribe / unsubscribe on enable disable
          this.quantity.enable();
          this.qunatitySubscription.add(
            this.quantity.valueChanges
              .pipe(
                debounce(() =>
                  timer(
                    this.config?.rulebasedConfigurator?.quantityDebounceTime
                  )
                )
              )
              .subscribe(() => this.onChangeQuantity())
          );
        }
      });
    if (sub) this.managedSubscriptions.add(sub);
  }

  ngOnDestroy() {
    this.managedSubscriptions.unsubscribe();
    this.qunatitySubscription.unsubscribe();
  }

  onChangeQuantity(): void {
    this.changeQuantity.emit({
      quantity: this.quantity?.value,
    });
  }
}
