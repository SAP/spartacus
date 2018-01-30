import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'app/material.module';
import { ProductImagesComponent } from 'app/ui/components/product/product-images/product-images.component';
import { PictureComponent } from 'app/ui/components/media/picture/picture.component';
import * as fromRoot from '../../../../routing/store';
import * as fromCmsReducer from '../../../../newcms/store/reducers';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/observable/of';

class MockImages {
  PRIMARY = 'mockPrimaryImage';
}

class MockModel {
  images;
}

fdescribe('ProductImagesComponent in ui', () => {
  let store: Store<fromCmsReducer.CmsState>;
  let productImagesComponent: ProductImagesComponent;
  let fixture: ComponentFixture<ProductImagesComponent>;

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
        declarations: [ProductImagesComponent, PictureComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductImagesComponent);
    productImagesComponent = fixture.componentInstance;
    store = TestBed.get(Store);

    productImagesComponent.model = new MockModel();
    productImagesComponent.model.images = new MockImages();

    spyOn(productImagesComponent, 'ready').and.callThrough();
    spyOn(productImagesComponent, 'showImage').and.callThrough();
    spyOn(store, 'select').and.returnValue(of(mockProduct));
  });

  it('should be created', () => {
    expect(productImagesComponent).toBeTruthy();
  });

  it('should call ngOnChanges()', () => {
    productImagesComponent.productCode = '123456';
    productImagesComponent.ngOnChanges();
    expect(productImagesComponent.model).toEqual(mockProduct[0]);
  });

  it('should call showImage(imageContainer)', () => {
    productImagesComponent.showImage('mockImageContainer');
    expect(productImagesComponent.mainImage).toBe('mockImageContainer');
  });

  it('should call ready()', () => {
    productImagesComponent.ready();
    expect(productImagesComponent.mainImage).toEqual('mockPrimaryImage');
  });
});
