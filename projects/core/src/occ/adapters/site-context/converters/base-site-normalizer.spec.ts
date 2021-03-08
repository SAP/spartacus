import { inject, TestBed } from '@angular/core/testing';
import { BaseSite, BaseStore } from '../../../../model/misc.model';
import { Occ } from '../../../occ-models/occ.models';
import { BaseSiteNormalizer } from './base-site-normalizer';
import { JavaRegExpConverter } from './java-reg-exp-converter';

describe('BaseSiteNormalizer', () => {
  let service: BaseSiteNormalizer;
  let javaRegExpConverter: JavaRegExpConverter;

  const store: BaseStore = {
    languages: [{ isocode: 'de' }, { isocode: 'en' }],
    defaultLanguage: { isocode: 'en' },
    currencies: [{ isocode: 'EUR' }, { isocode: 'USD' }],
    defaultCurrency: { isocode: 'EUR' },
  };

  const baseSite: Occ.BaseSite = {
    uid: 'test1',
    urlPatterns: ['testUrl1'],
    stores: [store],
  };

  const convertedBaseSite: BaseSite = {
    uid: 'test1',
    urlPatterns: [new RegExp('testUrl1')],
    stores: [store],
    baseStore: store,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseSiteNormalizer,
        {
          provide: JavaRegExpConverter,
          useValue: {
            toJsRegExp: jasmine.createSpy().and.callFake((x) => new RegExp(x)),
          },
        },
      ],
    });

    service = TestBed.inject(BaseSiteNormalizer);
    javaRegExpConverter = TestBed.inject(JavaRegExpConverter);
  });

  it('should inject BaseSiteNormalizer', inject(
    [BaseSiteNormalizer],
    (baseSiteNormalizer: BaseSiteNormalizer) => {
      expect(baseSiteNormalizer).toBeTruthy();
    }
  ));

  it('should convert base site', () => {
    const result = service.convert(baseSite);
    expect(result).toEqual(convertedBaseSite);
    expect(javaRegExpConverter.toJsRegExp).toHaveBeenCalledWith('testUrl1');
  });
});
