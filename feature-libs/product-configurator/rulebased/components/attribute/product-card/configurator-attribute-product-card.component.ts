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

interface ProductExtended extends Product {
  noLink?: boolean;
}

export interface ConfiguratorAttributeProductCardComponentOptions {
  preventAction?: boolean;
  multiSelect?: boolean;
  product?: Configurator.Value;
  singleDropdown?: boolean;
  withQuantity?: boolean;
}

@Component({
  selector: 'cx-configurator-attribute-product-card',
  templateUrl: './configurator-attribute-product-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeProductCardComponent implements OnInit {
  product$: Observable<ProductExtended>;
  loading$ = new BehaviorSubject<boolean>(false);

  @Input()
  productCardOptions: ConfiguratorAttributeProductCardComponentOptions = {
    preventAction: false,
    multiSelect: false,
    product: undefined,
    singleDropdown: false,
    withQuantity: true,
  };

  @Output() handleDeselect = new EventEmitter<string>();
  @Output() handleQuantity = new EventEmitter<QuantityUpdateEvent>();
  @Output() handleSelect = new EventEmitter<string>();

  constructor(protected productService: ProductService) {}

  ngOnInit() {
    this.product$ = this.productService
      .get(this.productCardOptions.product.productSystemId)
      .pipe(
        map((respProduct) => {
          return respProduct
            ? respProduct
            : this.transformToProductType(this.productCardOptions.product);
        })
      );
  }

  get showQuantity() {
    return (
      this.productCardOptions.withQuantity &&
      this.productCardOptions.product.selected &&
      this.productCardOptions.multiSelect
    );
  }

  onHandleSelect(): void {
    this.loading$.next(true);
    this.handleSelect.emit(this.productCardOptions.product.valueCode);
  }

  onHandleDeselect(): void {
    this.loading$.next(true);
    this.handleDeselect.emit(this.productCardOptions.product.valueCode);
  }

  onChangeQuantity(eventObject): void {
    if (!eventObject.quantity) {
      this.onHandleDeselect();
    } else {
      this.onHandleQuantity(eventObject.quantity);
    }
  }

  onHandleQuantity(quantity: number): void {
    this.loading$.next(true);

    this.handleQuantity.emit({
      quantity,
      valueCode: this.productCardOptions.product.valueCode,
    });
  }

  transformToProductType(value: Configurator.Value): ProductExtended {
    return {
      code: value.valueCode,
      description: value.description,
      images: {},
      name: value.valueDisplay,
      noLink: true,
    };
  }

  getProductPrice(): Configurator.PriceDetails | number {
    return (
      this.productCardOptions.product?.valuePrice ||
      this.productCardOptions.product?.quantity ||
      this.productCardOptions.product?.valuePriceTotal
    );
  }

  extractPriceFormulaParameters() {
    if (!this.productCardOptions.multiSelect) {
      return {
        price: this.productCardOptions.product.valuePrice,
        isLightedUp: this.productCardOptions.product.selected,
      };
    }
    return {
      quantity: this.productCardOptions.product.quantity,
      price: this.productCardOptions.product.valuePrice,
      priceTotal: this.productCardOptions.product.valuePriceTotal,
      isLightedUp: this.productCardOptions.product.selected,
    };
  }

  extractQuantityParameters(disableQuantityActions: boolean) {
    return {
      allowZero: !this.productCardOptions.preventAction,
      initialQuantity: this.productCardOptions.product.quantity,
      disableQuantityActions: disableQuantityActions,
    };
  }
}
