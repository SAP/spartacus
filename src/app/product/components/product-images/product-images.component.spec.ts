import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'app/material.module';
import { ProductImagesComponent } from '../product-images/product-images.component';
import { PictureComponent } from 'app/ui/components/media/picture/picture.component';
import * as fromRoot from '../../../routing/store';
import * as fromProduct from '../../store/reducers/product.reducer';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/observable/of';

class MockImages {
  PRIMARY = 'mockPrimaryImage';
}

class MockModel {
  images;
}

fdescribe('ProductImagesComponent product', () => {
  let store: Store<fromProduct.ProductState>;
  let productImagesComponent: ProductImagesComponent;
  let fixture: ComponentFixture<ProductImagesComponent>;

  const mockProduct = 'mockProduct';

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
        declarations: [ProductImagesComponent, PictureComponent]
      }).compileComponents();
    })
  );

  // TODO[249]
  beforeEach(() => {
    fixture = TestBed.createComponent(ProductImagesComponent);
    productImagesComponent = fixture.componentInstance;
    store = TestBed.get(Store);

    productImagesComponent.product = new MockModel();
    productImagesComponent.product.images = new MockImages();

    spyOn(productImagesComponent, 'showImage').and.callThrough();
  });

  it('should be created', () => {
    expect(productImagesComponent).toBeTruthy();
  });

  it('should call ngOnChanges()', () => {
    productImagesComponent.ngOnChanges();
    expect(productImagesComponent.mainImage).toEqual(
      productImagesComponent.product.images.PRIMARY
    );
  });

  it('should call showImage(imageContainer)', () => {
    productImagesComponent.showImage('mockImageContainer');
    expect(productImagesComponent.mainImage).toBe('mockImageContainer');
  });
});
