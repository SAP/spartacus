import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Product } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CurrentProductService } from '../../current-product.service';
import { ProductDetailsTabComponent } from './product-details-tab.component';
import { TruncateTextService } from './product-description.service';

const mockProduct: Product = { name: 'mockProduct' };

class MockCurrentProductService {
  getProduct(): Observable<Product> {
    return of(mockProduct);
  }
}

describe('ProductDetailsTabComponent', () => {
  let productDetailsTabComponent: ProductDetailsTabComponent;
  let fixture: ComponentFixture<ProductDetailsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailsTabComponent],
      providers: [
        {
          provide: CurrentProductService,
          useClass: MockCurrentProductService,
        },
      ],
    }).compileComponents();
  }));

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

describe('TruncateTextService', () => {
  let truncate: TruncateTextService;

  beforeEach(() => {
    truncate = new TruncateTextService();
  });
  it('should create a sample text and return total truncated text less than 2', () => {
    const sampleText = 'This is my first post';
    const res = truncate.paragraphLimiter(sampleText, 2);
    expect(res.length).toBeLessThanOrEqual(2);
  });

  it('should create a sample text and return total truncated text greater than 2', () => {
    const sampleText = 'This is my first post';
    truncate.isShow = true;
    const res = truncate.paragraphLimiter(sampleText, 2);
    expect(res.length).toBeGreaterThanOrEqual(2);
  });
});
