import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Input, Component } from '@angular/core';

import { StoreModule } from '@ngrx/store';

import {
  NgbTabsetModule,
  NgbAccordionModule
} from '@ng-bootstrap/ng-bootstrap';

import { ProductService } from '@spartacus/core';

import { OutletDirective } from '../../../outlet';
import { ComponentsModule } from './../../components/components.module';
import { ComponentWrapperDirective } from '../../../cms/components';
import * as fromCmsReducer from '../../../cms/store/reducers';
import { AddToCartComponent } from '../../../cart/components/add-to-cart/add-to-cart.component';
import { ProductDetailsComponent } from '../../../product/components/product-details/container/product-details.component';
import { ProductAttributesComponent } from '../../../product/components/product-details/product-attributes/product-attributes.component';
import { ProductImagesComponent } from '../../../product/components/product-details/product-images/product-images.component';
import { ProductReviewsComponent } from '../../../product/components/product-details/product-reviews/product-reviews.component';
import { ProductSummaryComponent } from '../../../product/components/product-details/product-summary/product-summary.component';

import { ProductDetailsPageLayoutComponent } from './product-details-page-layout.component';

@Component({
  selector: 'cx-dynamic-slot',
  template: 'MockDynamicSlotComponent'
})
export class MockDynamicSlotComponent {
  @Input()
  position: string;
}
describe('ProductDetailsPageLayoutComponent', () => {
  let component: ProductDetailsPageLayoutComponent;
  let fixture: ComponentFixture<ProductDetailsPageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbTabsetModule,
        NgbAccordionModule,
        ReactiveFormsModule,
        StoreModule.forRoot({}),
        // StoreModule.forFeature('products', fromProduct.getReducers()),
        StoreModule.forFeature('cms', fromCmsReducer.getReducers()),
        ComponentsModule
      ],
      providers: [ProductService],
      declarations: [
        ProductDetailsPageLayoutComponent,
        MockDynamicSlotComponent,
        ComponentWrapperDirective,
        ProductDetailsComponent,
        ProductAttributesComponent,
        ProductImagesComponent,
        ProductSummaryComponent,
        ProductReviewsComponent,
        AddToCartComponent,
        OutletDirective
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
