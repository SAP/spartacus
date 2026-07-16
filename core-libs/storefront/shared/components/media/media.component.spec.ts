import {
  Directive,
  Input,
  Pipe,
  PipeTransform,
  TemplateRef,
  ViewContainerRef,
  inject,
  InjectionToken,
} from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FeatureDirective } from '@spartacus/core';
import { MediaSourcesPipe } from './media-sources.pipe';
import { MediaComponent } from './media.component';
import { ImageFetchPriority, ImageLoadingStrategy, Media } from './media.model';
import { MediaService } from './media.service';

const IS_CONFIGURABLE_MEDIA_COMPONENT = new InjectionToken<boolean>(
  'IS_CONFIGURABLE_MEDIA_COMPONENT'
);

const mediaUrl = 'mockProductImageUrl.jpg';

@Directive({ selector: '[cxFeature]' })
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

@Pipe({ name: 'cxMediaSources' })
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
  constructor(public srcset: string | null) {}

  getMedia(media: any): Media {
    return {
      src: media ? media.product.url : undefined,
      srcset: this.srcset as unknown as any,
      alt: undefined,
    };
  }
  getMediaForPictureElement(media: any): Media | undefined {
    return {
      src: media ? media.product.url : undefined,
      srcset: this.srcset as unknown as any,
      alt: undefined,
      sources: [
        {
          srcset: 'test.url',
          media: '',
          width: undefined,
          height: undefined,
        },
      ],
    };
  }

  getMediaBasedOnHTMLElementType(
    elementType: 'img' | 'picture',
    mediaContainer?: any
  ) {
    const shouldGetMediaForPictureElement = elementType !== 'img';

    return shouldGetMediaForPictureElement
      ? this.getMediaForPictureElement(mediaContainer)
      : this.getMedia(mediaContainer);
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
  isConfigurableMediaComponent = false
): void {
  TestBed.configureTestingModule({
    imports: [MediaComponent],
    providers: [
      { provide: MediaService, useValue: mockMediaService },
      {
        provide: IS_CONFIGURABLE_MEDIA_COMPONENT,
        useValue: isConfigurableMediaComponent,
      },
    ],
  })
    .overrideComponent(MediaComponent, {
      remove: { imports: [MediaSourcesPipe, FeatureDirective] },
      add: { imports: [MockMediaSourcesPipe, MockFeatureDirective] },
    })
    .compileComponents();
}

function createComponent(elementType: 'picture' | 'img' = 'img') {
  const service = TestBed.inject(MediaService);
  const fixture = TestBed.createComponent(MediaComponent);
  const component = fixture.componentInstance;
  const getMediaSpy = vi.spyOn(service, 'getMedia');
  const getMediaForPictureElementSpy = vi.spyOn(
    service,
    'getMediaForPictureElement'
  );
  const getMediaBasedOnHTMLElementType = vi.spyOn(
    service,
    'getMediaBasedOnHTMLElementType'
  );

  component.container = mockImageContainer;

  component.elementType = elementType;

  component.ngOnChanges();
  fixture.detectChanges();

  return {
    service,
    fixture,
    component,
    getMediaSpy,
    getMediaForPictureElementSpy,
    getMediaBasedOnHTMLElementType,
  };
}

