import { TestBed } from '@angular/core/testing';
import { ServerConfig } from '../../../config/server-config/server-config';
import { RouterTestingModule } from '@angular/router/testing';
import { UrlParsingService } from './url-parsing.service';
import { UrlService } from './url.service';
import { RouteConfig } from '../routes-config';
import { UrlCommands } from './url-command';
import { RoutingConfigService } from '../routing-config.service';

const mockRoutingConfigService = {
  getRouteConfig: () => {},
};

describe('UrlService', () => {
  let service: UrlService;
  let serverConfig: ServerConfig;
  let routingConfigService: RoutingConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        UrlService,
        UrlParsingService,
        {
          provide: RoutingConfigService,
          useValue: mockRoutingConfigService,
        },
        { provide: ServerConfig, useValue: {} },
      ],
    });

    service = TestBed.get(UrlService);
    serverConfig = TestBed.get(ServerConfig);
    routingConfigService = TestBed.get(RoutingConfigService);
  });

  describe('generateUrl', () => {
    describe(`, when commands contain 'route' property,`, () => {
      // tslint:disable-next-line:max-line-length
      it('should console.warn in non-production environment when no configured path matches all its parameters to given object using parameter names mapping ', () => {
        serverConfig.production = false;
        spyOn(console, 'warn');
        spyOn(routingConfigService, 'getRouteConfig').and.returnValue({
          paths: ['path/:param1'],
        });
        service.generateUrl({
          cxRoute: 'test',
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
        service.generateUrl({
          cxRoute: 'test',
          params: { param2: 'value2' },
        });
        expect(console.warn).not.toHaveBeenCalled();
      });

      it('should return absolute path', () => {
        spyOn(routingConfigService, 'getRouteConfig').and.returnValue({
          paths: ['path/:param1'],
        });
        const resultPath = service.generateUrl({
          cxRoute: 'test',
          params: { param1: 'value1' },
        });
        expect(resultPath[0]).toEqual('/');
      });

      it('should return relative path when the first command is not object with "route" property', () => {
        spyOn(routingConfigService, 'getRouteConfig').and.returnValue({
          paths: ['path/:param1'],
        });
        const resultPath = service.generateUrl([
          'testString',
          {
            cxRoute: 'test',
            params: { param1: 'value1' },
          },
        ]);
        expect(resultPath[0]).toEqual('testString');
      });

      function test_generateUrl({
        urlCommands,
        routesConfigs,
        expectedResult,
      }: {
        urlCommands: UrlCommands;
        routesConfigs: RouteConfig[];
        expectedResult: any[];
      }) {
        spyOn(routingConfigService, 'getRouteConfig').and.returnValues(
          ...routesConfigs
        );
        expect(service.generateUrl(urlCommands)).toEqual(expectedResult);
      }

      it(`should return the root path when route config for given route are undefined`, () => {
        test_generateUrl({
          urlCommands: { cxRoute: 'test' },
          routesConfigs: [undefined],
          expectedResult: ['/'],
        });
      });

      it(`should return the root path when route config for given route are null`, () => {
        test_generateUrl({
          urlCommands: { cxRoute: 'test' },
          routesConfigs: [null],
          expectedResult: ['/'],
        });
      });

      it(`should return the root path when configured paths for given route are undefined`, () => {
        test_generateUrl({
          urlCommands: { cxRoute: 'test' },
          routesConfigs: [{ paths: undefined }],
          expectedResult: ['/'],
        });
      });

      it(`should return the root path when configured paths for given route are null`, () => {
        test_generateUrl({
          urlCommands: { cxRoute: 'test' },
          routesConfigs: [{ paths: null }],
          expectedResult: ['/'],
        });
      });

      it(`should return the root path when configured paths for given route are empty array`, () => {
        test_generateUrl({
          urlCommands: { cxRoute: 'test' },
          routesConfigs: [{ paths: [] }],
          expectedResult: ['/'],
        });
      });

      it(`should return the root path when no path from routes config can satisfy its params with given params`, () => {
        test_generateUrl({
          urlCommands: {
            cxRoute: 'test',
            params: { param3: 'value3' },
          },
          routesConfigs: [{ paths: ['path/:param1', 'path/:param1'] }],

          expectedResult: ['/'],
        });
      });

      it(`should return first path without params when no params given`, () => {
        test_generateUrl({
          urlCommands: { cxRoute: 'test' },
          routesConfigs: [
            {
              paths: ['path/:param1', 'path/without-parameters'],
            },
          ],

          expectedResult: ['/', 'path', 'without-parameters'],
        });
      });

      it(`should return first path without params when given params are not sufficient`, () => {
        test_generateUrl({
          urlCommands: {
            cxRoute: 'test',
            params: { param2: 'value2' },
          },
          routesConfigs: [
            {
              paths: ['path/:param1', 'path/without-parameters'],
            },
          ],

          expectedResult: ['/', 'path', 'without-parameters'],
        });
      });

      it(`should return first path that can be satisfied with given params (case 1)`, () => {
        test_generateUrl({
          urlCommands: {
            cxRoute: 'test',
            params: { param1: 'value1' },
          },
          routesConfigs: [{ paths: ['path/:param1', 'other-path/:param1'] }],

          expectedResult: ['/', 'path', 'value1'],
        });
      });

      it(`should return first path that can be satisfied with given params (case 2)`, () => {
        test_generateUrl({
          urlCommands: {
            cxRoute: 'test',
            params: { param2: 'value2' },
          },
          routesConfigs: [
            {
              paths: ['path/without-parameters', 'path/:param1'],
            },
          ],

          expectedResult: ['/', 'path', 'without-parameters'],
        });
      });

      it(`should return first path that can be satisfied with given params (case 3)`, () => {
        test_generateUrl({
          urlCommands: {
            cxRoute: 'test',
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

          expectedResult: ['/', 'path', 'value3', 'value2'],
        });
      });

      it(`should return first path that can be satisfied with given params  (case 4)`, () => {
        test_generateUrl({
          urlCommands: {
            cxRoute: 'test',
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

          expectedResult: ['/', 'path', 'value4'],
        });
      });

      it(`should use given params mapping (case 1)`, () => {
        test_generateUrl({
          urlCommands: {
            cxRoute: 'test',
            params: { param1: 'value1' },
          },
          routesConfigs: [
            {
              paths: ['path/:mappedParam1'],
              paramsMapping: { mappedParam1: 'param1' },
            },
          ],

          expectedResult: ['/', 'path', 'value1'],
        });
      });

      it(`should use given params mapping (case 2)`, () => {
        test_generateUrl({
          urlCommands: {
            cxRoute: 'test',
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

          expectedResult: ['/', 'path', 'value3', 'value2'],
        });
      });

      it(`should return the root path when configured paths for one of given routes is null`, () => {
        test_generateUrl({
          urlCommands: [{ cxRoute: 'test1' }, { cxRoute: 'tes2' }],
          routesConfigs: [{ paths: ['path1'] }, { paths: null }],
          expectedResult: ['/'],
        });
      });

      it(`should concatenate paths for two nested routes`, () => {
        test_generateUrl({
          urlCommands: [{ cxRoute: 'test1' }, { cxRoute: 'test2' }],
          routesConfigs: [{ paths: ['path1'] }, { paths: ['path2'] }],
          expectedResult: ['/', 'path1', 'path2'],
        });
      });

      it(`should concatenate paths for two nested routes, using first configured path - separately for every route`, () => {
        test_generateUrl({
          urlCommands: [{ cxRoute: 'test1' }, { cxRoute: 'test2' }],
          routesConfigs: [
            { paths: ['path1', 'path10'] },
            { paths: ['path2', 'path20'] },
          ],
          expectedResult: ['/', 'path1', 'path2'],
        });
      });

      it(`should concatenate paths for three nested routes`, () => {
        test_generateUrl({
          urlCommands: [
            { cxRoute: 'test1' },
            { cxRoute: 'test2' },
            { cxRoute: 'test3' },
          ],
          routesConfigs: [
            { paths: ['path1'] },
            { paths: ['path2'] },
            { paths: ['path3'] },
          ],
          expectedResult: ['/', 'path1', 'path2', 'path3'],
        });
      });

      it(`should return the root path when there are no paths configured for given nested routes`, () => {
        test_generateUrl({
          urlCommands: [{ cxRoute: 'test1' }, { cxRoute: 'test2' }],
          routesConfigs: [null, null],
          expectedResult: ['/'],
        });
      });

      it(`should concatenate paths for nested routes, using given params for first route (case 1)`, () => {
        test_generateUrl({
          urlCommands: [
            { cxRoute: 'test1', params: { param1: 'value1' } },
            { cxRoute: 'test2' },
          ],
          routesConfigs: [{ paths: ['path1/:param1'] }, { paths: ['path2'] }],
          expectedResult: ['/', 'path1', 'value1', 'path2'],
        });
      });

      it(`should concatenate paths for nested routes, using given params for second route (case 2)`, () => {
        test_generateUrl({
          urlCommands: [
            { cxRoute: 'test1' },
            { cxRoute: 'test2', params: { param2: 'value2' } },
          ],
          routesConfigs: [{ paths: ['path1'] }, { paths: ['path2/:param2'] }],
          expectedResult: ['/', 'path1', 'path2', 'value2'],
        });
      });

      it(`should concatenate paths for nested routes, using given params for all routes`, () => {
        test_generateUrl({
          urlCommands: [
            { cxRoute: 'test1', params: { param1: 'value1' } },
            { cxRoute: 'test2', params: { param2: 'value2' } },
          ],
          routesConfigs: [
            { paths: ['path1/:param1'] },
            { paths: [':param2/path2'] },
          ],
          expectedResult: ['/', 'path1', 'value1', 'value2', 'path2'],
        });
      });

      it(`should concatenate paths for nested routes using given params mapping`, () => {
        test_generateUrl({
          urlCommands: [
            { cxRoute: 'test1', params: { param1: 'value1' } },
            { cxRoute: 'test2', params: { param2: 'value2' } },
          ],
          routesConfigs: [
            { paths: ['path1/:param1'] },
            {
              paths: [':mappedParam2/path2'],
              paramsMapping: { mappedParam2: 'param2' },
            },
          ],
          expectedResult: ['/', 'path1', 'value1', 'value2', 'path2'],
        });
      });

      it(`should concatenate paths using params objects given in relevant order for every route`, () => {
        test_generateUrl({
          urlCommands: [
            { cxRoute: 'test1', params: { param1: 'value1' } },
            { cxRoute: 'test2', params: { param1: 'value10' } },
          ],
          routesConfigs: [
            { paths: ['path1/:param1'] },
            { paths: ['path2/:param1'] },
          ],
          expectedResult: ['/', 'path1', 'value1', 'path2', 'value10'],
        });
      });

      it(`should concatenate paths using first path that can be satisfied with given params - separately every route`, () => {
        test_generateUrl({
          urlCommands: [
            { cxRoute: 'test1', params: { param1: 'value1' } },
            { cxRoute: 'test2', params: { param3: 'value3' } },
          ],
          routesConfigs: [
            { paths: ['path1/:param1'] },
            { paths: ['path2/:param2', 'path2/:param3'] },
          ],
          expectedResult: ['/', 'path1', 'value1', 'path2', 'value3'],
        });
      });

      it(`should return the root path when no configured path can satisfy its params with given params for some route`, () => {
        test_generateUrl({
          urlCommands: [
            { cxRoute: 'test1', params: { param1: 'value1' } },
            { cxRoute: 'test2', params: { param3: 'value3' } },
          ],
          routesConfigs: [
            { paths: ['path1/:param1'] },
            { paths: ['path2/:param2'] },
          ],
          expectedResult: ['/'],
        });
      });

      it(`should NOT modify commands that are are not object with "route" property`, () => {
        test_generateUrl({
          urlCommands: [
            111,
            { cxRoute: 'test2', params: { param2: 'value2' } },
            'testString3',
            null,
            undefined,
          ],
          routesConfigs: [{ paths: ['path2/:param2'] }],
          expectedResult: [
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
