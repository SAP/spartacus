import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, Product, ProductService } from '@spartacus/core';
import {
  ItemCounterComponent,
  KeyboardFocusService,
  MediaModule,
} from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CommonConfiguratorTestUtilsService } from '../../../../common/testing/common-configurator-test-utils.service';
import { Configurator } from '../../../core/model/configurator.model';
import { ConfiguratorPriceComponentOptions } from '../../price/configurator-price.component';
import { ConfiguratorShowMoreComponent } from '../../show-more/configurator-show-more.component';
import { ConfiguratorAttributeQuantityComponentOptions } from '../quantity/configurator-attribute-quantity.component';
import { ConfiguratorAttributeProductCardComponent } from './configurator-attribute-product-card.component';

const product: Product = {
  name: 'Product Name',
  code: 'PRODUCT_CODE',
  images: {
    PRIMARY: {
      thumbnail: {
        url: 'url',
        altText: 'alt',
      },
    },
  },
  price: {
    formattedValue: '$1.500',
  },
  priceRange: {
    maxPrice: {
      formattedValue: '$1.500',
    },
    minPrice: {
      formattedValue: '$1.000',
    },
  },
};

const productTransformed: Product = {
  code: '1111-2222',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  images: {},
  name: 'Lorem Ipsum Dolor',
};

class MockProductService {
  get(): Observable<Product> {
    return of(product);
  }
}

let focusService: KeyboardFocusService;

@Component({
  selector: 'cx-configurator-price',
  template: '',
})
class MockConfiguratorPriceComponent {
  @Input() formula: ConfiguratorPriceComponentOptions;
}

@Component({
  selector: 'cx-configurator-attribute-quantity',
  template: '',
})
class MockConfiguratorAttributeQuantityComponent {
  @Input() quantityOptions: ConfiguratorAttributeQuantityComponentOptions;
  @Output() changeQuantity = new EventEmitter<number>();
}

@Directive({
  selector: '[cxFocus]',
})
export class MockFocusDirective {
  @Input('cxFocus') protected config: any;
}

function setProductBoundValueAttributes(
  component: ConfiguratorAttributeProductCardComponent,
  selected = true,
  quantity = 1
): Configurator.Value {
  const productBoundValue = component.productCardOptions?.productBoundValue;
  if (productBoundValue) {
    productBoundValue.selected = selected;
    productBoundValue.quantity = quantity;
    productBoundValue.valuePrice = undefined;
    productBoundValue.valuePriceTotal = undefined;
    return productBoundValue;
  }
  return { valueCode: 'A' };
}

function takeOneDisableQtyObs(
  component: ConfiguratorAttributeProductCardComponent
): Observable<boolean> {
  return (
    component
      .extractQuantityParameters()
      .disableQuantityActions$?.pipe(take(1)) ?? EMPTY
  );
}

