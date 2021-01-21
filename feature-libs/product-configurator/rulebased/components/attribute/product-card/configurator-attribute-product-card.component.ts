import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Configurator } from '../../../core/model/configurator.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { QuantityUpdateEvent } from '../../form/configurator-form.event';
import { Product, ProductService } from '@spartacus/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-configurator-attribute-product-card',
  templateUrl: './configurator-attribute-product-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeProductCardComponent implements OnInit {
  product$: Observable<Product>;
  loading$ = new BehaviorSubject<boolean>(false);

  @Input() preventAction = false;
  @Input() multiSelect = false;
  @Input() product: Configurator.Value;
  @Input() singleDropdown = false;
  @Input() withQuantity = true;
  @Output() handleDeselect = new EventEmitter<string>();
  @Output() handleQuantity = new EventEmitter<QuantityUpdateEvent>();
  @Output() handleSelect = new EventEmitter<string>();

  constructor(protected productService: ProductService) {}

  ngOnInit() {
    this.product$ = this.productService.get(this.product.productSystemId).pipe(
      map((respProduct) => {
        return respProduct
          ? respProduct
          : this.transformToProductType(this.product);
      })
    );
  }

  get showQuantity() {
    return (
      this.withQuantity &&
      this.product.selected &&
      (this.multiSelect || this.singleDropdown)
    );
  }

  onHandleSelect(): void {
    this.loading$.next(true);
    this.handleSelect.emit(this.product.valueCode);
  }

  onHandleDeselect(): void {
    this.loading$.next(true);
    this.handleDeselect.emit(this.product.valueCode);
  }

  onChangeQuantity(eventObject): void {
    if (!eventObject.quantity) {
      this.onHandleDeselect();
    } else {
      this.onHandleQuantity(eventObject.quantity);
    }
  }

  onHandleQuantity(quantity): void {
    this.loading$.next(true);

    this.handleQuantity.emit({
      quantity,
      valueCode: this.product.valueCode,
    });
  }

  transformToProductType(value: Configurator.Value): Product {
    return {
      code: value.valueCode,
      description: value.description,
      images: {},
      name: value.valueDisplay,
    };
  }
}
