import { TestBed } from '@angular/core/testing';
import { ServerConfig } from '../../../config/server-config/server-config';
import { RouterTestingModule } from '@angular/router/testing';
import { UrlParsingService } from './url-parsing.service';
import { UrlTranslationService } from './url-translation.service';
import { RouteConfig } from '../routes-config';
import { TranslateUrlCommands } from './translate-url-commands';
import { RoutingConfigService } from '../routing-config.service';

const mockRoutingConfigService = {
  getRouteConfig: () => {},
};

describe('UrlTranslationService', () => {
  let service: UrlTranslationService;
  let serverConfig: ServerConfig;
  let routingConfigService: RoutingConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        UrlTranslationService,
        UrlParsingService,
        {
          provide: RoutingConfigService,
          useValue: mockRoutingConfigService,
        },
        { provide: ServerConfig, useValue: {} },
      ],
    });

    service = TestBed.get(UrlTranslationService);
    serverConfig = TestBed.get(ServerConfig);
    routingConfigService = TestBed.get(RoutingConfigService);
  });

  describe('translate', () => {
    describe(`, when options contain 'route' property,`, () => {
      // tslint:disable-next-line:max-line-length
      it('should console.warn in non-production environment when no configured path matches all its parameters to given object using parameter names mapping ', () => {
        serverConfig.production = false;
        spyOn(console, 'warn');
        spyOn(routingConfigService, 'getRouteConfig').and.returnValue({
          paths: ['path/:param1'],
        });
        service.translate({
          route: 'test',
          params: { param2: 'value2' },
        });
        expect(console.warn).toHaveBeenCalledTimes(1);
      });

      // tslint:disable-next-line:max-line-length
      it('should NOT console.warn in production environment when no configured path matches all its parameters to given object using parameter names mapping ', () => {
        serverConfig.production = true;
        spyOn(console, 'warn');
        spyOn(routingConfigService, 'getRouteConfig').and.returnValue({
          paths: ['path/:param1'],
        });
        service.translate({
          route: 'test',
          params: { param2: 'value2' },
        });
        expect(console.warn).not.toHaveBeenCalled();
      });

      it('should return absolute path', () => {
        spyOn(routingConfigService, 'getRouteConfig').and.returnValue({
          paths: ['path/:param1'],
        });
        const resultPath = service.translate({
          route: 'test',
          params: { param1: 'value1' },
        });
        expect(resultPath[0]).toEqual('');
      });

      it('should return relative path when "relative" option is true', () => {
        spyOn(routingConfigService, 'getRouteConfig').and.returnValue({
          paths: ['path/:param1'],
        });
        const resultPath = service.translate(
          { route: 'test', params: { param1: 'value1' } },
          { relative: true }
        );
        expect(resultPath[0]).not.toEqual('');
      });

      function test_translate({
        translateUrlOptions,
        routesConfigs,
        expectedResult,
      }: {
        translateUrlOptions: TranslateUrlCommands;
        routesConfigs: RouteConfig[];
        expectedResult: any[];
      }) {
        spyOn(routingConfigService, 'getRouteConfig').and.returnValues(
          ...routesConfigs
        );
        expect(service.translate(translateUrlOptions)).toEqual(expectedResult);
      }

      it(`should return the root path when translations for given route are undefined`, () => {
        test_translate({
          translateUrlOptions: { route: 'test' },
          routesConfigs: [undefined],
          expectedResult: ['/'],
        });
      });

      it(`should return the root path when translations for given route are null`, () => {
        test_translate({
          translateUrlOptions: { route: 'test' },
          routesConfigs: [null],
          expectedResult: ['/'],
        });
      });

      it(`should return the root path when translations paths for given route are undefined`, () => {
        test_translate({
          translateUrlOptions: { route: 'test' },
          routesConfigs: [{ paths: undefined }],
          expectedResult: ['/'],
        });
      });

      it(`should return the root path when translations paths for given route are null`, () => {
        test_translate({
          translateUrlOptions: { route: 'test' },
          routesConfigs: [{ paths: null }],
          expectedResult: ['/'],
        });
      });

      it(`should return the root path when translations paths for given route are empty array`, () => {
        test_translate({
          translateUrlOptions: { route: 'test' },
          routesConfigs: [{ paths: [] }],
          expectedResult: ['/'],
        });
      });

      it(`should return the root path when no path from translations can satisfy its params with given params`, () => {
        test_translate({
          translateUrlOptions: {
            route: 'test',
            params: { param3: 'value3' },
          },
          routesConfigs: [{ paths: ['path/:param1', 'path/:param1'] }],

          expectedResult: ['/'],
        });
      });

      it(`should return first path without params when no params given`, () => {
        test_translate({
          translateUrlOptions: { route: 'test' },
          routesConfigs: [
            {
              paths: ['path/:param1', 'path/without-parameters'],
            },
          ],

          expectedResult: ['', 'path', 'without-parameters'],
        });
      });

      it(`should return first path without params when given params are not sufficient`, () => {
        test_translate({
          translateUrlOptions: {
            route: 'test',
            params: { param2: 'value2' },
          },
          routesConfigs: [
            {
              paths: ['path/:param1', 'path/without-parameters'],
            },
          ],

          expectedResult: ['', 'path', 'without-parameters'],
        });
      });

      it(`should return first path that can be satisfied with given params (case 1)`, () => {
        test_translate({
          translateUrlOptions: {
            route: 'test',
            params: { param1: 'value1' },
          },
          routesConfigs: [{ paths: ['path/:param1', 'other-path/:param1'] }],

          expectedResult: ['', 'path', 'value1'],
        });
      });

      it(`should return first path that can be satisfied with given params (case 2)`, () => {
        test_translate({
          translateUrlOptions: {
            route: 'test',
            params: { param2: 'value2' },
          },
          routesConfigs: [
            {
              paths: ['path/without-parameters', 'path/:param1'],
            },
          ],

          expectedResult: ['', 'path', 'without-parameters'],
        });
      });

      it(`should return first path that can be satisfied with given params (case 3)`, () => {
        test_translate({
          translateUrlOptions: {
            route: 'test',
            params: {
              param2: 'value2',
              param3: 'value3',
              param4: 'value4',
            },
          },
          routesConfigs: [
            {
              paths: [
                'path/:param1/:param2',
                'path/:param1',
                'path/:param3/:param2',
                'path/:param4',
              ],
            },
          ],

          expectedResult: ['', 'path', 'value3', 'value2'],
        });
      });

      it(`should return first path that can be satisfied with given params  (case 4)`, () => {
        test_translate({
          translateUrlOptions: {
            route: 'test',
            params: {
              param2: 'value2',
              param3: 'value3',
              param4: 'value4',
            },
          },

          routesConfigs: [
            {
              paths: [
                'path/:param1/:param2',
                'path/:param1',
                'path/:param4',
                'path/:param3/:param2',
              ],
            },
          ],

          expectedResult: ['', 'path', 'value4'],
        });
      });

      it(`should use given params mapping (case 1)`, () => {
        test_translate({
          translateUrlOptions: {
            route: 'test',
            params: { param1: 'value1' },
          },
          routesConfigs: [
            {
              paths: ['path/:mappedParam1'],
              paramsMapping: { mappedParam1: 'param1' },
            },
          ],

          expectedResult: ['', 'path', 'value1'],
        });
      });

      it(`should use given params mapping (case 2)`, () => {
        test_translate({
          translateUrlOptions: {
            route: 'test',
            params: {
              param2: 'value2',
              param3: 'value3',
              param4: 'value4',
            },
          },
          routesConfigs: [
            {
              paths: [
                'path/:param1/:param2',
                'path/:param1',
                'path/:param3/:mappedParam2',
                'path/:param4',
              ],
              paramsMapping: { mappedParam2: 'param2' },
            },
          ],

          expectedResult: ['', 'path', 'value3', 'value2'],
        });
      });

      it(`should return the root path when translations paths for one of given routes is null`, () => {
        test_translate({
          translateUrlOptions: [{ route: 'test1' }, { route: 'tes2' }],
          routesConfigs: [{ paths: ['path1'] }, { paths: null }],
          expectedResult: ['/'],
        });
      });

      it(`should concatenate paths for two nested routes`, () => {
        test_translate({
          translateUrlOptions: [{ route: 'test1' }, { route: 'test2' }],
          routesConfigs: [{ paths: ['path1'] }, { paths: ['path2'] }],
          expectedResult: ['', 'path1', 'path2'],
        });
      });

      it(`should concatenate paths for two nested routes, using first configured path - separately for every route`, () => {
        test_translate({
          translateUrlOptions: [{ route: 'test1' }, { route: 'test2' }],
          routesConfigs: [
            { paths: ['path1', 'path10'] },
            { paths: ['path2', 'path20'] },
          ],
          expectedResult: ['', 'path1', 'path2'],
        });
      });

      it(`should concatenate paths for three nested routes`, () => {
        test_translate({
          translateUrlOptions: [
            { route: 'test1' },
            { route: 'test2' },
            { route: 'test3' },
          ],
          routesConfigs: [
            { paths: ['path1'] },
            { paths: ['path2'] },
            { paths: ['path3'] },
          ],
          expectedResult: ['', 'path1', 'path2', 'path3'],
        });
      });

      it(`should return the root path when there are no translations for given nested routes`, () => {
        test_translate({
          translateUrlOptions: [{ route: 'test1' }, { route: 'test2' }],
          routesConfigs: [null, null],
          expectedResult: ['/'],
        });
      });

      it(`should concatenate paths for nested routes, using given params for first route (case 1)`, () => {
        test_translate({
          translateUrlOptions: [
            { route: 'test1', params: { param1: 'value1' } },
            { route: 'test2' },
          ],
          routesConfigs: [{ paths: ['path1/:param1'] }, { paths: ['path2'] }],
          expectedResult: ['', 'path1', 'value1', 'path2'],
        });
      });

      it(`should concatenate paths for nested routes, using given params for second route (case 2)`, () => {
        test_translate({
          translateUrlOptions: [
            { route: 'test1' },
            { route: 'test2', params: { param2: 'value2' } },
          ],
          routesConfigs: [{ paths: ['path1'] }, { paths: ['path2/:param2'] }],
          expectedResult: ['', 'path1', 'path2', 'value2'],
        });
      });

      it(`should concatenate paths for nested routes, using given params for all routes`, () => {
        test_translate({
          translateUrlOptions: [
            { route: 'test1', params: { param1: 'value1' } },
            { route: 'test2', params: { param2: 'value2' } },
          ],
          routesConfigs: [
            { paths: ['path1/:param1'] },
            { paths: [':param2/path2'] },
          ],
          expectedResult: ['', 'path1', 'value1', 'value2', 'path2'],
        });
      });

      it(`should concatenate paths for nested routes using given params mapping`, () => {
        test_translate({
          translateUrlOptions: [
            { route: 'test1', params: { param1: 'value1' } },
            { route: 'test2', params: { param2: 'value2' } },
          ],
          routesConfigs: [
            { paths: ['path1/:param1'] },
            {
              paths: [':mappedParam2/path2'],
              paramsMapping: { mappedParam2: 'param2' },
            },
          ],
          expectedResult: ['', 'path1', 'value1', 'value2', 'path2'],
        });
      });

      it(`should concatenate paths using params objects given in relevant order for every route`, () => {
        test_translate({
          translateUrlOptions: [
            { route: 'test1', params: { param1: 'value1' } },
            { route: 'test2', params: { param1: 'value10' } },
          ],
          routesConfigs: [
            { paths: ['path1/:param1'] },
            { paths: ['path2/:param1'] },
          ],
          expectedResult: ['', 'path1', 'value1', 'path2', 'value10'],
        });
      });

      it(`should concatenate paths using first path that can be satisfied with given params - separately every route`, () => {
        test_translate({
          translateUrlOptions: [
            { route: 'test1', params: { param1: 'value1' } },
            { route: 'test2', params: { param3: 'value3' } },
          ],
          routesConfigs: [
            { paths: ['path1/:param1'] },
            { paths: ['path2/:param2', 'path2/:param3'] },
          ],
          expectedResult: ['', 'path1', 'value1', 'path2', 'value3'],
        });
      });

      it(`should return the root path when no translation path can satisfy its params with given params for some route`, () => {
        test_translate({
          translateUrlOptions: [
            { route: 'test1', params: { param1: 'value1' } },
            { route: 'test2', params: { param3: 'value3' } },
          ],
          routesConfigs: [
            { paths: ['path1/:param1'] },
            { paths: ['path2/:param2'] },
          ],
          expectedResult: ['/'],
        });
      });

      it(`should NOT translate options that are are not object with "route" property`, () => {
        test_translate({
          translateUrlOptions: [
            111,
            { route: 'test2', params: { param2: 'value2' } },
            'testString3',
            null,
            undefined,
          ],
          routesConfigs: [{ paths: ['path2/:param2'] }],
          expectedResult: [
            '',
            111,
            'path2',
            'value2',
            'testString3',
            null,
            undefined,
          ],
        });
      });
    });
  });
});
