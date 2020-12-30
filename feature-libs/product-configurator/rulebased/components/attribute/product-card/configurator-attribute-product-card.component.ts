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
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { QuantityUpdateEvent } from '../../form/configurator-form.event';
import { Product, ProductService } from '@spartacus/core';

@Component({
  selector: 'cx-configurator-attribute-product-card',
  templateUrl: './configurator-attribute-product-card.component.html',
})
export class ConfiguratorAttributeProductCardComponent
  implements OnDestroy, OnInit {
  product$: Observable<Product>;
  quantity = new FormControl(1);
  loading$ = new BehaviorSubject<boolean>(false);
  private sub: Subscription;

  @Input() disabledAction: boolean;
  @Input() multiSelect = false;
  @Input() product: Configurator.Value;
  @Input() singleDropdown = false;
  @Output() handleDeselect = new EventEmitter<string>();
  @Output() handleQuantity = new EventEmitter<QuantityUpdateEvent>();
  @Output() handleSelect = new EventEmitter<string>();

  constructor(protected productService: ProductService) {}

  ngOnInit() {
    this.product$ = this.productService.get(this.product.productSystemId);

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
    this.loading$.next(true);
    this.handleSelect.emit(this.product.valueCode);
  }

  onHandleDeselect(): void {
    this.loading$.next(true);
    this.handleDeselect.emit(this.product.valueCode);
  }

  onHandleQuantity(): void {
    this.loading$.next(true);

    this.handleQuantity.emit({
      quantity: this.quantity.value,
      valueCode: this.product.valueCode,
    });
  }
}
