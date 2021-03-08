import { TestBed } from '@angular/core/testing';
import { BaseSite, BaseStore } from '../../../model/misc.model';
import { JavaRegExpConverter } from '../../adapters/site-context/converters/java-reg-exp-converter';
import { OccLoadedConfigConverter } from './occ-loaded-config-converter';

describe(`OccLoadedConfigConverter`, () => {
  let converter: OccLoadedConfigConverter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: JavaRegExpConverter,
          useValue: {
            toJsRegExp: jasmine.createSpy().and.callFake((x) => new RegExp(x)),
          },
        },
      ],
    });
    converter = TestBed.inject(OccLoadedConfigConverter);
  });

  describe(`should convert from BaseSite to OccLoadedConfig`, () => {
    let mockBaseSite: BaseSite;
    let mockBaseStore: BaseStore;

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
        baseStore: mockBaseStore,
        urlEncodingAttributes: [],
      };
    });

    it(`should throw error when base site doesn't have at least one store`, () => {
      const baseSite: BaseSite = {
        uid: 'test',
        urlPatterns: ['testUrl'],
        baseStore: undefined,
      };
      expect(() => converter.convert(baseSite)).toThrowError();
    });

    it(`should convert attributes of the base site`, () => {
      const baseSite: BaseSite = {
        uid: 'test',
        urlPatterns: ['testUrl'],
        baseStore: {
          languages: [{ isocode: 'de' }, { isocode: 'en' }],
          defaultLanguage: { isocode: 'en' },
          currencies: [{ isocode: 'EUR' }, { isocode: 'USD' }],
          defaultCurrency: { isocode: 'EUR' },
        },
        urlEncodingAttributes: ['language', 'currency'],
        theme: 'test-theme',
      };
      const res = converter.convert(baseSite);
      expect(res).toEqual({
        baseSite: 'test',
        languages: ['en', 'de'],
        currencies: ['EUR', 'USD'],
        urlParameters: ['language', 'currency'],
        theme: 'test-theme',
      });
    });

    it(`should convert the base site config using the default language of base site over the default language of base store`, () => {
      const baseSite: BaseSite = {
        ...mockBaseSite,
        defaultLanguage: { isocode: 'pl' },
        baseStore: {
          ...mockBaseStore,
          languages: [{ isocode: 'en' }, { isocode: 'pl' }],
          defaultLanguage: { isocode: 'en' },
        },
      };
      const res = converter.convert(baseSite);
      expect(res.languages).toEqual(['pl', 'en']);
    });

    it(`should convert languages and put the default language as the first one`, () => {
      const baseSite: BaseSite = {
        ...mockBaseSite,
        baseStore: {
          ...mockBaseStore,
          languages: [{ isocode: 'en' }, { isocode: 'pl' }, { isocode: 'de' }],
          defaultLanguage: { isocode: 'pl' },
        },
      };
      const res = converter.convert(baseSite);
      expect(res.languages?.[0]).toEqual('pl');
    });

    it(`should convert currencies and put the default currency as the first one`, () => {
      const baseSite: BaseSite = {
        ...mockBaseSite,
        baseStore: {
          ...mockBaseStore,
          currencies: [
            { isocode: 'USD' },
            { isocode: 'PLN' },
            { isocode: 'EUR' },
          ],
          defaultCurrency: { isocode: 'PLN' },
        },
      };
      const res = converter.convert(baseSite);
      expect(res.currencies?.[0]).toEqual('PLN');
    });

    it(`should convert url encoding attributes and map "storefront" to "baseSite"`, () => {
      const baseSite: BaseSite = {
        ...mockBaseSite,
        urlEncodingAttributes: ['storefront', 'language', 'currency'],
      };
      const res = converter.convert(baseSite);
      expect(res.urlParameters).toEqual(['baseSite', 'language', 'currency']);
    });
  });
});
