import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  I18nTestingModule,
  Product,
  Feature,
  FeatureUnit,
  Classification,
  FeatureValue,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CurrentProductService } from '../../current-product.service';
import { ProductAttributesComponent } from './product-attributes.component';
import { By } from '@angular/platform-browser';

const createMock = function (mockFeatures: Feature[]): Product {
  const mockClass: Classification = { features: mockFeatures };
  const mockProduct: Product = {
    name: 'mockProduct',
    classifications: [mockClass],
  };
  return mockProduct;
};
const mockFeatureUnit1: FeatureUnit = {
  name: 'mock',
  symbol: 'MK',
  unitType: '30',
};

const mockFeatureValue1: FeatureValue = { value: 'mock1' };
const mockFeature: Feature = {
  featureUnit: mockFeatureUnit1,
  featureValues: [mockFeatureValue1],
};
const mockProduct1 = createMock([mockFeature]);

const mockFeatureUnit2: FeatureUnit = {
  name: 'mock',
  symbol: '.',
  unitType: '300',
};
const mockFeatureValue2: FeatureValue = { value: 'mock2' };
const mockFeature2: Feature = {
  featureUnit: mockFeatureUnit2,
  featureValues: [mockFeatureValue2],
};
const mockProduct2 = createMock([mockFeature2]);

const mockProduct3 = createMock([mockFeature, mockFeature2]);

class MockCurrentProductService {
  getProduct(): Observable<Product> {
    return of();
  }
}

describe('ProductAttributesComponent in product', () => {
  let productAttributesComponent: ProductAttributesComponent;
  let fixture: ComponentFixture<ProductAttributesComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [ProductAttributesComponent],
        providers: [
          {
            provide: CurrentProductService,
            useClass: MockCurrentProductService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAttributesComponent);
    productAttributesComponent = fixture.componentInstance;
  });

  it('should create', () => {
    expect(productAttributesComponent).toBeTruthy();
  });

  describe('UI test', () => {
    it('should have rendered attribute with spec value and symbol', () => {
      productAttributesComponent.product$ = of(mockProduct1);
      fixture.detectChanges();
      const el = fixture.debugElement.queryAll(By.css('td:last-of-type li'));
      expect(el[0].nativeElement.innerText).toEqual('mock1 MK');
    });

    it('should have NOT rendered attribute symbols with unitType equal to 300', () => {
      productAttributesComponent.product$ = of(mockProduct2);
      fixture.detectChanges();
      const el = fixture.debugElement.queryAll(By.css('td:last-of-type li'));
      expect(el[0].nativeElement.innerText).toEqual('mock2');
    });

    it('should have rendered multiple attributes entries', () => {
      productAttributesComponent.product$ = of(mockProduct3);
      fixture.detectChanges();
      const el = fixture.debugElement.queryAll(By.css('td:last-of-type li'));
      expect(el.length).toEqual(2);
    });
  });
});
