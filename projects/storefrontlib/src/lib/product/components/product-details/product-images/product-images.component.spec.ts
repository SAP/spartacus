import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductImagesComponent } from '../product-images/product-images.component';
import { PictureComponent } from 'projects/storefrontlib/src/lib/ui/components/media/picture/picture.component';

class MockImages {
  PRIMARY = 'mockPrimaryImage';
}

class MockModel {
  images;
}

describe('ProductImagesComponent product', () => {
  let productImagesComponent: ProductImagesComponent;
  let fixture: ComponentFixture<ProductImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductImagesComponent, PictureComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductImagesComponent);
    productImagesComponent = fixture.componentInstance;

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
