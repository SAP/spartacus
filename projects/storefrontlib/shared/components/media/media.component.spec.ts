import {
  Directive,
  Input,
  Pipe,
  PipeTransform,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { InjectionToken } from '@angular/core';
import { MediaComponent } from './media.component';
import { ImageLoadingStrategy, Media } from './media.model';
import { MediaService } from './media.service';
import { USE_LEGACY_MEDIA_COMPONENT } from './media.token';

export const IS_CONFIGURABLE_MEDIA_COMPONENT = new InjectionToken<boolean>(
  'IS_CONFIGURABLE_MEDIA_COMPONENT'
);

const mediaUrl = 'mockProductImageUrl.jpg';

@Directive({
  selector: '[cxFeature]',
})
export class MockFeatureDirective {
  protected templateRef = inject(TemplateRef<any>);
  protected viewContainer = inject(ViewContainerRef);
  protected isConfigurableMediaComponent = inject(
    IS_CONFIGURABLE_MEDIA_COMPONENT
  );

  @Input() set cxFeature(_feature: string) {
    const featureIncludesExclamation = _feature.toString().includes('!');
    const shouldCreateView =
      (featureIncludesExclamation && !this.isConfigurableMediaComponent) ||
      (!featureIncludesExclamation && this.isConfigurableMediaComponent);

    if (shouldCreateView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}

@Pipe({
  name: 'cxMediaSources',
})
export class MockMediaSourcesPipe implements PipeTransform {
  transform() {
    return [
      {
        srcset: mediaUrl,
        media: '(min-width: 1400px)',
      },
      {
        srcset: mediaUrl,
        media: '(min-width: 1140px)',
      },
      {
        srcset: mediaUrl,
        media: '(min-width: 770px)',
      },
      {
        srcset: mediaUrl,
        media: '(min-width: 400px)',
      },
    ];
  }
}

class MockMediaService {
  srcset: string | undefined;

  constructor(srcset?: string) {
    this.srcset = srcset;
  }

  getMedia(media: any): Media {
    return {
      src: media ? media.product.url : undefined,
      srcset: this.srcset,
      alt: undefined,
    };
  }
  getMediaForPictureElement(media: any): Media | undefined {
    return {
      src: media ? media.product.url : undefined,
      srcset: this.srcset,
      alt: undefined,
      sources: [
        {
          srcset: 'test.url',
          media: '',
        },
      ],
    };
  }
  getMissingImage() {
    return {
      src: 'missing.jpg',
    };
  }
  get loadingStrategy(): ImageLoadingStrategy {
    return ImageLoadingStrategy.EAGER;
  }
}

const mockImageContainer = {
  product: { url: mediaUrl },
};

const mockMissingImageContainer = undefined;

function configureTestingModule(
  mockMediaService: MockMediaService,
  isLegacy: boolean = true,
  isConfigurableMediaComponent = false
): void {
  TestBed.configureTestingModule({
    declarations: [MediaComponent, MockMediaSourcesPipe, MockFeatureDirective],
    providers: [
      { provide: MediaService, useValue: mockMediaService },
      {
        provide: USE_LEGACY_MEDIA_COMPONENT,
        useValue: isLegacy,
      },
      {
        provide: IS_CONFIGURABLE_MEDIA_COMPONENT,
        useValue: isConfigurableMediaComponent,
      },
    ],
  }).compileComponents();
}

function createComponent(usePictureElement = false) {
  const service = TestBed.inject(MediaService);
  const fixture = TestBed.createComponent(MediaComponent);
  const component = fixture.componentInstance;
  const getMediaSpy = spyOn(service, 'getMedia').and.callThrough();
  const getMediaForPictureElementSpy = spyOn(
    service,
    'getMediaForPictureElement'
  ).and.callThrough();

  component.container = mockImageContainer;

  if (usePictureElement) {
    component.usePictureElement = usePictureElement;
  }

  component.ngOnChanges();
  fixture.detectChanges();

  return {
    service,
    fixture,
    component,
    getMediaSpy,
    getMediaForPictureElementSpy,
  };
}

describe('MediaComponent', () => {
  describe('with enabled useMediaComponentWithConfigurableMediaQueries', () => {
    it('should have picture element if usePictureElement is true', () => {
      configureTestingModule(new MockMediaService('srcset'), false, true);
      const { fixture } = createComponent(true);

      const picture = fixture.debugElement.query(By.css('picture'));

      expect(picture).not.toBeNull();
    });

    it('should not have picture element if usePictureElement is false', () => {
      configureTestingModule(new MockMediaService('srcset'), false, true);
      const { fixture } = createComponent(false);

      const picture = fixture.debugElement.query(By.css('picture'));

      expect(picture).toBeNull();
    });

    it('should call getMedia() method from service if usePictureElement is false', () => {
      configureTestingModule(new MockMediaService('srcset'), false, true);
      const { getMediaSpy, getMediaForPictureElementSpy } =
        createComponent(false);

      expect(getMediaForPictureElementSpy).not.toHaveBeenCalled();
      expect(getMediaSpy).toHaveBeenCalled();
    });

    it('should call getMediaForPictureElement() method from service if usePictureElement is true', () => {
      configureTestingModule(new MockMediaService('srcset'), false, true);
      const { getMediaForPictureElementSpy, getMediaSpy } =
        createComponent(true);

      expect(getMediaForPictureElementSpy).toHaveBeenCalled();
      expect(getMediaSpy).not.toHaveBeenCalled();
    });
  });

  it('should create', () => {
    configureTestingModule(new MockMediaService());
    const { component } = createComponent();

    expect(component).toBeTruthy();
  });

  it('should create media object with valid image url', () => {
    configureTestingModule(new MockMediaService());
    const { component } = createComponent();

    expect(component?.media?.src).toEqual(mediaUrl);
  });

  it('should update the img element with image url', () => {
    configureTestingModule(new MockMediaService());
    const { fixture } = createComponent();

    expect(
      (<HTMLImageElement>(
        fixture.debugElement.query(By.css('img')).nativeElement
      )).src
    ).toContain(mediaUrl);
  });

  it('should not contain the loading attribute for the image element', () => {
    configureTestingModule(new MockMediaService());
    const { fixture } = createComponent();

    const el: HTMLElement = <HTMLImageElement>(
      fixture.debugElement.query(By.css('img')).nativeElement
    );

    fixture.detectChanges();
    expect(JSON.parse(el.getAttribute('loading') as string)).toBeNull();
  });

  it('should contain loading="lazy" for the image element', () => {
    configureTestingModule(new MockMediaService());
    const { service } = createComponent();

    spyOnProperty(service, 'loadingStrategy').and.returnValue(
      ImageLoadingStrategy.LAZY
    );
    const lazyFixture = TestBed.createComponent(MediaComponent);
    const lazyComponent = lazyFixture.componentInstance;
    lazyComponent.container = mockImageContainer;
    lazyComponent.ngOnChanges();
    lazyFixture.detectChanges();
    const el: HTMLElement = <HTMLImageElement>(
      lazyFixture.debugElement.query(By.css('img')).nativeElement
    );
    expect(el.getAttribute('loading')).toEqual('lazy');
  });

  it('should contain is-loading classes while loading', () => {
    configureTestingModule(new MockMediaService());
    const { fixture } = createComponent();

    expect(
      (<HTMLImageElement>fixture.debugElement.nativeElement).classList
    ).toContain('is-loading');
  });

  it('should update classes when loaded', () => {
    configureTestingModule(new MockMediaService());
    const { fixture } = createComponent();

    const load = new UIEvent('load');
    fixture.debugElement.query(By.css('img')).nativeElement.dispatchEvent(load);

    fixture.detectChanges();

    expect(
      (<HTMLImageElement>fixture.debugElement.nativeElement).classList
    ).not.toContain('is-loading');
    expect(
      (<HTMLImageElement>fixture.debugElement.nativeElement).classList
    ).toContain('is-initialized');
  });

  it('should have is-missing class when there is no image', () => {
    configureTestingModule(new MockMediaService());
    const { fixture, component, getMediaSpy } = createComponent();

    component.container = mockImageContainer;

    component.ngOnChanges();
    fixture.detectChanges();

    getMediaSpy.and.returnValue(null);
    component.container = mockMissingImageContainer;

    component.ngOnChanges();
    fixture.detectChanges();

    expect(
      (<HTMLImageElement>fixture.debugElement.nativeElement).classList
    ).toContain('is-missing');
  });

  it('should not have picture element if there is no srcset in media', () => {
    configureTestingModule(new MockMediaService());
    const { fixture } = createComponent();

    const picture = fixture.debugElement.query(By.css('picture'));

    expect(picture).toBeNull();
  });

  it('should have picture element if there is srcset in media', () => {
    configureTestingModule(new MockMediaService('srcset'), false);
    const { fixture } = createComponent();

    const picture = fixture.debugElement.query(By.css('picture'));

    expect(picture).not.toBeNull();
  });

  it('should not have picture element if there is srcset in media but isLegacy mode', () => {
    configureTestingModule(new MockMediaService('srcset'));
    const { fixture } = createComponent();

    const picture = fixture.debugElement.query(By.css('picture'));

    expect(picture).toBeNull();
  });
});
