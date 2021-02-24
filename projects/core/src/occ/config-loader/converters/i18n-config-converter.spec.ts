import { inject, TestBed } from '@angular/core/testing';
import { I18nConfig } from 'projects/core/src/i18n/config/i18n-config';
import { OccLoadedConfig } from '../occ-loaded-config';
import { I18nConfigConverter } from './i18n-config-converter';

describe('I18nConfigConverter', () => {
  let converter: I18nConfigConverter;

  const occLoadedConfig: OccLoadedConfig = {
    baseSite: 'test-site',
    languages: ['en', 'ja', 'de', 'zh'],
  };

  const i18nConfig: I18nConfig = {
    i18n: { fallbackLang: 'en' },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [I18nConfigConverter],
    });

    converter = TestBed.inject(I18nConfigConverter);
  });

  it('should inject I18nConfigConverter', inject(
    [I18nConfigConverter],
    (i18nConfigConverter: I18nConfigConverter) => {
      expect(i18nConfigConverter).toBeTruthy();
    }
  ));

  it('should convert i18n config', () => {
    const result = converter.convert(occLoadedConfig);
    expect(result).toEqual(i18nConfig);
  });
});
