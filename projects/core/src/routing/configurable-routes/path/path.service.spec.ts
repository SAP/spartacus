import { TestBed } from '@angular/core/testing';
import { PathService } from './path.service';
import { ConfigurableRoutesService } from '../configurable-routes.service';
import { ServerConfig } from '../../../config/server-config/server-config';

const mockConfigurableRoutesService = {
  getPathsForPage: () => {},
  getParameterNamesMapping: () => ({})
};

describe('PathService', () => {
  let service: PathService;
  let serverConfig: ServerConfig;
  let routesService: ConfigurableRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PathService,
        {
          provide: ConfigurableRoutesService,
          useValue: mockConfigurableRoutesService
        },
        { provide: ServerConfig, useValue: {} }
      ]
    });

    service = TestBed.get(PathService);
    serverConfig = TestBed.get(ServerConfig);
    routesService = TestBed.get(ConfigurableRoutesService);
  });

  describe('transfrom', () => {
    it('should return "/" when there are no configured paths for given page name ', () => {
      spyOn(console, 'warn');
      spyOn(routesService, 'getPathsForPage').and.returnValue(undefined);
      expect(service.transform('testPageName')).toBe('/');
    });

    it('should return "/" when there configured paths for given page name are "null"', () => {
      spyOn(console, 'warn');
      spyOn(routesService, 'getPathsForPage').and.returnValue(null);
      expect(service.transform('testPageName')).toBe('/');
    });

    it('should return "/" when no configured path matches all its parameters to given object using parameter names mapping ', () => {
      spyOn(console, 'warn');
      spyOn(routesService, 'getPathsForPage').and.returnValue([
        'test-path/:unmetParameter'
      ]);
      spyOn(routesService, 'getParameterNamesMapping').and.returnValue({});
      expect(service.transform('testPageName', { param1: 'value1' })).toBe('/');
    });

    // tslint:disable-next-line:max-line-length
    it('should console.warn in non-production environment when no configured path matches all its parameters to given object using parameter names mapping ', () => {
      serverConfig.production = false;
      spyOn(console, 'warn');
      spyOn(routesService, 'getPathsForPage').and.returnValue([
        'test-path/:param1'
      ]);
      spyOn(routesService, 'getParameterNamesMapping').and.returnValue({});
      service.transform('testPageName', { param2: 'value2' });
      expect(console.warn).toHaveBeenCalledTimes(1);
    });

    // tslint:disable-next-line:max-line-length
    it('should NOT console.warn in production environment when no configured path matches all its parameters to given object using parameter names mapping ', () => {
      serverConfig.production = true;
      spyOn(console, 'warn');
      spyOn(routesService, 'getPathsForPage').and.returnValue([
        'test-path/:param1'
      ]);
      spyOn(routesService, 'getParameterNamesMapping').and.returnValue({});
      service.transform('testPageName', { param2: 'value2' });
      expect(console.warn).not.toHaveBeenCalled();
    });

    it('should return absolute path', () => {
      spyOn(routesService, 'getPathsForPage').and.returnValue([
        'test-path/:param1'
      ]);
      spyOn(routesService, 'getParameterNamesMapping').and.returnValue({});
      const resultPath = service.transform('testPageName', {
        param1: 'value1'
      });
      expect(resultPath.startsWith('/')).toBeTruthy();
      expect(resultPath).toContain('test-path/value1');
    });

    interface TransformTestCase {
      paths: string[];
      parametersObject: object;
      parameterNamesMapping: { [_: string]: string };
      expectedResult: string;
    }

    function test_transform(
      {
        parametersObject,
        paths,
        parameterNamesMapping,
        expectedResult
      }: TransformTestCase,
      index: number
    ) {
      // tslint:disable-next-line:max-line-length
      it(`should return first configured path that matches all its parameters to given object using parameter names mapping - test case ${index}`, () => {
        spyOn(routesService, 'getParameterNamesMapping').and.returnValue(
          parameterNamesMapping
        );
        spyOn(routesService, 'getPathsForPage').and.returnValue(paths);
        expect(service.transform('testPageName', parametersObject)).toBe(
          expectedResult
        );
      });
    }

    const trasfromTestCases: TransformTestCase[] = [
      {
        parametersObject: {},
        paths: ['test-path/without-parameters'],
        parameterNamesMapping: {},
        expectedResult: '/test-path/without-parameters'
      },
      {
        parametersObject: {},
        paths: ['test-path/:param1', 'test-path/without-parameters'],
        parameterNamesMapping: {},
        expectedResult: '/test-path/without-parameters'
      },
      {
        parametersObject: { param2: 'value2' },
        paths: ['test-path/:param1', 'test-path/without-parameters'],
        parameterNamesMapping: {},
        expectedResult: '/test-path/without-parameters'
      },
      {
        parametersObject: { param1: 'value1' },
        paths: ['test-path/:param1', 'test-path/without-parameters'],
        parameterNamesMapping: {},
        expectedResult: '/test-path/value1'
      },
      {
        parametersObject: { param1: 'value1' },
        paths: ['test-path/without-parameters', 'test-path/:param1'],
        parameterNamesMapping: {},
        expectedResult: '/test-path/without-parameters'
      },
      {
        parametersObject: {
          param2: 'value2',
          param3: 'value3',
          param4: 'value4'
        },
        paths: [
          'test-path/:param1/:param2',
          'test-path/:param1',
          'test-path/:param3/:param2',
          'test-path/:param4'
        ],
        parameterNamesMapping: {},
        expectedResult: '/test-path/value3/value2'
      },
      {
        parametersObject: {
          param2: 'value2',
          param3: 'value3',
          param4: 'value4'
        },
        paths: [
          'test-path/:param1/:param2',
          'test-path/:param1',
          'test-path/:param4',
          'test-path/:param3/:param2'
        ],
        parameterNamesMapping: {},
        expectedResult: '/test-path/value4'
      },
      {
        parametersObject: { param1: 'value1' },
        paths: ['test-path/:mappedParam1'],
        parameterNamesMapping: { mappedParam1: 'param1' },
        expectedResult: '/test-path/value1'
      },
      {
        parametersObject: {
          param2: 'value2',
          param3: 'value3',
          param4: 'value4'
        },
        paths: [
          'test-path/:param1/:param2',
          'test-path/:param1',
          'test-path/:param3/:mappedParam2',
          'test-path/:param4'
        ],
        parameterNamesMapping: { mappedParam2: 'param2' },
        expectedResult: '/test-path/value3/value2'
      }
    ];
    trasfromTestCases.forEach(test_transform);

    it('should return path with URI-encoded slashes in parameters values', () => {
      spyOn(routesService, 'getParameterNamesMapping').and.returnValue({});
      spyOn(routesService, 'getPathsForPage').and.returnValue([
        'path/:param1/test'
      ]);
      const parametersObject = {
        param1: 'value/with/slashes'
      };
      expect(service.transform('testPageName', parametersObject)).toBe(
        '/path/value%2Fwith%2Fslashes/test'
      );
    });
  });
});
