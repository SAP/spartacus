import { ComponentsModule } from './../../../../ui/components/components.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';

import { CartService } from '../../../../cart/services';
import { ComponentMapperService } from '../../../../cms/services/component-mapper.service';

import { AddToCartModule } from '../../../../cart/components/add-to-cart/add-to-cart.module';
import * as fromCart from '../../../../cart/store';
import * as fromRoot from '../../../../routing/store';
import * as fromUser from '../../../../user/store';
import * as fromProduct from '../../../store/reducers';
import {
  NgbTabsetModule,
  NgbAccordionModule,
  NgbTabsetConfig,
  NgbAccordionConfig,
  NgbModule
} from '@ng-bootstrap/ng-bootstrap';
// guards
import { ComponentWrapperComponent } from '../../../../cms/components/component-wrapper/component-wrapper.component';
import { ProductAttributesComponent } from '../product-attributes/product-attributes.component';
import { ProductImagesComponent } from '../product-images/product-images.component';
import { ProductReviewsComponent } from '../product-reviews/product-reviews.component';
import { ProductSummaryComponent } from '../product-summary/product-summary.component';
import { DynamicSlotComponent } from './../../../../cms/components/dynamic-slot/dynamic-slot.component';
import { ProductDetailsComponent } from './product-details.component';

class MockComponentMapperService {}

describe('ProductDetailsComponent in product', () => {
  let store: Store<fromProduct.ProductsState>;
  let productDetailsComponent: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  const mockProduct = 'mockProduct';
  const mockCartEntry = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        // CartModule,
        AddToCartModule,
        NgbModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          products: combineReducers(fromProduct.getReducers()),
          cart: combineReducers(fromCart.getReducers()),
          user: combineReducers(fromUser.getReducers())
        }),
        ComponentsModule,
        NgbTabsetModule,
        NgbAccordionModule
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
        NgbTabsetConfig,
        NgbAccordionConfig,
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

  it('should go to reviews tab', () => {
    productDetailsComponent.productCode = '123456';
    productDetailsComponent.ngOnChanges();
    productDetailsComponent.product$.subscribe(() => {
      productDetailsComponent.goToReviews();
      expect(productDetailsComponent.tabSet.activeId).toEqual('reviews');
    });
  });
});
