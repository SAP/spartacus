import { TestBed } from '@angular/core/testing';
import { ServerConfig } from '../../../config/server-config/server-config';
import { RouterTestingModule } from '@angular/router/testing';
import { UrlParsingService } from './url-parsing.service';
import { UrlTranslationService } from './url-translation.service';
import { ConfigurableRoutesService } from '../configurable-routes.service';
import { RouteTranslation } from '../routes-config';
import { TranslateUrlOptions } from './translate-url-options';

const mockConfigurableRoutesService = {
  getRouteTranslation: () => {},
};

describe('UrlTranslationService', () => {
  let service: UrlTranslationService;
  let serverConfig: ServerConfig;
  let routesService: ConfigurableRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        UrlTranslationService,
        UrlParsingService,
        {
          provide: ConfigurableRoutesService,
          useValue: mockConfigurableRoutesService,
        },
        { provide: ServerConfig, useValue: {} },
      ],
    });

    service = TestBed.get(UrlTranslationService);
    serverConfig = TestBed.get(ServerConfig);
    routesService = TestBed.get(ConfigurableRoutesService);
  });

  describe('translate', () => {
    describe(', when options is null,', () => {
      let options: TranslateUrlOptions;
      beforeEach(() => {
        spyOn(console, 'warn');
        options = null;
      });

      it(`should console.warn in non-production environment`, () => {
        serverConfig.production = false;
        service.translate(options);
        expect(console.warn).toHaveBeenCalled();
      });

      it(`should NOT console.warn in production environment`, () => {
        serverConfig.production = true;
        service.translate(options);
        expect(console.warn).not.toHaveBeenCalled();
      });

      it(`should return the root url`, () => {
        expect(service.translate(options)).toEqual(['/']);
      });
    });

    describe(', when options is empty object,', () => {
      let options: TranslateUrlOptions;
      beforeEach(() => {
        spyOn(console, 'warn');
        options = {};
      });

      it(`should console.warn in non-production environment`, () => {
        serverConfig.production = false;
        service.translate(options);
        expect(console.warn).toHaveBeenCalled();
      });

      it(`should NOT console.warn in production environment`, () => {
        serverConfig.production = true;
        service.translate(options);
        expect(console.warn).not.toHaveBeenCalled();
      });

      it(`should return the root url`, () => {
        expect(service.translate(options)).toEqual(['/']);
      });
    });

    describe(`, when options 'route' property is null,`, () => {
      let options: TranslateUrlOptions;
      beforeEach(() => {
        spyOn(console, 'warn');
        options = { route: null };
      });

      it(`should console.warn in non-production environment`, () => {
        serverConfig.production = false;
        service.translate(options);
        expect(console.warn).toHaveBeenCalled();
      });

      it(`should NOT console.warn in production environment`, () => {
        serverConfig.production = true;
        service.translate(options);
        expect(console.warn).not.toHaveBeenCalled();
      });

      it(`should return the root url`, () => {
        expect(service.translate(options)).toEqual(['/']);
      });
    });

    describe(`, when options 'route' array contains empty object,`, () => {
      let options: TranslateUrlOptions;
      beforeEach(() => {
        spyOn(console, 'warn');
        options = { route: {} };
      });

      it(`should console.warn in non-production environment`, () => {
        serverConfig.production = false;
        service.translate(options);
        expect(console.warn).toHaveBeenCalled();
      });

      it(`should NOT console.warn in production environment`, () => {
        serverConfig.production = true;
        service.translate(options);
        expect(console.warn).not.toHaveBeenCalled();
      });

      it(`should return the root url`, () => {
        expect(service.translate(options)).toEqual(['/']);
      });
    });

    describe(`, when options contain 'route' property,`, () => {
      // tslint:disable-next-line:max-line-length
      it('should console.warn in non-production environment when no configured path matches all its parameters to given object using parameter names mapping ', () => {
        serverConfig.production = false;
        spyOn(console, 'warn');
        spyOn(routesService, 'getRouteTranslation').and.returnValue({
          paths: ['path/:param1'],
        });
        service.translate({
          route: { name: 'test', params: { param2: 'value2' } },
        });
        expect(console.warn).toHaveBeenCalledTimes(1);
      });

      // tslint:disable-next-line:max-line-length
      it('should NOT console.warn in production environment when no configured path matches all its parameters to given object using parameter names mapping ', () => {
        serverConfig.production = true;
        spyOn(console, 'warn');
        spyOn(routesService, 'getRouteTranslation').and.returnValue({
          paths: ['path/:param1'],
        });
        service.translate({
          route: { name: 'test', params: { param2: 'value2' } },
        });
        expect(console.warn).not.toHaveBeenCalled();
      });

      it('should return absolute path', () => {
        spyOn(routesService, 'getRouteTranslation').and.returnValue({
          paths: ['path/:param1'],
        });
        const resultPath = service.translate({
          route: { name: 'test', params: { param1: 'value1' } },
        });
        expect(resultPath[0]).toEqual('');
      });

      function test_translate({
        translateUrlOptions,
        routeTranslation,
        expectedResult,
      }: {
        translateUrlOptions: TranslateUrlOptions;
        routeTranslation: RouteTranslation;
        expectedResult: string[];
      }) {
        spyOn(routesService, 'getRouteTranslation').and.returnValue(
          routeTranslation
        );
        expect(service.translate(translateUrlOptions)).toEqual(expectedResult);
      }

      it(`should return the root path when translations for given route are undefined`, () => {
        test_translate({
          translateUrlOptions: { route: 'test' },
          routeTranslation: undefined,
          expectedResult: ['/'],
        });
      });

      it(`should return the root path when translations for given route are null`, () => {
        test_translate({
          translateUrlOptions: { route: 'test' },
          routeTranslation: null,
          expectedResult: ['/'],
        });
      });

      it(`should return the root path when translations paths for given route are undefined`, () => {
        test_translate({
          translateUrlOptions: { route: 'test' },
          routeTranslation: { paths: undefined },
          expectedResult: ['/'],
        });
      });

      it(`should return the root path when translations paths for given route are null`, () => {
        test_translate({
          translateUrlOptions: { route: 'test' },
          routeTranslation: { paths: null },
          expectedResult: ['/'],
        });
      });

      it(`should return the root path when translations paths for given route are empty array`, () => {
        test_translate({
          translateUrlOptions: { route: 'test' },
          routeTranslation: { paths: [] },
          expectedResult: ['/'],
        });
      });

      it(`should return the root path when no path from translations can satisfy its params with given params`, () => {
        test_translate({
          translateUrlOptions: {
            route: { name: 'test', params: { param3: 'value3' } },
          },
          routeTranslation: { paths: ['path/:param1', 'path/:param1'] },

          expectedResult: ['/'],
        });
      });

      it(`should return first path without params when no params given`, () => {
        test_translate({
          translateUrlOptions: { route: 'test' },
          routeTranslation: {
            paths: ['path/:param1', 'path/without-parameters'],
          },

          expectedResult: ['', 'path', 'without-parameters'],
        });
      });

      it(`should return first path without params when given params are not sufficient`, () => {
        test_translate({
          translateUrlOptions: {
            route: { name: 'test', params: { param2: 'value2' } },
          },
          routeTranslation: {
            paths: ['path/:param1', 'path/without-parameters'],
          },

          expectedResult: ['', 'path', 'without-parameters'],
        });
      });

      it(`should return first path that can be satisfied with given params (case 1)`, () => {
        test_translate({
          translateUrlOptions: {
            route: { name: 'test', params: { param1: 'value1' } },
          },
          routeTranslation: { paths: ['path/:param1', 'other-path/:param1'] },

          expectedResult: ['', 'path', 'value1'],
        });
      });

      it(`should return first path that can be satisfied with given params (case 2)`, () => {
        test_translate({
          translateUrlOptions: {
            route: { name: 'test', params: { param2: 'value2' } },
          },
          routeTranslation: {
            paths: ['path/without-parameters', 'path/:param1'],
          },

          expectedResult: ['', 'path', 'without-parameters'],
        });
      });

      it(`should return first path that can be satisfied with given params (case 3)`, () => {
        test_translate({
          translateUrlOptions: {
            route: {
              name: 'test',
              params: {
                param2: 'value2',
                param3: 'value3',
                param4: 'value4',
              },
            },
          },
          routeTranslation: {
            paths: [
              'path/:param1/:param2',
              'path/:param1',
              'path/:param3/:param2',
              'path/:param4',
            ],
          },

          expectedResult: ['', 'path', 'value3', 'value2'],
        });
      });

      it(`should return first path that can be satisfied with given params  (case 4)`, () => {
        test_translate({
          translateUrlOptions: {
            route: {
              name: 'test',
              params: {
                param2: 'value2',
                param3: 'value3',
                param4: 'value4',
              },
            },
          },

          routeTranslation: {
            paths: [
              'path/:param1/:param2',
              'path/:param1',
              'path/:param4',
              'path/:param3/:param2',
            ],
          },

          expectedResult: ['', 'path', 'value4'],
        });
      });

      it(`should use given params mapping (case 1)`, () => {
        test_translate({
          translateUrlOptions: {
            route: { name: 'test', params: { param1: 'value1' } },
          },
          routeTranslation: {
            paths: ['path/:mappedParam1'],
            paramsMapping: { mappedParam1: 'param1' },
          },

          expectedResult: ['', 'path', 'value1'],
        });
      });

      it(`should use given params mapping (case 2)`, () => {
        test_translate({
          translateUrlOptions: {
            route: {
              name: 'test',
              params: {
                param2: 'value2',
                param3: 'value3',
                param4: 'value4',
              },
            },
          },
          routeTranslation: {
            paths: [
              'path/:param1/:param2',
              'path/:param1',
              'path/:param3/:mappedParam2',
              'path/:param4',
            ],
            paramsMapping: { mappedParam2: 'param2' },
          },

          expectedResult: ['', 'path', 'value3', 'value2'],
        });
      });
    });
  });
});
