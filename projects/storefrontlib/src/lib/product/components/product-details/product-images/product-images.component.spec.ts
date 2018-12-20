import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductImagesComponent } from '../product-images/product-images.component';
import { PictureComponent } from '../../../../ui/components/media/picture/picture.component';
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

const mockDataWithOnePicture = {
  images: {
    PRIMARY: firstImage,
    GALLERY: [firstImage]
  }
};

describe('ProductImagesComponent', () => {
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
    spyOn(component, 'isMainImageContainer').and.callThrough();
  });

  describe('ProductImagesComponent with multiple pictures', () => {
    beforeEach(() => {
      component.product = mockDataWithMultiplePictures;
    });

    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should set mainImageControler', () => {
      expect(component.mainImageContainer).toBe(
        undefined,
        'undefined at first'
      );
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

    it('should call "imageContainer" for both thumbnails', () => {
      component.ngOnChanges();
      fixture.detectChanges();
      expect(component.isMainImageContainer).toHaveBeenCalledWith(firstImage);
      expect(component.isMainImageContainer).toHaveBeenCalledWith(secondImage);
    });

    it('should toggle main image on focus', () => {
      component.ngOnChanges();
      fixture.detectChanges();
      const pictureEl = <HTMLElement>(
        element.query(By.css('.thumbs cx-picture:nth-child(2)')).nativeElement
      );
      pictureEl.dispatchEvent(new Event('focus'));
      expect(component.mainImageContainer).toBe(secondImage);
    });
  });

  describe('ProductImagesComponent with one pictures', () => {
    beforeEach(() => {
      component.product = mockDataWithOnePicture;
    });

    it('should not have a thumb element', () => {
      component.ngOnChanges();
      fixture.detectChanges();
      const thumbs = element.query(By.css('.thumbs'));
      expect(thumbs).toBeFalsy();
    });
  });
});
