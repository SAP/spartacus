import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  FeatureConfigService,
  I18nTestingModule,
  Product,
} from '@spartacus/core';
import { EMPTY, Observable } from 'rxjs';
import { OutletDirective } from '../../../cms-structure/outlet/index';
import { ItemCounterModule } from '../../../shared/components/item-counter/item-counter.module';
import { CurrentProductService } from '../current-product.service';
import { ProductSummaryComponent } from '../product-summary/product-summary.component';

class MockCurrentProductService {
  getProduct(): Observable<Product> {
    return EMPTY;
  }
}

describe('ProductSummaryComponent in product', () => {
  let productSummaryComponent: ProductSummaryComponent;
  let fixture: ComponentFixture<ProductSummaryComponent>;
  let currentProductService: CurrentProductService;
  let featureConfigService: FeatureConfigService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ItemCounterModule, I18nTestingModule, RouterTestingModule],
        declarations: [ProductSummaryComponent, OutletDirective],
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
    fixture = TestBed.createComponent(ProductSummaryComponent);
    productSummaryComponent = fixture.componentInstance;
    currentProductService = TestBed.inject(CurrentProductService);
    featureConfigService = TestBed.inject(FeatureConfigService);
  });

  it('should be created', () => {
    expect(productSummaryComponent).toBeTruthy();
  });

  it('should get product details without promotions', () => {
    spyOn(currentProductService, 'getProduct').and.stub();
    spyOn(featureConfigService, 'isEnabled').and.returnValue(false);
    productSummaryComponent['getProduct']();
    expect(currentProductService.getProduct).toHaveBeenCalledWith([
      'details',
      'price',
    ]);
  });

  it('should get product details with promotions', () => {
    spyOn(currentProductService, 'getProduct').and.stub();
    spyOn(featureConfigService, 'isEnabled').and.returnValue(true);
    productSummaryComponent['getProduct']();
    expect(currentProductService.getProduct).toHaveBeenCalledWith([
      'details',
      'price',
      'promotions',
    ]);
  });
});
