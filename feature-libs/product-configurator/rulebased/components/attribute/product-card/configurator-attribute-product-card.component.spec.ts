import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, Product, ProductService } from '@spartacus/core';
import { CommonConfiguratorTestUtilsService } from '@spartacus/product-configurator/common';
import { ItemCounterComponent, MediaModule } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { Observable, of } from 'rxjs';
import { Configurator } from '../../../core/model/configurator.model';
import { ConfiguratorShowMoreComponent } from '../../show-more/configurator-show-more.component';
import {
  ConfiguratorAttributeProductCardComponent,
  ProductExtended,
} from './configurator-attribute-product-card.component';

const product: ProductExtended = {
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

const productTransformed: ProductExtended = {
  code: '1111-2222',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  images: {},
  name: 'Lorem Ipsum Dolor',
  noLink: true,
};

class MockProductService {
  get(): Observable<Product> {
    return of(product);
  }
}

@Component({
  selector: 'cx-configurator-price',
  template: '',
})
class MockConfiguratorPriceComponent {
  @Input() productPrice: number;
  @Input() quantity = 1;
  @Input() totalPrice: number;
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
  return {};
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
      preventAction: false,
      multiSelect: false,
      productBoundValue: value,
      singleDropdown: false,
      withQuantity: true,
    };

    spyOn(component, 'onHandleDeselect').and.callThrough();
    spyOn(component, 'onHandleQuantity').and.callThrough();
    spyOn(component, 'onHandleSelect').and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Buttons constellation', () => {
    it('should button be enabled when card actions are disabled and card is no selected', () => {
      const button = fixture.debugElement.query(By.css('button.btn'))
        .nativeElement;
      expect(button.disabled).toBe(false);
    });

    it('should button be enabled when card actions are disabled and card is selected', () => {
      setProductBoundValueAttributes(component);

      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('button.btn'))
        .nativeElement;
      expect(button.disabled).toBe(false);
    });

    it('should button be called with proper select method', () => {
      const button = fixture.debugElement.query(By.css('button.btn'))
        .nativeElement;
      button.click();

      fixture.detectChanges();

      expect(component.onHandleSelect).toHaveBeenCalled();
    });

    it('should button be called with proper deselect action', () => {
      setProductBoundValueAttributes(component);

      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('button.btn'))
        .nativeElement;

      button.click();

      fixture.detectChanges();

      expect(component.onHandleDeselect).toHaveBeenCalled();
    });

    it('should button have select text when card type is no multi select and card is no selected', () => {
      const button = fixture.debugElement.query(By.css('button.btn'))
        .nativeElement;

      expect(button.innerText).toContain('configurator.button.select');
    });

    it('should button have deselect text when card type is no multi select and card is selected', () => {
      setProductBoundValueAttributes(component);

      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('button.btn'))
        .nativeElement;

      expect(button.innerText).toContain('configurator.button.deselect');
    });

    it('should button have add text when card type is multi select and card is no selected', () => {
      component.productCardOptions.multiSelect = true;
      setProductBoundValueAttributes(component, false);

      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('button.btn'))
        .nativeElement;

      expect(button.innerText).toContain('configurator.button.add');
    });

    it('should button have remove text when card type is multi select and card is selected', () => {
      component.productCardOptions.multiSelect = true;
      setProductBoundValueAttributes(component);

      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('button.btn'))
        .nativeElement;

      expect(button.innerText).toContain('configurator.button.remove');
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

      component.onHandleQuantity(1);

      expect(component.handleQuantity.emit).toHaveBeenCalledWith(
        jasmine.objectContaining({
          quantity: 1,
          valueCode: component.productCardOptions?.productBoundValue?.valueCode,
        })
      );
    });

    it('should call onHandleDeselect of event onChangeQuantity', () => {
      const quantity = { quantity: 0 };

      component.onChangeQuantity(quantity);

      expect(component.onHandleDeselect).toHaveBeenCalled();
    });

    it('should call onHandleQuantity of event onChangeQuantity', () => {
      const quantity = { quantity: 2 };

      component.onChangeQuantity(quantity);

      expect(component.onHandleQuantity).toHaveBeenCalled();
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

      expect(component.getProductPrice()).toBe(
        component?.productCardOptions?.productBoundValue?.quantity
      );

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

      expect(component.getProductPrice()).toBe(
        component.productCardOptions?.productBoundValue?.valuePrice
      );

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

      expect(component.getProductPrice()).toBe(
        component.productCardOptions?.productBoundValue?.valuePriceTotal
      );

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'cx-configurator-price'
      );
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

      expect(component.getProductPrice()).not.toBeUndefined();

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
});
