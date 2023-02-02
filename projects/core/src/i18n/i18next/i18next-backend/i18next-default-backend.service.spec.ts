import { TestBed } from '@angular/core/testing';
import type { i18n } from 'i18next';
import * as i18nextResourcesToBackend from 'i18next-resources-to-backend';
import { I18nConfig } from '../../config/i18n-config';
import { I18nextDefaultBackendService } from './i18next-default-backend.service';

describe('I18nextDefaultBackendService', () => {
  let service: I18nextDefaultBackendService;
  let config: I18nConfig;
  let i18next: i18n;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: I18nConfig,
          useValue: {
            i18n: {
              backend: {
                loader: () => Promise.resolve({}),
              },
            },
          } as I18nConfig,
        },
        {},
      ],
    });

    service = TestBed.inject(I18nextDefaultBackendService);
    config = TestBed.inject(I18nConfig);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initialize', () => {
    it('should throw an error if the config `i18n.backend.loader` is not a function', () => {
      config.i18n = {
        backend: {
          loader: undefined,
        },
      };

      expect(() => service.initialize()).toThrowError(
        'The config `i18n.backend.loader` is not a function!'
      );
    });

    it('should use the i18next backend with the provided `loader` function', () => {
      spyOn(i18next, 'use').and.callThrough();
      spyOn(i18nextResourcesToBackend, 'default').and.returnValue('test');

      const result = service.initialize();

      expect(i18next.use).toHaveBeenCalledWith('test');
      expect(i18nextResourcesToBackend.default).toHaveBeenCalledWith(
        config.i18n?.backend?.loader
      );
      expect(result).toEqual({ backend: {} });
    });
  });
});
