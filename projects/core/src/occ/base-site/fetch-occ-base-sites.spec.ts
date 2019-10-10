import {
  fetchOccBaseSites,
  fetchOccBaseSitesSSR,
} from './fetch-occ-base-sites';
import { JsonFetchUtils } from './json-fetch-utils';

fdescribe(`fetchOccBaseSites`, () => {
  beforeEach(() => {
    spyOn(JsonFetchUtils, 'getXhr').and.returnValue(
      Promise.resolve({ baseSites: [] })
    );
  });
  it(`should call GET xhr with given URL parts`, async () => {
    const result = await fetchOccBaseSites({
      baseUrl: 'https://base.com',
      prefix: '/prefix',
      endpoint: '/endpoint',
    });
    expect(result).toEqual({ baseSites: [] });
    expect(JsonFetchUtils.getXhr).toHaveBeenCalledWith(
      'https://base.com/prefix/endpoint'
    );
  });

  it(`should call GET xhr with default URL parts`, async () => {
    await fetchOccBaseSites({
      baseUrl: 'https://base.com',
    });
    expect(JsonFetchUtils.getXhr).toHaveBeenCalledWith(
      'https://base.com/rest/v2/basesites?fields=baseSites(uid,defaultLanguage(isocode),urlEncodingAttributes,urlPatterns,stores(currencies,defaultCurrency,languages,defaultLanguage))'
    );
  });

  it(`should reject promise when given no baseUrl`, async () => {
    spyOn(console, 'error');
    let rejected;
    await fetchOccBaseSites({}).catch(() => (rejected = true));
    expect(rejected).toBe(true);
  });
});

fdescribe(`fetchOccBaseSitesSSR`, () => {
  beforeEach(() => {
    spyOn(JsonFetchUtils, 'getNodeHttps').and.returnValue(
      Promise.resolve({ baseSites: [] })
    );
  });
  it(`should call GET Node https client with given URL parts`, async () => {
    const result = await fetchOccBaseSitesSSR(
      {
        baseUrl: 'https://base.com',
        prefix: '/prefix',
        endpoint: '/endpoint',
      },
      null
    );
    expect(result).toEqual({ baseSites: [] });
    expect(JsonFetchUtils.getNodeHttps).toHaveBeenCalledWith(
      'https://base.com/prefix/endpoint',
      null
    );
  });

  it(`should call GET xhr with default URL parts`, async () => {
    await fetchOccBaseSitesSSR(
      {
        baseUrl: 'https://base.com',
      },
      null
    );
    expect(JsonFetchUtils.getNodeHttps).toHaveBeenCalledWith(
      'https://base.com/rest/v2/basesites?fields=baseSites(uid,defaultLanguage(isocode),urlEncodingAttributes,urlPatterns,stores(currencies,defaultCurrency,languages,defaultLanguage))',
      null
    );
  });

  it(`should reject promise when given no baseUrl`, async () => {
    spyOn(console, 'error');
    let rejected;
    await fetchOccBaseSitesSSR({}, null).catch(() => (rejected = true));
    expect(rejected).toBe(true);
  });
});
