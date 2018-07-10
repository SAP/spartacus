import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { DynamicSlotComponent } from 'projects/storefrontlib/src/lib/cms/components/dynamic-slot/dynamic-slot.component';
import { of } from 'rxjs';
import { AddToCartModule } from '../../../../cart/components/add-to-cart/add-to-cart.module';
import { CartService } from '../../../../cart/services';
import * as fromCart from '../../../../cart/store';
import { ComponentWrapperComponent } from '../../../../cms/components/component-wrapper/component-wrapper.component';
import { ComponentMapperService } from '../../../../cms/services/component-mapper.service';
import * as fromRoot from '../../../../routing/store';
import * as fromUser from '../../../../user/store';
import * as fromProduct from '../../../store/reducers';
import { ProductAttributesComponent } from '../product-attributes/product-attributes.component';
import { ProductImagesComponent } from '../product-images/product-images.component';
import { ProductReviewsComponent } from '../product-reviews/product-reviews.component';
import { ProductSummaryComponent } from '../product-summary/product-summary.component';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { MaterialModule } from './../../../../material.module';
import { MediaModule } from './../../../../ui/components/media/media.module';
import { ProductDetailsComponent } from './product-details.component';
import { ReactiveFormsModule } from '@angular/forms';

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
        MaterialModule,
        ReactiveFormsModule,
        AddToCartModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          products: combineReducers(fromProduct.reducers),
          cart: combineReducers(fromCart.reducers),
          user: combineReducers(fromUser.reducers)
        }),
        MediaModule
      ],
      declarations: [
        ProductDetailsComponent,
        StarRatingComponent,
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
    productDetailsComponent = fixture.componentInstance;
    store = TestBed.get(Store);

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
});
