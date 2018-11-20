import { TestBed } from '@angular/core/testing';
import { RoutesConfigLoader } from '../routes-config-loader';
import { RoutesTranslations } from '../routes-config';
import { DynamicUrlRecognizerService } from './dynamic-url-recognizer.service';

const mockRoutesConfigLoader = {
  routesConfig: { translations: { default: {} } }
};

describe('DynamicUrlRecognizerService', () => {
  let loader: RoutesConfigLoader;
  let service: DynamicUrlRecognizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DynamicUrlRecognizerService,
        {
          provide: RoutesConfigLoader,
          useValue: mockRoutesConfigLoader
        }
      ]
    });

    loader = TestBed.get(RoutesConfigLoader);
    service = TestBed.get(DynamicUrlRecognizerService);
  });

  describe('getPageAndParameters', () => {
    interface TestCase {
      inputUrl: string;
      defaultTranslations: RoutesTranslations;
      expectedResult: {
        pageName: string;
        parameters: object;
      };
    }

    function test_getPageAndParameters(
      { inputUrl, defaultTranslations, expectedResult }: TestCase,
      index: number
    ) {
      it(`should return matching page name and extracted parameters values from input url - test case ${index}`, () => {
        loader.routesConfig.translations.default = defaultTranslations;
        expect(service.getPageAndParameters(inputUrl)).toEqual(expectedResult);
      });
    }

    const testCases: TestCase[] = [
      {
        inputUrl: '/path2',
        defaultTranslations: {
          page1: ['path1'],
          page2: ['path2']
        },
        expectedResult: { pageName: 'page2', parameters: {} }
      },
      {
        inputUrl: 'path2',
        defaultTranslations: {
          page1: ['path1'],
          page2: ['path2']
        },
        expectedResult: { pageName: 'page2', parameters: {} }
      },
      {
        inputUrl: 'unknown-path',
        defaultTranslations: {
          page1: ['path1'],
          page2: ['path2']
        },
        expectedResult: { pageName: null, parameters: {} }
      },
      {
        inputUrl: 'path2/value1/value2',
        defaultTranslations: {
          page1: ['path1/:param1/:param2'],
          page2: ['path2/:param1/:param2']
        },
        expectedResult: {
          pageName: 'page2',
          parameters: { param1: 'value1', param2: 'value2' }
        }
      },
      {
        inputUrl: 'path2/value1/value2',
        defaultTranslations: {
          page1: ['path1/:param1/:param2'],
          page2: ['path2/:param100/:param200']
        },
        expectedResult: {
          pageName: 'page2',
          parameters: { param100: 'value1', param200: 'value2' }
        }
      },
      {
        inputUrl: 'path2/value1/path2',
        defaultTranslations: {
          page1: ['path1/:param1/path1'],
          page2: ['path2/:param1/path2']
        },
        expectedResult: { pageName: 'page2', parameters: { param1: 'value1' } }
      },
      {
        inputUrl: 'path/value1/path/value2',
        defaultTranslations: {
          page1: ['path/:param1/path'],
          page2: ['path/:param1/path/:param2']
        },
        expectedResult: {
          pageName: 'page2',
          parameters: { param1: 'value1', param2: 'value2' }
        }
      },
      {
        inputUrl: 'path/value1/path/value2',
        defaultTranslations: {
          page1: ['path/:param1/path', 'path/:param1/path/:param2'],
          page2: ['path/:param1/path/:param2/:param3']
        },
        expectedResult: {
          pageName: 'page1',
          parameters: { param1: 'value1', param2: 'value2' }
        }
      },
      {
        inputUrl: 'path/value1/path/value2/value3',
        defaultTranslations: {
          page1: ['path/:param1/path', 'path/:param1/path/:param2'],
          page2: ['path/:param1/path/:param2/:param3']
        },
        expectedResult: {
          pageName: 'page2',
          parameters: { param1: 'value1', param2: 'value2', param3: 'value3' }
        }
      }
    ];
    testCases.forEach(test_getPageAndParameters);
  });
});
