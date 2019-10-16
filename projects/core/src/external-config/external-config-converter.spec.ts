import { Occ } from '../occ/occ-models';
import { JavaRegExpConverter } from './java-reg-exp-converter';
import { OccBaseSites2ExternalConfigConverter } from './occ-base-sites-2-external-config-converter';

describe(`OccBaseSites2ConfigConverter`, () => {
  describe(`convert`, () => {
    let mockBaseSite: Occ.BaseSite;

    beforeEach(() => {
      mockBaseSite = {
        uid: 'test',
        urlPatterns: ['testUrl'],
        stores: [
          {
            languages: [],
            currencies: [],
            defaultLanguage: {},
            defaultCurrency: {},
          },
        ],
        urlEncodingAttributes: [],
      };

      spyOn(JavaRegExpConverter, 'convert').and.callFake(x => new RegExp(x));
    });

    it(`should throw error when the base sites param is undefined`, () => {
      const baseSites: Occ.BaseSites = undefined;
      const currentUrl = 'testUrl';
      expect(() =>
        OccBaseSites2ExternalConfigConverter.convert(baseSites, currentUrl)
      ).toThrowError();
    });

    it(`should throw error when baseSites property param is undefined`, () => {
      const baseSites: Occ.BaseSites = { baseSites: undefined };
      const currentUrl = 'testUrl';
      expect(() =>
        OccBaseSites2ExternalConfigConverter.convert(baseSites, currentUrl)
      ).toThrowError();
    });

    it(`should throw error when baseSites property is an empty array`, () => {
      const baseSites: Occ.BaseSites = { baseSites: [] };
      const currentUrl = 'testUrl';
      expect(() =>
        OccBaseSites2ExternalConfigConverter.convert(baseSites, currentUrl)
      ).toThrowError();
    });

    it(`should throw error when no url pattern of any base site matches the current url`, () => {
      const baseSites: Occ.BaseSites = {
        baseSites: [
          { uid: 'test1', urlPatterns: ['testUrl1'], stores: [{}] },
          { uid: 'test2', urlPatterns: ['testUrl2'], stores: [{}] },
        ],
      };
      const currentUrl = 'testUrl';
      expect(() =>
        OccBaseSites2ExternalConfigConverter.convert(baseSites, currentUrl)
      ).toThrowError();
    });

    it(`should throw error when matched base site doesn't have at least one store`, () => {
      const baseSites: Occ.BaseSites = {
        baseSites: [{ uid: 'test', urlPatterns: ['testUrl'], stores: [] }],
      };
      const currentUrl = 'testUrl';
      expect(() =>
        OccBaseSites2ExternalConfigConverter.convert(baseSites, currentUrl)
      ).toThrowError();
    });

    it(`should convert the first base site config that matches one of its url patterns with the current url`, () => {
      const baseSites: Occ.BaseSites = {
        baseSites: [
          {
            ...mockBaseSite,
            uid: 'test1',
            urlPatterns: ['^testUrl1$', '^testUrl11$'],
          },
          {
            ...mockBaseSite,
            uid: 'test2',
            urlPatterns: ['^testUrl2$', '^testUrl22$'],
          },
          {
            ...mockBaseSite,
            uid: 'test3',
            urlPatterns: ['^testUrl2$'],
          },
        ],
      };
      const currentUrl = 'testUrl2';
      const res = OccBaseSites2ExternalConfigConverter.convert(
        baseSites,
        currentUrl
      );
      expect(JavaRegExpConverter.convert).toHaveBeenCalledTimes(3);
      expect(JavaRegExpConverter.convert).not.toHaveBeenCalledWith(
        '^testUrl22$'
      );
      expect(res.context.baseSite).toEqual(['test2']);
    });

    it(`should convert the base site config and map url param "storefront" to "baseSite"`, () => {
      const baseSites: Occ.BaseSites = {
        baseSites: [
          {
            ...mockBaseSite,
            urlEncodingAttributes: ['storefront', 'language', 'currency'],
          },
        ],
      };
      const currentUrl = 'testUrl';
      const res = OccBaseSites2ExternalConfigConverter.convert(
        baseSites,
        currentUrl
      );
      expect(res.context.urlParameters).toEqual([
        'baseSite',
        'language',
        'currency',
      ]);
    });

    it(`should convert the base site config using it's first base store`, () => {
      const baseSites: Occ.BaseSites = {
        baseSites: [
          {
            ...mockBaseSite,
            stores: [
              {
                languages: [{ isocode: 'en' }],
                currencies: [{ isocode: 'USD' }],
                defaultLanguage: { isocode: 'en' },
                defaultCurrency: { isocode: 'USD' },
              },
              {
                languages: [{ isocode: 'de' }],
                currencies: [{ isocode: 'EUR' }],
                defaultLanguage: { isocode: 'de' },
                defaultCurrency: { isocode: 'EUR' },
              },
            ],
          },
        ],
      };
      const currentUrl = 'testUrl';
      const res = OccBaseSites2ExternalConfigConverter.convert(
        baseSites,
        currentUrl
      );
      expect(res.context.language).toEqual(['en']);
      expect(res.context.currency).toEqual(['USD']);
    });

    it(`should convert the base site config and put the default language and currency as the first array elements`, () => {
      const baseSites: Occ.BaseSites = {
        baseSites: [
          {
            ...mockBaseSite,
            stores: [
              {
                languages: [
                  { isocode: 'de' },
                  { isocode: 'en' },
                  { isocode: 'pl' },
                ],
                currencies: [
                  { isocode: 'EUR' },
                  { isocode: 'USD' },
                  { isocode: 'PLN' },
                ],
                defaultLanguage: { isocode: 'en' },
                defaultCurrency: { isocode: 'USD' },
              },
            ],
          },
        ],
      };
      const currentUrl = 'testUrl';
      const res = OccBaseSites2ExternalConfigConverter.convert(
        baseSites,
        currentUrl
      );
      expect(res.context.language).toEqual(['en', 'de', 'pl']);
      expect(res.context.currency).toEqual(['USD', 'EUR', 'PLN']);
    });

    it(`should convert the base site config using the default language of base site over the default language of base store`, () => {
      const baseSites: Occ.BaseSites = {
        baseSites: [
          {
            ...mockBaseSite,
            defaultLanguage: { isocode: 'pl' },
            stores: [
              {
                languages: [
                  { isocode: 'de' },
                  { isocode: 'en' },
                  { isocode: 'pl' },
                ],
                currencies: [],
                defaultLanguage: { isocode: 'en' },
                defaultCurrency: {},
              },
            ],
          },
        ],
      };
      const currentUrl = 'testUrl';
      const res = OccBaseSites2ExternalConfigConverter.convert(
        baseSites,
        currentUrl
      );
      expect(res.context.language).toEqual(['pl', 'de', 'en']);
    });
  });
});
