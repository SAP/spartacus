import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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

const mockFeatureUnit: FeatureUnit = {
  name: 'mock',
  symbol: 'MK',
  unitType: '30',
};
const mockFeatureValue: FeatureValue = { value: 'mock value' };
const mockFeature: Feature = {
  featureUnit: mockFeatureUnit,
  featureValues: [mockFeatureValue],
};
const mockClass: Classification = { features: [mockFeature] };
const mockProduct: Product = {
  name: 'mockProduct',
  classifications: [mockClass],
};

class MockCurrentProductService {
  getProduct(): Observable<Product> {
    return of(mockProduct);
  }
}

describe('ProductAttributesComponent in product', () => {
  let productAttributesComponent: ProductAttributesComponent;
  let fixture: ComponentFixture<ProductAttributesComponent>;

  beforeEach(async(() => {
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAttributesComponent);
    productAttributesComponent = fixture.componentInstance;
  });

  it('should create', () => {
    expect(productAttributesComponent).toBeTruthy();
  });

  it('should have rendered attribute spec using mock value', async(() => {
    fixture.detectChanges();
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    const expectedTag = '<li> mock value <span> MK </span>';
    expect(componentHTML.includes(expectedTag)).toBeTruthy();
  }));
});
