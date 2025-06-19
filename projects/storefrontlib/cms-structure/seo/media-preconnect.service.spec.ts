import { TestBed } from '@angular/core/testing';
import { MediaPreconnectService } from './media-preconnect.service';
import { PageMetaLinkService } from './page-meta-link.service';
import { MediaService } from '../../shared/components/media/media.service';
import { FeatureToggles } from '@spartacus/core';
import { WindowRef } from '@spartacus/core';

class MockPageMetaLinkService {
  addPreconnectLink = jasmine.createSpy('addPreconnectLink');
}
class MockMediaService {
  getBaseUrl = jasmine
    .createSpy('getBaseUrl')
    .and.returnValue('https://media.example.com');
}
class MockFeatureToggles {
  createMediaPreconnectLink = true;
}
class MockWindowRef {
  location = { origin: 'https://storefront.example.com' };
}

describe('MediaPreconnectService', () => {
  let service: MediaPreconnectService;
  let pageMetaLinkService: MockPageMetaLinkService;
  let mediaService: MockMediaService;
  let featureToggles: MockFeatureToggles;
  let windowRef: MockWindowRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MediaPreconnectService,
        { provide: PageMetaLinkService, useClass: MockPageMetaLinkService },
        { provide: MediaService, useClass: MockMediaService },
        { provide: FeatureToggles, useClass: MockFeatureToggles },
        { provide: WindowRef, useClass: MockWindowRef },
      ],
    });

    service = TestBed.inject(MediaPreconnectService);
    pageMetaLinkService = TestBed.inject(PageMetaLinkService) as any;
    mediaService = TestBed.inject(MediaService) as any;
    featureToggles = TestBed.inject(FeatureToggles) as any;
    windowRef = TestBed.inject(WindowRef) as any;
  });

  afterEach(() => {
    // Restore global URL if it was mocked
    if ((globalThis as any)._originalURL) {
      (globalThis as any).URL = (globalThis as any)._originalURL;
      delete (globalThis as any)._originalURL;
    }
  });

  function mockURLConstructor(origin: string) {
    (globalThis as any)._originalURL = globalThis.URL;
    globalThis.URL = function (_url: string) {
      return { origin };
    } as any;
  }

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should add preconnect link if feature toggle is enabled and media domain is different', () => {
    windowRef.location.origin = 'https://storefront.example.com';
    mockURLConstructor('https://media.example.com');
    service.addPreconnectLink();
    expect(mediaService.getBaseUrl).toHaveBeenCalled();
    expect(pageMetaLinkService.addPreconnectLink).toHaveBeenCalledWith(
      'https://media.example.com'
    );
  });

  it('should not add preconnect link if feature toggle is disabled', () => {
    featureToggles.createMediaPreconnectLink = false;
    windowRef.location.origin = 'https://storefront.example.com';
    service.addPreconnectLink();
    expect(pageMetaLinkService.addPreconnectLink).not.toHaveBeenCalled();
  });

  it('should not add preconnect link if media domain is same as window origin', () => {
    windowRef.location.origin = 'https://storefront.example.com';
    mockURLConstructor('https://storefront.example.com');
    service.addPreconnectLink();
    expect(pageMetaLinkService.addPreconnectLink).not.toHaveBeenCalled();
  });

  it('should add preconnect link if media domain is different from window origin', () => {
    windowRef.location.origin = 'https://another.example.com';
    mockURLConstructor('https://media.example.com');
    service.addPreconnectLink();
    expect(pageMetaLinkService.addPreconnectLink).toHaveBeenCalledWith(
      'https://media.example.com'
    );
  });

  it('should handle invalid URL gracefully', () => {
    windowRef.location.origin = 'https://storefront.example.com';
    (globalThis as any)._originalURL = globalThis.URL;
    globalThis.URL = function () {
      throw new Error('Invalid URL');
    } as any;
    expect(() => service.addPreconnectLink()).not.toThrow();
    expect(pageMetaLinkService.addPreconnectLink).not.toHaveBeenCalled();
  });
});
