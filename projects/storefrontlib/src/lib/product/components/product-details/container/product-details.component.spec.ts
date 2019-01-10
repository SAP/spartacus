import {
  Component,
  Directive,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductService, Product } from '@spartacus/core';

import { of, Observable } from 'rxjs';

import { OutletDirective } from '../../../../outlet';

import { ProductDetailsComponent } from './product-details.component';

const mockProduct: Product = { name: 'mockProduct' };

class MockProductService {
  get(): Observable<Product> {
    return of(mockProduct);
  }
}

@Component({
  selector: 'cx-add-to-cart',
  template: '<button>add to cart</button>'
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
  selector: 'cx-product-images',
  template: 'product-images.component'
})
export class MockProductImagesComponent {
  @Input()
  product: Product;
}

@Component({
  selector: 'cx-product-summary',
  template: 'product-summary.component'
})
export class MockProductSummaryComponent {
  @Input() product: any;
  @Output() openReview = new EventEmitter();
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

@Component({
  selector: 'cx-dynamic-slot',
  template: 'dynamic-slot.component'
})
export class MockDynamicSlotComponent {
  @Input()
  position: string;
}

@Component({
  selector: 'cx-product-attributes',
  template: 'product-attributes.component'
})
export class MockProductAttributesComponent {
  @Input()
  product: Product;
}

describe('ProductDetailsComponent in product', () => {
  let productDetailsComponent: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        ProductDetailsComponent,
        MockDynamicSlotComponent,
        MockComponentWrapperDirective,
        MockProductImagesComponent,
        MockProductSummaryComponent,
        MockProductAttributesComponent,
        MockProductReviewsComponent,
        MockAddToCartComponent,
        OutletDirective
      ],
      providers: [
        {
          provide: ProductService,
          useClass: MockProductService
        }
      ]
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

  it('should call ngOnChanges()', () => {
    productDetailsComponent.productCode = '123456';
    productDetailsComponent.ngOnChanges();
    let result: Product;
    productDetailsComponent.product$.subscribe(product => (result = product));
    expect(result).toEqual(mockProduct);
  });

  it('should go to reviews tab', () => {
    productDetailsComponent.productCode = '123456';
    productDetailsComponent.ngOnChanges();
    let result: boolean;
    productDetailsComponent.product$.subscribe(() => {
      fixture.detectChanges();
      productDetailsComponent.openReview();
      result = productDetailsComponent.isWritingReview;
    });
    expect(result).toEqual(true);
  });
});
