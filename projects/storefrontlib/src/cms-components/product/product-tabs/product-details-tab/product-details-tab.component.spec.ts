import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Product, I18nTestingModule } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CurrentProductService } from '../../current-product.service';
import { ProductDetailsTabComponent } from './product-details-tab.component';
import { By } from '@angular/platform-browser';

const mockProduct: Product = {
  name: 'mockProduct',
  description: 'Mock Product Description.',
};
const mockProduct2: Product = {
  name: 'mockProduct',
  description: new Array(500).join('b'),
};
class MockCurrentProductService {
  getProduct(): Observable<Product> {
    return of(mockProduct);
  }
}

describe('ProductDetailsTabComponent', () => {
  let productDetailsTabComponent: ProductDetailsTabComponent;
  let fixture: ComponentFixture<ProductDetailsTabComponent>;
  let productService: CurrentProductService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
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
    productService = TestBed.inject(CurrentProductService);
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

  it('should NOT display show more button when product description below 400 characters', () => {
    fixture.detectChanges();
    productDetailsTabComponent.ngOnInit();
    const showMoreBtn = fixture.debugElement.queryAll(By.css('a'));
    expect(showMoreBtn.length).toBe(0);
  });

  it('should display show more button when product description above 400 characters', () => {
    spyOn(productService, 'getProduct').and.returnValue(of(mockProduct2));
    fixture.detectChanges();
    productDetailsTabComponent.ngOnInit();
    const showMoreBtn = fixture.debugElement.queryAll(By.css('a'));
    expect(showMoreBtn.length).toBe(1);
  });
});
