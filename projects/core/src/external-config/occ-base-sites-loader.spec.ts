import { LoadJsonUtils } from '../util/load-json-utils';
import { OccBaseSitesLoader } from './occ-base-sites-loader';

describe(`OccBaseSitesLoader`, () => {
  describe(`load`, () => {
    beforeEach(() => {
      spyOn(LoadJsonUtils, 'loadXhr').and.returnValue(
        Promise.resolve({ baseSites: [] })
      );
    });

    it(`should call GET xhr with given URL parts`, async () => {
      const result = await OccBaseSitesLoader.load({
        baseUrl: 'https://base.com',
        prefix: '/prefix',
        endpoint: '/endpoint',
      });
      expect(result).toEqual({ baseSites: [] });
      expect(LoadJsonUtils.loadXhr).toHaveBeenCalledWith(
        'https://base.com/prefix/endpoint'
      );
    });

    it(`should call GET xhr with default URL parts`, async () => {
      await OccBaseSitesLoader.load({
        baseUrl: 'https://base.com',
      });
      expect(LoadJsonUtils.loadXhr).toHaveBeenCalledWith(
        'https://base.com/rest/v2/basesites?fields=baseSites(uid,defaultLanguage(isocode),urlEncodingAttributes,urlPatterns,stores(currencies,defaultCurrency,languages,defaultLanguage))'
      );
    });

    it(`should reject promise when given no baseUrl`, async () => {
      spyOn(console, 'error');
      let rejected;
      await OccBaseSitesLoader.load({}).catch(() => (rejected = true));
      expect(rejected).toBe(true);
    });
  });

  describe(`loadSSR`, () => {
    beforeEach(() => {
      spyOn(LoadJsonUtils, 'loadNodeHttps').and.returnValue(
        Promise.resolve({ baseSites: [] })
      );
    });

    it(`should call GET Node https client with given URL parts`, async () => {
      const result = await OccBaseSitesLoader.loadSSR(
        {
          baseUrl: 'https://base.com',
          prefix: '/prefix',
          endpoint: '/endpoint',
        },
        null
      );
      expect(result).toEqual({ baseSites: [] });
      expect(LoadJsonUtils.loadNodeHttps).toHaveBeenCalledWith(
        'https://base.com/prefix/endpoint',
        null
      );
    });

    it(`should call GET xhr with default URL parts`, async () => {
      await OccBaseSitesLoader.loadSSR(
        {
          baseUrl: 'https://base.com',
        },
        null
      );
      expect(LoadJsonUtils.loadNodeHttps).toHaveBeenCalledWith(
        'https://base.com/rest/v2/basesites?fields=baseSites(uid,defaultLanguage(isocode),urlEncodingAttributes,urlPatterns,stores(currencies,defaultCurrency,languages,defaultLanguage))',
        null
      );
    });

    it(`should reject promise when given no baseUrl`, async () => {
      spyOn(console, 'error');
      let rejected;
      await OccBaseSitesLoader.loadSSR({}, null).catch(() => (rejected = true));
      expect(rejected).toBe(true);
    });
  });
});
