import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Configurator } from '../../../core/model/configurator.model';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

interface QuantityUpdateEvent {
  quantity: number;
  valueCode: string;
}

@Component({
  selector: 'cx-configurator-attribute-product-card',
  templateUrl: './configurator-attribute-product-card.component.html',
})
export class ConfiguratorAttributeProductCardComponent
  implements OnDestroy, OnInit {
  quantity = new FormControl(1);
  private sub: Subscription;

  @Input() disabledAction: boolean;
  @Input() multiSelect = false;
  @Input() product: Configurator.Value;
  @Output() handleDeselect = new EventEmitter<string>();
  @Output() handleQuantity = new EventEmitter<QuantityUpdateEvent>();
  @Output() handleSelect = new EventEmitter<string>();

  ngOnInit() {
    if (this.multiSelect) {
      this.quantity.setValue(this.product.quantity);

      this.sub = this.quantity.valueChanges.subscribe((value) => {
        if (!value) {
          this.onHandleDeselect();
        } else {
          this.onHandleQuantity();
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.multiSelect && this.sub) {
      this.sub.unsubscribe();
    }
  }

  onHandleSelect(): void {
    this.handleSelect.emit(this.product.valueCode);
  }

  onHandleDeselect(): void {
    this.handleDeselect.emit(this.product.valueCode);
  }

  onHandleQuantity(): void {
    this.handleQuantity.emit({
      quantity: this.quantity.value,
      valueCode: this.product.valueCode,
    });
  }
}
