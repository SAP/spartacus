import { ComponentsModule } from './../../../../ui/components/components.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { combineReducers, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';

import { ComponentMapperService } from '../../../../cms/services/component-mapper.service';
import { ProductService } from '../../../services/product.service';

import * as fromRoot from '../../../../routing/store';
import * as fromProduct from '../../../store/reducers';
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
import { Component, Input } from '@angular/core';

class MockComponentMapperService {}

@Component({
  selector: 'y-add-to-cart',
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
  let service: ProductService;
  let productDetailsComponent: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  const mockProduct = 'mockProduct';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BootstrapModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          products: combineReducers(fromProduct.getReducers())
        }),
        ComponentsModule
      ],
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
        ProductService,
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
    service = TestBed.get(ProductService);
    fixture.detectChanges();

    spyOn(service, 'get').and.returnValue(of(mockProduct));
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
      productDetailsComponent.goToReviews();
      expect(productDetailsComponent.tabSet.activeId).toEqual('reviews');
    });
  });
});
