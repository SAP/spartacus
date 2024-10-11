import { TestBed } from '@angular/core/testing';
import { Config, Image } from '@spartacus/core';
import { LayoutConfig } from '../../../layout/config/layout-config';
import {
  ImageLoadingStrategy,
  MediaContainer,
  PictureElementQueries,
} from './media.model';
import { MediaService } from './media.service';

const MockStorefrontConfig: Config = {
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
  pictureElementFormats: {
    format400: {
      mediaQueries: {
        maxWidth: '786px',
        minDevicePixelRatio: 3,
      },
    },
    format200: {
      mediaQueries: {
        minWidth: '768px',
        maxWidth: '1024px',
      },
    },
    format600: {
      mediaQueries: {
        minWidth: '1025px',
        maxWidth: '1439px',
      },
    },
    format1: {
      mediaQueries: {
        minWidth: '1440px',
      },
    },
  },
  pictureFormatsOrder: ['format1', 'format200', 'format400', 'format600'],
};

const mockUnknownMediaContainer = {
  unknownFormat1: {
    url: 'random1.url',
    format: 'unknownFormat1',
    altText: 'alt text for unknown-1',
    role: 'presentation',
  },
  unknownFormat2: {
    url: 'random2.url',
    format: 'unknownFormat2',
    altText: 'alt text for unknown-2',
    role: 'presentation',
  },
};

const mockMedia: Image = {
  url: 'media.url',
  altText: 'alt text for media',
  role: 'presentation',
};

const mockBestFormatMediaContainer: MediaContainer = {
  format1: {
    url: 'format-1.url',
    format: 'format1',
    altText: 'alt text for format-1',
    role: 'presentation',
  },
  format2: {
    url: 'format-2.url',
    format: 'format2',
    altText: 'alt text for format-2',
    role: 'presentation',
  },
  format400: {
    url: 'format-400.url',
    format: 'format400',
    altText: 'alt text for format-400',
    role: 'presentation',
  },
  format600: {
    url: 'format-600.url',
    format: 'format600',
    altText: 'alt text for format-600',
    role: 'presentation',
  },
};

const mockUrlContainer = {
  absolute: {
    url: 'http://absolute.jpg',
  },
  doubleSlash: {
    url: '//absolute.jpg',
  },
  relative: {
    url: 'relative.jpg',
  },
};

