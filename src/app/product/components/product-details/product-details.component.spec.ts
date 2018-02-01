import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailsComponent } from './product-details.component';
import { MaterialModule } from 'app/material.module';
import { DynamicSlotComponent } from 'app/newcms/components';
import { ProductReviewsComponent } from '../product-reviews/product-reviews.component';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { ProductImagesComponent } from '../product-images/product-images.component';
import { ProductSummaryComponent } from '../product-summary/product-summary.component';
import { ProductAttributesComponent } from '../product-attributes/product-attributes.component';
import { PictureComponent } from 'app/ui/components/media/picture/picture.component';
import { ComponentWrapperComponent } from 'app/cms/component-wrapper/component-wrapper.component';
import * as fromRoot from '../../../routing/store';
import * as fromProduct from '../../store/reducers/product.reducer';
import { StoreModule, Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/observable/of';

fdescribe('ProductDetailsComponent in product', () => {
  let store: Store<fromProduct.ProductState>;
  let productDetailsComponent: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  const mockProduct = ['mockProduct'];

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          MaterialModule,
          StoreModule.forRoot({
            ...fromRoot.reducers
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
