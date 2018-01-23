import { DebugElement } from '@angular/core';
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
import { StoreModule, combineReducers } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigService } from '../../../../newcms/config.service';

fdescribe('ProductDetailsComponent in ui', () => {
  let productDetailsComponent: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          StoreModule.forRoot({
            ...fromRoot.reducers,
            cms: combineReducers(fromCmsReducer.reducers)
          }),
          RouterTestingModule,
          MaterialModule
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
        providers: [{ provide: ProductLoaderService }]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsComponent);
    productDetailsComponent = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(productDetailsComponent).toBeTruthy();
  });

  // TODO: after replacing material with boothstrap4, need some ui test here
});
