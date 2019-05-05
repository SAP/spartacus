import { TestBed } from '@angular/core/testing';
import { OccConfig } from '@spartacus/core';
import { defaultLayoutConfig, LayoutConfig } from '../../../layout';
import { MediaService } from './media.service';

const MockConfig: OccConfig = {
  backend: {
    media: {
      baseUrl: 'base:',
    },
  },
};

const mockMediaContainer = {
  mobile: {
    url: 'http://mobileUrl',
  },
  tablet: {
    url: 'tabletUrl',
  },
  desktop: {
    url: 'desktopUrl',
    altText: 'alt text',
  },
};

const mockMedia = {
  url: 'mediaUrl',
};

describe('MediaService', () => {
  let mediaService: MediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MediaService,
        { provide: OccConfig, useValue: MockConfig },
        { provide: LayoutConfig, useValue: defaultLayoutConfig },
      ],
    });
    mediaService = TestBed.get(MediaService);
  });

  it('should inject service', () => {
    expect(mediaService).toBeTruthy();
  });

  it('should return url if container does not contains formats', () => {
    expect(mediaService.getImage(mockMedia).src).toBe('base:mediaUrl');
  });

  it('should return default image format if format is not provided', () => {
    expect(mediaService.getImage(mockMediaContainer).src).toBe(
      'base:tabletUrl'
    );
  });

  it('should return image format for desktop', () => {
    expect(mediaService.getImage(mockMediaContainer, 'desktop').src).toBe(
      'base:desktopUrl'
    );
  });

  it('should not return baseUrl if external image is provided', () => {
    expect(mediaService.getImage(mockMediaContainer, 'mobile').src).toBe(
      'http://mobileUrl'
    );
  });

  it('should return alt text from media object', () => {
    expect(mediaService.getImage(mockMediaContainer, 'desktop').alt).toBe(
      'alt text'
    );
  });

  it('should not return alt text from media object when alt ', () => {
    expect(
      mediaService.getImage(mockMediaContainer, 'desktop', 'other alt').alt
    ).toBe('other alt');
  });

  it('should return missing image if media cannot be found', () => {
    expect(
      mediaService
        .getImage(mockMediaContainer, 'xyz')
        .src.indexOf('data:image/jpg;base64')
    ).toBe(0);
  });

  it('should return srcset', () => {
    expect(mediaService.getImage(mockMediaContainer).srcset).toBe(
      'http://mobileUrl 576w, base:tabletUrl 768w, base:desktopUrl 992w'
    );
  });
});
