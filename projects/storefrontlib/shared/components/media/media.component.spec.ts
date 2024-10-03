import { Pipe, PipeTransform } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MediaComponent } from './media.component';
import { ImageLoadingStrategy, Media } from './media.model';
import { MediaService } from './media.service';
import { USE_LEGACY_MEDIA_COMPONENT } from './media.token';

const mediaUrl = 'mockProductImageUrl.jpg';

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
  isLegacy: boolean = true
): void {
  TestBed.configureTestingModule({
    declarations: [MediaComponent, MockMediaSourcesPipe],
    providers: [
      { provide: MediaService, useValue: mockMediaService },
      {
        provide: USE_LEGACY_MEDIA_COMPONENT,
        useValue: isLegacy,
      },
    ],
  }).compileComponents();
}

function createComponent() {
  const service = TestBed.inject(MediaService);
  const fixture = TestBed.createComponent(MediaComponent);
  const component = fixture.componentInstance;

  component.container = mockImageContainer;

  component.ngOnChanges();
  fixture.detectChanges();

  return { service, fixture, component };
}

describe('MediaComponent', () => {
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
    const { service, fixture, component } = createComponent();

    component.container = mockImageContainer;

    component.ngOnChanges();
    fixture.detectChanges();

    spyOn(service, 'getMedia').and.returnValue(null);
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
