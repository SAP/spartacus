import { TestBed } from '@angular/core/testing';
import { Config, Image } from '@spartacus/core';
import { LayoutConfig } from '../../../layout/config/layout-config';
import { StorefrontConfig } from '../../../storefront-config';
import { MediaContainer } from './media.model';
import { MediaService } from './media.service';

const MockStorefrontConfig: StorefrontConfig = {
  backend: {
    media: {
      baseUrl: 'base:',
    },
  },
  mediaFormats: {
    format400: {
      width: 400,
    },
    format200: {
      width: 400,
    },
    format600: {
      width: 600,
    },
    format1: {
      width: 1,
    },
  },
};

const mockUnknownMediaContainer = {
  unknownFormat1: {
    url: 'random1.url',
    format: 'unknownFormat1',
    altText: 'alt text for unknown-1',
  },
  unknownFormat2: {
    url: 'random2.url',
    format: 'unknownFormat2',
    altText: 'alt text for unknown-2',
  },
};

const mockMedia: Image = {
  url: 'media.url',
  altText: 'alt text for media',
};

const mockBestFormatMediaContainer: MediaContainer = {
  format1: {
    url: 'format-1.url',
    format: 'format1',
    altText: 'alt text for format-1',
  },
  format2: {
    url: 'format-2.url',
    format: 'format2',
    altText: 'alt text for format-2',
  },
  format400: {
    url: 'format-400.url',
    format: 'format400',
    altText: 'alt text for format-400',
  },
  format600: {
    url: 'format-600.url',
    format: 'format600',
    altText: 'alt text for format-600',
  },
};

const mockUrlContainer = {
  absolute: {
    url: 'http://absolute.jpg',
  },
  relative: {
    url: 'relative.jpg',
  },
};

describe('MediaService', () => {
  let mediaService: MediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MediaService,
        { provide: Config, useValue: MockStorefrontConfig },
        { provide: LayoutConfig, useValue: {} },
      ],
    });
    mediaService = TestBed.inject(MediaService);
  });

  it('should inject service', () => {
    expect(mediaService).toBeTruthy();
  });

  describe('getMedia', () => {
    describe('without format', () => {
      it('should return best media', () => {
        expect(mediaService.getMedia(mockBestFormatMediaContainer).src).toBe(
          'base:format-600.url'
        );
      });

      it('should return the first media if there is no configured format', () => {
        expect(mediaService.getMedia(mockUnknownMediaContainer).src).toBe(
          'base:random1.url'
        );
      });

      it('should return media', () => {
        expect(mediaService.getMedia(mockMedia).src).toBe('base:media.url');
      });

      it('should not return src if there are no medias in the container', () => {
        expect(mediaService.getMedia({}).src).toBeFalsy();
      });

      it('should not return src if there is no media url', () => {
        expect(mediaService.getMedia({ altText: 'whatever' }).src).toBeFalsy();
      });
    });

    describe('with format', () => {
      it('should ignore format if no media container is passed', () => {
        expect(mediaService.getMedia(mockMedia, 'any').src).toBe(
          'base:media.url'
        );
      });

      it('should return media for format', () => {
        expect(
          mediaService.getMedia(mockBestFormatMediaContainer, 'format400').src
        ).toBe('base:format-400.url');
      });

      it('should return best media for unknown format', () => {
        expect(
          mediaService.getMedia(mockBestFormatMediaContainer, 'unknown').src
        ).toBe('base:format-600.url');
      });

      it('should return random media for unknown format and unknown media formats', () => {
        expect(
          mediaService.getMedia(mockUnknownMediaContainer, 'unknown').src
        ).toBe('base:random1.url');
      });

      it('should not return src if the media container does not contain a url', () => {
        expect(
          mediaService.getMedia({ cont: { format: 'xyz' } }, 'xyz').src
        ).toBeFalsy();
      });
    });

    describe('alt text', () => {
      it('should return alt text for media', () => {
        expect(mediaService.getMedia(mockMedia).alt).toBe('alt text for media');
      });

      it('should return alt text for best media', () => {
        expect(mediaService.getMedia(mockBestFormatMediaContainer).alt).toBe(
          'alt text for format-600'
        );
      });

      it('should return alt text for specific format', () => {
        expect(
          mediaService.getMedia(mockBestFormatMediaContainer, 'format400').alt
        ).toBe('alt text for format-400');
      });

      it('should return alt text for best format', () => {
        expect(
          mediaService.getMedia(mockBestFormatMediaContainer, 'unknown').alt
        ).toBe('alt text for format-600');
      });

      it('should return alt text for random format', () => {
        expect(
          mediaService.getMedia(mockUnknownMediaContainer, 'unknown').alt
        ).toBe('alt text for unknown-1');
      });

      it('should return given alt text', () => {
        expect(
          mediaService.getMedia(
            mockBestFormatMediaContainer,
            'format400',
            'custom alt'
          ).alt
        ).toEqual('custom alt');
      });
    });

    describe('srcset', () => {
      it('should return srcset', () => {
        expect(mediaService.getMedia(mockBestFormatMediaContainer).srcset).toBe(
          'base:format-1.url 1w, base:format-400.url 400w, base:format-600.url 600w'
        );
      });

      it('should not return srcset for media', () => {
        expect(mediaService.getMedia(mockMedia).srcset).toBeFalsy();
      });
    });
  });

  describe('absolute URL', () => {
    it('should avoid baseUrl if absolute image is provided', () => {
      expect(mediaService.getMedia(mockUrlContainer, 'absolute').src).toBe(
        'http://absolute.jpg'
      );
    });

    it('should add OCC baseUrl for relative image', () => {
      expect(mediaService.getMedia(mockUrlContainer, 'relative').src).toBe(
        'base:relative.jpg'
      );
    });
  });
});
