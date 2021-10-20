import { Component, ElementRef, Input } from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { Product } from '@spartacus/core';
import {
  BREAKPOINT,
  BreakpointService,
  CurrentProductService,
} from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { ThumbnailsGroup } from '@spartacus/product/image-zoom/root';
import { ProductImageZoomViewComponent } from './product-image-zoom-view.component';

const firstImage = {
  zoom: {
    url: 'zoom-1.jpg',
  },
  thumbnail: {
    url: 'thumb-1.jpg',
    galleryIndex: 2,
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

describe('ProductImageZoomViewComponent', () => {
  let productImageZoomViewComponent: ProductImageZoomViewComponent;
  let fixture: ComponentFixture<ProductImageZoomViewComponent>;
  let currentProductService: CurrentProductService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        ProductImageZoomViewComponent,
        MockIconComponent,
        MockMediaComponent,
        MockProductThumbnailsComponent,
      ],
      providers: [
        { provide: CurrentProductService, useClass: MockCurrentProductService },
        { provide: BreakpointService, useClass: MockBreakpointService },
      ],
    }).compileComponents();

    currentProductService = TestBed.inject(CurrentProductService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductImageZoomViewComponent);
    productImageZoomViewComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('with multiple pictures', () => {
    beforeEach(() => {
      spyOn(currentProductService, 'getProduct').and.returnValue(
        of(mockDataWithMultiplePictures)
      );
      fixture = TestBed.createComponent(ProductImageZoomViewComponent);
      productImageZoomViewComponent = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have mainImage$', () => {
      let result: any;
      productImageZoomViewComponent.mainImage$
        .subscribe((value) => (result = value))
        .unsubscribe();
      expect(result.zoom.url).toEqual('zoom-1.jpg');
    });

    it(
      'should have 2 thumbnails',
      waitForAsync(() => {
        let items: Observable<ThumbnailsGroup>[];
        productImageZoomViewComponent.thumbnails$.subscribe((i) => (items = i));
        expect(items.length).toBe(2);
      })
    );

    it('should have thumb with url in first product', async(() => {
      let thumbs: Observable<ThumbnailsGroup>[];
      productImageZoomViewComponent.thumbnails$.subscribe((i) => (thumbs = i));
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
      fixture = TestBed.createComponent(ProductImageZoomViewComponent);
      productImageZoomViewComponent = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should be created', () => {
      expect(productImageZoomViewComponent).toBeTruthy();
    });

    it('should have mainImage$', () => {
      let result: any;
      productImageZoomViewComponent.mainImage$
        .subscribe((value) => (result = value))
        .unsubscribe();
      expect(result.zoom.url).toEqual('zoom-1.jpg');
    });

    it('should not have thumbnails in case there is only one GALLERY image', async(() => {
      let items: Observable<ThumbnailsGroup>[];
      productImageZoomViewComponent.thumbnails$.subscribe((i) => (items = i));
      expect(items.length).toBe(0);
    }));
  });

  describe('without pictures', () => {
    beforeEach(() => {
      spyOn(currentProductService, 'getProduct').and.returnValue(
        of(mockDataWithoutPrimaryPictures)
      );

      fixture = TestBed.createComponent(ProductImageZoomViewComponent);
      productImageZoomViewComponent = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should be created', () => {
      expect(productImageZoomViewComponent).toBeTruthy();
    });

    it('should have mainImage$', () => {
      let result: any;
      productImageZoomViewComponent.mainImage$
        .subscribe((value) => (result = value))
        .unsubscribe();
      expect(result).toEqual({});
    });
  });

  it('should clear startCoords', () => {
    productImageZoomViewComponent.clearTouch();

    expect(productImageZoomViewComponent.startCoords).toBeNull();
  });

  it('should update start coords on toucheMove', () => {
    const mockTouchEvent = {
      touches: [{ clientX: 1, clientY: 2 }],
    };
    productImageZoomViewComponent.touchMove(mockTouchEvent as any);

    expect(productImageZoomViewComponent.startCoords).toEqual({
      x: 1,
      y: 2,
    });
  });

  it('should update values on zoom', () => {
    productImageZoomViewComponent.zoom();

    expect(productImageZoomViewComponent.isZoomed).toBeTruthy();
    expect(productImageZoomViewComponent.startCoords).toBeNull();
    expect(productImageZoomViewComponent.left).toEqual(0);
    expect(productImageZoomViewComponent.top).toEqual(0);
  });

  it('should get zoomImage as undefined', () => {
    expect(productImageZoomViewComponent.zoomImage).toBeUndefined();
  });

  describe('calculatePointerMovePosition', () => {
    const mockElem: ElementRef = {
      nativeElement: {
        clientWidth: 600,
        clientHeight: 400,
        getBoundingClientRect: function () {
          const boundingRect = {
            left: 100,
            top: 100,
            right: 100,
            bottom: 100,
          };
          return boundingRect;
        },
      },
    };

    it('should return correct positions', () => {
      expect(
        productImageZoomViewComponent.calculatePointerMovePosition(
          mockElem,
          10,
          10
        )
      ).toEqual({
        positionX: 390,
        positionY: 290,
      });
    });
  });

  describe('handleOutOfBounds', () => {
    const mockBoundingRect1 = {
      left: 100,
      top: 100,
      right: 100,
      bottom: 100,
      height: 300,
      width: 300,
      x: 20,
      y: 20,
      toJSON: function () {
        return {};
      },
    };

    const mockBoundingRect2 = {
      left: 100,
      top: 100,
      right: 100,
      bottom: 100,
      height: 70,
      width: 70,
      x: 20,
      y: 20,
      toJSON: function () {
        return {};
      },
    };

    const mockImageElement = {
      height: 200,
      width: 300,
    };

    it('should return correct positions', () => {
      expect(
        productImageZoomViewComponent.handleOutOfBounds(
          10,
          -200,
          mockImageElement,
          mockBoundingRect1
        )
      ).toEqual({
        x: 10,
        y: -140,
      });

      expect(
        productImageZoomViewComponent.handleOutOfBounds(
          10,
          200,
          mockImageElement,
          mockBoundingRect2
        )
      ).toEqual({
        x: 10,
        y: 10,
      });

      expect(
        productImageZoomViewComponent.handleOutOfBounds(
          -400,
          10,
          mockImageElement,
          mockBoundingRect1
        )
      ).toEqual({
        x: -390,
        y: 10,
      });

      expect(
        productImageZoomViewComponent.handleOutOfBounds(
          400,
          10,
          mockImageElement,
          mockBoundingRect2
        )
      ).toEqual({
        x: 275,
        y: 10,
      });
    });
  });
});
