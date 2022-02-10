import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  I18nTestingModule,
  ImageType,
  Product,
  ProductService,
} from '@spartacus/core';
import { MediaModule } from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorPriceComponentOptions } from '../price/configurator-price.component';
import { ConfiguratorOverviewBundleAttributeComponent } from './configurator-overview-bundle-attribute.component';

@Pipe({
  name: 'cxNumeric',
})
class MockNumericPipe implements PipeTransform {
  transform(): any {}
}

const mockAttributeOverviewInput: Configurator.AttributeOverview = {
  attribute: 'testAttribute',
  value: 'testValue',
  productCode: 'testProductCode',
  type: Configurator.AttributeOverviewType.BUNDLE,
};

const mockProductImageUrl = 'testUrl';
const mockImage = {
  product: {
    url: mockProductImageUrl,
  },
};
const mockProduct: Product = {
  code: 'testCode',
  name: 'testName',
  images: {
    [ImageType.PRIMARY]: mockImage,
  },
};

const noCommerceProduct = { images: {} };

const product$: BehaviorSubject<Product> = new BehaviorSubject(mockProduct);

class MockProductService {
  get = () => product$.asObservable();
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'cx-configurator-price',
  template: '',
})
class MockConfiguratorPriceComponent {
  @Input() formula: ConfiguratorPriceComponentOptions;
}

describe('ConfiguratorOverviewBundleAttributeComponent', () => {
  let component: ConfiguratorOverviewBundleAttributeComponent;
  let fixture: ComponentFixture<ConfiguratorOverviewBundleAttributeComponent>;
  let htmlElem: HTMLElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [MediaModule, I18nTestingModule],
        declarations: [
          ConfiguratorOverviewBundleAttributeComponent,
          MockConfiguratorPriceComponent,
          MockNumericPipe,
        ],
        providers: [{ provide: ProductService, useClass: MockProductService }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ConfiguratorOverviewBundleAttributeComponent
    );
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
  });

  beforeEach(() => {
    component.attributeOverview = mockAttributeOverviewInput;
    component.ngOnInit();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('product', () => {
    it('should use dummy product if no product code exists', (done: DoneFn) => {
      product$.next(noCommerceProduct);

      fixture.detectChanges();

      component.product$.pipe(take(1)).subscribe((product: Product) => {
        expect(product).toEqual(noCommerceProduct);

        done();
      });
    });

    it('should exist with product code', (done: DoneFn) => {
      product$.next(mockProduct);

      fixture.detectChanges();

      component.product$.pipe(take(1)).subscribe((product: Product) => {
        expect(product).toEqual(mockProduct);

        done();
      });
    });
  });

  describe('getProductPrimaryImage()', () => {
    it('should return primary image', () => {
      const image = component.getProductPrimaryImage(mockProduct);

      expect(image).toEqual(mockImage);
    });

    it('should not return image if no primary image', () => {
      const noImageProduct: Product = { ...mockProduct, images: {} };

      const image = component.getProductPrimaryImage(noImageProduct);

      expect(image).toBeFalsy();
    });
  });

  describe('UI', () => {
    const getProductImage = () =>
      fixture.debugElement.queryAll(By.css('.cx-thumbnail img'))[0];

    describe('product image', () => {
      it('should be visible if primary', () => {
        product$.next(mockProduct);

        fixture.detectChanges();

        expect(getProductImage().attributes['src']).toEqual(
          mockProductImageUrl
        );
      });

      it('should not be visible if not existing or not primary', () => {
        product$.next(noCommerceProduct);

        fixture.detectChanges();

        expect(getProductImage()).toBeUndefined();
      });
    });
  });

  describe('getAriaLabel', () => {
    it("should return 'configurator.a11y.itemOfAttributeFullWithPriceAndQuantity' if there is a price and a quantity", () => {
      const attrOverview = component.attributeOverview;
      attrOverview.valuePrice = {
        currencyIso: '$',
        formattedValue: '$20',
        value: 20,
      };
      attrOverview.valuePriceTotal = {
        currencyIso: '$',
        formattedValue: '$20',
        value: 20,
      };
      attrOverview.quantity = 2;
      expect(component.getAriaLabel()).toBe(
        'configurator.a11y.itemOfAttributeFullWithPriceAndQuantity attribute:testAttribute item:testValue price:$20 quantity:2'
      );
    });

    it("should return 'configurator.a11y.itemOfAttributeFullWithQuantity' if there is no price but a quantity", () => {
      const attrOverview = component.attributeOverview;
      attrOverview.valuePrice = {
        currencyIso: '$',
        formattedValue: undefined,
        value: 0,
      };
      attrOverview.quantity = 2;
      expect(component.getAriaLabel()).toBe(
        'configurator.a11y.itemOfAttributeFullWithQuantity attribute:testAttribute item:testValue quantity:2'
      );
    });

    it("should return 'configurator.a11y.itemOfAttributeFullWithPrice' if there is a price but no quantity", () => {
      const attrOverview = component.attributeOverview;
      attrOverview.valuePrice = {
        currencyIso: '$',
        formattedValue: '$20',
        value: 20,
      };
      attrOverview.valuePriceTotal = {
        currencyIso: '$',
        formattedValue: '$20',
        value: 20,
      };
      attrOverview.quantity = undefined;
      expect(component.getAriaLabel()).toBe(
        'configurator.a11y.itemOfAttributeFullWithPrice attribute:testAttribute item:testValue price:$20'
      );
    });

    it("should return 'configurator.a11y.itemOfAttributeFull' if there is no price and no quantity", () => {
      const attrOverview = component.attributeOverview;
      attrOverview.valuePrice = {
        currencyIso: '$',
        formattedValue: undefined,
        value: 0,
      };
      attrOverview.quantity = undefined;
      expect(component.getAriaLabel()).toBe(
        'configurator.a11y.itemOfAttributeFull attribute:testAttribute item:testValue'
      );
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      product$.next(mockProduct);
      const attrOverview = component.attributeOverview;
      attrOverview.valuePrice = {
        currencyIso: '$',
        formattedValue: '$20',
        value: 20,
      };
      attrOverview.valuePriceTotal = {
        currencyIso: '$',
        formattedValue: '$20',
        value: 20,
      };
      attrOverview.quantity = undefined;

      fixture.detectChanges();
    });

    it("should contain action cx-media element with 'aria-hidden' attribute that removes cx-media element from the accessibility tree", () => {
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

    it("should contain action span element with class name 'cx-visually-hidden' that hides element content on the UI'", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'span',
        'cx-visually-hidden',
        0,
        undefined,
        undefined,
        'configurator.a11y.itemOfAttributeFullWithPrice attribute:' +
          component.attributeOverview.attribute +
          ' item:' +
          component.attributeOverview.value +
          ' price:' +
          component.attributeOverview.valuePrice.formattedValue
      );
    });

    it("should contain action div element with class name 'cx-value-info' and 'aria-hidden' attribute that removes an element from the accessibility tree", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'cx-value-info',
        0,
        'aria-hidden',
        'true',
        component.attributeOverview.value
      );
    });

    it("should contain action div element with class name 'cx-attribute-price-container' and 'aria-hidden' attribute that removes an element from the accessibility tree", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'cx-attribute-price-container',
        0,
        'aria-hidden',
        'true'
      );
    });
  });
});
