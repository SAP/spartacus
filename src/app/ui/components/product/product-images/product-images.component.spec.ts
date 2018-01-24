import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductImagesComponent } from './product-images.component';
import { PictureComponent } from 'app/ui/components/media/picture/picture.component';
import { ProductLoaderService } from 'app/data/product-loader.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/observable/of';

class MockImages {
  PRIMARY = 'mockPrimaryImage';
}

class MockModel {
  images;
}

class MockProductLoaderService {
  loadProduct(productCode) {}
  getSubscription(productCode) {}
}

fdescribe('ProductImagesComponent in ui', () => {
  let productImagesComponent: ProductImagesComponent;
  let fixture: ComponentFixture<ProductImagesComponent>;
  let productLoader: ProductLoaderService;

  const componentData = 'Mock data for product images component.';

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [ProductImagesComponent, PictureComponent],
        providers: [
          { provide: ProductLoaderService, useClass: MockProductLoaderService }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductImagesComponent);
    productImagesComponent = fixture.componentInstance;
    productLoader = TestBed.get(ProductLoaderService);

    productImagesComponent.model = new MockModel();
    productImagesComponent.model.images = new MockImages();

    spyOn(productImagesComponent, 'ready').and.callThrough();
    spyOn(productImagesComponent, 'showImage').and.callThrough();
    spyOn(productLoader, 'getSubscription').and.returnValue(of(componentData));
  });

  it('should be created', () => {
    expect(productImagesComponent).toBeTruthy();
  });

  it('should call showImage(imageContainer)', () => {
    productImagesComponent.showImage('mockImageContainer');
    expect(productImagesComponent.mainImage).toBe('mockImageContainer');
  });

  it('should call ready()', () => {
    productImagesComponent.ready();
    expect(productImagesComponent.mainImage).toEqual('mockPrimaryImage');
  });

  it('should call ngOnChanges()', () => {
    productImagesComponent.productCode = '123456';
    productImagesComponent.ngOnChanges();
    expect(productImagesComponent.model).toEqual(componentData);
  });
});
