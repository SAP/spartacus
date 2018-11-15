import { TestBed } from '@angular/core/testing';
import { RoutesConfigLoader } from '../routes-config-loader';
import { RoutesTranslations } from '../routes-config';
import { PathRecognizerService } from './path-recognizer.service';

const mockRoutesConfigLoader = {
  routesConfig: { translations: { default: {} } }
};

describe('PathRecognizerService', () => {
  let loader: RoutesConfigLoader;
  let service: PathRecognizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PathRecognizerService,
        {
          provide: RoutesConfigLoader,
          useValue: mockRoutesConfigLoader
        }
      ]
    });

    loader = TestBed.get(RoutesConfigLoader);
    service = TestBed.get(PathRecognizerService);
  });

  describe('transform', () => {
    interface TestCase {
      inputUrl: string;
      translations: RoutesTranslations;
      expectedResult: {
        pageName: string;
        parameters: object;
      };
    }

    function test_getMatchingPageAndParameters(
      { inputUrl, translations, expectedResult }: TestCase,
      index: number
    ) {
      it(`should return matching page name and extracted parameters values from input url - test case ${index}`, () => {
        loader.routesConfig.translations.default = translations;
        expect(service.getMatchingPageAndParameters(inputUrl)).toEqual(
          expectedResult
        );
      });
    }

    const testCases: TestCase[] = [
      {
        inputUrl: '/path2',
        translations: {
          page1: ['path1'],
          page2: ['path2']
        },
        expectedResult: { pageName: 'page2', parameters: {} }
      },
      {
        inputUrl: 'path2',
        translations: {
          page1: ['path1'],
          page2: ['path2']
        },
        expectedResult: { pageName: 'page2', parameters: {} }
      },
      {
        inputUrl: 'unknown-path',
        translations: {
          page1: ['path1'],
          page2: ['path2']
        },
        expectedResult: { pageName: null, parameters: {} }
      },
      {
        inputUrl: 'path2/value1/value2',
        translations: {
          page1: ['path1/:param1/:param2'],
          page2: ['path2/:param1/:param2']
        },
        expectedResult: {
          pageName: 'page2',
          parameters: { param1: 'value1', param2: 'value2' }
        }
      },
      {
        inputUrl: 'path2A/value1/path2B',
        translations: {
          page1: ['path1A/:param1/path1B'],
          page2: ['path2A/:param1/path2B']
        },
        expectedResult: { pageName: 'page2', parameters: { param1: 'value1' } }
      },
      {
        inputUrl: 'pathA/value1/pathB/value2',
        translations: {
          page1: ['pathA/:param1/pathB'],
          page2: ['pathA/:param1/pathB/:param2']
        },
        expectedResult: {
          pageName: 'page2',
          parameters: { param1: 'value1', param2: 'value2' }
        }
      },
      {
        inputUrl: 'pathA/value1/pathB/value2',
        translations: {
          page1: ['pathA/:param1/pathB', 'pathA/:param1/pathB/:param2'],
          page2: ['pathA/:param1/pathB/:param2/:param3']
        },
        expectedResult: {
          pageName: 'page1',
          parameters: { param1: 'value1', param2: 'value2' }
        }
      },
      {
        inputUrl: 'pathA/value1/pathB/value2/value3',
        translations: {
          page1: ['pathA/:param1/pathB', 'pathA/:param1/pathB/:param2'],
          page2: ['pathA/:param1/pathB/:param2/:param3']
        },
        expectedResult: {
          pageName: 'page2',
          parameters: { param1: 'value1', param2: 'value2', param3: 'value3' }
        }
      }
    ];
    testCases.forEach(test_getMatchingPageAndParameters);
  });
});
