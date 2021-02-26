import { inject, TestBed } from '@angular/core/testing';
import { SiteContextConfig } from 'projects/core/src/site-context/config/site-context-config';
import { OccLoadedConfig } from '../occ-loaded-config';
import { SiteContextConfigConverter } from './site-context-config-converter';

describe('SiteContextConfigConverter', () => {
  let converter: SiteContextConfigConverter;

  const occLoadedConfig: OccLoadedConfig = {
    baseSite: 'test-site',
    languages: ['en', 'ja', 'de', 'zh'],
    currencies: ['USD', 'JPY'],
    theme: 'sparta',
    urlParameters: ['baseSite', 'language', 'currency'],
  };

  const siteContextConfig: SiteContextConfig = {
    context: {
      urlParameters: ['baseSite', 'language', 'currency'],
      ['baseSite']: ['test-site'],
      ['language']: ['en', 'ja', 'de', 'zh'],
      ['currency']: ['USD', 'JPY'],
      ['theme']: ['sparta'],
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SiteContextConfigConverter],
    });

    converter = TestBed.inject(SiteContextConfigConverter);
  });

  it('should inject SiteContextConfigConverter', inject(
    [SiteContextConfigConverter],
    (siteContextConfigConverter: SiteContextConfigConverter) => {
      expect(siteContextConfigConverter).toBeTruthy();
    }
  ));

  it('should convert site context config', () => {
    const result = converter.convert(occLoadedConfig);
    expect(result).toEqual(siteContextConfig);
  });
});
