import { TestBed } from '@angular/core/testing';
import { PathPipeService } from './path-pipe.service';
import { ConfigurableRoutesService } from '../configurable-routes.service';
import { ServerConfig } from '../../../config/server-config/server-config';
import { RouteTranslation } from '../routes-config';
import { UrlParser } from './url-parser.service';
import { RouterTestingModule } from '@angular/router/testing';

const mockConfigurableRoutesService = {
  getNestedRoutesTranslations: () => {}
};

describe('PathPipeService', () => {
  let service: PathPipeService;
  let serverConfig: ServerConfig;
  let routesService: ConfigurableRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        PathPipeService,
        UrlParser,
        {
          provide: ConfigurableRoutesService,
          useValue: mockConfigurableRoutesService
        },
        { provide: ServerConfig, useValue: {} }
      ]
    });

    service = TestBed.get(PathPipeService);
    serverConfig = TestBed.get(ServerConfig);
    routesService = TestBed.get(ConfigurableRoutesService);
  });

  describe('transfrom', () => {
    // tslint:disable-next-line:max-line-length
    it('should console.warn in non-production environment when no configured path matches all its parameters to given object using parameter names mapping ', () => {
      serverConfig.production = false;
      spyOn(console, 'warn');
      spyOn(routesService, 'getNestedRoutesTranslations').and.returnValue([
        { paths: ['path/:param1'] }
      ]);
      service.transform(['test'], [{ param2: 'value2' }]);
      expect(console.warn).toHaveBeenCalledTimes(1);
    });

    // tslint:disable-next-line:max-line-length
    it('should NOT console.warn in production environment when no configured path matches all its parameters to given object using parameter names mapping ', () => {
      serverConfig.production = true;
      spyOn(console, 'warn');
      spyOn(routesService, 'getNestedRoutesTranslations').and.returnValue([
        { paths: ['path/:param1'] }
      ]);
      service.transform(['test'], [{ param2: 'value2' }]);
      expect(console.warn).not.toHaveBeenCalled();
    });

    it('should return absolute path', () => {
      spyOn(routesService, 'getNestedRoutesTranslations').and.returnValue([
        { paths: ['path/:param1'] }
      ]);
      const resultPath = service.transform(['test'], [{ param1: 'value1' }]);
      expect(resultPath[0]).toBe('');
    });

    interface TransformTestCase {
      debug?: boolean;
      description: string;
      nestedRoutesNames: string[];
      nestedRoutesParams: object[];
      nestedRoutesTranslations: RouteTranslation[];
      expectedResult: string[];
    }
    function test_transform({
      debug,
      description,
      nestedRoutesNames,
      nestedRoutesParams,
      nestedRoutesTranslations,
      expectedResult
    }: TransformTestCase) {
      it(description, () => {
        if (debug) {
          // tslint:disable-next-line:no-debugger
          debugger;
        }
        spyOn(routesService, 'getNestedRoutesTranslations').and.returnValue(
          nestedRoutesTranslations
        );
        expect(
          service.transform(nestedRoutesNames, nestedRoutesParams)
        ).toEqual(expectedResult);
      });
    }
    const trasfromTestCases: TransformTestCase[] = [
      {
        description: `should return the root path when translations for given route are undefined`,
        nestedRoutesNames: ['test'],
        nestedRoutesParams: null,
        nestedRoutesTranslations: undefined,
        expectedResult: ['/']
      },
      {
        description: `should return the root path when translations for given route are null`,
        nestedRoutesNames: ['test'],
        nestedRoutesParams: null,
        nestedRoutesTranslations: null,
        expectedResult: ['/']
      },
      {
        description: `should return the root path when translations paths for given route are undefined`,
        nestedRoutesNames: ['test'],
        nestedRoutesParams: null,
        nestedRoutesTranslations: [{ paths: undefined }],
        expectedResult: ['/']
      },
      {
        description: `should return the root path when translations paths for given route are null`,
        nestedRoutesNames: ['test'],
        nestedRoutesParams: null,
        nestedRoutesTranslations: [{ paths: null }],
        expectedResult: ['/']
      },
      {
        description: `should return the root path when translations paths for given route are empty array`,
        nestedRoutesNames: ['test'],
        nestedRoutesParams: null,
        nestedRoutesTranslations: [{ paths: [] }],
        expectedResult: ['/']
      },
      {
        description: `should return the root path when no path from translations can satisfy its params with given params`,
        nestedRoutesNames: ['test'],
        nestedRoutesParams: [{ param3: 'value3' }],
        nestedRoutesTranslations: [{ paths: ['path/:param1', 'path/:param1'] }],
        expectedResult: ['/']
      },
      {
        description: `should return first path without params when no params given`,
        nestedRoutesNames: ['test'],
        nestedRoutesParams: null,
        nestedRoutesTranslations: [
          { paths: ['path/:param1', 'path/without-parameters'] }
        ],
        expectedResult: ['', 'path', 'without-parameters']
      },
      {
        description: `should return first path without params when given params are not sufficient`,
        nestedRoutesNames: ['test'],
        nestedRoutesParams: [{ param2: 'value2' }],
        nestedRoutesTranslations: [
          { paths: ['path/:param1', 'path/without-parameters'] }
        ],
        expectedResult: ['', 'path', 'without-parameters']
      },
      {
        description: `should return first path that can be satisfied with given params (case 1)`,
        nestedRoutesNames: ['test'],
        nestedRoutesParams: [{ param1: 'value1' }],
        nestedRoutesTranslations: [
          { paths: ['path/:param1', 'other-path/:param1'] }
        ],
        expectedResult: ['', 'path', 'value1']
      },
      {
        description: `should return first path that can be satisfied with given params (case 2)`,
        nestedRoutesNames: ['test'],
        nestedRoutesParams: [{ param1: 'value1' }],
        nestedRoutesTranslations: [
          { paths: ['path/without-parameters', 'path/:param1'] }
        ],
        expectedResult: ['', 'path', 'without-parameters']
      },
      {
        description: `should return first path that can be satisfied with given params (case 3)`,
        nestedRoutesNames: ['test'],
        nestedRoutesParams: [
          {
            param2: 'value2',
            param3: 'value3',
            param4: 'value4'
          }
        ],
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
      },
      {
        description: `should return first path that can be satisfied with given params  (case 4)`,
        nestedRoutesNames: ['test'],
        nestedRoutesParams: [
          {
            param2: 'value2',
            param3: 'value3',
            param4: 'value4'
          }
        ],
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
      },
      {
        description: `should use given params mapping (case 1)`,
        nestedRoutesNames: ['test'],
        nestedRoutesParams: [{ param1: 'value1' }],
        nestedRoutesTranslations: [
          {
            paths: ['path/:mappedParam1'],
            paramsMapping: { mappedParam1: 'param1' }
          }
        ],
        expectedResult: ['', 'path', 'value1']
      },
      {
        description: `should use given params mapping (case 2)`,
        nestedRoutesNames: ['test'],
        nestedRoutesParams: [
          {
            param2: 'value2',
            param3: 'value3',
            param4: 'value4'
          }
        ],
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
      },
      {
        description: `should concatenate paths for two nested routes`,
        nestedRoutesNames: ['test1', 'test2'],
        nestedRoutesParams: [{}, {}],
        nestedRoutesTranslations: [{ paths: ['path1'] }, { paths: ['path2'] }],
        expectedResult: ['', 'path1', 'path2']
      },
      {
        description: `should concatenate paths for two nested routes, using first configured path - separately for every nested route`,
        nestedRoutesNames: ['test1', 'test2'],
        nestedRoutesParams: [{}, {}],
        nestedRoutesTranslations: [
          { paths: ['path1', 'path10'] },
          { paths: ['path2', 'path20'] }
        ],
        expectedResult: ['', 'path1', 'path2']
      },
      {
        description: `should concatenate paths for three nested routes`,
        nestedRoutesNames: ['test1', 'test2', 'test3'],
        nestedRoutesParams: [{}, {}],
        nestedRoutesTranslations: [
          { paths: ['path1'] },
          { paths: ['path2'] },
          { paths: ['path3'] }
        ],
        expectedResult: ['', 'path1', 'path2', 'path3']
      },
      {
        description: `should return the root path when there are no translations for given nested routes`,
        nestedRoutesNames: ['test1', 'test2'],
        nestedRoutesParams: [{}, {}],
        nestedRoutesTranslations: null,
        expectedResult: ['/']
      },
      {
        description: `should concatenate paths for nested routes, using given params for first route (case 1)`,
        nestedRoutesNames: ['test1', 'test2'],
        nestedRoutesParams: [{ param1: 'value1' }, {}],
        nestedRoutesTranslations: [
          { paths: ['path1/:param1'] },
          { paths: ['path2'] }
        ],
        expectedResult: ['', 'path1', 'value1', 'path2']
      },
      {
        description: `should concatenate paths for nested routes, using given params for second route (case 2)`,
        nestedRoutesNames: ['test1', 'test2'],
        nestedRoutesParams: [null, { param2: 'value2' }],
        nestedRoutesTranslations: [
          { paths: ['path1'] },
          { paths: ['path2/:param2'] }
        ],
        expectedResult: ['', 'path1', 'path2', 'value2']
      },
      {
        description: `should concatenate paths for nested routes, using given params for all routes`,
        nestedRoutesNames: ['test1', 'test2'],
        nestedRoutesParams: [{ param1: 'value1' }, { param2: 'value2' }],
        nestedRoutesTranslations: [
          { paths: ['path1/:param1'] },
          { paths: [':param2/path2'] }
        ],
        expectedResult: ['', 'path1', 'value1', 'value2', 'path2']
      },
      {
        description: `should concatenate paths for nested routes using given params mapping`,
        nestedRoutesNames: ['test1', 'test2'],
        nestedRoutesParams: [{ param1: 'value1' }, { param2: 'value2' }],
        nestedRoutesTranslations: [
          { paths: ['path1/:param1'] },
          {
            paths: [':mappedParam2/path2'],
            paramsMapping: { mappedParam2: 'param2' }
          }
        ],
        expectedResult: ['', 'path1', 'value1', 'value2', 'path2']
      },
      {
        description: `should concatenate paths using params objects given in relevant order for every route`,
        nestedRoutesNames: ['test1', 'test2'],
        nestedRoutesParams: [{ param1: 'value1' }, { param1: 'value10' }],
        nestedRoutesTranslations: [
          { paths: ['path1/:param1'] },
          { paths: ['path2/:param1'] }
        ],
        expectedResult: ['', 'path1', 'value1', 'path2', 'value10']
      },
      {
        description: `should concatenate paths using first path that can be satisfied with given params - separately every route`,
        nestedRoutesNames: ['test1', 'test2'],
        nestedRoutesParams: [{ param1: 'value1' }, { param3: 'value3' }],
        nestedRoutesTranslations: [
          { paths: ['path1/:param1'] },
          { paths: ['path2/:param2', 'path2/:param3'] }
        ],
        expectedResult: ['', 'path1', 'value1', 'path2', 'value3']
      },
      {
        description: `should return the root path when no translation path can satisfy its params with given params for some route`,
        nestedRoutesNames: ['test1', 'test2'],
        nestedRoutesParams: [{ param1: 'value1' }, { param3: 'value3' }],
        nestedRoutesTranslations: [
          { paths: ['path1/:param1'] },
          { paths: ['path2/:param2'] }
        ],
        expectedResult: ['/']
      }
    ];
    trasfromTestCases.forEach(test_transform);
  });
});