describe('MediaComponent', () => {
  it('should have picture element if elementType is `picture`', () => {
    configureTestingModule(new MockMediaService('srcset'), true);
    const { fixture } = createComponent('picture');

    const picture = fixture.debugElement.query(By.css('picture'));

    expect(picture).not.toBeNull();
  });

  it('should not have picture element if elementType is `img`', () => {
    configureTestingModule(new MockMediaService('srcset'), true);
    const { fixture } = createComponent();

    const picture = fixture.debugElement.query(By.css('picture'));

    expect(picture).toBeNull();
  });

  it('should call getMediaBasedOnHTMLElementType() method from service', () => {
    configureTestingModule(new MockMediaService('srcset'), true);
    const { getMediaSpy } = createComponent();

    expect(getMediaSpy).toHaveBeenCalled();
  });

  it('should call getMediaForPictureElement() method from service if elementType is `picture`', () => {
    configureTestingModule(new MockMediaService('srcset'), true);
    const { getMediaForPictureElementSpy, getMediaSpy } =
      createComponent('picture');

    expect(getMediaForPictureElementSpy).toHaveBeenCalled();
    expect(getMediaSpy).not.toHaveBeenCalled();
  });

  it('should call getMedia() method from service if elementType is `img`', () => {
    configureTestingModule(new MockMediaService('srcset'), true);
    const { getMediaForPictureElementSpy, getMediaSpy } = createComponent();

    expect(getMediaForPictureElementSpy).not.toHaveBeenCalled();
    expect(getMediaSpy).toHaveBeenCalled();
  });

  it('should create', () => {
    configureTestingModule(new MockMediaService(null));
    const { component } = createComponent();

    expect(component).toBeTruthy();
  });

  it('should create media object with valid image url', () => {
    configureTestingModule(new MockMediaService(null));
    const { component } = createComponent();

    expect(component?.media?.src).toEqual(mediaUrl);
  });

  it('should update the img element with image url', () => {
    configureTestingModule(new MockMediaService(null));
    const { fixture } = createComponent();

    expect(
      (<HTMLImageElement>(
        fixture.debugElement.query(By.css('img')).nativeElement
      )).src
    ).toContain(mediaUrl);
  });

  it('should not contain the loading attribute for the image element', () => {
    configureTestingModule(new MockMediaService(null));
    const { fixture } = createComponent();

    const el: HTMLElement = <HTMLImageElement>(
      fixture.debugElement.query(By.css('img')).nativeElement
    );

    fixture.detectChanges();
    expect(JSON.parse(el.getAttribute('loading') as string)).toBeNull();
  });

  it('should contain loading="lazy" for the image element', () => {
    configureTestingModule(new MockMediaService(null));
    const { service } = createComponent();

    vi.spyOn(service, 'loadingStrategy', 'get').mockReturnValue(
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
    configureTestingModule(new MockMediaService(null));
    const { fixture } = createComponent();

    expect(
      (<HTMLImageElement>fixture.debugElement.nativeElement).classList
    ).toContain('is-loading');
  });

  it('should update classes when loaded', () => {
    configureTestingModule(new MockMediaService(null));
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
    configureTestingModule(new MockMediaService(null));
    const { fixture, component, getMediaSpy } = createComponent();

    component.container = mockImageContainer;

    component.ngOnChanges();
    fixture.detectChanges();

    getMediaSpy.mockReturnValue(null);
    component.container = mockMissingImageContainer;

    component.ngOnChanges();
    fixture.detectChanges();

    expect(
      (<HTMLImageElement>fixture.debugElement.nativeElement).classList
    ).toContain('is-missing');
  });

  it('should not have picture element if there is no srcset in media', () => {
    configureTestingModule(new MockMediaService(null));
    const { fixture } = createComponent();

    const picture = fixture.debugElement.query(By.css('picture'));

    expect(picture).toBeNull();
  });

  it('should have picture element if there is srcset in media', () => {
    configureTestingModule(new MockMediaService('srcset'));
    const { fixture } = createComponent('picture');

    const picture = fixture.debugElement.query(By.css('picture'));

    expect(picture).not.toBeNull();
  });

  it('should not have picture element if there is srcset in media but isLegacy mode', () => {
    configureTestingModule(new MockMediaService('srcset'));
    const { fixture } = createComponent();

    const picture = fixture.debugElement.query(By.css('picture'));

    expect(picture).toBeNull();
  });

  describe('effectiveLoadingStrategy', () => {
    it('should accept fetchPriority input', () => {
      configureTestingModule(new MockMediaService(null));
      const { component } = createComponent();
      component.fetchPriority = ImageFetchPriority.HIGH;
      expect(component.fetchPriority).toBe('high');
    });

    it('should return EAGER if fetchPriority is HIGH', () => {
      configureTestingModule(new MockMediaService(null));
      const { component, fixture } = createComponent();

      const imageNativeElement: HTMLImageElement = fixture.debugElement.query(
        By.css('img')
      ).nativeElement;

      component.fetchPriority = ImageFetchPriority.HIGH;
      component.loading = ImageLoadingStrategy.LAZY;

      const load = new UIEvent('load');
      imageNativeElement.dispatchEvent(load);

      fixture.detectChanges();

      expect(component['effectiveLoadingStrategy']).toBe(
        ImageLoadingStrategy.EAGER
      );

      expect(imageNativeElement.getAttribute('loading')).toBe('eager');
      expect(imageNativeElement.getAttribute('fetchpriority')).toBe('high');
    });

    it('should return loading if fetchPriority is not HIGH', () => {
      configureTestingModule(new MockMediaService(null));
      const { component, fixture } = createComponent();

      const imageNativeElement: HTMLImageElement = fixture.debugElement.query(
        By.css('img')
      ).nativeElement;

      const load = new UIEvent('load');
      imageNativeElement.dispatchEvent(load);

      component.fetchPriority = ImageFetchPriority.LOW;
      component.loading = ImageLoadingStrategy.LAZY;

      fixture.detectChanges();

      expect(component['effectiveLoadingStrategy']).toBe(
        ImageLoadingStrategy.LAZY
      );
      expect(imageNativeElement.getAttribute('loading')).toBe('lazy');
      expect(imageNativeElement.getAttribute('fetchpriority')).toBe('low');
    });

    it('should fallback to loadingStrategy if loading is null', () => {
      configureTestingModule(new MockMediaService(null));
      const { component, fixture } = createComponent();

      const imageNativeElement: HTMLImageElement = fixture.debugElement.query(
        By.css('img')
      ).nativeElement;

      const load = new UIEvent('load');
      imageNativeElement.dispatchEvent(load);

      component.fetchPriority = undefined;
      component.loading = null;

      vi.spyOn(component, 'loadingStrategy', 'get').mockReturnValue(
        ImageLoadingStrategy.LAZY
      );

      expect(component['effectiveLoadingStrategy']).toBe(
        ImageLoadingStrategy.LAZY
      );

      fixture.detectChanges();

      expect(imageNativeElement.getAttribute('loading')).toBe('lazy');
    });
  });
});
