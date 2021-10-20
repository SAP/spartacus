import { Component, ElementRef, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Product } from '@spartacus/core';
import {
  BREAKPOINT,
  BreakpointService,
  CurrentProductService,
} from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { ThumbnailsGroup } from '@spartacus/product/image-zoom/root';
import { ImageZoomViewComponent } from './image-zoom-view.component';

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

describe('ImageZoomViewComponent', () => {
  let imageZoomViewComponent: ImageZoomViewComponent;
  let fixture: ComponentFixture<ImageZoomViewComponent>;
  let currentProductService: CurrentProductService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        ImageZoomViewComponent,
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
    fixture = TestBed.createComponent(ImageZoomViewComponent);
    imageZoomViewComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('with multiple pictures', () => {
    beforeEach(() => {
      spyOn(currentProductService, 'getProduct').and.returnValue(
        of(mockDataWithMultiplePictures)
      );
      fixture = TestBed.createComponent(ImageZoomViewComponent);
      imageZoomViewComponent = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have mainImage$', () => {
      let result: any;
      imageZoomViewComponent.mainImage$
        .subscribe((value) => (result = value))
        .unsubscribe();
      expect(result.zoom.url).toEqual('zoom-1.jpg');
    });

    it('should have 2 thumbnails', async(() => {
      let items: Observable<ThumbnailsGroup>[];
      imageZoomViewComponent.thumbnails$.subscribe((i) => (items = i));
      expect(items.length).toBe(2);
    }));

    it('should have thumb with url in first product', async(() => {
      let thumbs: Observable<ThumbnailsGroup>[];
      imageZoomViewComponent.thumbnails$.subscribe((i) => (thumbs = i));
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
      fixture = TestBed.createComponent(ImageZoomViewComponent);
      imageZoomViewComponent = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should be created', () => {
      expect(imageZoomViewComponent).toBeTruthy();
    });

    it('should have mainImage$', () => {
      let result: any;
      imageZoomViewComponent.mainImage$
        .subscribe((value) => (result = value))
        .unsubscribe();
      expect(result.zoom.url).toEqual('zoom-1.jpg');
    });

    it('should not have thumbnails in case there is only one GALLERY image', async(() => {
      let items: Observable<ThumbnailsGroup>[];
      imageZoomViewComponent.thumbnails$.subscribe((i) => (items = i));
      expect(items.length).toBe(0);
    }));
  });

  describe('without pictures', () => {
    beforeEach(() => {
      spyOn(currentProductService, 'getProduct').and.returnValue(
        of(mockDataWithoutPrimaryPictures)
      );

      fixture = TestBed.createComponent(ImageZoomViewComponent);
      imageZoomViewComponent = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should be created', () => {
      expect(imageZoomViewComponent).toBeTruthy();
    });

    it('should have mainImage$', () => {
      let result: any;
      imageZoomViewComponent.mainImage$
        .subscribe((value) => (result = value))
        .unsubscribe();
      expect(result).toEqual({});
    });
  });

  it('should clear startCoords', () => {
    imageZoomViewComponent.clearTouch();

    expect(imageZoomViewComponent.startCoords).toBeNull();
  });

  it('should update start coords on toucheMove', () => {
    const mockTouchEvent = {
      touches: [{ clientX: 1, clientY: 2 }],
    };
    imageZoomViewComponent.touchMove(mockTouchEvent as any);

    expect(imageZoomViewComponent.startCoords).toEqual({
      x: 1,
      y: 2,
    });
  });

  it('should update values on zoom', () => {
    imageZoomViewComponent.zoom();

    expect(imageZoomViewComponent.isZoomed).toBeTruthy();
    expect(imageZoomViewComponent.startCoords).toBeNull();
    expect(imageZoomViewComponent.left).toEqual(0);
    expect(imageZoomViewComponent.top).toEqual(0);
  });

  it('should get zoomImage as undefined', () => {
    expect(imageZoomViewComponent.zoomImage).toBeUndefined();
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
        imageZoomViewComponent.calculatePointerMovePosition(mockElem, 10, 10)
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
        imageZoomViewComponent.handleOutOfBounds(
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
        imageZoomViewComponent.handleOutOfBounds(
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
        imageZoomViewComponent.handleOutOfBounds(
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
        imageZoomViewComponent.handleOutOfBounds(
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
