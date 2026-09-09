import { AsyncPipe, NgFor, NgTemplateOutlet } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FeaturesConfigModule, Product } from '@spartacus/core';
import {
  CarouselScrollingComponent,
  ImageFetchPriority,
  LCP_PRESENCE,
  LcpContextDirectiveModule,
  LcpPresence,
  MediaComponent,
} from '@spartacus/storefront';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { CurrentProductService } from '../current-product.service';
import { ProductImagesComponent } from './product-images.component';

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

const mockDataWitoutPrimaryPictures: Product = {
  name: 'mockProduct1',
  images: {
    GALLERY: [firstImage, secondImage],
  },
};

class MockCurrentProductService {
  getProduct(): Observable<Product> {
    return EMPTY;
  }
}

@Component({
  selector: 'cx-media',
  template: '',
  imports: [LcpContextDirectiveModule, FeaturesConfigModule],
})
class MockMediaComponent {
  @Input() container;
  @Input() fetchPriority: ImageFetchPriority | undefined | null;
}

@Component({
  selector: 'cx-carousel-scrolling',
  template: `
    cx-carousel-scrolling
    <ng-container *ngFor="let item$ of items">
      <ng-container
        *ngTemplateOutlet="template; context: { item: item$ | async }"
      />
    </ng-container>
  `,
  imports: [FeaturesConfigModule, NgTemplateOutlet, NgFor, AsyncPipe],
})
class MockCarouselScrollingComponent {
  @Input() items;
  @Input() template;
}

