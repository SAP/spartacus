import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, Product } from '@spartacus/core';
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

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        ItemCounterModule,
        I18nTestingModule,
        ProductSummaryComponent,
        OutletDirective,
      ],
      providers: [
        {
          provide: CurrentProductService,
          useClass: MockCurrentProductService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSummaryComponent);
    productSummaryComponent = fixture.componentInstance;
    currentProductService = TestBed.inject(CurrentProductService);
  });

  it('should be created', () => {
    expect(productSummaryComponent).toBeTruthy();
  });

  it('should get product details without promotions', () => {
    vi.spyOn(currentProductService, 'getProduct').mockImplementation(() => {});
    productSummaryComponent['getProduct']();
    expect(currentProductService.getProduct).toHaveBeenCalledWith([
      'details',
      'price',
      'promotions',
    ]);
  });

  it('should get product details with promotions', () => {
    vi.spyOn(currentProductService, 'getProduct').mockImplementation(() => {});
    productSummaryComponent['getProduct']();
    expect(currentProductService.getProduct).toHaveBeenCalledWith([
      'details',
      'price',
      'promotions',
    ]);
  });
});
