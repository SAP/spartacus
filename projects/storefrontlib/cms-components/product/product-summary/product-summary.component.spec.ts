import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
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
  });

  it('should be created', () => {
    expect(productSummaryComponent).toBeTruthy();
  });
});
