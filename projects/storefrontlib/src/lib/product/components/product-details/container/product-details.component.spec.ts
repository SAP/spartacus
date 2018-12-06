import { Component, Input } from '@angular/core';
import { ComponentsModule } from './../../../../ui/components/components.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Observable } from 'rxjs';

import { ComponentMapperService } from '../../../../cms/services/component-mapper.service';
import { ProductService } from '@spartacus/core';

import { BootstrapModule } from '../../../../bootstrap.module';
import { ProductDetailsComponent } from './product-details.component';
import { OutletDirective } from '../../../../outlet';
import {
  DynamicSlotComponent,
  ComponentWrapperDirective
} from '../../../../cms/components';
import { ProductImagesComponent } from '../product-images/product-images.component';
import { ProductSummaryComponent } from '../product-summary/product-summary.component';
import { ProductAttributesComponent } from '../product-attributes/product-attributes.component';
import { ProductReviewsComponent } from '../product-reviews/product-reviews.component';

class MockComponentMapperService {}

const mockProduct = 'mockProduct';

class MockProductService {
  get(): Observable<any> {
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
  productCode;
  @Input()
  quantity;
}

describe('ProductDetailsComponent in product', () => {
  let productDetailsComponent: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, BootstrapModule, ComponentsModule],
      declarations: [
        ProductDetailsComponent,

        DynamicSlotComponent,
        ComponentWrapperDirective,
        ProductImagesComponent,
        ProductSummaryComponent,
        ProductAttributesComponent,
        ProductReviewsComponent,
        MockAddToCartComponent,
        OutletDirective
      ],
      providers: [
        {
          provide: ProductService,
          useClass: MockProductService
        },
        {
          provide: ComponentMapperService,
          useClass: MockComponentMapperService
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
    productDetailsComponent.product$.subscribe(product =>
      expect(product).toEqual(mockProduct)
    );
  });

  it('should go to reviews tab', () => {
    productDetailsComponent.productCode = '123456';
    productDetailsComponent.ngOnChanges();
    productDetailsComponent.product$.subscribe(() => {
      fixture.detectChanges();
      productDetailsComponent.openReview();
      expect(productDetailsComponent.isWritingReview).toEqual(true);
    });
  });
});
