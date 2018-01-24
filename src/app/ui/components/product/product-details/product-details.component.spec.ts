import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailsComponent } from './product-details.component';
import { MaterialModule } from 'app/material.module';
import { DynamicSlotComponent } from 'app/newcms/components';
import { ProductReviewsComponent } from 'app/ui/components/product/product-reviews/product-reviews.component';
import { StarRatingComponent } from 'app/ui/components/product/star-rating/star-rating.component';
import { ProductImagesComponent } from 'app/ui/components/product/product-images/product-images.component';
import { ProductSummaryComponent } from 'app/ui/components/product/product-summary/product-summary.component';
import { ProductAttributesComponent } from 'app/ui/components/product/product-attributes/product-attributes.component';
import { PictureComponent } from 'app/ui/components/media/picture/picture.component';
import { ComponentWrapperComponent } from 'app/cms/component-wrapper/component-wrapper.component';
import { ProductLoaderService } from 'app/data/product-loader.service';
import * as fromRoot from '../../../../routing/store';
import * as fromCmsReducer from '../../../../newcms/store/reducers';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/observable/of';

class MockProductLoaderService {
  loadProduct(productCode) {}
  getSubscription(productCode) {}
}

fdescribe('ProductDetailsComponent in ui', () => {
  let store: Store<fromCmsReducer.CmsState>;
  let productDetailsComponent: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let productLoader: ProductLoaderService;

  const componentData = 'Mock data for product details component.';

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          MaterialModule,
          StoreModule.forRoot({
            ...fromRoot.reducers,
            cms: combineReducers(fromCmsReducer.reducers)
          }),
          RouterTestingModule
        ],
        declarations: [
          ProductDetailsComponent,
          StarRatingComponent,
          ProductImagesComponent,
          ProductSummaryComponent,
          ProductAttributesComponent,
          ProductReviewsComponent,
          DynamicSlotComponent,
          ComponentWrapperComponent,
          PictureComponent
        ],
        providers: [
          {
            provide: ProductLoaderService,
            useClass: MockProductLoaderService
          }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsComponent);
    productDetailsComponent = fixture.componentInstance;
    productLoader = TestBed.get(ProductLoaderService);
    store = TestBed.get(Store);

    spyOn(productLoader, 'getSubscription').and.returnValue(of(componentData));
  });

  it('should be created', () => {
    expect(productDetailsComponent).toBeTruthy();
  });

  it('should call ngOnChanges()', () => {
    productDetailsComponent.productCode = '123456';
    productDetailsComponent.ngOnChanges();
    expect(productDetailsComponent.model).toEqual(componentData);
  });

  it('should call selectedIndexChange(val)', () => {
    productDetailsComponent.selectedIndexChange(1);
    expect(productDetailsComponent.selectedIndex).toBe(1);

    productDetailsComponent.selectedIndexChange(2);
    expect(productDetailsComponent.selectedIndex).toBe(2);
  });
});
