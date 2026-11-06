import { inject, TestBed } from '@angular/core/testing';
import { BaseSite, BaseStore } from '../../../../model/misc.model';
import { Occ } from '../../../occ-models/occ.models';
import { BaseSiteNormalizer } from './base-site-normalizer';

describe('BaseSiteNormalizer', () => {
  let service: BaseSiteNormalizer;

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
    urlPatterns: ['testUrl1'],
    baseStore: store,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseSiteNormalizer],
    });

    service = TestBed.inject(BaseSiteNormalizer);
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
  });
});
