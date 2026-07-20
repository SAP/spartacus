import { TestBed } from '@angular/core/testing';
import { WindowRef } from '@spartacus/core';
import { MediaService } from '../../shared/components/media/media.service';
import { MediaPreconnectService } from './media-preconnect.service';
import { PageMetaLinkService } from './page-meta-link.service';

class MockPageMetaLinkService {
  addPreconnectLink = jasmine.createSpy('addPreconnectLink');
}
class MockMediaService {
  getBaseUrl = jasmine
    .createSpy('getBaseUrl')
    .and.returnValue('https://media.example.com');
}

class MockWindowRef {
  location = { origin: 'https://storefront.example.com' };
}

describe('MediaPreconnectService', () => {
  let service: MediaPreconnectService;
  let pageMetaLinkService: MockPageMetaLinkService;
  let mediaService: MockMediaService;
  let windowRef: MockWindowRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MediaPreconnectService,
        { provide: PageMetaLinkService, useClass: MockPageMetaLinkService },
        { provide: MediaService, useClass: MockMediaService },
        { provide: WindowRef, useClass: MockWindowRef },
      ],
    });

    service = TestBed.inject(MediaPreconnectService);
    pageMetaLinkService = TestBed.inject(PageMetaLinkService) as any;
    mediaService = TestBed.inject(MediaService) as any;
    windowRef = TestBed.inject(WindowRef) as any;
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should add preconnect link if feature toggle is enabled and media domain is different', () => {
    windowRef.location.origin = 'https://storefront.example.com';
    mediaService.getBaseUrl.and.returnValue('https://media.example.com');
    service.addPreconnectLink();
    expect(mediaService.getBaseUrl).toHaveBeenCalled();
    expect(pageMetaLinkService.addPreconnectLink).toHaveBeenCalledWith(
      'https://media.example.com'
    );
  });

  it('should not add preconnect link if media domain is same as window origin', () => {
    windowRef.location.origin = 'https://storefront.example.com';
    mediaService.getBaseUrl.and.returnValue('https://storefront.example.com');
    service.addPreconnectLink();
    expect(pageMetaLinkService.addPreconnectLink).not.toHaveBeenCalled();
  });

  it('should add preconnect link if media domain is different from window origin', () => {
    windowRef.location.origin = 'https://another.example.com';
    mediaService.getBaseUrl.and.returnValue('https://media.example.com');
    service.addPreconnectLink();
    expect(pageMetaLinkService.addPreconnectLink).toHaveBeenCalledWith(
      'https://media.example.com'
    );
  });

  it('should handle invalid URL gracefully', () => {
    windowRef.location.origin = 'https://storefront.example.com';
    mediaService.getBaseUrl.and.returnValue('not-a-valid-url');
    expect(() => service.addPreconnectLink()).not.toThrow();
    expect(pageMetaLinkService.addPreconnectLink).not.toHaveBeenCalled();
  });
});
