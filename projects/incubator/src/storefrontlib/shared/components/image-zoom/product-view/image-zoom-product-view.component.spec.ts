import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Product } from '@spartacus/core';
import {
  BREAKPOINT,
  BreakpointService,
  CurrentProductService,
} from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { ImageZoomProductViewComponent } from './image-zoom-product-view.component';

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

const mockDataWithoutPrimaryPictures: Product = {
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

class MockBreakpointService {
  get breakpoint$() {
    return of({});
  }
  isUp(_breakpoint: BREAKPOINT) {
    return of({});
  }
  isDown(_breakpoint: BREAKPOINT) {
    return of({});
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
  selector: 'cx-product-thumbnails',
  template: '',
})
class MockProductThumbnailsComponent {
  @Input() thumbs$;
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockIconComponent {
  @Input() type;
}

describe('ImageZoomProductViewComponent', () => {
  let imageZoomProductViewComponent: ImageZoomProductViewComponent;
  let fixture: ComponentFixture<ImageZoomProductViewComponent>;
  let currentProductService: CurrentProductService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ImageZoomProductViewComponent,
        MockIconComponent,
        MockMediaComponent,
        MockProductThumbnailsComponent,
      ],
      providers: [
        { provide: CurrentProductService, useClass: MockCurrentProductService },
        { provide: BreakpointService, useClass: MockBreakpointService },
      ],
    }).compileComponents();

    currentProductService = TestBed.get(CurrentProductService);
  }));

  describe('with multiple pictures', () => {
    beforeEach(() => {
      spyOn(currentProductService, 'getProduct').and.returnValue(
        of(mockDataWithMultiplePictures)
      );
      fixture = TestBed.createComponent(ImageZoomProductViewComponent);
      imageZoomProductViewComponent = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have mainImage$', () => {
      let result: any;
      imageZoomProductViewComponent.mainImage$
        .subscribe((value) => (result = value))
        .unsubscribe();
      expect(result.zoom.url).toEqual('zoom-1.jpg');
    });

    it('should have 2 thumbnails', async(() => {
      let items: Observable<Product>[];
      imageZoomProductViewComponent.thumbs$.subscribe((i) => (items = i));
      expect(items.length).toBe(2);
    }));

    it('should have thumb with url in first product', async(() => {
      let thumbs: Observable<Product>[];
      imageZoomProductViewComponent.thumbs$.subscribe((i) => (thumbs = i));
      let thumb: any;
      thumbs[0].subscribe((p) => (thumb = p));
      expect(thumb.container.thumbnail.url).toEqual('thumb-1.jpg');
    }));
  });

  describe('with one pictures', () => {
    beforeEach(() => {
      spyOn(currentProductService, 'getProduct').and.returnValue(
        of(mockDataWithOnePicture)
      );
      fixture = TestBed.createComponent(ImageZoomProductViewComponent);
      imageZoomProductViewComponent = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should be created', () => {
      expect(imageZoomProductViewComponent).toBeTruthy();
    });

    it('should have mainImage$', () => {
      let result: any;
      imageZoomProductViewComponent.mainImage$
        .subscribe((value) => (result = value))
        .unsubscribe();
      expect(result.zoom.url).toEqual('zoom-1.jpg');
    });

    it('should not have thumbnails in case there is only one GALLERY image', async(() => {
      let items: Observable<Product>[];
      imageZoomProductViewComponent.thumbs$.subscribe((i) => (items = i));
      expect(items.length).toBe(0);
    }));
  });

  describe('without pictures', () => {
    beforeEach(() => {
      spyOn(currentProductService, 'getProduct').and.returnValue(
        of(mockDataWithoutPrimaryPictures)
      );

      fixture = TestBed.createComponent(ImageZoomProductViewComponent);
      imageZoomProductViewComponent = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should be created', () => {
      expect(imageZoomProductViewComponent).toBeTruthy();
    });

    it('should have mainImage$', () => {
      let result: any;
      imageZoomProductViewComponent.mainImage$
        .subscribe((value) => (result = value))
        .unsubscribe();
      expect(result).toEqual({});
    });
  });
});
