import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductImagesComponent } from '../product-images/product-images.component';
import { PictureComponent } from 'projects/storefrontlib/src/lib/ui/components/media/picture/picture.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

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
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductImagesComponent, PictureComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductImagesComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
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

  it('should have <cx-picture>', () => {
    component.ngOnChanges();
    fixture.detectChanges();
    const picture = element.query(By.css('cx-picture'));
    expect(picture.nativeElement).toBeDefined();
  });

  it('should have thumb element', () => {
    component.ngOnChanges();
    fixture.detectChanges();
    const thumbs = element.query(By.css('.thumbs'));
    expect(thumbs.nativeElement).toBeDefined();
  });

  it('should have two thumbnail element', () => {
    component.ngOnChanges();
    fixture.detectChanges();
    expect(element.queryAll(By.css('.thumbs cx-picture')).length).toBe(2);
  });
});
