import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouteConfig } from '../routes-config';
import { RoutingConfigService } from '../routing-config.service';
import { SemanticPathService } from './semantic-path.service';
import { UrlCommands } from './url-command';
import { UrlParsingService } from './url-parsing.service';

const mockRoutingConfigService = {
  getRouteConfig: () => {},
};

describe('SemanticPathService', () => {
  let service: SemanticPathService;
  let routingConfigService: RoutingConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        SemanticPathService,
        UrlParsingService,
        {
          provide: RoutingConfigService,
          useValue: mockRoutingConfigService,
        },
      ],
    });

    service = TestBed.inject(SemanticPathService);
    routingConfigService = TestBed.inject(RoutingConfigService);
  });

  describe('get', () => {
    it(`should return absolute url with path from routes config`, () => {
      spyOn(routingConfigService, 'getRouteConfig').and.returnValue({
        paths: ['some/url'],
      });
      expect(service.get('test')).toBe('/some/url');
    });

    it(`should return undefined when there is no configured path for given route`, () => {
      spyOn(routingConfigService, 'getRouteConfig').and.returnValue(undefined);
      expect(service.get('test')).toBe(undefined);
    });
  });

  describe('transform', () => {
    describe(`, when commands contain 'route' property,`, () => {
      it('should return absolute path', () => {
        spyOn(routingConfigService, 'getRouteConfig').and.returnValue({
          paths: ['path/:param1'],
        });
        const resultPath = service.transform({
          cxRoute: 'test',
          params: { param1: 'value1' },
        });
        expect(resultPath[0]).toEqual('/');
      });

      it('should return relative path when the first command is not object with "route" property', () => {
        spyOn(routingConfigService, 'getRouteConfig').and.returnValue({
          paths: ['path/:param1'],
        });
        const resultPath = service.transform([
          'testString',
          {
            cxRoute: 'test',
            params: { param1: 'value1' },
          },
        ]);
        expect(resultPath[0]).toEqual('testString');
      });

      function test_transform({
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
        expect(service.transform(urlCommands)).toEqual(expectedResult);
      }

      it(`should return the root path when route config for given route are undefined`, () => {
        test_transform({
          urlCommands: { cxRoute: 'test' },
          routesConfigs: [undefined],
          expectedResult: ['/'],
        });
      });

      it(`should return the root path when route config for given route are null`, () => {
        test_transform({
          urlCommands: { cxRoute: 'test' },
          routesConfigs: [null],
          expectedResult: ['/'],
        });
      });

      it(`should return the root path when configured paths for given route are undefined`, () => {
        test_transform({
          urlCommands: { cxRoute: 'test' },
          routesConfigs: [{ paths: undefined }],
          expectedResult: ['/'],
        });
      });

      it(`should return the root path when configured paths for given route are null`, () => {
        test_transform({
          urlCommands: { cxRoute: 'test' },
          routesConfigs: [{ paths: null }],
          expectedResult: ['/'],
        });
      });

      it(`should return the root path when configured paths for given route are empty array`, () => {
        test_transform({
          urlCommands: { cxRoute: 'test' },
          routesConfigs: [{ paths: [] }],
          expectedResult: ['/'],
        });
      });

      it(`should return the root path when no path from routes config can satisfy its params with given params`, () => {
        test_transform({
          urlCommands: {
            cxRoute: 'test',
            params: { param3: 'value3' },
          },
          routesConfigs: [{ paths: ['path/:param1', 'path/:param1'] }],

          expectedResult: ['/'],
        });
      });

      it(`should return first path without params when no params given`, () => {
        test_transform({
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
        test_transform({
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
        test_transform({
          urlCommands: {
            cxRoute: 'test',
            params: { param1: 'value1' },
          },
          routesConfigs: [{ paths: ['path/:param1', 'other-path/:param1'] }],

          expectedResult: ['/', 'path', 'value1'],
        });
      });

      it(`should return first path that can be satisfied with given params (case 2)`, () => {
        test_transform({
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
        test_transform({
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
        test_transform({
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
        test_transform({
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
        test_transform({
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
        test_transform({
          urlCommands: [{ cxRoute: 'test1' }, { cxRoute: 'tes2' }],
          routesConfigs: [{ paths: ['path1'] }, { paths: null }],
          expectedResult: ['/'],
        });
      });

      it(`should concatenate paths for two nested routes`, () => {
        test_transform({
          urlCommands: [{ cxRoute: 'test1' }, { cxRoute: 'test2' }],
          routesConfigs: [{ paths: ['path1'] }, { paths: ['path2'] }],
          expectedResult: ['/', 'path1', 'path2'],
        });
      });

      it(`should concatenate paths for two nested routes, using first configured path - separately for every route`, () => {
        test_transform({
          urlCommands: [{ cxRoute: 'test1' }, { cxRoute: 'test2' }],
          routesConfigs: [
            { paths: ['path1', 'path10'] },
            { paths: ['path2', 'path20'] },
          ],
          expectedResult: ['/', 'path1', 'path2'],
        });
      });

      it(`should concatenate paths for three nested routes`, () => {
        test_transform({
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
        test_transform({
          urlCommands: [{ cxRoute: 'test1' }, { cxRoute: 'test2' }],
          routesConfigs: [null, null],
          expectedResult: ['/'],
        });
      });

      it(`should concatenate paths for nested routes, using given params for first route (case 1)`, () => {
        test_transform({
          urlCommands: [
            { cxRoute: 'test1', params: { param1: 'value1' } },
            { cxRoute: 'test2' },
          ],
          routesConfigs: [{ paths: ['path1/:param1'] }, { paths: ['path2'] }],
          expectedResult: ['/', 'path1', 'value1', 'path2'],
        });
      });

      it(`should concatenate paths for nested routes, using given params for second route (case 2)`, () => {
        test_transform({
          urlCommands: [
            { cxRoute: 'test1' },
            { cxRoute: 'test2', params: { param2: 'value2' } },
          ],
          routesConfigs: [{ paths: ['path1'] }, { paths: ['path2/:param2'] }],
          expectedResult: ['/', 'path1', 'path2', 'value2'],
        });
      });

      it(`should concatenate paths for nested routes, using given params for all routes`, () => {
        test_transform({
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
        test_transform({
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
        test_transform({
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
        test_transform({
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
        test_transform({
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
        test_transform({
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
