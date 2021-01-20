import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { QuantityConfig } from '../../config/quantity-config';

interface Quantity {
  quantity: number;
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

  @Input() allowZero = true;
  @Input() initialQuantity: Quantity;
  @Input() readonly = false;

  @Output() changeQuantity = new EventEmitter<Quantity>();

  constructor(protected config: QuantityConfig) {}

  ngOnInit() {
    this.quantity.setValue(this.initialQuantity);

    const debounceQuantity = this.quantity.valueChanges.pipe(
      debounce(() => timer(this.config.debounceTime))
    );

    this.sub = debounceQuantity.subscribe(() => this.onChangeQuantity());
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onChangeQuantity(): void {
    this.changeQuantity.emit({
      quantity: this.quantity.value,
    });
  }
}
