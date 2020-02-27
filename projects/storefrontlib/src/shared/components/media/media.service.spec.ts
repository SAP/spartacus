import { TestBed } from '@angular/core/testing';
import { OccConfig } from '@spartacus/core';
import { LayoutConfig } from '../../../layout';
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
  wide: {},
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

        { provide: LayoutConfig, useValue: {} },
      ],
    });
    mediaService = TestBed.inject(MediaService);
  });

  it('should inject service', () => {
    expect(mediaService).toBeTruthy();
  });

  it('should return url if container does not contains formats', () => {
    expect(mediaService.getMedia(mockMedia).src).toBe('base:mediaUrl');
  });

  it('should return default image format if format is not provided', () => {
    expect(mediaService.getMedia(mockMediaContainer).src).toBe(
      'base:tabletUrl'
    );
  });

  it('should return image format for desktop', () => {
    expect(mediaService.getMedia(mockMediaContainer, 'desktop').src).toBe(
      'base:desktopUrl'
    );
  });

  it('should not return baseUrl if external image is provided', () => {
    expect(mediaService.getMedia(mockMediaContainer, 'mobile').src).toBe(
      'http://mobileUrl'
    );
  });

  it('should return alt text from media object', () => {
    expect(mediaService.getMedia(mockMediaContainer, 'desktop').alt).toBe(
      'alt text'
    );
  });

  it('should return null if the media container has no url', () => {
    expect(mediaService.getMedia(mockMediaContainer, 'wide').src).toBeFalsy();
  });

  it('should not return alt text from media object when alt ', () => {
    expect(
      mediaService.getMedia(mockMediaContainer, 'desktop', 'other alt').alt
    ).toBe('other alt');
  });

  it('should return srcset', () => {
    expect(mediaService.getMedia(mockMediaContainer).srcset).toBe(
      'http://mobileUrl 576w, base:tabletUrl 768w, base:desktopUrl 992w'
    );
  });

  it('should return image url if default format is not provided', () => {
    mockMediaContainer.tablet = null;
    expect(mediaService.getMedia(mockMediaContainer, 'tablet').src).toBe(
      `${MockConfig.backend.media.baseUrl}${mockMediaContainer.desktop.url}`
    );
  });
});