describe('MediaService', () => {
  describe('with eager loaded config', () => {
    let mediaService: MediaService;

    beforeEach(() => {
      configureTestingModule(MockStorefrontConfig);
      mediaService = TestBed.inject(MediaService);
    });

    it('should inject service', () => {
      expect(mediaService).toBeTruthy();
    });

    describe('get media methods', () => {
      it('should return undefined if no mediaContainer', () => {
        expect(mediaService.getMedia()).toBeUndefined();
        expect(mediaService.getMediaForPictureElement()).toBeUndefined();
      });

      describe('without format', () => {
        it('should return best media', () => {
          expect(mediaService.getMedia(mockBestFormatMediaContainer)?.src).toBe(
            'base:format-600.url'
          );
          expect(
            mediaService.getMediaForPictureElement(mockBestFormatMediaContainer)
              ?.src
          ).toBe('base:format-600.url');
        });

        it('should return the first media if there is no configured format', () => {
          expect(mediaService.getMedia(mockUnknownMediaContainer)?.src).toBe(
            'base:random1.url'
          );
          expect(
            mediaService.getMediaForPictureElement(mockUnknownMediaContainer)
              ?.src
          ).toBe('base:random1.url');
        });

        it('should return media', () => {
          expect(mediaService.getMedia(mockMedia)?.src).toBe('base:media.url');
          expect(mediaService.getMediaForPictureElement(mockMedia)?.src).toBe(
            'base:media.url'
          );
        });

        it('should not return src if there are no medias in the container', () => {
          expect(mediaService.getMedia({})?.src).toBeFalsy();
          expect(mediaService.getMediaForPictureElement({})?.src).toBeFalsy();
        });

        it('should not return src if there is no media url', () => {
          expect(
            mediaService.getMedia({ altText: 'whatever' })?.src
          ).toBeFalsy();
          expect(
            mediaService.getMediaForPictureElement({ altText: 'whatever' })?.src
          ).toBeFalsy();
        });
      });

      describe('with format', () => {
        it('should ignore format if no media container is passed', () => {
          expect(mediaService.getMedia(mockMedia, 'any')?.src).toBe(
            'base:media.url'
          );
          expect(
            mediaService.getMediaForPictureElement(mockMedia, 'any')?.src
          ).toBe('base:media.url');
        });

        it('should return media for format', () => {
          expect(
            mediaService.getMedia(mockBestFormatMediaContainer, 'format400')
              ?.src
          ).toBe('base:format-400.url');
          expect(
            mediaService.getMediaForPictureElement(
              mockBestFormatMediaContainer,
              'format400'
            )?.src
          ).toBe('base:format-400.url');
        });

        it('should return best media for unknown format', () => {
          expect(
            mediaService.getMedia(mockBestFormatMediaContainer, 'unknown')?.src
          ).toBe('base:format-600.url');
          expect(
            mediaService.getMediaForPictureElement(
              mockBestFormatMediaContainer,
              'unknown'
            )?.src
          ).toBe('base:format-600.url');
        });

        it('should return random media for unknown format and unknown media formats', () => {
          expect(
            mediaService.getMedia(mockUnknownMediaContainer, 'unknown')?.src
          ).toBe('base:random1.url');
          expect(
            mediaService.getMediaForPictureElement(
              mockUnknownMediaContainer,
              'unknown'
            )?.src
          ).toBe('base:random1.url');
        });

        it('should not return src if the media container does not contain a url', () => {
          expect(
            mediaService.getMedia({ cont: { format: 'xyz' } }, 'xyz')?.src
          ).toBeFalsy();
          expect(
            mediaService.getMediaForPictureElement(
              { cont: { format: 'xyz' } },
              'xyz'
            )?.src
          ).toBeFalsy();
        });
      });

      describe('alt text', () => {
        it('should return alt text for media', () => {
          expect(mediaService.getMedia(mockMedia)?.alt).toBe(
            'alt text for media'
          );
          expect(mediaService.getMediaForPictureElement(mockMedia)?.alt).toBe(
            'alt text for media'
          );
        });

        it('should return alt text for best media', () => {
          expect(mediaService.getMedia(mockBestFormatMediaContainer)?.alt).toBe(
            'alt text for format-600'
          );
          expect(
            mediaService.getMediaForPictureElement(mockBestFormatMediaContainer)
              ?.alt
          ).toBe('alt text for format-600');
        });

        it('should return alt text for specific format', () => {
          expect(
            mediaService.getMedia(mockBestFormatMediaContainer, 'format400')
              ?.alt
          ).toBe('alt text for format-400');
          expect(
            mediaService.getMediaForPictureElement(
              mockBestFormatMediaContainer,
              'format400'
            )?.alt
          ).toBe('alt text for format-400');
        });

        it('should return alt text for best format', () => {
          expect(
            mediaService.getMedia(mockBestFormatMediaContainer, 'unknown')?.alt
          ).toBe('alt text for format-600');
          expect(
            mediaService.getMediaForPictureElement(
              mockBestFormatMediaContainer,
              'unknown'
            )?.alt
          ).toBe('alt text for format-600');
        });

        it('should return alt text for random format', () => {
          expect(
            mediaService.getMedia(mockUnknownMediaContainer, 'unknown')?.alt
          ).toBe('alt text for unknown-1');
          expect(
            mediaService.getMediaForPictureElement(
              mockUnknownMediaContainer,
              'unknown'
            )?.alt
          ).toBe('alt text for unknown-1');
        });

        it('should return given alt text', () => {
          expect(
            mediaService.getMedia(
              mockBestFormatMediaContainer,
              'format400',
              'custom alt'
            )?.alt
          ).toEqual('custom alt');
          expect(
            mediaService.getMediaForPictureElement(
              mockBestFormatMediaContainer,
              'format400',
              'custom alt'
            )?.alt
          ).toEqual('custom alt');
        });
      });

      describe('role', () => {
        it('should return role for media', () => {
          expect(mediaService.getMedia(mockMedia)?.role).toBe('presentation');
          expect(mediaService.getMediaForPictureElement(mockMedia)?.role).toBe(
            'presentation'
          );
        });

        it('should return role for best media', () => {
          expect(
            mediaService.getMedia(mockBestFormatMediaContainer)?.role
          ).toBe('presentation');
          expect(
            mediaService.getMediaForPictureElement(mockBestFormatMediaContainer)
              ?.role
          ).toBe('presentation');
        });

        it('should return role for specific format', () => {
          expect(
            mediaService.getMedia(mockBestFormatMediaContainer, 'format400')
              ?.role
          ).toBe('presentation');
          expect(
            mediaService.getMediaForPictureElement(
              mockBestFormatMediaContainer,
              'format400'
            )?.role
          ).toBe('presentation');
        });

        it('should return role for best format', () => {
          expect(
            mediaService.getMedia(mockBestFormatMediaContainer, 'unknown')?.role
          ).toBe('presentation');
          expect(
            mediaService.getMediaForPictureElement(
              mockBestFormatMediaContainer,
              'unknown'
            )?.role
          ).toBe('presentation');
        });

        it('should return role for random format', () => {
          expect(
            mediaService.getMedia(mockUnknownMediaContainer, 'unknown')?.role
          ).toBe('presentation');
          expect(
            mediaService.getMediaForPictureElement(
              mockUnknownMediaContainer,
              'unknown'
            )?.role
          ).toBe('presentation');
        });

        it('should return given role', () => {
          expect(
            mediaService.getMedia(
              mockBestFormatMediaContainer,
              'format400',
              'custom alt',
              'custom role'
            )?.role
          ).toEqual('custom role');
          expect(
            mediaService.getMediaForPictureElement(
              mockBestFormatMediaContainer,
              'format400',
              'custom alt',
              'custom role'
            )?.role
          ).toEqual('custom role');
        });
      });

      describe('srcset', () => {
        it('should return undefined if not media', () => {
          const result = mediaService['resolveSrcSet'](
            null as unknown as MediaContainer
          );

          expect(result).toBeUndefined();
        });

        it('should return all images in srcset', () => {
          expect(
            mediaService.getMedia(mockBestFormatMediaContainer)?.srcset
          ).toBe(
            'base:format-1.url 1w, base:format-400.url 400w, base:format-600.url 600w'
          );
        });

        it('should return only relevant images in srcset for the given format', () => {
          expect(
            mediaService.getMedia(mockBestFormatMediaContainer, 'format400')
              ?.srcset
          ).toBe('base:format-1.url 1w, base:format-400.url 400w');
        });

        it('should return all formats for unknown format', () => {
          expect(
            mediaService.getMedia(mockBestFormatMediaContainer, 'unknown')
              ?.srcset
          ).toBe(
            'base:format-1.url 1w, base:format-400.url 400w, base:format-600.url 600w'
          );
        });

        it('should not return srcset for media without any formats', () => {
          expect(mediaService.getMedia(mockMedia)?.srcset).toBeFalsy();
        });
      });
    });

    describe('sources', () => {
      it('should return undefined if not media', () => {
        const result = mediaService['resolveSources'](
          null as unknown as MediaContainer
        );

        expect(result).toBeUndefined();
      });

      it('should return all images in sources', () => {
        const expectedResult = [
          {
            srcset: 'base:format-1.url',
            media: '(min-width: 1440px)',
            width: undefined,
            height: undefined,
          },
          {
            srcset: 'base:format-400.url',
            media: '(max-width: 786px) and (-webkit-min-device-pixel-ratio: 3)',
            width: undefined,
            height: undefined,
          },
          {
            srcset: 'base:format-600.url',
            media: '(min-width: 1025px) and (max-width: 1439px)',
            width: undefined,
            height: undefined,
          },
        ];

        const result = mediaService.getMediaForPictureElement(
          mockBestFormatMediaContainer
        )?.sources;

        expect(result).toEqual(expectedResult);
      });

      it('should return only relevant images in sources for the given max format', () => {
        expect(
          mediaService.getMediaForPictureElement(
            mockBestFormatMediaContainer,
            'format400'
          )?.sources
        ).toEqual([
          {
            srcset: 'base:format-1.url',
            media: '(min-width: 1440px)',
            width: undefined,
            height: undefined,
          },
          {
            srcset: 'base:format-400.url',
            media: '(max-width: 786px) and (-webkit-min-device-pixel-ratio: 3)',
            width: undefined,
            height: undefined,
          },
        ]);
      });

      it('should return all formats for unknown format', () => {
        const expectedResult = [
          {
            srcset: 'base:format-1.url',
            media: '(min-width: 1440px)',
            width: undefined,
            height: undefined,
          },
          {
            srcset: 'base:format-400.url',
            media: '(max-width: 786px) and (-webkit-min-device-pixel-ratio: 3)',
            width: undefined,
            height: undefined,
          },
          {
            srcset: 'base:format-600.url',
            media: '(min-width: 1025px) and (max-width: 1439px)',
            width: undefined,
            height: undefined,
          },
        ];

        expect(
          mediaService.getMediaForPictureElement(
            mockBestFormatMediaContainer,
            'unknown'
          )?.sources
        ).toEqual(expectedResult);
      });

      it('should return empty array for media without any formats', () => {
        expect(
          mediaService.getMediaForPictureElement(mockMedia)?.sources?.length
        ).toBe(0);
      });
    });

    describe('absolute URL', () => {
      it('should avoid baseUrl if absolute image is provided', () => {
        expect(mediaService.getMedia(mockUrlContainer, 'absolute')?.src).toBe(
          'http://absolute.jpg'
        );
        expect(
          mediaService.getMediaForPictureElement(mockUrlContainer, 'absolute')
            ?.src
        ).toBe('http://absolute.jpg');
      });

      it('should threat image url start with double slash as absolute URL', () => {
        expect(
          mediaService.getMedia(mockUrlContainer, 'doubleSlash')?.src
        ).toBe('//absolute.jpg');
        expect(
          mediaService.getMediaForPictureElement(
            mockUrlContainer,
            'doubleSlash'
          )?.src
        ).toBe('//absolute.jpg');
      });

      it('should add OCC baseUrl for relative image', () => {
        expect(mediaService.getMedia(mockUrlContainer, 'relative')?.src).toBe(
          'base:relative.jpg'
        );
        expect(
          mediaService.getMediaForPictureElement(mockUrlContainer, 'relative')
            ?.src
        ).toBe('base:relative.jpg');
      });
    });

    describe('loadingStrategy', () => {
      it('should resolve eager loading strategy', () => {
        expect(mediaService.loadingStrategy).toEqual(
          ImageLoadingStrategy.EAGER
        );
      });
    });
  });

  describe('with lazy loaded config', () => {
    let mediaService: MediaService;

    beforeEach(() => {
      configureTestingModule({
        ...MockStorefrontConfig,
        mediaLoadingStrategy: ImageLoadingStrategy.LAZY,
      } as any);
      mediaService = TestBed.inject(MediaService);
    });
    describe('loadingStrategy', () => {
      it('should resolve lazy loading strategy', () => {
        expect(mediaService.loadingStrategy).toEqual(
          ImageLoadingStrategy.EAGER
        );
      });
    });
  });

  describe('sources order', () => {
    it('should be sorted based on provided config', () => {
      const config = {
        ...MockStorefrontConfig,
        pictureFormatsOrder: ['format600', 'format1', 'format400'],
      };
      configureTestingModule(config);
      const mediaService = TestBed.inject(MediaService);

      const result = mediaService.getMediaForPictureElement(
        mockBestFormatMediaContainer
      )?.sources;

      if (result && result[0]?.srcset) {
        expect(result[0].srcset).toBe('base:format-600.url');
        expect(result[1].srcset).toBe('base:format-1.url');
        expect(result[2].srcset).toBe('base:format-400.url');
      } else {
        fail('Sources is undefined');
      }
    });

    it('should be sorted in natural order if the order was not provided in config', () => {
      const config = {
        ...MockStorefrontConfig,
        pictureFormatsOrder: [],
      };
      configureTestingModule(config);
      const mediaService = TestBed.inject(MediaService);

      const result = mediaService.getMediaForPictureElement(
        mockBestFormatMediaContainer
      )?.sources;

      if (result && result[0]?.srcset) {
        expect(result[0].srcset).toBe('base:format-400.url');
        expect(result[1].srcset).toBe('base:format-600.url');
        expect(result[2].srcset).toBe('base:format-1.url');
      } else {
        fail('Sources is undefined');
      }
    });
  });

  describe('generateMediaQuery()', () => {
    it('should return an empty string if config is not defined', () => {
      configureTestingModule({});
      const service = TestBed.inject(MediaService);

      const queries: PictureElementQueries = {
        minWidth: 768,
      };
      expect(service['generateMediaQuery'](queries)).toBe('');
    });

    it('should return an empty string if queries are empty', () => {
      configureTestingModule({});
      const service = TestBed.inject(MediaService);

      const queries: PictureElementQueries = {};
      expect(service['generateMediaQuery'](queries)).toBe('');
    });

    it('should return correct media query for given queries', () => {
      configureTestingModule(MockStorefrontConfig);
      const service = TestBed.inject(MediaService);

      const queries: PictureElementQueries = {
        minWidth: 768,
        maxWidth: 1024,
      };
      expect(service['generateMediaQuery'](queries)).toBe(
        '(min-width: 768) and (max-width: 1024)'
      );
    });

    it('should ignore queries that are not in the query map', () => {
      configureTestingModule(MockStorefrontConfig);
      const service = TestBed.inject(MediaService);

      const queries: PictureElementQueries = {
        minWidth: 768,
        unknownQuery: 100,
      };
      expect(service['generateMediaQuery'](queries)).toBe('(min-width: 768)');
    });

    it('should ignore undefined query values', () => {
      configureTestingModule(MockStorefrontConfig);
      const service = TestBed.inject(MediaService);

      const queries: PictureElementQueries = {
        minWidth: 768,
        maxWidth: undefined as unknown as any,
      };
      expect(service['generateMediaQuery'](queries)).toBe('(min-width: 768)');
    });

    it('should return correct media query for mixed queries', () => {
      configureTestingModule(MockStorefrontConfig);
      const service = TestBed.inject(MediaService);

      const queries: PictureElementQueries = {
        minWidth: 768,
        maxWidth: 1024,
        orientation: 'landscape',
      };
      expect(service['generateMediaQuery'](queries)).toBe(
        '(min-width: 768) and (max-width: 1024) and (orientation: landscape)'
      );
    });
  });

  describe('width and height attributes for picture sources', () => {
    it('should return all images with proper width and height properties based on values from config', () => {
      const config = {
        ...MockStorefrontConfig,
        pictureElementFormats: {
          format400: {
            mediaQueries: {
              maxWidth: '786px',
              minDevicePixelRatio: 3,
            },
            width: 200,
            height: 300,
          },
          format200: {
            mediaQueries: {
              minWidth: '768px',
              maxWidth: '1024px',
            },
            width: 700,
            height: 1000,
          },
          format600: {
            mediaQueries: {
              minWidth: '1025px',
              maxWidth: '1439px',
            },
            width: 1000,
            height: 800,
          },
          format1: {
            mediaQueries: {
              minWidth: '1440px',
            },
            width: 1440,
            height: 1000,
          },
        },
      };
      configureTestingModule(config);
      const service = TestBed.inject(MediaService);

      const expectedResult = [
        {
          srcset: 'base:format-1.url',
          media: '(min-width: 1440px)',
          width: 1440,
          height: 1000,
        },
        {
          srcset: 'base:format-400.url',
          media: '(max-width: 786px) and (-webkit-min-device-pixel-ratio: 3)',
          width: 200,
          height: 300,
        },
        {
          srcset: 'base:format-600.url',
          media: '(min-width: 1025px) and (max-width: 1439px)',
          width: 1000,
          height: 800,
        },
      ];

      const result = service.getMediaForPictureElement(
        mockBestFormatMediaContainer
      )?.sources;

      expect(result).toEqual(expectedResult);
    });
  });

  describe('without media config', () => {
    let mediaService: MediaService;

    beforeEach(() => {
      configureTestingModule({});
      mediaService = TestBed.inject(MediaService);
    });

    it('should return first available media', () => {
      expect(mediaService.getMedia(mockBestFormatMediaContainer)?.src).toBe(
        'format-1.url'
      );
      expect(
        mediaService.getMediaForPictureElement(mockBestFormatMediaContainer)
          ?.src
      ).toBe('format-1.url');
    });

    it('should return first available media for unknown format', () => {
      expect(
        mediaService.getMedia(mockBestFormatMediaContainer, 'unknown')?.src
      ).toBe('format-1.url');
      expect(
        mediaService.getMediaForPictureElement(
          mockBestFormatMediaContainer,
          'unknown'
        )?.src
      ).toBe('format-1.url');
    });

    it('should not return srcset for unknown format', () => {
      expect(
        mediaService.getMedia(mockBestFormatMediaContainer, 'unknown')?.srcset
      ).toBeFalsy();
      expect(
        mediaService.getMediaForPictureElement(
          mockBestFormatMediaContainer,
          'unknown'
        )?.srcset
      ).toBeFalsy();
    });

    it('should return specific media for given format', () => {
      expect(
        mediaService.getMedia(mockBestFormatMediaContainer, 'format600')?.src
      ).toBe('format-600.url');
      expect(
        mediaService.getMediaForPictureElement(
          mockBestFormatMediaContainer,
          'format600'
        )?.src
      ).toBe('format-600.url');
    });

    it('should not return srcset for given format', () => {
      expect(
        mediaService.getMedia(mockBestFormatMediaContainer, 'format600')?.srcset
      ).toBeFalsy();
      expect(
        mediaService.getMediaForPictureElement(
          mockBestFormatMediaContainer,
          'format600'
        )?.srcset
      ).toBeFalsy();
    });
  });
});

function configureTestingModule(config: Config): void {
  TestBed.configureTestingModule({
    providers: [
      MediaService,
      {
        provide: Config,
        useValue: config,
      },
      { provide: LayoutConfig, useValue: {} },
    ],
  });
}
