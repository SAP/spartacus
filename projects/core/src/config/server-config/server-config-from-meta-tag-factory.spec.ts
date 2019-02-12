import { serverConfigFromMetaTagFactory } from './server-config-from-meta-tag-factory';
import { Meta } from '@angular/platform-browser';

describe('serverConfigMetaTagFactory', () => {
  let mockMeta: Meta;

  beforeEach(() => {
    mockMeta = {} as Meta;
  });

  it('should get content of tag "occ-backend-base-url"', () => {
    mockMeta.getTag = jasmine.createSpy();
    serverConfigFromMetaTagFactory(mockMeta as Meta);
    expect(mockMeta.getTag).toHaveBeenCalledWith('name="occ-backend-base-url"');
  });

  it('should return server config with baseUrl from meta tag', () => {
    mockMeta.getTag = () => ({ content: 'testBaseUrl' } as HTMLMetaElement);
    expect(serverConfigFromMetaTagFactory(mockMeta as Meta)).toEqual({
      server: { baseUrl: 'testBaseUrl' }
    });
  });

  it('should return empty object when meta tag contains empty string', () => {
    mockMeta.getTag = () => ({ content: '' } as HTMLMetaElement);
    expect(serverConfigFromMetaTagFactory(mockMeta as Meta)).toEqual({});
  });

  it('should return empty object when meta tag contains placeholder "OCC_BACKEND_BASE_URL_VALUE"', () => {
    mockMeta.getTag = () =>
      ({ content: 'OCC_BACKEND_BASE_URL_VALUE' } as HTMLMetaElement);
    expect(serverConfigFromMetaTagFactory(mockMeta as Meta)).toEqual({});
  });

  it('should return empty object when there is no meta tag', () => {
    mockMeta.getTag = () => null;
    expect(serverConfigFromMetaTagFactory(mockMeta as Meta)).toEqual({});
  });
});
