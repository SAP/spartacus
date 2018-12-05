import { TestBed } from '@angular/core/testing';
import { ServerConfig } from '../../../config/server-config/server-config';
import { RouterTestingModule } from '@angular/router/testing';
import { RouteRecognizerService } from './route-recognizer.service';
import { UrlParserService } from './url-parser.service';
import { UrlTranslatorService } from './url-translator.service';
import { ConfigurableRoutesService } from '../configurable-routes.service';
import { RouteTranslation } from '../routes-config';
import { TranslateUrlOptions } from './translate-url-options';

const mockConfigurableRoutesService = {
  getNestedRoutesTranslations: () => {}
};

describe('UrlTranslatorService', () => {
  let service: UrlTranslatorService;
  let serverConfig: ServerConfig;
  let routesService: ConfigurableRoutesService;
  let routeRecognizer: RouteRecognizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        UrlTranslatorService,
        UrlParserService,
        {
          provide: ConfigurableRoutesService,
          useValue: mockConfigurableRoutesService
        },
        { provide: ServerConfig, useValue: {} },
        {
          provide: RouteRecognizerService,
          useValue: { recognizeByDefaultUrl: () => {} }
        }
      ]
    });

    service = TestBed.get(UrlTranslatorService);
    serverConfig = TestBed.get(ServerConfig);
    routesService = TestBed.get(ConfigurableRoutesService);
    routeRecognizer = TestBed.get(RouteRecognizerService);
  });

  describe('translate', () => {
    describe(', when first argument is string url,', () => {
      it('should try to recognize nested routes names in given url', () => {
        spyOn(routesService, 'getNestedRoutesTranslations').and.returnValue(
          null
        );
        spyOn(routeRecognizer, 'recognizeByDefaultUrl').and.returnValue(null);
        service.translate({ url: 'test-url' });
        expect(routeRecognizer.recognizeByDefaultUrl).toHaveBeenCalledWith(
          'test-url'
        );
      });

      it('should return original url if could not recognize nested routes names in given url', () => {
        spyOn(routesService, 'getNestedRoutesTranslations').and.returnValue(
          null
        );
        spyOn(routeRecognizer, 'recognizeByDefaultUrl').and.returnValue(null);
        const result = service.translate({ url: 'test-url' });
        expect(result).toEqual('test-url');
      });

      it('should return translated url if could recognize nested routes names in given url', () => {
        spyOn(routesService, 'getNestedRoutesTranslations').and.returnValue([
          { paths: ['translated-url'] }
        ]);
        spyOn(routeRecognizer, 'recognizeByDefaultUrl').and.returnValue([
          { name: 'testRouteName', params: {} }
        ]);
        const result = service.translate({ url: 'test-url' });
        expect(result).toEqual(['', 'translated-url']);
      });
    });

    describe(', when first argument is array of nested routes names,', () => {
      // tslint:disable-next-line:max-line-length
      it('should console.warn in non-production environment when no configured path matches all its parameters to given object using parameter names mapping ', () => {
        serverConfig.production = false;
        spyOn(console, 'warn');
        spyOn(routesService, 'getNestedRoutesTranslations').and.returnValue([
          { paths: ['path/:param1'] }
        ]);
        service.translate({
          route: [{ name: 'test', params: { param2: 'value2' } }]
        });
        expect(console.warn).toHaveBeenCalledTimes(1);
      });

      // tslint:disable-next-line:max-line-length
      it('should NOT console.warn in production environment when no configured path matches all its parameters to given object using parameter names mapping ', () => {
        serverConfig.production = true;
        spyOn(console, 'warn');
        spyOn(routesService, 'getNestedRoutesTranslations').and.returnValue([
          { paths: ['path/:param1'] }
        ]);
        service.translate({
          route: [{ name: 'test', params: { param2: 'value2' } }]
        });
        expect(console.warn).not.toHaveBeenCalled();
      });

      it('should return absolute path', () => {
        spyOn(routesService, 'getNestedRoutesTranslations').and.returnValue([
          { paths: ['path/:param1'] }
        ]);
        const resultPath = service.translate({
          route: [{ name: 'test', params: { param1: 'value1' } }]
        });
        expect(resultPath[0]).toEqual('');
      });

      function test_translate({
        translateUrlOptions,
        nestedRoutesTranslations,
        expectedResult
      }: {
        translateUrlOptions: TranslateUrlOptions;
        nestedRoutesTranslations: RouteTranslation[];
        expectedResult: string[];
      }) {
        spyOn(routesService, 'getNestedRoutesTranslations').and.returnValue(
          nestedRoutesTranslations
        );
        expect(service.translate(translateUrlOptions)).toEqual(expectedResult);
      }

      it(`should return the root path when translations for given route are undefined`, () => {
        test_translate({
          translateUrlOptions: { route: ['test'] },
          nestedRoutesTranslations: undefined,
          expectedResult: ['/']
        });
      });

      it(`should return the root path when translations for given route are null`, () => {
        test_translate({
          translateUrlOptions: { route: ['test'] },
          nestedRoutesTranslations: null,
          expectedResult: ['/']
        });
      });

      it(`should return the root path when translations paths for given route are undefined`, () => {
        test_translate({
          translateUrlOptions: { route: ['test'] },
          nestedRoutesTranslations: [{ paths: undefined }],
          expectedResult: ['/']
        });
      });

      it(`should return the root path when translations paths for given route are null`, () => {
        test_translate({
          translateUrlOptions: { route: ['test'] },
          nestedRoutesTranslations: [{ paths: null }],
          expectedResult: ['/']
        });
      });

      it(`should return the root path when translations paths for given route are empty array`, () => {
        test_translate({
          translateUrlOptions: { route: ['test'] },
          nestedRoutesTranslations: [{ paths: [] }],
          expectedResult: ['/']
        });
      });

      it(`should return the root path when no path from translations can satisfy its params with given params`, () => {
        test_translate({
          translateUrlOptions: {
            route: [{ name: 'test', params: { param3: 'value3' } }]
          },
          nestedRoutesTranslations: [
            { paths: ['path/:param1', 'path/:param1'] }
          ],
          expectedResult: ['/']
        });
      });

      it(`should return first path without params when no params given`, () => {
        test_translate({
          translateUrlOptions: { route: ['test'] },
          nestedRoutesTranslations: [
            { paths: ['path/:param1', 'path/without-parameters'] }
          ],
          expectedResult: ['', 'path', 'without-parameters']
        });
      });

      it(`should return first path without params when given params are not sufficient`, () => {
        test_translate({
          translateUrlOptions: {
            route: [{ name: 'test', params: { param2: 'value2' } }]
          },
          nestedRoutesTranslations: [
            { paths: ['path/:param1', 'path/without-parameters'] }
          ],
          expectedResult: ['', 'path', 'without-parameters']
        });
      });

      it(`should return first path that can be satisfied with given params (case 1)`, () => {
        test_translate({
          translateUrlOptions: {
            route: [{ name: 'test', params: { param1: 'value1' } }]
          },
          nestedRoutesTranslations: [
            { paths: ['path/:param1', 'other-path/:param1'] }
          ],
          expectedResult: ['', 'path', 'value1']
        });
      });

      it(`should return first path that can be satisfied with given params (case 2)`, () => {
        test_translate({
          translateUrlOptions: {
            route: [{ name: 'test', params: { param2: 'value2' } }]
          },
          nestedRoutesTranslations: [
            { paths: ['path/without-parameters', 'path/:param1'] }
          ],
          expectedResult: ['', 'path', 'without-parameters']
        });
      });

      it(`should return first path that can be satisfied with given params (case 3)`, () => {
        test_translate({
          translateUrlOptions: {
            route: [
              {
                name: 'test',
                params: {
                  param2: 'value2',
                  param3: 'value3',
                  param4: 'value4'
                }
              }
            ]
          },
          nestedRoutesTranslations: [
            {
              paths: [
                'path/:param1/:param2',
                'path/:param1',
                'path/:param3/:param2',
                'path/:param4'
              ]
            }
          ],
          expectedResult: ['', 'path', 'value3', 'value2']
        });
      });

      it(`should return first path that can be satisfied with given params  (case 4)`, () => {
        test_translate({
          translateUrlOptions: {
            route: [
              {
                name: 'test',
                params: {
                  param2: 'value2',
                  param3: 'value3',
                  param4: 'value4'
                }
              }
            ]
          },

          nestedRoutesTranslations: [
            {
              paths: [
                'path/:param1/:param2',
                'path/:param1',
                'path/:param4',
                'path/:param3/:param2'
              ]
            }
          ],
          expectedResult: ['', 'path', 'value4']
        });
      });

      it(`should use given params mapping (case 1)`, () => {
        test_translate({
          translateUrlOptions: {
            route: [{ name: 'test', params: { param1: 'value1' } }]
          },
          nestedRoutesTranslations: [
            {
              paths: ['path/:mappedParam1'],
              paramsMapping: { mappedParam1: 'param1' }
            }
          ],
          expectedResult: ['', 'path', 'value1']
        });
      });

      it(`should use given params mapping (case 2)`, () => {
        test_translate({
          translateUrlOptions: {
            route: [
              {
                name: 'test',
                params: {
                  param2: 'value2',
                  param3: 'value3',
                  param4: 'value4'
                }
              }
            ]
          },
          nestedRoutesTranslations: [
            {
              paths: [
                'path/:param1/:param2',
                'path/:param1',
                'path/:param3/:mappedParam2',
                'path/:param4'
              ],
              paramsMapping: { mappedParam2: 'param2' }
            }
          ],
          expectedResult: ['', 'path', 'value3', 'value2']
        });
      });

      it(`should concatenate paths for two nested routes`, () => {
        test_translate({
          translateUrlOptions: { route: ['test1', 'test2'] },
          nestedRoutesTranslations: [
            { paths: ['path1'] },
            { paths: ['path2'] }
          ],
          expectedResult: ['', 'path1', 'path2']
        });
      });

      it(`should concatenate paths for two nested routes, using first configured path - separately for every nested route`, () => {
        test_translate({
          translateUrlOptions: { route: ['test1', 'test2'] },
          nestedRoutesTranslations: [
            { paths: ['path1', 'path10'] },
            { paths: ['path2', 'path20'] }
          ],
          expectedResult: ['', 'path1', 'path2']
        });
      });

      it(`should concatenate paths for three nested routes`, () => {
        test_translate({
          translateUrlOptions: { route: ['test1', 'test2', 'test3'] },
          nestedRoutesTranslations: [
            { paths: ['path1'] },
            { paths: ['path2'] },
            { paths: ['path3'] }
          ],
          expectedResult: ['', 'path1', 'path2', 'path3']
        });
      });

      it(`should return the root path when there are no translations for given nested routes`, () => {
        test_translate({
          translateUrlOptions: { route: ['test1', 'test2'] },
          nestedRoutesTranslations: null,
          expectedResult: ['/']
        });
      });

      it(`should concatenate paths for nested routes, using given params for first route (case 1)`, () => {
        test_translate({
          translateUrlOptions: {
            route: [{ name: 'test1', params: { param1: 'value1' } }, 'test2']
          },
          nestedRoutesTranslations: [
            { paths: ['path1/:param1'] },
            { paths: ['path2'] }
          ],
          expectedResult: ['', 'path1', 'value1', 'path2']
        });
      });

      it(`should concatenate paths for nested routes, using given params for second route (case 2)`, () => {
        test_translate({
          translateUrlOptions: {
            route: ['test1', { name: 'test2', params: { param2: 'value2' } }]
          },
          nestedRoutesTranslations: [
            { paths: ['path1'] },
            { paths: ['path2/:param2'] }
          ],
          expectedResult: ['', 'path1', 'path2', 'value2']
        });
      });

      it(`should concatenate paths for nested routes, using given params for all routes`, () => {
        test_translate({
          translateUrlOptions: {
            route: [
              { name: 'test1', params: { param1: 'value1' } },
              { name: 'test2', params: { param2: 'value2' } }
            ]
          },
          nestedRoutesTranslations: [
            { paths: ['path1/:param1'] },
            { paths: [':param2/path2'] }
          ],
          expectedResult: ['', 'path1', 'value1', 'value2', 'path2']
        });
      });

      it(`should concatenate paths for nested routes using given params mapping`, () => {
        test_translate({
          translateUrlOptions: {
            route: [
              { name: 'test1', params: { param1: 'value1' } },
              { name: 'test2', params: { param2: 'value2' } }
            ]
          },
          nestedRoutesTranslations: [
            { paths: ['path1/:param1'] },
            {
              paths: [':mappedParam2/path2'],
              paramsMapping: { mappedParam2: 'param2' }
            }
          ],
          expectedResult: ['', 'path1', 'value1', 'value2', 'path2']
        });
      });

      it(`should concatenate paths using params objects given in relevant order for every route`, () => {
        test_translate({
          translateUrlOptions: {
            route: [
              { name: 'test1', params: { param1: 'value1' } },
              { name: 'test2', params: { param1: 'value10' } }
            ]
          },
          nestedRoutesTranslations: [
            { paths: ['path1/:param1'] },
            { paths: ['path2/:param1'] }
          ],
          expectedResult: ['', 'path1', 'value1', 'path2', 'value10']
        });
      });

      it(`should concatenate paths using first path that can be satisfied with given params - separately every route`, () => {
        test_translate({
          translateUrlOptions: {
            route: [
              { name: 'test1', params: { param1: 'value1' } },
              { name: 'test2', params: { param3: 'value3' } }
            ]
          },
          nestedRoutesTranslations: [
            { paths: ['path1/:param1'] },
            { paths: ['path2/:param2', 'path2/:param3'] }
          ],
          expectedResult: ['', 'path1', 'value1', 'path2', 'value3']
        });
      });

      it(`should return the root path when no translation path can satisfy its params with given params for some route`, () => {
        test_translate({
          translateUrlOptions: {
            route: [
              { name: 'test1', params: { param1: 'value1' } },
              { name: 'test2', params: { param3: 'value3' } }
            ]
          },
          nestedRoutesTranslations: [
            { paths: ['path1/:param1'] },
            { paths: ['path2/:param2'] }
          ],
          expectedResult: ['/']
        });
      });
    });
  });
});
