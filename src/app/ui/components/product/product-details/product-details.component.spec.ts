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
import * as fromRoot from '../../../../routing/store';
import * as fromCmsReducer from '../../../../newcms/store/reducers';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/observable/of';
import { CmsService } from 'app/data/cms.service';

fdescribe('ProductDetailsComponent in ui', () => {
  let store: Store<fromCmsReducer.CmsState>;
  let productDetailsComponent: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  const mockProduct = ['mockProduct'];

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
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsComponent);
    productDetailsComponent = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'select').and.returnValue(of(mockProduct));
  });

  it('should be created', () => {
    expect(productDetailsComponent).toBeTruthy();
  });

  it('should call ngOnChanges()', () => {
    productDetailsComponent.productCode = '123456';
    productDetailsComponent.ngOnChanges();
    expect(productDetailsComponent.model).toEqual(mockProduct[0]);
  });
});
