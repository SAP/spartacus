import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Product, ProductService } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Configurator } from '../../../core/model/configurator.model';
import { QuantityUpdateEvent } from '../../form/configurator-form.event';
import { ConfiguratorPriceComponentOptions } from '../../price/configurator-price.component';
import {
  ConfiguratorAttributeQuantityComponentOptions,
  Quantity,
} from '../quantity/configurator-attribute-quantity.component';

export interface ProductExtended extends Product {
  noLink?: boolean;
}

export interface ConfiguratorAttributeProductCardComponentOptions {
  preventAllActions?: boolean;
  preventRemoveAction?: boolean;
  multiSelect?: boolean;
  productBoundValue?: Configurator.Value;
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
  loading$ = new BehaviorSubject<boolean>(true);

  @Input()
  productCardOptions: ConfiguratorAttributeProductCardComponentOptions;

  @Output() handleDeselect = new EventEmitter<string>();
  @Output() handleQuantity = new EventEmitter<QuantityUpdateEvent>();
  @Output() handleSelect = new EventEmitter<string>();

  constructor(protected productService: ProductService) {}

  ngOnInit() {
    this.loading$.next(true);
    const productSystemId = this.productCardOptions?.productBoundValue
      ?.productSystemId;

    this.product$ = this.productService
      .get(productSystemId ? productSystemId : '')
      .pipe(
        map((respProduct) => {
          return respProduct
            ? respProduct
            : this.transformToProductType(
                this.productCardOptions?.productBoundValue
              );
        }),
        tap(() => this.loading$.next(false))
      );
  }

  get showQuantity() {
    return (
      this.productCardOptions?.withQuantity &&
      this.productCardOptions?.productBoundValue?.selected &&
      this.productCardOptions?.multiSelect
    );
  }

  onHandleSelect(): void {
    this.loading$.next(true);
    this.handleSelect.emit(
      this.productCardOptions?.productBoundValue?.valueCode
    );
  }

  onHandleDeselect(): void {
    this.loading$.next(true);
    this.handleDeselect.emit(
      this.productCardOptions?.productBoundValue?.valueCode
    );
  }

  onChangeQuantity(eventObject: any): void {
    if (!eventObject.quantity) {
      this.onHandleDeselect();
    } else {
      this.onHandleQuantity(eventObject.quantity);
    }
  }

  /**
   * Verifies whether the product card refers to a selected value
   * @return {boolean} - Selected?
   */
  isProductCardSelected(): boolean {
    const isProductCardSelected =
      this.productCardOptions?.productBoundValue &&
      this.productCardOptions?.productBoundValue?.selected &&
      !this.productCardOptions?.singleDropdown;

    return isProductCardSelected ? isProductCardSelected : false;
  }

  /**
   * Checks if price needs to be displayed. This is the
   * case if either value price, quantity or value price total
   * are present
   * @return {boolean} - Price display?
   */
  hasPriceDisplay(): boolean {
    const productPrice =
      this.productCardOptions?.productBoundValue?.valuePrice ||
      this.productCardOptions?.productBoundValue?.quantity ||
      this.productCardOptions?.productBoundValue?.valuePriceTotal;

    return productPrice ? true : false;
  }

  /**
   * Extract corresponding price formula parameters
   *
   *  @return {ConfiguratorPriceComponentOptions} - New price formula
   */
  extractPriceFormulaParameters(): ConfiguratorPriceComponentOptions {
    if (!this.productCardOptions?.multiSelect) {
      return {
        price: this.productCardOptions?.productBoundValue?.valuePrice,
        isLightedUp: this.productCardOptions?.productBoundValue?.selected,
      };
    }
    return {
      quantity: this.productCardOptions?.productBoundValue?.quantity,
      price: this.productCardOptions?.productBoundValue?.valuePrice,
      priceTotal: this.productCardOptions?.productBoundValue?.valuePriceTotal,
      isLightedUp: this.productCardOptions?.productBoundValue?.selected,
    };
  }

  /**
   *  Extract corresponding quantity parameters
   *
   * @param {boolean} disableQuantityActions - Disable quantity actions
   * @return {ConfiguratorAttributeQuantityComponentOptions} - New quantity options
   */
  extractQuantityParameters(): ConfiguratorAttributeQuantityComponentOptions {
    const quantityFromOptions = this.productCardOptions?.productBoundValue
      ?.quantity;
    const initialQuantity: Quantity = {
      quantity: quantityFromOptions ? quantityFromOptions : 0,
    };

    return {
      allowZero: !this.productCardOptions?.preventRemoveAction,
      initialQuantity: initialQuantity,
      disableQuantityActions: this.loading$,
    };
  }

  /**
   * Verifies whether the value code is defined.
   *
   * @param {string} valueCode - Value code
   * @return {boolean} - 'true' if the value code is defined, otherwise 'false'
   */
  isValueCodeDefined(valueCode: string | null | undefined): boolean {
    return valueCode && valueCode !== '0' ? true : false;
  }

  protected transformToProductType(
    value: Configurator.Value | undefined
  ): ProductExtended {
    return {
      code: value?.productSystemId,
      description: value?.description,
      images: {},
      name: value?.valueDisplay,
      noLink: true,
    };
  }

  protected onHandleQuantity(quantity: number): void {
    this.loading$.next(true);

    this.handleQuantity.emit({
      quantity,
      valueCode: this.productCardOptions?.productBoundValue?.valueCode,
    });
  }
}
