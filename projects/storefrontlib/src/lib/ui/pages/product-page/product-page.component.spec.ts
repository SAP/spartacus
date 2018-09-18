import { ComponentsModule } from './../../components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'projects/storefrontlib/src/lib/material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import * as fromRouting from '../../../routing/store';
import * as fromCart from '../../../cart/store';
import * as fromUser from '../../../user/store';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import * as fromRoot from '../../../routing/store';
import { ProductPageComponent } from './product-page.component';
import { ProductDetailsPageLayoutComponent } from '../../layout/product-details-page-layout/product-details-page-layout.component';
import { ProductDetailsComponent } from '../../../product/components/product-details/container/product-details.component';
import {
  DynamicSlotComponent,
  ComponentWrapperComponent
} from '../../../cms/components';
import { ProductImagesComponent } from '../../../product/components/product-details/product-images/product-images.component';
import { ProductSummaryComponent } from '../../../product/components/product-details/product-summary/product-summary.component';
import { ProductAttributesComponent } from '../../../product/components/product-details/product-attributes/product-attributes.component';
import { ProductReviewsComponent } from '../../../product/components/product-details/product-reviews/product-reviews.component';
import { ComponentMapperService } from '../../../cms/services';
import { CmsModuleConfig, defaultCmsModuleConfig } from '../../../cms/cms-module-config';
import { AddToCartComponent } from '../../../cart/components/add-to-cart/add-to-cart.component';
import { CartService } from '../../../cart/services';
import {
  NgbTabsetModule,
  NgbAccordionModule
} from '@ng-bootstrap/ng-bootstrap';
import { Config } from '../../../config/config.module';
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule,
        ReactiveFormsModule,
        NgbTabsetModule,
        NgbAccordionModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          cart: combineReducers(fromCart.getReducers()),
          user: combineReducers(fromUser.getReducers())
        }),
        ComponentsModule
      ],
      declarations: [
        ProductPageComponent,
        ProductDetailsPageLayoutComponent,
        ProductDetailsComponent,
        DynamicSlotComponent,
        ProductImagesComponent,
        ProductSummaryComponent,
        ProductAttributesComponent,
        ProductReviewsComponent,
        ComponentWrapperComponent,
        AddToCartComponent
      ],
      providers: [ComponentMapperService, { provide: CmsModuleConfig, useValue: defaultCmsModuleConfig }, CartService]
    }).compileComponents();
  }));

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
