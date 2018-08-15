import { ComponentsModule } from './../../../../ui/components/components.module';
import { MatTab } from '@angular/material';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';

import { CartService } from '../../../../cart/services';
import { ComponentMapperService } from '../../../../cms/services/component-mapper.service';

import { AddToCartModule } from '../../../../cart/components/add-to-cart/add-to-cart.module';
import { MaterialModule } from './../../../../material.module';

import * as fromCart from '../../../../cart/store';
import * as fromRoot from '../../../../routing/store';
import * as fromUser from '../../../../user/store';
import * as fromProduct from '../../../store/reducers';

import { ComponentWrapperComponent } from '../../../../cms/components/component-wrapper/component-wrapper.component';
import { ProductAttributesComponent } from '../product-attributes/product-attributes.component';
import { ProductImagesComponent } from '../product-images/product-images.component';
import { ProductReviewsComponent } from '../product-reviews/product-reviews.component';
import { ProductSummaryComponent } from '../product-summary/product-summary.component';
import { DynamicSlotComponent } from './../../../../cms/components/dynamic-slot/dynamic-slot.component';
import { ProductDetailsComponent } from './product-details.component';

class MockComponentMapperService {}

const tab1 = new MatTab(null);
const tab2 = new MatTab(null);
const tab3 = new MatTab(null);
const tab4 = new MatTab(null);
tab1.textLabel = 'PRODUCT DETAILS';
tab1.position = 0;
tab2.textLabel = 'SPECS';
tab2.position = 1;
tab3.textLabel = 'REVIEWS';
tab3.position = 2;
tab4.textLabel = 'Delivery';
tab4.position = 3;

const mockTabGroup = {
  _tabs: [tab1, tab2, tab3, tab4],
  _elementRef: {
    nativeElement: { scrollIntoView: () => {} }
  }
};

describe('ProductDetailsComponent in product', () => {
  let store: Store<fromProduct.ProductsState>;
  let productDetailsComponent: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  const mockProduct = 'mockProduct';
  const mockCartEntry = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        AddToCartModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          products: combineReducers(fromProduct.getReducers()),
          cart: combineReducers(fromCart.getReducers()),
          user: combineReducers(fromUser.getReducers())
        }),
        ComponentsModule
      ],
      declarations: [
        ProductDetailsComponent,
        ProductImagesComponent,
        ProductSummaryComponent,
        ProductAttributesComponent,
        ProductReviewsComponent,
        DynamicSlotComponent,
        ComponentWrapperComponent
      ],
      providers: [
        CartService,
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
    store = TestBed.get(Store);
    productDetailsComponent.matTabGroup = mockTabGroup;
    fixture.detectChanges();
    spyOn(store, 'select').and.returnValues(of(mockProduct), of(mockCartEntry));
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

  it('should be able to go to REVIEWS through the review button', () => {
    productDetailsComponent.goToReviews();
    expect(productDetailsComponent.selectedTabIndex).toBe(2);
  });
});
