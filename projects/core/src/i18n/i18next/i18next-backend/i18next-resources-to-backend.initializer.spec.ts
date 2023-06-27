import { TestBed } from '@angular/core/testing';
import type { i18n } from 'i18next';
import { I18nConfig } from '../../config/i18n-config';
import { TranslationResources } from '../../translation-resources';
import { I18NEXT_INSTANCE } from '../i18next-instance';
import { I18nextResourcesToBackendInitializer } from './i18next-resources-to-backend.initializer';

describe('I18nextResourcesToBackendInitializer', () => {
  let i18nextBackendInitializer: I18nextResourcesToBackendInitializer;
  let i18next: i18n; // i18next instance
  let config: I18nConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: I18nConfig, useValue: { i18n: {} } }],
    });

    i18nextBackendInitializer = TestBed.inject(
      I18nextResourcesToBackendInitializer
    );
    i18next = TestBed.inject(I18NEXT_INSTANCE);
    config = TestBed.inject(I18nConfig);
  });

  describe('initialize', () => {
    describe('when config i18n.backend.loader is set', () => {
      it('should use the given loader function to load translation resources', async () => {
        const resources: TranslationResources = {
          en: { common: { testKey: 'testValue' } },
        };

        // CAUTION: the mocked loader function must have 2 params, otherwise the Promise's result will not be picked up
        // see https://github.com/i18next/i18next-resources-to-backend/blob/d9a04c50c26837e8168c0e067390f94b112a1fb3/src/index.js#L6
        const loader = (lang: string, ns: string) =>
          Promise.resolve(resources[lang][ns]);

        config.i18n = { backend: { loader } };

        i18nextBackendInitializer.initialize();
        await i18next.init({
          ns: ['common'],
          fallbackLng: 'en',
        });
        expect(i18next.t('common:testKey')).toEqual('testValue');
      });
    });

    describe('when config i18n.backend.loader is not set', () => {
      it('should throw an error', () => {
        config.i18n = { backend: {} };
        spyOn(i18next, 'init');

        expect(() => i18nextBackendInitializer.initialize()).toThrowError(
          'Missing config `i18n.backend.loader`.'
        );
      });
    });
  });

  describe('hasMatch', () => {
    it('should return true when the config `i18n.backend.loader` is set`', () => {
      config.i18n = {
        backend: {
          loader: () =>
            Promise.resolve({ en: { common: { testKey: 'testValue' } } }),
        },
      };

      expect(i18nextBackendInitializer.hasMatch()).toBe(true);
    });

    it('should return false when the config `i18n.backend.loader` is NOT set`', () => {
      config.i18n = { backend: {} };

      expect(i18nextBackendInitializer.hasMatch()).toBe(false);
    });
  });
});
