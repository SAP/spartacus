import { MaterialModule } from 'app/material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import * as fromRouting from '../../../routing/store';
import * as fromCart from '../../../cart/store';
import * as fromUser from '../../../user/store';
import { of } from 'rxjs/observable/of';
import { RouterTestingModule } from '@angular/router/testing';
import * as fromRoot from '../../../routing/store';
import { ProductPageComponent } from './product-page.component';
import { ProductDetailsPageLayoutComponent } from '../../layout/product-details-page-layout/product-details-page-layout.component';
import { ProductDetailsComponent } from '../../../product/components/product-details/container/product-details.component';
import {
  DynamicSlotComponent,
  ComponentWrapperComponent
} from '../../../cms/components';
import { StarRatingComponent } from '../../../product/components/product-details/star-rating/star-rating.component';
import { ProductImagesComponent } from '../../../product/components/product-details/product-images/product-images.component';
import { ProductSummaryComponent } from '../../../product/components/product-details/product-summary/product-summary.component';
import { ProductAttributesComponent } from '../../../product/components/product-details/product-attributes/product-attributes.component';
import { ProductReviewsComponent } from '../../../product/components/product-details/product-reviews/product-reviews.component';
import { PictureComponent } from '../../components/media/picture/picture.component';
import { ComponentMapperService } from '../../../cms/services';
import { ConfigService } from '../../../cms/config.service';
import { AddToCartComponent } from '../../../cart/components/add-to-cart/add-to-cart.component';
import { CartService } from '../../../cart/services';

const routerState = {
  state: {
    params: {
      productCode: 'mockProductCode'
    }
  }
};

describe('ProductPageComponent in pages', () => {
  let store: Store<fromRouting.State>;
  let component: ProductPageComponent;
  let fixture: ComponentFixture<ProductPageComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          MaterialModule,
          StoreModule.forRoot({
            ...fromRoot.reducers,
            cart: combineReducers(fromCart.reducers),
            user: combineReducers(fromUser.reducers)
          })
        ],
        declarations: [
          ProductPageComponent,
          ProductDetailsPageLayoutComponent,
          ProductDetailsComponent,
          DynamicSlotComponent,
          StarRatingComponent,
          ProductImagesComponent,
          ProductSummaryComponent,
          ProductAttributesComponent,
          ProductReviewsComponent,
          ComponentWrapperComponent,
          PictureComponent,
          AddToCartComponent
        ],
        providers: [ComponentMapperService, ConfigService, CartService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPageComponent);
    component = fixture.componentInstance;

    store = TestBed.get(Store);

    spyOn(store, 'select').and.returnValue(of(routerState));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    component.ngOnInit();

    expect(component.productCode).toEqual('mockProductCode');
  });
});
