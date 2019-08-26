import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, Product } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CurrentProductService } from '../../current-product.service';
import { ProductAttributesComponent } from './product-attributes.component';

const mockProduct: Product = { name: 'mockProduct' };

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
});
