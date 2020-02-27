import { TestBed } from '@angular/core/testing';
import {
  BASE_SITE_CONTEXT_ID,
  CURRENCY_CONTEXT_ID,
  LANGUAGE_CONTEXT_ID,
} from '../../site-context';
import { Occ } from '../occ-models';
import { JavaRegExpConverter } from './java-reg-exp-converter';
import { OccLoadedConfig } from './occ-loaded-config';
import { OccLoadedConfigConverter } from './occ-loaded-config-converter';

describe(`OccLoadedConfigConverter`, () => {
  let converter: OccLoadedConfigConverter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: JavaRegExpConverter,
          useValue: {
            toJsRegExp: jasmine.createSpy().and.callFake(x => new RegExp(x)),
          },
        },
      ],
    });

    converter = TestBed.inject(OccLoadedConfigConverter);
  });

  describe(`fromOccBaseSites`, () => {
    let mockBaseSite: Occ.BaseSite;
    let mockBaseStore: Occ.BaseStore;
    let javaRegExpConverter: JavaRegExpConverter;

    beforeEach(() => {
      mockBaseStore = {
        languages: [],
        currencies: [],
        defaultLanguage: {},
        defaultCurrency: {},
      };

      mockBaseSite = {
        uid: 'test',
        urlPatterns: ['testUrl'],
        stores: [mockBaseStore],
        urlEncodingAttributes: [],
      };

      javaRegExpConverter = TestBed.inject(JavaRegExpConverter);
    });

    it(`should throw error when the base sites param is undefined`, () => {
      const baseSites: Occ.BaseSite[] = undefined;
      const currentUrl = 'testUrl';
      expect(() =>
        converter.fromOccBaseSites(baseSites, currentUrl)
      ).toThrowError();
    });

    it(`should throw error when baseSites property is an empty array`, () => {
      const baseSites: Occ.BaseSite[] = [];
      const currentUrl = 'testUrl';
      expect(() =>
        converter.fromOccBaseSites(baseSites, currentUrl)
      ).toThrowError();
    });

    it(`should throw error when no url pattern of any base site matches the current url`, () => {
      const baseSites: Occ.BaseSite[] = [
        { uid: 'test1', urlPatterns: ['testUrl1'], stores: [{}] },
        { uid: 'test2', urlPatterns: ['testUrl2'], stores: [{}] },
      ];
      const currentUrl = 'testUrl';
      expect(() =>
        converter.fromOccBaseSites(baseSites, currentUrl)
      ).toThrowError();
    });

    it(`should throw error when matched base site doesn't have at least one store`, () => {
      const baseSites: Occ.BaseSite[] = [
        { uid: 'test', urlPatterns: ['testUrl'], stores: [] },
      ];
      const currentUrl = 'testUrl';
      expect(() =>
        converter.fromOccBaseSites(baseSites, currentUrl)
      ).toThrowError();
    });

    it(`should convert the first base site config that matches one of its url patterns with the current url`, () => {
      const baseSites: Occ.BaseSite[] = [
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
      ];
      const currentUrl = 'testUrl2';
      const res = converter.fromOccBaseSites(baseSites, currentUrl);
      expect(javaRegExpConverter.toJsRegExp).toHaveBeenCalledTimes(3);
      expect(javaRegExpConverter.toJsRegExp).not.toHaveBeenCalledWith(
        '^testUrl22$'
      );
      expect(res.baseSite).toEqual('test2');
    });

    it(`should convert attributes of the matched base site`, () => {
      const baseSites: Occ.BaseSite[] = [
        {
          uid: 'test',
          urlPatterns: ['testUrl'],
          stores: [
            {
              languages: [{ isocode: 'de' }, { isocode: 'en' }],
              defaultLanguage: { isocode: 'en' },
              currencies: [{ isocode: 'EUR' }, { isocode: 'USD' }],
              defaultCurrency: { isocode: 'EUR' },
            },
          ],
          urlEncodingAttributes: ['language', 'currency'],
        },
      ];
      const currentUrl = 'testUrl';
      const res = converter.fromOccBaseSites(baseSites, currentUrl);
      expect(res).toEqual({
        baseSite: 'test',
        languages: ['en', 'de'],
        currencies: ['EUR', 'USD'],
        urlParameters: ['language', 'currency'],
      });
    });

    it(`should convert the base site config using it's first base store`, () => {
      const baseSites: Occ.BaseSite[] = [
        {
          ...mockBaseSite,
          stores: [
            {
              ...mockBaseStore,
              currencies: [{ isocode: 'USD' }],
              defaultCurrency: { isocode: 'USD' },
            },
            {
              ...mockBaseStore,
              currencies: [{ isocode: 'EUR' }],
              defaultCurrency: { isocode: 'EUR' },
            },
          ],
        },
      ];
      const currentUrl = 'testUrl';
      const res = converter.fromOccBaseSites(baseSites, currentUrl);
      expect(res.currencies).toEqual(['USD']);
    });

    it(`should convert the base site config using the default language of base site over the default language of base store`, () => {
      const baseSites: Occ.BaseSite[] = [
        {
          ...mockBaseSite,
          defaultLanguage: { isocode: 'pl' },
          stores: [
            {
              ...mockBaseStore,
              languages: [{ isocode: 'en' }, { isocode: 'pl' }],
              defaultLanguage: { isocode: 'en' },
            },
          ],
        },
      ];
      const currentUrl = 'testUrl';
      const res = converter.fromOccBaseSites(baseSites, currentUrl);
      expect(res.languages).toEqual(['pl', 'en']);
    });

    it(`should convert languages and put the default language as the first one`, () => {
      const baseSites: Occ.BaseSite[] = [
        {
          ...mockBaseSite,
          stores: [
            {
              ...mockBaseStore,
              languages: [
                { isocode: 'en' },
                { isocode: 'pl' },
                { isocode: 'de' },
              ],
              defaultLanguage: { isocode: 'pl' },
            },
          ],
        },
      ];
      const currentUrl = 'testUrl';
      const res = converter.fromOccBaseSites(baseSites, currentUrl);
      expect(res.languages[0]).toEqual('pl');
    });

    it(`should convert currencies and put the default language as the first one`, () => {
      const baseSites: Occ.BaseSite[] = [
        {
          ...mockBaseSite,
          stores: [
            {
              ...mockBaseStore,
              currencies: [
                { isocode: 'USD' },
                { isocode: 'PLN' },
                { isocode: 'EUR' },
              ],
              defaultCurrency: { isocode: 'PLN' },
            },
          ],
        },
      ];
      const currentUrl = 'testUrl';
      const res = converter.fromOccBaseSites(baseSites, currentUrl);
      expect(res.currencies[0]).toEqual('PLN');
    });

    it(`should convert url encoding attributes and map "storefront" to "baseSite"`, () => {
      const baseSites: Occ.BaseSite[] = [
        {
          ...mockBaseSite,
          urlEncodingAttributes: ['storefront', 'language', 'currency'],
        },
      ];
      const currentUrl = 'testUrl';
      const res = converter.fromOccBaseSites(baseSites, currentUrl);
      expect(res.urlParameters).toEqual(['baseSite', 'language', 'currency']);
    });
  });

  describe(`toSiteContextConfig`, () => {
    let mockExternalConfig: OccLoadedConfig;

    beforeEach(() => {
      mockExternalConfig = {
        baseSite: 'test',
        languages: ['de', 'en', 'pl'],
        currencies: ['EUR', 'USD', 'PLN'],
        urlParameters: ['baseSite', 'language', 'currency'],
      };
    });

    it(`should convert base site uid`, () => {
      const res = converter.toSiteContextConfig(mockExternalConfig);
      expect(res.context[BASE_SITE_CONTEXT_ID]).toEqual(['test']);
    });

    it(`should convert languages`, () => {
      const res = converter.toSiteContextConfig(mockExternalConfig);
      expect(res.context[LANGUAGE_CONTEXT_ID]).toEqual(['de', 'en', 'pl']);
    });

    it(`should convert currencies`, () => {
      const res = converter.toSiteContextConfig(mockExternalConfig);
      expect(res.context[CURRENCY_CONTEXT_ID]).toEqual(['EUR', 'USD', 'PLN']);
    });
  });

  describe(`to18nConfig`, () => {
    let mockExternalConfig: OccLoadedConfig;

    beforeEach(() => {
      mockExternalConfig = {
        languages: ['en', 'de', 'pl'],
      };
    });

    it(`should convert the fallback lang`, () => {
      const res = converter.toI18nConfig(mockExternalConfig);
      expect(res.i18n.fallbackLang).toEqual('en');
    });
  });
});
