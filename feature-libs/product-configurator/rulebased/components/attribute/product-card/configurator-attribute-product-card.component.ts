import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Product, ProductService, TranslationService } from '@spartacus/core';
import { ConfiguratorProductScope } from '@spartacus/product-configurator/common';
import {
  FocusConfig,
  ICON_TYPE,
  KeyboardFocusService,
} from '@spartacus/storefront';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Configurator } from '../../../core/model/configurator.model';
import { QuantityUpdateEvent } from '../../form/configurator-form.event';
import { ConfiguratorPriceComponentOptions } from '../../price/configurator-price.component';
import { ConfiguratorAttributeQuantityComponentOptions } from '../quantity/configurator-attribute-quantity.component';
import { ConfiguratorAttributeBaseComponent } from '../types/base/configurator-attribute-base.component';

export interface ConfiguratorAttributeProductCardComponentOptions {
  /** If set to `true`, all action buttons will be disabled.  */
  disableAllButtons?: boolean;
  /** If set to `true`, the remove/deselect button won't be available. Useful for required attributes,
   *  where a deselect/remove of last value shall not be possible.  */
  hideRemoveButton?: boolean;
  fallbackFocusId?: string;
  multiSelect?: boolean;
  productBoundValue: Configurator.Value;
  singleDropdown?: boolean;
  withQuantity?: boolean;
  /**
   * Used to indicate loading state, for example in case a request triggered by parent component to CPQ is currently in progress.
   * Component will react on it and disable all controls that could cause a request.
   * This prevents the user from triggering concurrent requests with potential conflicting content that might cause unexpected behaviour.
   */
  loading$?: Observable<boolean>;
  attributeId: number;
  attributeLabel?: string;
  attributeName?: string;
  itemCount: number;
  itemIndex: number;
}

