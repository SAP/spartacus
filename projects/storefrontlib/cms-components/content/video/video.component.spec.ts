import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CmsBannerComponentMedia,
  CmsService,
  CmsVideoComponent,
  ContainerBackgroundOptions,
  ContainerSizeOptions,
  Page,
  PageContext,
  SemanticPathService,
  UrlCommand,
} from '@spartacus/core';
import { CmsComponentData, Media } from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { MediaService } from '../../../shared/components/media/media.service';
import { VideoComponent } from './video.component';

@Pipe({
  name: 'cxTranslate',
})
class MockTranslatePipe implements PipeTransform {
  transform(): any {}
}

class MockCmsService {
  getPage(pageContext: PageContext): Observable<Page> {
    return of({ label: `${pageContext.id}` });
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
  altText: 'test alt text',
  code: 'test code',
  mime: 'test mime',
  url: 'test url',
};

const mockComponentData: CmsVideoComponent = {
  overlayTitle: 'Test Video',
  video: mockCmsBannerComponentMedia,
  videoMedia: mockCmsBannerComponentMedia,
  containerBackground: ContainerBackgroundOptions.UPLOAD_RESPONSIVE_IMAGE,
};

const data$: BehaviorSubject<CmsVideoComponent> = new BehaviorSubject(
  mockComponentData
);

class MockCmsVideoComponentData {
  get data$(): Observable<CmsVideoComponent> {
    return data$.asObservable();
  }
}

describe('VideoComponent', () => {
  let videoComponent: VideoComponent;
  let fixture: ComponentFixture<VideoComponent>;
  let videoElement: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [VideoComponent, MockTranslatePipe],
      providers: [
        { provide: CmsComponentData, useClass: MockCmsVideoComponentData },
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

    it('should set thumbnail with videoMedia property when containerBackground is defined', () => {
      expect(videoComponent.thumbnail?.src).toEqual(
        mockCmsBannerComponentMedia.url
      );
    });

    it('should set thumbnail with thumbnail property when thumbnailSelector is defined', () => {
      data$.next({
        video: mockCmsBannerComponentMedia,
        thumbnail: {
          ...mockCmsBannerComponentMedia,
          url: 'test thumbnail url',
        },
        thumbnailSelector: ContainerBackgroundOptions.UPLOAD_THUMBNAIL,
      });
      expect(videoComponent.thumbnail?.src).toEqual('test thumbnail url');
    });

    it('should not use previous thumbnail when new video as no thumbnail', () => {
      data$.next({
        ...mockComponentData,
      });
      data$.next({
        ...mockComponentData,
        containerBackground: undefined,
      });
      expect(videoComponent.thumbnail?.src).toBeUndefined();
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
      expect(videoComponent.autoPlay).toBeFalsy();
    });

    it('should autoplay video when autoplay is true', () => {
      data$.next({ ...mockComponentData, autoPlay: 'true' });

      expect(videoComponent.autoPlay).toBeTruthy();
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
    beforeEach(() => {
      videoElement = fixture.nativeElement.querySelector('a');
    });

    it('should set routing link with product', () => {
      const product = '4205431';
      data$.next({ ...mockComponentData, product: product });
      fixture.detectChanges();

      expect(videoComponent.routerLink).toEqual(product);
      expect(videoElement.getAttribute('ng-reflect-router-link')).toContain(
        product
      );
    });

    it('should set routing link with category', () => {
      const category = 'cameras';
      data$.next({ ...mockComponentData, category: category });
      fixture.detectChanges();

      expect(videoComponent.routerLink).toEqual(category);
      expect(videoElement.getAttribute('ng-reflect-router-link')).toContain(
        category
      );
    });

    it('should set routing link with url', () => {
      const url = '/products/234231';
      data$.next({ ...mockComponentData, url: url });
      fixture.detectChanges();

      expect(videoComponent.routerLink).toEqual(url);
      expect(videoElement.getAttribute('ng-reflect-router-link')).toContain(
        url
      );
    });

    it('should set routing link with content page', () => {
      const contentPage = 'carousel';
      data$.next({ ...mockComponentData, contentPage: contentPage });
      fixture.detectChanges();

      expect(videoComponent.routerLink).toEqual(contentPage);
      expect(videoElement.getAttribute('ng-reflect-router-link')).toContain(
        contentPage
      );
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
      data$.next({ ...mockComponentData, styleClasses: 'cls-1 cls-2' });
      const videoElement = fixture.nativeElement;
      fixture.detectChanges();

      expect(videoComponent.styleClasses).toContain('cls-1');
      expect(videoComponent.styleClasses).toContain('cls-2');
      expect((videoElement as HTMLElement).classList).toContain('cls-1');
      expect((videoElement as HTMLElement).classList).toContain('cls-2');
    });
  });
});
