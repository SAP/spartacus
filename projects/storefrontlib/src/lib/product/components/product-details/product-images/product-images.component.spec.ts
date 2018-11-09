import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductImagesComponent } from '../product-images/product-images.component';
import { PictureComponent } from 'projects/storefrontlib/src/lib/ui/components/media/picture/picture.component';

const firstImage = {
  zoom: {
    url: '123'
  }
};
const secondImage = {
  zoom: {
    url: '456'
  }
};
const mockDataWithMultiplePictures = {
  images: {
    PRIMARY: firstImage,
    GALLERY: [firstImage, secondImage]
  }
};

describe('ProductImagesComponent product', () => {
  let component: ProductImagesComponent;
  let fixture: ComponentFixture<ProductImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductImagesComponent, PictureComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductImagesComponent);
    component = fixture.componentInstance;
    component.product = mockDataWithMultiplePictures;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should set mainImageControler', () => {
    expect(component.mainImageContainer).toBe(undefined);
    component.ngOnChanges();
    expect(component.mainImageContainer).toEqual(
      component.product.images.PRIMARY
    );
  });
});
