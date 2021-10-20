import { Component, Input } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ImageGroup, Product } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CurrentProductService } from '@spartacus/storefront';
import { ProductImageZoomProductImagesComponent } from './product-image-zoom-product-images.component';
import { take } from 'rxjs/operators';

const firstImage = {
  zoom: {
    url: 'zoom-1.jpg',
  },
  thumbnail: {
    url: 'thumb-1.jpg',
  },
};
const secondImage = {
  zoom: {
    url: 'zoom-2.jpg',
  },
  thumbnail: {
    url: 'thumb-2.jpg',
  },
};

const mockItem: ImageGroup = {
  zoom: {
    galleryIndex: 2,
  },
};

const mockItem2: ImageGroup = {
  zoom: {},
};

const mockDataWithOnePicture: Product = {
  name: 'mockProduct2',
  images: {
    PRIMARY: firstImage,
    GALLERY: [firstImage],
  },
};

const mockDataWithMultiplePictures: Product = {
  name: 'mockProduct1',
  images: {
    PRIMARY: firstImage,
    GALLERY: [firstImage, secondImage],
  },
};

const mockDataWitoutPrimaryPictures: Product = {
  name: 'mockProduct1',
  images: {
    GALLERY: [firstImage, secondImage],
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

@Component({
  selector: 'cx-carousel',
  template: `
    <ng-container *ngFor="let item$ of items">
      <ng-container
        *ngTemplateOutlet="template; context: { item: item$ | async }"
      ></ng-container>
    </ng-container>
  `,
})
class MockCarouselComponent {
  @Input() items;
  @Input() itemWidth;
  @Input() template;
  @Input() hideIndicators;
}

describe('ProductImagesComponent', () => {
  let component: ProductImageZoomProductImagesComponent;
  let fixture: ComponentFixture<ProductImageZoomProductImagesComponent>;
  let currentProductService: CurrentProductService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          ProductImageZoomProductImagesComponent,
          MockMediaComponent,
          MockCarouselComponent,
        ],
        providers: [
          {
            provide: CurrentProductService,
            useClass: MockCurrentProductService,
          },
        ],
      }).compileComponents();

      currentProductService = TestBed.inject(CurrentProductService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductImageZoomProductImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('with multiple pictures', () => {
    beforeEach(() => {
      spyOn(currentProductService, 'getProduct').and.returnValue(
        of(mockDataWithMultiplePictures)
      );

      fixture = TestBed.createComponent(ProductImageZoomProductImagesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should have mainImage$', () => {
      let result: any;
      component.mainImage$.subscribe((value) => (result = value)).unsubscribe();
      expect(result.zoom.url).toEqual('zoom-1.jpg');
    });

    it(
      'should have 2 thumbnails',
      waitForAsync(() => {
        let items: Observable<Product>[];
        component.thumbs$.subscribe((i) => (items = i));
        expect(items.length).toBe(2);
      })
    );

    it(
      'should have thumb with url in first product',
      waitForAsync(() => {
        let thumbs: Observable<Product>[];
        component.thumbs$.subscribe((i) => (thumbs = i));
        let thumb: any;
        thumbs[0].subscribe((p) => (thumb = p));
        expect(thumb.container.thumbnail.url).toEqual('thumb-1.jpg');
      })
    );

    describe('UI test', () => {
      it('should have cx-carousel element', () => {
        const carousel = fixture.debugElement.query(By.css('cx-carousel'));
        expect(carousel).toBeTruthy();
      });

      it(
        'should have 2 rendered templates',
        waitForAsync(() => {
          const el = fixture.debugElement.queryAll(
            By.css('cx-carousel cx-media')
          );
          expect(el.length).toEqual(2);
        })
      );
    });
  });

  describe('with one pictures', () => {
    beforeEach(() => {
      spyOn(currentProductService, 'getProduct').and.returnValue(
        of(mockDataWithOnePicture)
      );

      fixture = TestBed.createComponent(ProductImageZoomProductImagesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should have mainImage$', () => {
      let result: any;
      component.mainImage$.subscribe((value) => (result = value)).unsubscribe();
      expect(result.zoom.url).toEqual('zoom-1.jpg');
    });

    it(
      'should not have thumbnails in case there is only one GALLERY image',
      waitForAsync(() => {
        let items: Observable<Product>[];
        component.thumbs$.subscribe((i) => (items = i));
        expect(items.length).toBe(0);
      })
    );

    describe('(UI test)', () => {
      it('should not render cx-carousel for one GALLERY image', () => {
        component.thumbs$.subscribe();
        fixture.detectChanges();

        const carousel = fixture.debugElement.query(By.css('cx-carousel'));
        expect(carousel).toBeNull();
      });
    });
  });

  describe('without pictures', () => {
    beforeEach(() => {
      spyOn(currentProductService, 'getProduct').and.returnValue(
        of(mockDataWitoutPrimaryPictures)
      );

      fixture = TestBed.createComponent(ProductImageZoomProductImagesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should have mainImage$', () => {
      let result: any;
      component.mainImage$.subscribe((value) => (result = value)).unsubscribe();
      expect(result).toEqual({});
    });

    describe('(UI test)', () => {
      it('should render cx-media for GALLERY image', () => {
        component.thumbs$.subscribe();
        fixture.detectChanges();

        const media = fixture.debugElement.query(By.css('cx-media'));
        expect(media).toBeDefined();
      });
    });
  });

  describe('on openImage', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ProductImageZoomProductImagesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should emit new value for mainMediaContainer and update selectedIndex', () => {
      component.openImage(mockItem);
      expect(component.selectedIndex).toEqual(2);
    });

    it('should emit new value for mainMediaContainer and update selectedIndex with null value', () => {
      component.openImage(mockItem2);
      expect(component.selectedIndex).toBeUndefined();
    });
  });

  it('should emit new value for expandImage on triggerZoom', (done) => {
    component.triggerZoom(true);

    component.expandImage.pipe(take(1)).subscribe((value) => {
      expect(value).toBeTruthy();
      done();
    });
  });
});
