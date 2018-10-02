import { ComponentsModule } from './../../components/components.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsPageLayoutComponent } from './product-details-page-layout.component';
import {
  DynamicSlotComponent,
  ComponentWrapperDirective
} from '../../../cms/components';
import { ProductDetailsComponent } from '../../../product/components/product-details/container/product-details.component';
import { ProductAttributesComponent } from '../../../product/components/product-details/product-attributes/product-attributes.component';
import { ProductImagesComponent } from '../../../product/components/product-details/product-images/product-images.component';
import { ProductSummaryComponent } from '../../../product/components/product-details/product-summary/product-summary.component';
import { AddToCartComponent } from '../../../cart/components/add-to-cart/add-to-cart.component';
import { ProductReviewsComponent } from '../../../product/components/product-details/product-reviews/product-reviews.component';
import { StoreModule, combineReducers } from '@ngrx/store';
import * as fromRoot from '../../../routing/store';
import * as fromProduct from '../../../product/store/reducers';
import * as fromCmsReducer from '../../../cms/store/reducers';
import * as fromAuthStore from '../../../auth/store/reducers';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NgbTabsetModule,
  NgbAccordionModule
} from '@ng-bootstrap/ng-bootstrap';
import { OutletDirective } from '../../../outlet';
import { ProductService } from '../../../product/services';

describe('ProductDetailsPageLayoutComponent', () => {
  let component: ProductDetailsPageLayoutComponent;
  let fixture: ComponentFixture<ProductDetailsPageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbTabsetModule,
        NgbAccordionModule,
        ReactiveFormsModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          products: combineReducers(fromProduct.getReducers()),
          cms: combineReducers(fromCmsReducer.getReducers()),
          auth: combineReducers(fromAuthStore.getReducers())
        }),
        ComponentsModule
      ],
      providers: [ProductService],
      declarations: [
        ProductDetailsPageLayoutComponent,
        DynamicSlotComponent,
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