@Component({
  selector: 'cx-configurator-attribute-product-card',
  templateUrl: './configurator-attribute-product-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeProductCardComponent
  extends ConfiguratorAttributeBaseComponent
  implements OnInit
{
  product$: Observable<Product>;
  loading$ = new BehaviorSubject<boolean>(true);
  showDeselectionNotPossible = false;

  @Input()
  productCardOptions: ConfiguratorAttributeProductCardComponentOptions;

  @Output() handleDeselect = new EventEmitter<string>();
  @Output() handleQuantity = new EventEmitter<QuantityUpdateEvent>();
  @Output() handleSelect = new EventEmitter<string>();

  constructor(
    protected productService: ProductService,
    protected keyBoardFocus: KeyboardFocusService,
    protected translation: TranslationService
  ) {
    super();
  }
  iconType = ICON_TYPE;

  ngOnInit() {
    this.loading$.next(true);
    const productSystemId =
      this.productCardOptions.productBoundValue.productSystemId;

    this.product$ = this.productService
      .get(
        productSystemId ? productSystemId : '',
        ConfiguratorProductScope.CONFIGURATOR_PRODUCT_CARD
      )
      .pipe(
        map((respProduct) => {
          return respProduct
            ? respProduct
            : this.transformToProductType(
                this.productCardOptions.productBoundValue
              );
        }),
        tap(() => this.loading$.next(false))
      );
  }

  get showQuantity(): boolean {
    return (
      (this.productCardOptions.withQuantity &&
        this.productCardOptions.productBoundValue.selected &&
        this.productCardOptions.multiSelect) ??
      false
    );
  }

  get focusConfig(): FocusConfig {
    const focusConfig = {
      key: this.createFocusId(
        this.productCardOptions.attributeId.toString(),
        this.productCardOptions.productBoundValue.valueCode
      ),
    };
    return focusConfig;
  }

  onHandleSelect(): void {
    this.loading$.next(true);
    if (
      this.productCardOptions.hideRemoveButton &&
      this.productCardOptions.fallbackFocusId
    ) {
      this.keyBoardFocus.set(this.productCardOptions.fallbackFocusId);
    }
    this.handleSelect.emit(this.productCardOptions.productBoundValue.valueCode);
  }

  onHandleDeselect(): void {
    {
      if (
        this.productCardOptions.productBoundValue.selected &&
        this.productCardOptions.hideRemoveButton
      ) {
        this.showDeselectionNotPossibleMessage();
        return;
      }
      this.loading$.next(true);
      this.handleDeselect.emit(
        this.productCardOptions.productBoundValue.valueCode
      );
    }
  }

  onChangeQuantity(eventObject: any): void {
    if (!eventObject) {
      this.onHandleDeselect();
    } else {
      this.onHandleQuantity(eventObject);
    }
  }

  /**
   * Verifies whether the product card refers to a selected value
   * @return {boolean} - Selected?
   */
  isProductCardSelected(): boolean {
    const isProductCardSelected =
      this.productCardOptions.productBoundValue &&
      this.productCardOptions.productBoundValue.selected &&
      !this.productCardOptions.singleDropdown;

    return isProductCardSelected ?? false;
  }

  /**
   * Checks if price needs to be displayed. This is the
   * case if either value price, quantity or value price total
   * are present
   * @return {boolean} - Price display?
   */
  hasPriceDisplay(): boolean {
    const productPrice =
      this.productCardOptions.productBoundValue.valuePrice ||
      this.productCardOptions.productBoundValue.quantity ||
      this.productCardOptions.productBoundValue.valuePriceTotal;

    return productPrice ? true : false;
  }

  /**
   * Extract corresponding price formula parameters
   *
   *  @return {ConfiguratorPriceComponentOptions} - New price formula
   */
  extractPriceFormulaParameters(): ConfiguratorPriceComponentOptions {
    if (!this.productCardOptions.multiSelect) {
      return {
        price: this.productCardOptions.productBoundValue.valuePrice,
        isLightedUp: this.productCardOptions.productBoundValue.selected,
      };
    }
    return {
      quantity: this.productCardOptions.productBoundValue.quantity,
      price: this.productCardOptions.productBoundValue.valuePrice,
      priceTotal: this.productCardOptions.productBoundValue.valuePriceTotal,
      isLightedUp: this.productCardOptions.productBoundValue.selected,
    };
  }

  /**
   *  Extract corresponding quantity parameters
   *
   * @return {ConfiguratorAttributeQuantityComponentOptions} - New quantity options
   */
  extractQuantityParameters(): ConfiguratorAttributeQuantityComponentOptions {
    const quantityFromOptions =
      this.productCardOptions.productBoundValue.quantity;

    const mergedLoading = this.productCardOptions.loading$
      ? combineLatest([this.loading$, this.productCardOptions.loading$]).pipe(
          map((values) => {
            return values[0] || values[1];
          })
        )
      : this.loading$;

    return {
      allowZero: !this.productCardOptions.hideRemoveButton,
      initialQuantity: quantityFromOptions ? quantityFromOptions : 0,
      disableQuantityActions$: mergedLoading,
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
  ): Product {
    return {
      code: value?.productSystemId,
      description: value?.description,
      images: {},
      name: value?.valueDisplay,
    };
  }

  protected onHandleQuantity(quantity: number): void {
    this.loading$.next(true);

    this.handleQuantity.emit({
      quantity,
      valueCode: this.productCardOptions.productBoundValue.valueCode,
    });
  }

  showDeselectionNotPossibleMessage() {
    this.showDeselectionNotPossible = true;
  }

  getAriaLabelSingleUnselected(product: Product): string {
    let translatedText = '';
    let index = this.productCardOptions.itemIndex + 1;
    if (
      this.isValueCodeDefined(
        this.productCardOptions?.productBoundValue?.valueCode
      )
    ) {
      if (
        this.hasPriceDisplay() &&
        this.productCardOptions.productBoundValue.valuePrice?.value !== 0
      ) {
        this.translation
          .translate('configurator.a11y.itemOfAttributeUnselectedWithPrice', {
            item: product.code,
            attribute: this.productCardOptions?.attributeLabel,
            itemIndex: index,
            itemCount: this.productCardOptions.itemCount,
            price:
              this.productCardOptions.productBoundValue.valuePriceTotal
                ?.formattedValue,
          })
          .pipe(take(1))
          .subscribe((text) => (translatedText = text));
      } else {
        this.translation
          .translate('configurator.a11y.itemOfAttributeUnselected', {
            item: product.code,
            attribute: this.productCardOptions?.attributeLabel,
            itemIndex: index,
            itemCount: this.productCardOptions.itemCount,
          })
          .pipe(take(1))
          .subscribe((text) => (translatedText = text));
      }
    } else {
      this.translation
        .translate('configurator.a11y.selectNoItemOfAttribute', {
          attribute: this.productCardOptions?.attributeLabel,
          itemIndex: index,
          itemCount: this.productCardOptions.itemCount,
        })
        .pipe(take(1))
        .subscribe((text) => (translatedText = text));
    }
    return translatedText;
  }

  getAriaLabelSingleSelected(product: Product): string {
    let translatedText = '';
    let index = this.productCardOptions.itemIndex + 1;
    if (
      this.hasPriceDisplay() &&
      this.productCardOptions.productBoundValue.valuePrice?.value !== 0
    ) {
      this.translation
        .translate(
          'configurator.a11y.itemOfAttributeSelectedPressToUnselectWithPrice',
          {
            item: product.code,
            attribute: this.productCardOptions?.attributeLabel,
            itemIndex: index,
            itemCount: this.productCardOptions.itemCount,
            price:
              this.productCardOptions.productBoundValue.valuePriceTotal
                ?.formattedValue,
          }
        )
        .pipe(take(1))
        .subscribe((text) => (translatedText = text));
    } else {
      this.translation
        .translate('configurator.a11y.itemOfAttributeSelectedPressToUnselect', {
          item: product.code,
          attribute: this.productCardOptions?.attributeLabel,
          itemIndex: index,
          itemCount: this.productCardOptions.itemCount,
        })
        .pipe(take(1))
        .subscribe((text) => (translatedText = text));
    }

    return translatedText;
  }

  getAriaLabelSingleSelectedNoButton(product: Product): string {
    let translatedText = '';
    let index = this.productCardOptions.itemIndex + 1;
    if (
      this.hasPriceDisplay() &&
      this.productCardOptions.productBoundValue.valuePrice?.value !== 0
    ) {
      this.translation
        .translate('configurator.a11y.itemOfAttributeSelectedWithPrice', {
          item: product.code,
          attribute: this.productCardOptions?.attributeLabel,
          itemIndex: index,
          itemCount: this.productCardOptions.itemCount,
          price:
            this.productCardOptions.productBoundValue.valuePriceTotal
              ?.formattedValue,
        })
        .pipe(take(1))
        .subscribe((text) => (translatedText = text));
    } else {
      this.translation
        .translate('configurator.a11y.itemOfAttributeSelected', {
          item: product.code,
          attribute: this.productCardOptions?.attributeLabel,
          itemIndex: index,
          itemCount: this.productCardOptions.itemCount,
        })
        .pipe(take(1))
        .subscribe((text) => (translatedText = text));
    }

    return translatedText;
  }

  getAriaLabelMultiSelected(product: Product): string {
    let translatedText = '';
    let index = this.productCardOptions.itemIndex + 1;
    if (
      this.hasPriceDisplay() &&
      this.productCardOptions.productBoundValue.valuePrice?.value !== 0
    ) {
      this.translation
        .translate(
          'configurator.a11y.itemOfAttributeSelectedPressToUnselectWithPrice',
          {
            item: product.code,
            attribute: this.productCardOptions?.attributeLabel,
            itemIndex: index,
            itemCount: this.productCardOptions.itemCount,
            price:
              this.productCardOptions.productBoundValue.valuePriceTotal
                ?.formattedValue,
          }
        )
        .pipe(take(1))
        .subscribe((text) => (translatedText = text));
    } else {
      this.translation
        .translate('configurator.a11y.itemOfAttributeSelectedPressToUnselect', {
          item: product.code,
          attribute: this.productCardOptions?.attributeLabel,
          itemIndex: index,
          itemCount: this.productCardOptions.itemCount,
        })
        .pipe(take(1))
        .subscribe((text) => (translatedText = text));
    }

    return translatedText;
  }

  getAriaLabelMultiUnselected(product: Product): string {
    let translatedText = '';
    let index = this.productCardOptions.itemIndex + 1;
    if (
      this.hasPriceDisplay() &&
      this.productCardOptions.productBoundValue.valuePrice?.value !== 0
    ) {
      this.translation
        .translate('configurator.a11y.itemOfAttributeUnselectedWithPrice', {
          item: product.code,
          attribute: this.productCardOptions?.attributeLabel,
          itemIndex: index,
          itemCount: this.productCardOptions.itemCount,
          price:
            this.productCardOptions.productBoundValue.valuePriceTotal
              ?.formattedValue,
        })
        .pipe(take(1))
        .subscribe((text) => (translatedText = text));
    } else {
      this.translation
        .translate('configurator.a11y.itemOfAttributeUnselected', {
          item: product.code,
          attribute: this.productCardOptions?.attributeLabel,
          itemIndex: index,
          itemCount: this.productCardOptions.itemCount,
        })
        .pipe(take(1))
        .subscribe((text) => (translatedText = text));
    }

    return translatedText;
  }
}
