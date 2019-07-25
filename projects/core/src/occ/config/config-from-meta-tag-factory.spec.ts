import { Meta } from '@angular/platform-browser';
import {
  mediaServerConfigFromMetaTagFactory,
  occServerConfigFromMetaTagFactory,
} from './config-from-meta-tag-factory';

describe('config from MetaTag Factory', () => {
  let mockMeta: Meta;

  beforeEach(() => {
    mockMeta = {} as Meta;
  });

  describe('OCC config from meta tag', () => {
    it('should get content of tag "occ-backend-base-url"', () => {
      mockMeta.getTag = jasmine.createSpy();
      occServerConfigFromMetaTagFactory(mockMeta as Meta);
      expect(mockMeta.getTag).toHaveBeenCalledWith(
        'name="occ-backend-base-url"'
      );
    });

    it('should return server config with baseUrl from meta tag', () => {
      mockMeta.getTag = () => ({ content: 'testBaseUrl' } as HTMLMetaElement);
      expect(occServerConfigFromMetaTagFactory(mockMeta as Meta)).toEqual({
        backend: { occ: { baseUrl: 'testBaseUrl' } },
      });
    });

    it('should return empty object when meta tag contains empty string', () => {
      mockMeta.getTag = () => ({ content: '' } as HTMLMetaElement);
      expect(occServerConfigFromMetaTagFactory(mockMeta as Meta)).toEqual({});
    });

    it('should return empty object when meta tag contains placeholder "OCC_BACKEND_BASE_URL_VALUE"', () => {
      mockMeta.getTag = () =>
        ({ content: 'OCC_BACKEND_BASE_URL_VALUE' } as HTMLMetaElement);
      expect(occServerConfigFromMetaTagFactory(mockMeta as Meta)).toEqual({});
    });

    it('should return empty object when there is no meta tag', () => {
      mockMeta.getTag = () => null;
      expect(occServerConfigFromMetaTagFactory(mockMeta as Meta)).toEqual({});
    });
  });

  describe('Media config from meta tag', () => {
    it('should get content of tag "media-backend-base-url"', () => {
      mockMeta.getTag = jasmine.createSpy();
      mediaServerConfigFromMetaTagFactory(mockMeta as Meta);
      expect(mockMeta.getTag).toHaveBeenCalledWith(
        'name="media-backend-base-url"'
      );
    });

    it('should return server config with baseUrl from meta tag', () => {
      mockMeta.getTag = () =>
        ({ content: 'testMediaBaseUrl' } as HTMLMetaElement);
      expect(mediaServerConfigFromMetaTagFactory(mockMeta as Meta)).toEqual({
        backend: { media: { baseUrl: 'testMediaBaseUrl' } },
      });
    });

    it('should return empty object when meta tag contains empty string', () => {
      mockMeta.getTag = () => ({ content: '' } as HTMLMetaElement);
      expect(mediaServerConfigFromMetaTagFactory(mockMeta as Meta)).toEqual({});
    });

    it('should return empty object when meta tag contains placeholder "MEDIA_BACKEND_BASE_URL_VALUE"', () => {
      mockMeta.getTag = () =>
        ({ content: 'MEDIA_BACKEND_BASE_URL_VALUE' } as HTMLMetaElement);
      expect(mediaServerConfigFromMetaTagFactory(mockMeta as Meta)).toEqual({});
    });

    it('should return empty object when there is no meta tag', () => {
      mockMeta.getTag = () => null;
      expect(mediaServerConfigFromMetaTagFactory(mockMeta as Meta)).toEqual({});
    });
  });
});
