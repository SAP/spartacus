import { Component, Directive, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import {
  ProductService,
  Product,
  PageType,
  RoutingService
} from '@spartacus/core';

import { of, Observable } from 'rxjs';

import { OutletDirective } from '../../../../outlet';
import { ProductTabsComponent } from './product-tabs.component';

const mockProduct: Product = { name: 'mockProduct' };

class MockProductService {
  get(): Observable<Product> {
    return of(mockProduct);
  }
}

const router = {
  state: {
    url: '/',
    queryParams: {},
    params: {},
    context: { id: '1', type: PageType.PRODUCT_PAGE },
    cmsRequired: false
  }
};

class MockRoutingService {
  getRouterState() {
    return of(router);
  }
}

@Component({
  selector: 'cx-product-reviews',
  template: 'product-reviews'
})
class MockProductReviewsComponent {
  @Input()
  product: Product;
  @Input()
  isWritingReview: boolean;
}

@Component({
  selector: 'cx-product-attributes',
  template: 'product-attributes.component'
})
export class MockProductAttributesComponent {
  @Input()
  product: Product;
}

@Directive({
  selector: '[cxComponentWrapper]'
})
export class MockComponentWrapperDirective {
  @Input()
  componentType: string;
  @Input()
  componentUid: string;
}

describe('ProductTabsComponent in product', () => {
  let productTabsComponent: ProductTabsComponent;
  let fixture: ComponentFixture<ProductTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        ProductTabsComponent,
        MockProductAttributesComponent,
        MockProductReviewsComponent,
        MockComponentWrapperDirective,
        OutletDirective
      ],
      providers: [
        {
          provide: ProductService,
          useClass: MockProductService
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTabsComponent);
    fixture.detectChanges();
    productTabsComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(productTabsComponent).toBeTruthy();
  });

  it('should fetch product data', () => {
    productTabsComponent.productCode = '123456';
    let result: Product;
    productTabsComponent.product$.subscribe(product => (result = product));
    expect(result).toEqual(mockProduct);
  });

  it('should go to reviews tab', () => {
    productTabsComponent.productCode = '123456';
    let result: boolean;
    productTabsComponent.product$.subscribe(() => {
      fixture.detectChanges();
      productTabsComponent.openReview();
      result = productTabsComponent.isWritingReview;
    });
    expect(result).toEqual(false);
  });
});
