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
import {
  ConfiguratorAttributeQuantityComponentOptions,
  Quantity,
} from '../quantity/configurator-attribute-quantity.component';
import { ConfiguratorPriceComponentOptions } from '../../price/configurator-price.component';

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
  productCardOptions: ConfiguratorAttributeProductCardComponentOptions;

  @Output() handleDeselect = new EventEmitter<string>();
  @Output() handleQuantity = new EventEmitter<QuantityUpdateEvent>();
  @Output() handleSelect = new EventEmitter<string>();

  constructor(protected productService: ProductService) {}

  ngOnInit() {
    this.product$ = this.productService
      .get(this.productCardOptions?.product?.productSystemId)
      .pipe(
        map((respProduct) => {
          return respProduct
            ? respProduct
            : this.transformToProductType(this.productCardOptions?.product);
        })
      );
  }

  get showQuantity() {
    return (
      this.productCardOptions?.withQuantity &&
      this.productCardOptions?.product?.selected &&
      this.productCardOptions?.multiSelect
    );
  }

  onHandleSelect(): void {
    this.loading$.next(true);
    this.handleSelect.emit(this.productCardOptions?.product?.valueCode);
  }

  onHandleDeselect(): void {
    this.loading$.next(true);
    this.handleDeselect.emit(this.productCardOptions?.product?.valueCode);
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
      valueCode: this.productCardOptions?.product?.valueCode,
    });
  }

  transformToProductType(value: Configurator.Value): ProductExtended {
    return {
      code: value?.productSystemId,
      description: value?.description,
      images: {},
      name: value?.valueDisplay,
      noLink: true,
    };
  }

  /**
   * Verifies whether the product card is selected
   */
  isProductCardSelected(): boolean {
    return (
      this.productCardOptions?.product &&
      this.productCardOptions?.product?.selected &&
      !this.productCardOptions?.singleDropdown
    );
  }

  getProductPrice(): Configurator.PriceDetails | number {
    return (
      this.productCardOptions?.product?.valuePrice ||
      this.productCardOptions?.product?.quantity ||
      this.productCardOptions?.product?.valuePriceTotal
    );
  }

  /**
   * Extract corresponding price formula parameters
   *
   *  @return {ConfiguratorPriceComponentOptions} - New price formula
   */
  extractPriceFormulaParameters(): ConfiguratorPriceComponentOptions {
    if (!this.productCardOptions?.multiSelect) {
      return {
        price: this.productCardOptions?.product?.valuePrice,
        isLightedUp: this.productCardOptions?.product?.selected,
      };
    }
    return {
      quantity: this.productCardOptions?.product?.quantity,
      price: this.productCardOptions?.product?.valuePrice,
      priceTotal: this.productCardOptions?.product?.valuePriceTotal,
      isLightedUp: this.productCardOptions?.product?.selected,
    };
  }

  /**
   *  Extract corresponding quantity parameters
   *
   * @param {boolean} disableQuantityActions - Disable quantity actions
   * @return {ConfiguratorAttributeQuantityComponentOptions} - New quantity options
   */
  extractQuantityParameters(
    disableQuantityActions: boolean
  ): ConfiguratorAttributeQuantityComponentOptions {
    const initialQuantity: Quantity = {
      quantity: this.productCardOptions?.product?.quantity,
    };

    return {
      allowZero: !this.productCardOptions?.preventAction,
      initialQuantity: initialQuantity,
      disableQuantityActions: disableQuantityActions,
    };
  }

  /**
   * Verifies whether the value code is defined.
   *
   * @param {string} valueCode - Value code
   * @return {boolean} - 'true' if the value code is defined, otherwise 'false'
   */
  isValueCodeDefined(valueCode: string): boolean {
    return valueCode && valueCode !== '0' ? true : false;
  }
}
