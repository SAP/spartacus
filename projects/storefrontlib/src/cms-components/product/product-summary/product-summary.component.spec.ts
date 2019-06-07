import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, Product } from '@spartacus/core';
import { AddToCartModule } from '../../../cms-components/cart/index';
import { OutletDirective } from '../../../cms-structure/outlet/index';
import { FormComponentsModule } from '../../../shared/components/form-components/form-components.module';
import { ProductSummaryComponent } from '../product-summary/product-summary.component';
import { Observable, of } from 'rxjs';
import { CurrentProductService } from '../current-product.service';

class MockCurrentProductService {
  getProduct(): Observable<Product> {
    return of();
  }
}

describe('ProductSummaryComponent in product', () => {
  let productSummaryComponent: ProductSummaryComponent;
  let fixture: ComponentFixture<ProductSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AddToCartModule, FormComponentsModule, I18nTestingModule],
      declarations: [ProductSummaryComponent, OutletDirective],
      providers: [
        { provide: CurrentProductService, useClass: MockCurrentProductService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSummaryComponent);
    productSummaryComponent = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(productSummaryComponent).toBeTruthy();
  });
});
