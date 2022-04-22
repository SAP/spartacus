import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { Product } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CurrentProductService } from '../../current-product.service';
import { ProductDetailsTabComponent } from './product-details-tab.component';

const mockProduct: Product = { name: 'mockProduct' };

class MockCurrentProductService {
  getProduct(): Observable<Product> {
    return of(mockProduct);
  }
}

describe('ProductDetailsTabComponent', () => {
  let productDetailsTabComponent: ProductDetailsTabComponent;
  let fixture: ComponentFixture<ProductDetailsTabComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProductDetailsTabComponent],
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
    fixture = TestBed.createComponent(ProductDetailsTabComponent);
    productDetailsTabComponent = fixture.componentInstance;
  });

  it('should create', () => {
    expect(productDetailsTabComponent).toBeTruthy();
  });

  it('should get product', () => {
    productDetailsTabComponent.ngOnInit();
    let result: Product;
    productDetailsTabComponent.product$.subscribe(
      (product) => (result = product)
    );
    expect(result).toEqual(mockProduct);
  });
});
