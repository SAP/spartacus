import { Component, EventEmitter, Input, Output } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Product, Page, CmsService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { OutletDirective } from '../../../../cms-structure/outlet/index';
import { CurrentProductService } from '../../current-product.service';
import { ProductDetailsComponent } from './product-details.component';

const mockProduct: Product = { name: 'mockProduct' };
const mockPage: Page = {
  name: 'MockPage',
  pageId: 'ProductPage',
  slots: {
    slot1: {},
    slot2: {},
  },
};

class MockCurrentProductService {
  getProduct(): Observable<Product> {
    return of(mockProduct);
  }
}

export class MockCmsService {
  getCurrentPage(): Observable<Page> {
    return of(mockPage);
  }
}

@Component({
  selector: 'cx-add-to-cart',
  template: '<button>add to cart</button>',
})
export class MockAddToCartComponent {
  @Input()
  iconOnly;
  @Input()
  productCode: string;
  @Input()
  quantity: number;
}

@Component({
  selector: 'cx-product-images',
  template: 'product-images.component',
})
export class MockProductImagesComponent {
  @Input()
  product: Product;
}

@Component({
  selector: 'cx-product-summary',
  template: 'product-summary.component',
})
export class MockProductSummaryComponent {
  @Input() product: any;
  @Output() openReview = new EventEmitter();
}

describe('ProductDetailsComponent in product', () => {
  let productDetailsComponent: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        ProductDetailsComponent,
        MockProductImagesComponent,
        MockProductSummaryComponent,
        MockAddToCartComponent,
        OutletDirective,
      ],
      providers: [
        {
          provide: CurrentProductService,
          useClass: MockCurrentProductService,
        },
        {
          provide: CmsService,
          useClass: MockCmsService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsComponent);
    fixture.detectChanges();
    productDetailsComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(productDetailsComponent).toBeTruthy();
  });

  it('should fetch product data', () => {
    productDetailsComponent.ngOnInit();
    let result: Product;
    productDetailsComponent.product$.subscribe(product => (result = product));
    expect(result).toEqual(mockProduct);
  });

  it('should fetch page', () => {
    productDetailsComponent.ngOnInit();
    let result: Page;
    productDetailsComponent.page$.subscribe(page => (result = page));
    expect(result).toEqual(mockPage);
  });
});
