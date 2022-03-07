import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CmsBannerComponentMedia,
  CmsService,
  CmsVideoComponent,
  ContainerSizeOptions,
  Page,
  PageContext,
  SemanticPathService,
  UrlCommand,
} from '@spartacus/core';
import { CmsComponentData, Media } from '@spartacus/storefront';
import { MediaService } from 'projects/storefrontlib/shared';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { VideoComponent } from '..';

class MockCmsService {
  getPage(pageContext: PageContext): Observable<Page> {
    return of({ label: ` ${pageContext.id}` });
  }
}
class MockSemanticPathService {
  transform(test: UrlCommand): any[] {
    if (test.params && test.params.code) {
      return test.params.code;
    } else {
      return test.cxRoute;
    }
  }
}

class MockMediaService {
  getMedia(media: any): Media {
    return {
      src: media ? media.url : undefined,
      srcset: undefined,
      alt: undefined,
    };
  }
}

const mockCmsBannerComponentMedia: CmsBannerComponentMedia = {
  altText: 'test',
  code: 'test2',
  mime: 'test3',
  url: 'test4',
};

const mockComponentData: CmsVideoComponent = {
  overlayTitle: 'Test Video',
  video: mockCmsBannerComponentMedia,
  videoMedia: mockCmsBannerComponentMedia,
};

const data$: BehaviorSubject<CmsVideoComponent> = new BehaviorSubject(
  mockComponentData
);

class MockCmsVideoComponentData {
  get data$(): Observable<CmsVideoComponent> {
    return data$.asObservable();
  }
}

fdescribe('VideoComponent', () => {
  let videoComponent: VideoComponent;
  let fixture: ComponentFixture<VideoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [VideoComponent],
      providers: [
        {
          provide: CmsComponentData,
          useClass: MockCmsVideoComponentData,
        },
        { provide: CmsService, useClass: MockCmsService },
        { provide: SemanticPathService, useClass: MockSemanticPathService },
        { provide: MediaService, useClass: MockMediaService },
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(VideoComponent);
    videoComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(videoComponent).toBeTruthy();
  });

  describe('Content', () => {
    it('should set source', () => {
      expect(videoComponent.source).toEqual(mockCmsBannerComponentMedia.url);
    });

    it('should set thubmnail', () => {
      expect(videoComponent.thumbnail?.src).toEqual(
        mockCmsBannerComponentMedia.url
      );
    });
  });

  describe('Controls', () => {
    it('should not mute video when mute is undefined', () => {
      expect(videoComponent.mute).toBeUndefined();
    });

    it('should mute video when mute is true', () => {
      data$.next({ ...mockComponentData, mute: 'true' });
      expect(videoComponent.mute).toEqual('muted');
    });

    it('should not autoplay video when autoplay is undefined', () => {
      expect(videoComponent.autoplay).toBeFalsy();
    });

    it('should autoplay video when autoplay is true', () => {
      data$.next({ ...mockComponentData, autoPlay: 'true' });
      expect(videoComponent.autoplay).toBeTruthy();
    });

    it('should not loop video when loop is undefined', () => {
      expect(videoComponent.loop).toBeFalsy();
    });

    it('should loop video when loop is true', () => {
      data$.next({ ...mockComponentData, loop: 'true' });
      expect(videoComponent.loop).toBeTruthy();
    });
  });

  describe('Routing', () => {
    it('should set routing link with product', () => {
      const product = '4205431';
      data$.next({ ...mockComponentData, product: product });
      expect(videoComponent.routerLink).toEqual(product);
    });

    it('should set routing link with category', () => {
      const category = 'cameras';
      data$.next({ ...mockComponentData, category: category });
      expect(videoComponent.routerLink).toEqual(category);
    });

    it('should set routing link with url', () => {
      const url = '/products/234231';
      data$.next({ ...mockComponentData, url: url });
      expect(videoComponent.routerLink).toEqual(url);
    });

    it('should set routing link with content page', () => {
      const contentPage = 'carousel';
      data$.next({ ...mockComponentData, contentPage: contentPage });
      expect(videoComponent.routerLink).toEqual(contentPage);
    });
  });

  describe('Styling', () => {
    it('should set height when height is defined', () => {
      data$.next({
        ...mockComponentData,
        containerSize: ContainerSizeOptions.DEFINE_CONTAINER_HEIGHT,
        videoContainerHeight: 500,
      });
      const videoElement = fixture.nativeElement.querySelector('video');
      fixture.detectChanges();
      expect(videoElement.offsetHeight).toEqual(500);
    });
    it('should set style classes', () => {
      data$.next({ styleClasses: 'cls-1 cls-2' });
      expect(videoComponent.styleClasses).toContain('cls-1');
      expect(videoComponent.styleClasses).toContain('cls-2');
    });
  });
});