describe('ProductImagesComponent', () => {
  let component: ProductImagesComponent;
  let fixture: ComponentFixture<ProductImagesComponent>;
  let currentProductService: CurrentProductService;
  let mockLcpPresence$: BehaviorSubject<LcpPresence>;

  beforeEach(async () => {
    mockLcpPresence$ = new BehaviorSubject<LcpPresence>(LcpPresence.NO_LCP);

    TestBed.configureTestingModule({
      imports: [
        LcpContextDirectiveModule,
        FeaturesConfigModule,
        ProductImagesComponent,
      ],
      providers: [
        {
          provide: LCP_PRESENCE,
          useValue: mockLcpPresence$,
        },
        {
          provide: CurrentProductService,
          useClass: MockCurrentProductService,
        },
      ],
    })
      .overrideComponent(ProductImagesComponent, {
        remove: {
          imports: [MediaComponent, CarouselScrollingComponent],
        },
        add: {
          imports: [MockMediaComponent, MockCarouselScrollingComponent],
        },
      })
      .compileComponents();

    currentProductService = TestBed.inject(CurrentProductService);
  });

  describe('with multiple pictures', () => {
    beforeEach(() => {
      vi.spyOn(currentProductService, 'getProduct').mockReturnValue(
        of(mockDataWithMultiplePictures)
      );

      fixture = TestBed.createComponent(ProductImagesComponent);
      component = fixture.componentInstance;
    });

    it('should be created', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('should have mainImage$', () => {
      fixture.detectChanges();
      let result: any;
      component.mainImage$.subscribe((value) => (result = value)).unsubscribe();
      expect(result.zoom.url).toEqual('zoom-1.jpg');
    });

    it('should have 2 thumbnails', async () => {
      fixture.detectChanges();
      let items: Observable<Product>[];
      component.thumbs$.subscribe((i) => (items = i));
      expect(items.length).toBe(2);
    });

    it('should have thumb with url in first product', async () => {
      fixture.detectChanges();
      let thumbs: Observable<Product>[];
      component.thumbs$.subscribe((i) => (thumbs = i));
      let thumb: any;
      thumbs[0].subscribe((p) => (thumb = p));
      expect(thumb.container.thumbnail.url).toEqual('thumb-1.jpg');
    });

    describe('UI test', () => {
      it('should have cx-carousel-scrolling element', () => {
        fixture.detectChanges();
        const carousel = fixture.debugElement.query(
          By.css('cx-carousel-scrolling')
        );
        expect(carousel).toBeTruthy();
      });

      it('should have 2 rendered templates', async () => {
        fixture.detectChanges();
        const el = fixture.debugElement.queryAll(
          By.css('cx-carousel-scrolling cx-media')
        );
        expect(el.length).toEqual(2);
      });

      describe('LCP context handling', () => {
        describe('when contains LCP element', () => {
          beforeEach(() => {
            mockLcpPresence$.next(LcpPresence.HAS_LCP);
          });

          it('should prioritize downloading the main image', () => {
            fixture.detectChanges();
            const mediaComponents = fixture.debugElement.queryAll(
              By.directive(MockMediaComponent)
            );
            expect(mediaComponents[0].componentInstance.fetchPriority).toBe(
              ImageFetchPriority.HIGH
            );
          });

          it('should NOT prioritize downloading images other than the main one', () => {
            fixture.detectChanges();
            const mediaComponents = fixture.debugElement.queryAll(
              By.directive(MockMediaComponent)
            );
            expect(mediaComponents[1].componentInstance.fetchPriority).toBe(
              undefined
            );
            expect(mediaComponents[2].componentInstance.fetchPriority).toBe(
              undefined
            );
          });
        });

        describe('when does NOT contain LCP element', () => {
          beforeEach(() => {
            mockLcpPresence$.next(LcpPresence.NO_LCP);
          });

          it('should NOT prioritize downloading any image', () => {
            fixture.detectChanges();
            const mediaComponents = fixture.debugElement.queryAll(
              By.directive(MockMediaComponent)
            );
            expect(mediaComponents[0].componentInstance.fetchPriority).toBe(
              undefined
            );
            expect(mediaComponents[1].componentInstance.fetchPriority).toBe(
              undefined
            );
            expect(mediaComponents[2].componentInstance.fetchPriority).toBe(
              undefined
            );
          });
        });
      });
    });
  });

  describe('with one pictures', () => {
    beforeEach(() => {
      vi.spyOn(currentProductService, 'getProduct').mockReturnValue(
        of(mockDataWithOnePicture)
      );

      fixture = TestBed.createComponent(ProductImagesComponent);
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

    it('should not have thumbnails in case there is only one GALLERY image', async () => {
      let items: Observable<Product>[];
      component.thumbs$.subscribe((i) => (items = i));
      expect(items.length).toBe(0);
    });

    describe('(UI test)', () => {
      it('should not render cx-carousel-scrolling for one GALLERY image', () => {
        component.thumbs$.subscribe();
        fixture.detectChanges();

        const carousel = fixture.debugElement.query(
          By.css('cx-carousel-scrolling')
        );
        expect(carousel).toBeNull();
      });

      describe('when contains LCP element', () => {
        beforeEach(() => {
          mockLcpPresence$.next(LcpPresence.HAS_LCP);
        });

        it('should prioritize downloading the main image', () => {
          fixture.detectChanges();
          const mediaComponents = fixture.debugElement.queryAll(
            By.directive(MockMediaComponent)
          );
          expect(mediaComponents[0].componentInstance.fetchPriority).toBe(
            ImageFetchPriority.HIGH
          );
        });
      });

      describe('when does NOT contain LCP element', () => {
        beforeEach(() => {
          mockLcpPresence$.next(LcpPresence.NO_LCP);
        });

        it('should NOT prioritize downloading any image', () => {
          fixture.detectChanges();
          const mediaComponents = fixture.debugElement.queryAll(
            By.directive(MockMediaComponent)
          );
          expect(mediaComponents[0].componentInstance.fetchPriority).toBe(
            undefined
          );
        });
      });
    });
  });

  describe('without pictures', () => {
    beforeEach(() => {
      vi.spyOn(currentProductService, 'getProduct').mockReturnValue(
        of(mockDataWitoutPrimaryPictures)
      );

      fixture = TestBed.createComponent(ProductImagesComponent);
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
});
