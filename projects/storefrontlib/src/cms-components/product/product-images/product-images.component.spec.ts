import { Component, DebugElement, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OutletDirective } from '../../../cms-structure/outlet/index';
import { ProductImagesComponent } from './product-images.component';
import { of, Observable } from 'rxjs';
import { Product } from '@spartacus/core';
import { CurrentProductService } from '../current-product.service';

const firstImage = {
  zoom: {
    url: '123',
  },
};
const secondImage = {
  zoom: {
    url: '456',
  },
};
const mockDataWithMultiplePictures: Product = {
  name: 'mockProduct1',
  images: {
    PRIMARY: firstImage,
    GALLERY: [firstImage, secondImage],
  },
};

const mockDataWithOnePicture: Product = {
  name: 'mockProduct2',
  images: {
    PRIMARY: firstImage,
    GALLERY: [firstImage],
  },
};

class MockCurrentProductService {
  getProduct(): Observable<Product> {
    return of();
  }
}

@Component({
  selector: 'cx-media',
  template: '',
})
class MockMediaComponent {
  @Input() container;
}

describe('ProductImagesComponent', () => {
  let component: ProductImagesComponent;
  let fixture: ComponentFixture<ProductImagesComponent>;
  let element: DebugElement;
  let currentProductService: CurrentProductService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductImagesComponent,
        MockMediaComponent,
        OutletDirective,
      ],
      providers: [
        {
          provide: CurrentProductService,
          useClass: MockCurrentProductService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductImagesComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    currentProductService = TestBed.get(CurrentProductService);
    spyOn(component, 'isMainImageContainer').and.callThrough();
  });

  describe('ProductImagesComponent with multiple pictures', () => {
    beforeEach(() => {
      spyOn(currentProductService, 'getProduct').and.returnValue(
        of(mockDataWithMultiplePictures)
      );
    });

    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should set imageContainer$', () => {
      expect(component.imageContainer$.value).toBe(null);
      fixture.detectChanges();
      expect(component.imageContainer$.value).toEqual(
        mockDataWithMultiplePictures.images.PRIMARY
      );
    });

    it('should have <cx-media>', () => {
      fixture.detectChanges();
      const picture = element.query(By.css('cx-media'));
      expect(picture.nativeElement).toBeDefined();
    });

    it('should have thumb element', () => {
      fixture.detectChanges();
      const thumbs = element.query(By.css('.thumbs'));
      expect(thumbs.nativeElement).toBeDefined();
    });

    it('should have two thumbnail element', () => {
      fixture.detectChanges();
      expect(element.queryAll(By.css('.thumbs cx-media')).length).toBe(2);
    });

    it('should call "imageContainer" for both thumbnails', () => {
      fixture.detectChanges();
      expect(component.isMainImageContainer).toHaveBeenCalledWith(firstImage);
      expect(component.isMainImageContainer).toHaveBeenCalledWith(secondImage);
    });

    it('should toggle main image on focus', () => {
      fixture.detectChanges();
      const pictureEl = <HTMLElement>(
        element.query(By.css('.thumbs cx-media:nth-child(2)')).nativeElement
      );
      pictureEl.dispatchEvent(new Event('focus'));
      expect(component.imageContainer$.value).toBe(secondImage);
    });
  });

  describe('ProductImagesComponent with one pictures', () => {
    beforeEach(() => {
      spyOn(currentProductService, 'getProduct').and.returnValue(
        of(mockDataWithOnePicture)
      );
    });

    it('should hide thumbs element', () => {
      fixture.detectChanges();
      const thumbs = element.query(By.css('.thumbs'));
      expect(thumbs.classes).toEqual({ hidden: true });
    });
  });
});
