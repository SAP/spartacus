import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import type { i18n } from 'i18next';
import { WindowRef } from '../../window/window-ref';
import { I18nConfig } from '../config/i18n-config';
import { I18nextBackendInitializer } from './i18next-backend-initializer';
import { I18NEXT_INSTANCE } from './i18next-instance';

fdescribe('I18nextBackendInitializer', () => {
  /*

  // SPIKE TODO: possibly extract to separate Injectable class

    when config 'i18n.backend.loadPath' is set
      should use angular http client for loading translations from backend
      should use the loadPath for loading translations from backend

      forwards success response to i18next callback
      forwards failure response to i18next callback
    
      //SPIKE TODO: copy all unit tests of getLoadPath

      when using i18next http backend
        should set i18next config `backend.reloadInterval` to false


  // when i18n.backend.loadPath is provided
  //   should set reloadInterval to false
  //   should set the i18next http client
  //   should set the loadPath

  */

  let initializer: I18nextBackendInitializer;
  let i18next: i18n; // i18next instance
  let config: I18nConfig;
  let windowRef: WindowRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: I18nConfig, useValue: { i18n: {} } }],
      imports: [
        HttpClientTestingModule, // SPIKE TODO: remove, when extracting I18nextHttpClient
      ],
    });

    initializer = TestBed.inject(I18nextBackendInitializer);
    i18next = TestBed.inject(I18NEXT_INSTANCE);
    config = TestBed.inject(I18nConfig);
    windowRef = TestBed.inject(WindowRef);
  });

  describe('initialize', () => {
    it('should return "backend" options merged into original options', () => {
      throw new Error('not implemented');
    });

    it('should populate config backend.loadPath', () => {
      config.i18n = { backend: { loadPath: 'test/path' } };
      spyOn(i18next, 'init');

      const result = initializer.initialize({});

      expect(result).toEqual({
        backend: jasmine.objectContaining({
          loadPath: 'test/path',
        }),
      });
    });

    it('should set config backend.reloadInterval to false', () => {
      config.i18n = { backend: { loadPath: 'test/path' } };
      spyOn(i18next, 'init');

      const result = initializer.initialize({});

      expect(result).toEqual({
        backend: jasmine.objectContaining({
          reloadInterval: false,
        }),
      });
    });

    // SPIKE TODO LATER
    it('should set the i18next http client', () => {
      // ...
      throw new Error('not implemented');
    });

    describe('when config i18n.backend.loadPath is set', () => {
      describe('in non-server platform', () => {
        beforeEach(() => {
          spyOn(windowRef, 'isBrowser').and.returnValue(true);
        });

        describe('with relative path starting with "./"', () => {
          const path = './path';

          it('should return the original path', () => {
            config.i18n = { backend: { loadPath: path } };
            const result = initializer.initialize({});
            expect(result.backend?.loadPath).toBe(path);
          });
        });

        describe('with relative path starting with "/"', () => {
          const path = '/path';

          it('should return the original path', () => {
            config.i18n = { backend: { loadPath: path } };
            const result = initializer.initialize({});
            expect(result.backend?.loadPath).toBe(path);
          });
        });

        describe('with relative path starting with ""', () => {
          const path = 'path';

          it('should return the original path', () => {
            config.i18n = { backend: { loadPath: path } };
            const result = initializer.initialize({});
            expect(result.backend?.loadPath).toBe(path);
          });
        });

        describe('with absolute path starting with "http://"', () => {
          const path = 'http://path';

          it('should return the original path', () => {
            config.i18n = { backend: { loadPath: path } };
            const result = initializer.initialize({});
            expect(result.backend?.loadPath).toBe(path);
          });
        });

        describe('with absolute path starting with "https://"', () => {
          const path = 'https://path';

          it('should return the original path', () => {
            config.i18n = { backend: { loadPath: path } };
            const result = initializer.initialize({});
            expect(result.backend?.loadPath).toBe(path);
          });
        });
      });

      describe('in server platform', () => {
        const serverRequestOrigin = 'http://server.com';

        beforeEach(() => {
          spyOn(windowRef, 'isBrowser').and.returnValue(false);
          spyOnProperty(windowRef, 'location', 'get').and.returnValue({
            origin: serverRequestOrigin,
          });
        });

        describe('with relative path starting with "./"', () => {
          const path = './path';

          it('should return the original path prepended with server request origin', () => {
            config.i18n = { backend: { loadPath: path } };
            const result = initializer.initialize({});
            expect(result.backend?.loadPath).toBe('http://server.com/path');
          });
        });

        describe('with relative path starting with "/"', () => {
          const path = '/path';

          it('should return the original path prepended with server request origin', () => {
            config.i18n = { backend: { loadPath: path } };
            const result = initializer.initialize({});
            expect(result.backend?.loadPath).toBe('http://server.com/path');
          });
        });

        describe('with relative path starting with ""', () => {
          const path = 'path';

          it('should return the original path prepended with server request origin', () => {
            config.i18n = { backend: { loadPath: path } };
            const result = initializer.initialize({});
            expect(result.backend?.loadPath).toBe('http://server.com/path');
          });
        });

        describe('with absolute path starting with "http://"', () => {
          const path = 'http://path';

          it('should return the original path', () => {
            config.i18n = { backend: { loadPath: path } };
            const result = initializer.initialize({});
            expect(result.backend?.loadPath).toBe(path);
          });
        });

        describe('with absolute path starting with "https://"', () => {
          const path = 'https://path';

          it('should return the original path', () => {
            config.i18n = { backend: { loadPath: path } };
            const result = initializer.initialize({});
            expect(result.backend?.loadPath).toBe(path);
          });
        });
      });
    });
  });
});