describe('ConfiguratorAttributeProductCardComponent', () => {
  let component: ConfiguratorAttributeProductCardComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeProductCardComponent>;
  let htmlElem: HTMLElement;
  let value: Configurator.Value;

  const createImage = (url: string, altText: string): Configurator.Image => {
    const image: Configurator.Image = {
      url: url,
      altText: altText,
    };
    return image;
  };

  const createValue = (
    valueCode: string,
    description: string,
    images: Configurator.Image[],
    quantity: number,
    selected: boolean,
    productSystemId: string,
    valueDisplay: string
  ): Configurator.Value => {
    const value: Configurator.Value = {
      valueCode,
      description,
      images,
      quantity,
      selected,
      productSystemId,
      valueDisplay,
    };
    return value;
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          I18nTestingModule,
          ReactiveFormsModule,
          RouterTestingModule,
          UrlTestingModule,
          MediaModule,
        ],
        declarations: [
          ConfiguratorAttributeProductCardComponent,
          ConfiguratorShowMoreComponent,
          ItemCounterComponent,
          MockConfiguratorPriceComponent,
          MockFocusDirective,
          MockConfiguratorAttributeQuantityComponent,
        ],
        providers: [
          {
            provide: ProductService,
            useClass: MockProductService,
          },
        ],
      })
        .overrideComponent(ConfiguratorAttributeProductCardComponent, {
          set: {
            changeDetection: ChangeDetectionStrategy.Default,
          },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ConfiguratorAttributeProductCardComponent
    );
    focusService = TestBed.inject(KeyboardFocusService);
    htmlElem = fixture.nativeElement;
    component = fixture.componentInstance;

    value = createValue(
      '888',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      [createImage('url', 'alt')],
      1,
      false,
      '1111-2222',
      'Lorem Ipsum Dolor'
    );

    component.productCardOptions = {
      hideRemoveButton: false,
      multiSelect: false,
      productBoundValue: value,
      singleDropdown: false,
      withQuantity: true,
      attributeId: 123,
      attributeLabel: 'Attribute Label',
      attributeName: 'Attribute Name',
      itemCount: 3,
      itemIndex: 1,
    };

    spyOn(component, 'onHandleDeselect').and.callThrough();
    spyOn(component as any, 'onHandleQuantity').and.callThrough();
    spyOn(component, 'onHandleSelect').and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('create a focus config with key', () => {
    expect(component.focusConfig.key).toContain(
      component.productCardOptions.attributeId.toString()
    );
    const valueCode =
      component.productCardOptions.productBoundValue?.valueCode ?? 'noCode';
    expect(component.focusConfig.key).toContain(valueCode);
  });

  it('should indicate loading state when fetching product data', () => {
    const loadingState: boolean[] = [];
    let subscription = component.loading$.subscribe((loading) => {
      loadingState.push(loading);
    });
    component.ngOnInit();
    component.product$.subscribe().unsubscribe(); // fetch product
    subscription.unsubscribe();
    expect(loadingState.length).toBe(3);
    expect(loadingState[0]).toBe(false); // state from before each
    expect(loadingState[1]).toBe(true); // loading
    expect(loadingState[2]).toBe(false); // loading done
  });

  describe('Buttons constellation', () => {
    it('should button be enabled when card actions are disabled and card is no selected', () => {
      const button = fixture.debugElement.query(
        By.css('button.btn')
      ).nativeElement;
      expect(button.disabled).toBe(false);
    });

    it('should button be enabled when card actions are disabled and card is selected', () => {
      setProductBoundValueAttributes(component);

      fixture.detectChanges();

      const button = fixture.debugElement.query(
        By.css('button.btn')
      ).nativeElement;
      expect(button.disabled).toBe(false);
    });

    it('should button be called with proper select method', () => {
      const button = fixture.debugElement.query(
        By.css('button.btn')
      ).nativeElement;
      button.click();

      fixture.detectChanges();

      expect(component.onHandleSelect).toHaveBeenCalled();
    });

    it('should button be called with proper deselect action', () => {
      setProductBoundValueAttributes(component);

      fixture.detectChanges();

      const button = fixture.debugElement.query(
        By.css('button.btn')
      ).nativeElement;

      button.click();

      fixture.detectChanges();

      expect(component.onHandleDeselect).toHaveBeenCalled();
    });

    it('should button have select text when card type is no multi select and card is no selected', () => {
      const button = fixture.debugElement.query(
        By.css('button.btn')
      ).nativeElement;

      expect(button.innerText).toContain('configurator.button.select');
    });

    it('should button have deselect text when card type is no multi select and card is selected', () => {
      setProductBoundValueAttributes(component);

      fixture.detectChanges();

      const button = fixture.debugElement.query(
        By.css('button.btn')
      ).nativeElement;

      expect(button.innerText).toContain('configurator.button.deselect');
    });

    it('should button have add text when card type is multi select and card is no selected', () => {
      component.productCardOptions.multiSelect = true;
      setProductBoundValueAttributes(component, false);

      fixture.detectChanges();

      const button = fixture.debugElement.query(
        By.css('button.btn')
      ).nativeElement;

      expect(button.innerText).toContain('configurator.button.add');
    });

    it('should button have remove text when card type is multi select and card is selected', () => {
      component.productCardOptions.multiSelect = true;
      setProductBoundValueAttributes(component);

      fixture.detectChanges();

      const button = fixture.debugElement.query(
        By.css('button.btn')
      ).nativeElement;

      expect(button.innerText).toContain('configurator.button.remove');
    });

    it('should show deselection error message when removing required attribute', () => {
      component.productCardOptions.multiSelect = true;
      component.productCardOptions.hideRemoveButton = true;
      setProductBoundValueAttributes(component);

      fixture.detectChanges();

      const button = fixture.debugElement.query(
        By.css('button.btn')
      ).nativeElement;

      button.click();

      expect(component.onHandleDeselect).toHaveBeenCalled();
      expect(component.showDeselectionNotPossible).toBe(true);
    });
  });

  describe('quantity', () => {
    it('should quantity be hidden when card type is no multi select', () => {
      component.productCardOptions.multiSelect = false;

      fixture.detectChanges();

      const quantityContainer = fixture.debugElement.query(
        By.css('.cx-configurator-attribute-product-card-quantity')
      );

      expect(quantityContainer).toBeNull();
    });

    it('should quantity be visible when card type is multi select', () => {
      component.productCardOptions.multiSelect = true;

      fixture.detectChanges();

      const quantityContainer = fixture.debugElement.query(
        By.css('.cx-configurator-attribute-product-card-quantity')
      );

      expect(quantityContainer).toBeDefined();
    });

    it('should call handleQuantity on event onHandleQuantity', () => {
      spyOn(component.handleQuantity, 'emit').and.callThrough();

      component['onHandleQuantity'](1);

      expect(component.handleQuantity.emit).toHaveBeenCalledWith(
        jasmine.objectContaining({
          quantity: 1,
          valueCode: component.productCardOptions?.productBoundValue?.valueCode,
        })
      );
    });

    it('should call onHandleDeselect of event onChangeQuantity', () => {
      component.onChangeQuantity(0);
      expect(component.onHandleDeselect).toHaveBeenCalled();
    });

    it('should call onHandleQuantity of event onChangeQuantity', () => {
      component.onChangeQuantity(2);
      expect(component['onHandleQuantity']).toHaveBeenCalled();
    });

    it('should transformToProductType return Product', () => {
      expect(
        component['transformToProductType'](
          component.productCardOptions.productBoundValue
        )
      ).toEqual(productTransformed);
    });

    it('should display quantity when props withQuantity is true', () => {
      component.productCardOptions.withQuantity = true;
      setProductBoundValueAttributes(component);
      component.productCardOptions.multiSelect = true;

      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'cx-configurator-attribute-quantity'
      );
    });

    it('should not display quantity when props withQuantity is false', () => {
      component.productCardOptions.withQuantity = false;
      setProductBoundValueAttributes(component);
      component.productCardOptions.multiSelect = true;

      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        'cx-configurator-attribute-quantity'
      );
    });

    it('should not display quantity when props multiSelect is false', () => {
      component.productCardOptions.withQuantity = true;
      setProductBoundValueAttributes(component);
      component.productCardOptions.multiSelect = false;

      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        'cx-configurator-attribute-quantity'
      );
    });

    it('should not display quantity when value is no selected', () => {
      component.productCardOptions.withQuantity = true;
      setProductBoundValueAttributes(component, false);
      component.productCardOptions.multiSelect = true;

      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        'cx-configurator-attribute-quantity'
      );
    });
  });

  describe('product price at value level', () => {
    it('should return price details with quantity and display content of cx-configurator-price ', () => {
      const productBoundValue = setProductBoundValueAttributes(
        component,
        true,
        2
      );

      productBoundValue.valuePrice = undefined;
      productBoundValue.valuePriceTotal = undefined;
      fixture.detectChanges();

      expect(component.hasPriceDisplay()).toBe(true);

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'cx-configurator-price'
      );
    });

    it('should return price details with value price and display content of cx-configurator-price ', () => {
      const productBoundValue = setProductBoundValueAttributes(
        component,
        true,
        undefined
      );

      productBoundValue.valuePrice = {
        currencyIso: '$',
        formattedValue: '$20',
        value: 20,
      };
      productBoundValue.valuePriceTotal = undefined;
      fixture.detectChanges();

      expect(component.hasPriceDisplay()).toBe(true);

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'cx-configurator-price'
      );
    });

    it('should return price details with value price total and display content of cx-configurator-price ', () => {
      const productBoundValue = setProductBoundValueAttributes(
        component,
        true,
        0
      );

      productBoundValue.valuePrice = undefined;
      productBoundValue.valuePriceTotal = {
        currencyIso: '$',
        formattedValue: '$100',
        value: 100,
      };
      fixture.detectChanges();

      expect(component.hasPriceDisplay()).toBe(true);

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'cx-configurator-price'
      );
    });

    it('should state that no price display is needed if no price related fields are available', () => {
      const productBoundValue = setProductBoundValueAttributes(
        component,
        true,
        0
      );

      productBoundValue.valuePrice = undefined;
      productBoundValue.valuePriceTotal = undefined;
      fixture.detectChanges();

      expect(component.hasPriceDisplay()).toBe(false);
    });

    it('should extract quantity parameters', () => {
      component.productCardOptions.hideRemoveButton = false;
      setProductBoundValueAttributes(component, true, 5);
      const qtyParams = component.extractQuantityParameters();
      expect(qtyParams.allowZero).toBe(true);
      expect(qtyParams.initialQuantity).toBe(5);
      expect(qtyParams.disableQuantityActions$).toBeDefined();
    });

    it('should disable stepper when loading', () => {
      component.loading$.next(true);
      takeOneDisableQtyObs(component).subscribe((disable) => {
        expect(disable).toBe(true);
      });
    });
    it('should enable stepper when loading is finished', () => {
      component.loading$.next(false);
      takeOneDisableQtyObs(component).subscribe((disable) => {
        expect(disable).toBe(false);
      });
    });

    it('should disable stepper when loading state is indicated by parent', () => {
      component.loading$.next(false);
      component.productCardOptions.loading$ = new BehaviorSubject<boolean>(
        true
      );
      takeOneDisableQtyObs(component).subscribe((disable) => {
        expect(disable).toBe(true);
      });
    });

    it('should disable stepper when loading is finsihed including parent', () => {
      component.loading$.next(false);
      component.productCardOptions.loading$ = new BehaviorSubject<boolean>(
        false
      );
      takeOneDisableQtyObs(component).subscribe((disable) => {
        expect(disable).toBe(false);
      });
    });

    it('should display content of cx-configurator-price ', () => {
      const productBoundValue = setProductBoundValueAttributes(
        component,
        true,
        undefined
      );

      productBoundValue.valuePrice = {
        currencyIso: '$',
        formattedValue: '$10',
        value: 10,
      };
      productBoundValue.valuePriceTotal = {
        currencyIso: '$',
        formattedValue: '$20',
        value: 20,
      };
      fixture.detectChanges();

      expect(component.hasPriceDisplay()).not.toBeUndefined();

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'cx-configurator-price'
      );
    });
  });

  describe('isValueCodeDefined', () => {
    it('should return true when value code equals zero', () => {
      expect(component.isValueCodeDefined('0')).toBe(false);
    });

    it('should return true when value code is null', () => {
      expect(component.isValueCodeDefined(null)).toBe(false);
    });

    it('should return true when value code is undefined', () => {
      expect(component.isValueCodeDefined(undefined)).toBe(false);
    });

    it('should return true when value code is defined', () => {
      expect(component.isValueCodeDefined('888')).toBe(true);
    });
  });

  describe('if "No Option Selected" is selected / not selected for not required single-selection-bundle', () => {
    it('should not show "Deselect" button', () => {
      value.valueCode = '0';
      setProductBoundValueAttributes(component);
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        'button.btn'
      );
    });

    it('should show "Select" button', () => {
      value.valueCode = '0';
      setProductBoundValueAttributes(component, false);
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'button.btn'
      );

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'button.btn',
        'configurator.button.select'
      );
    });
  });
  describe('onHandleSelect', () => {
    it('should not focus on fallback element if remove button is not hidden', () => {
      focusService.set('123');
      component.productCardOptions.hideRemoveButton = false;
      component.onHandleSelect();
      expect(focusService.get()).toBe('123');
    });

    it('should not focus on fallback element if no fallback id is provided', () => {
      focusService.set('123');
      component.productCardOptions.hideRemoveButton = true;
      component.onHandleSelect();
      expect(focusService.get()).toBe('123');
    });

    it('should focus on fallback element if id is provided and remove button is hidden', () => {
      focusService.set('123');
      component.productCardOptions.hideRemoveButton = true;
      component.productCardOptions.fallbackFocusId = 'fallbackId';
      component.onHandleSelect();
      expect(focusService.get()).toBe('fallbackId');
    });
  });

  describe('getAriaLabelSingleSelectedNoButton', () => {
    it("should return 'configurator.a11y.itemOfAttributeSelectedWithPrice' if there is a price", () => {
      const productBoundValue = setProductBoundValueAttributes(
        component,
        true,
        undefined
      );

      productBoundValue.valuePrice = {
        currencyIso: '$',
        formattedValue: '$20',
        value: 20,
      };
      productBoundValue.valuePriceTotal = {
        currencyIso: '$',
        formattedValue: '$20',
        value: 20,
      };
      const itemIndex = component.productCardOptions.itemIndex + 1;

      expect(component.getAriaLabelSingleSelectedNoButton(product)).toBe(
        'configurator.a11y.itemOfAttributeSelectedWithPrice attribute:' +
          component.productCardOptions.attributeLabel +
          ' item:' +
          product.code +
          ' itemCount:' +
          component.productCardOptions.itemCount +
          ' itemIndex:' +
          itemIndex +
          ' price:' +
          component.productCardOptions.productBoundValue.valuePriceTotal
            .formattedValue
      );
    });

    it("should return 'configurator.a11y.itemOfAttributeSelected' if there is no price", () => {
      const productBoundValue = setProductBoundValueAttributes(
        component,
        true,
        undefined
      );
      productBoundValue.valuePrice = {
        currencyIso: '$',
        formattedValue: undefined,
        value: 0,
      };
      const itemIndex = component.productCardOptions.itemIndex + 1;

      expect(component.getAriaLabelSingleSelectedNoButton(product)).toBe(
        'configurator.a11y.itemOfAttributeSelected attribute:' +
          component.productCardOptions.attributeLabel +
          ' item:' +
          product.code +
          ' itemCount:' +
          component.productCardOptions.itemCount +
          ' itemIndex:' +
          itemIndex
      );
    });
  });

  describe('getAriaLabelSingleSelected', () => {
    it("should return 'configurator.a11y.itemOfAttributeSelectedPressToUnselectWithPrice' if there is a price", () => {
      const productBoundValue = setProductBoundValueAttributes(
        component,
        true,
        undefined
      );

      productBoundValue.valuePrice = {
        currencyIso: '$',
        formattedValue: '$30',
        value: 30,
      };
      productBoundValue.valuePriceTotal = {
        currencyIso: '$',
        formattedValue: '$30',
        value: 30,
      };
      const itemIndex = component.productCardOptions.itemIndex + 1;

      expect(component.getAriaLabelSingleSelected(product)).toBe(
        'configurator.a11y.itemOfAttributeSelectedPressToUnselectWithPrice attribute:' +
          component.productCardOptions.attributeLabel +
          ' item:' +
          product.code +
          ' itemCount:' +
          component.productCardOptions.itemCount +
          ' itemIndex:' +
          itemIndex +
          ' price:' +
          component.productCardOptions.productBoundValue?.valuePriceTotal
            .formattedValue
      );
    });

    it("should return 'configurator.a11y.itemOfAttributeSelectedPressToUnselect' if there is no price", () => {
      const productBoundValue = setProductBoundValueAttributes(
        component,
        true,
        undefined
      );
      productBoundValue.valuePrice = {
        currencyIso: '$',
        formattedValue: undefined,
        value: 0,
      };
      const itemIndex = component.productCardOptions.itemIndex + 1;

      expect(component.getAriaLabelSingleSelected(product)).toBe(
        'configurator.a11y.itemOfAttributeSelectedPressToUnselect attribute:' +
          component.productCardOptions.attributeLabel +
          ' item:' +
          product.code +
          ' itemCount:' +
          component.productCardOptions.itemCount +
          ' itemIndex:' +
          itemIndex
      );
    });
  });

  describe('getAriaLabelMultiSelected', () => {
    it("should return 'configurator.a11y.itemOfAttributeSelectedPressToUnselectWithPrice' if there is a price", () => {
      const productBoundValue = setProductBoundValueAttributes(
        component,
        true,
        undefined
      );

      productBoundValue.valuePrice = {
        currencyIso: '$',
        formattedValue: '$20',
        value: 20,
      };
      productBoundValue.valuePriceTotal = {
        currencyIso: '$',
        formattedValue: '$20',
        value: 20,
      };
      const itemIndex = component.productCardOptions.itemIndex + 1;

      expect(component.getAriaLabelMultiSelected(product)).toBe(
        'configurator.a11y.itemOfAttributeSelectedPressToUnselectWithPrice attribute:' +
          component.productCardOptions.attributeLabel +
          ' item:' +
          product.code +
          ' itemCount:' +
          component.productCardOptions.itemCount +
          ' itemIndex:' +
          itemIndex +
          ' price:' +
          component.productCardOptions.productBoundValue?.valuePriceTotal
            .formattedValue
      );
    });

    it("should return 'configurator.a11y.itemOfAttributeSelectedPressToUnselect' if there is no price", () => {
      const productBoundValue = setProductBoundValueAttributes(
        component,
        true,
        undefined
      );
      productBoundValue.valuePrice = {
        currencyIso: '$',
        formattedValue: undefined,
        value: 0,
      };
      const itemIndex = component.productCardOptions.itemIndex + 1;

      expect(component.getAriaLabelMultiSelected(product)).toBe(
        'configurator.a11y.itemOfAttributeSelectedPressToUnselect attribute:' +
          component.productCardOptions.attributeLabel +
          ' item:' +
          product.code +
          ' itemCount:' +
          component.productCardOptions.itemCount +
          ' itemIndex:' +
          itemIndex
      );
    });
  });

  describe('getAriaLabelMultiUnselected', () => {
    it("should return 'configurator.a11y.itemOfAttributeUnselectedWithPrice' if there is a price", () => {
      const productBoundValue = setProductBoundValueAttributes(
        component,
        true,
        undefined
      );

      productBoundValue.valuePrice = {
        currencyIso: '$',
        formattedValue: '$20',
        value: 20,
      };
      productBoundValue.valuePriceTotal = {
        currencyIso: '$',
        formattedValue: '$20',
        value: 20,
      };
      const itemIndex = component.productCardOptions.itemIndex + 1;

      expect(component.getAriaLabelMultiUnselected(product)).toBe(
        'configurator.a11y.itemOfAttributeUnselectedWithPrice attribute:' +
          component.productCardOptions.attributeLabel +
          ' item:' +
          product.code +
          ' itemCount:' +
          component.productCardOptions.itemCount +
          ' itemIndex:' +
          itemIndex +
          ' price:' +
          component.productCardOptions.productBoundValue?.valuePriceTotal
            .formattedValue
      );
    });

    it("should return 'configurator.a11y.itemOfAttributeUnselected' if there is no price", () => {
      const productBoundValue = setProductBoundValueAttributes(
        component,
        true,
        undefined
      );
      productBoundValue.valuePrice = {
        currencyIso: '$',
        formattedValue: undefined,
        value: 0,
      };
      const itemIndex = component.productCardOptions.itemIndex + 1;

      expect(component.getAriaLabelMultiUnselected(product)).toBe(
        'configurator.a11y.itemOfAttributeUnselected attribute:' +
          component.productCardOptions.attributeLabel +
          ' item:' +
          product.code +
          ' itemCount:' +
          component.productCardOptions.itemCount +
          ' itemIndex:' +
          itemIndex
      );
    });
  });

  describe('getAriaLabelSingleUnselected', () => {
    it("should return 'configurator.a11y.itemOfAttributeUnselected' if there is a price", () => {
      const productBoundValue = setProductBoundValueAttributes(
        component,
        true,
        undefined
      );

      productBoundValue.valuePrice = {
        currencyIso: '$',
        formattedValue: '$20',
        value: 20,
      };
      productBoundValue.valuePriceTotal = {
        currencyIso: '$',
        formattedValue: '$20',
        value: 20,
      };
      const itemIndex = component.productCardOptions.itemIndex + 1;

      expect(component.getAriaLabelSingleUnselected(product)).toBe(
        'configurator.a11y.itemOfAttributeUnselectedWithPrice attribute:' +
          component.productCardOptions.attributeLabel +
          ' item:' +
          product.code +
          ' itemCount:' +
          component.productCardOptions.itemCount +
          ' itemIndex:' +
          itemIndex +
          ' price:' +
          component.productCardOptions.productBoundValue?.valuePriceTotal
            .formattedValue
      );
    });

    it("should return 'configurator.a11y.itemOfAttributeUnselected' if there is no price", () => {
      const productBoundValue = setProductBoundValueAttributes(
        component,
        true,
        undefined
      );
      productBoundValue.valuePrice = {
        currencyIso: '$',
        formattedValue: undefined,
        value: 0,
      };
      const itemIndex = component.productCardOptions.itemIndex + 1;

      expect(component.getAriaLabelSingleUnselected(product)).toBe(
        'configurator.a11y.itemOfAttributeUnselected attribute:' +
          component.productCardOptions.attributeLabel +
          ' item:' +
          product.code +
          ' itemCount:' +
          component.productCardOptions.itemCount +
          ' itemIndex:' +
          itemIndex
      );
    });

    it("should return 'configurator.a11y.selectNoItemOfAttribute' if there is valueCode=0 for the productBoundValue", () => {
      component.productCardOptions.productBoundValue.valueCode = '0';
      const itemIndex = component.productCardOptions.itemIndex + 1;
      expect(component.getAriaLabelSingleUnselected(product)).toBe(
        'configurator.a11y.selectNoItemOfAttribute attribute:' +
          component.productCardOptions.attributeLabel +
          ' itemCount:' +
          component.productCardOptions.itemCount +
          ' itemIndex:' +
          itemIndex
      );
    });
  });

  describe('Accessibility', () => {
    it("should contain div element with class name 'cx-product-card' and 'aria-label' attribute that defines an accessible name to label the current element", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'cx-product-card',
        0,
        'aria-label',
        'configurator.a11y.itemOfAttribute attribute:' +
          component.productCardOptions.attributeLabel
      );
    });

    it("should contain cx-media element with 'aria-hidden' attribute that removes cx-media from the accessibility tree", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'cx-media',
        undefined,
        0,
        'aria-hidden',
        'true'
      );
    });

    it("should contain button element with class name 'btn-primary' and 'aria-selected' attribute that indicates the current 'selected' state of elements", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'button',
        'btn-primary',
        0,
        'aria-selected',
        'false'
      );
    });

    it("should contain button element with class name 'btn-primary' and 'aria-label' attribute that defines an accessible name to label the current element", () => {
      const itemIndex = component.productCardOptions.itemIndex + 1;
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'button',
        'btn-primary',
        0,
        'aria-label',
        'configurator.a11y.itemOfAttributeUnselectedWithPrice attribute:' +
          component.productCardOptions.attributeLabel +
          ' item:' +
          product.code +
          ' itemCount:' +
          component.productCardOptions.itemCount +
          ' itemIndex:' +
          itemIndex +
          ' price:' +
          component.productCardOptions.productBoundValue?.valuePrice,
        'configurator.button.select'
      );
    });

    it("should contain button element with class name 'btn-primary' and 'aria-describedby' that indicates the IDs of the elements that describe the elements", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'button',
        'btn-primary',
        0,
        'aria-describedby',
        'cx-configurator--label--' +
          component.productCardOptions.attributeName +
          ' cx-configurator--attribute-msg--' +
          component.productCardOptions.attributeName,
        'configurator.button.select'
      );
    });
  });
});
