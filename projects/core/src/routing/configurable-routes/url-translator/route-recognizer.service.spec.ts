import { TestBed } from '@angular/core/testing';
import { RoutesConfigLoader } from '../routes-config-loader';
import { RoutesTranslations } from '../routes-config';
import { RouteRecognizerService } from './route-recognizer.service';
import { RouterTestingModule } from '@angular/router/testing';
import { UrlParserService } from './url-parser.service';

const mockRoutesConfigLoader = {
  routesConfig: { translations: { default: {} } }
};

describe('RouteRecognizerService', () => {
  let loader: RoutesConfigLoader;
  let service: RouteRecognizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        RouteRecognizerService,
        UrlParserService,
        {
          provide: RoutesConfigLoader,
          useValue: mockRoutesConfigLoader
        }
      ]
    });

    loader = TestBed.get(RoutesConfigLoader);
    service = TestBed.get(RouteRecognizerService);
  });

  describe('recognizeByDefaultUrl', () => {
    function test_recognizeByDefaultUrl({
      url,
      defaultTranslations,
      expectedResult
    }: {
      url: string;
      defaultTranslations: RoutesTranslations;
      expectedResult: {
        name: string;
        params: object;
      }[];
    }) {
      loader.routesConfig.translations.default = defaultTranslations;
      expect(service.recognizeByDefaultUrl(url)).toEqual(expectedResult);
    }

    it('should return route name for given absolute url', () => {
      test_recognizeByDefaultUrl({
        url: '/path2',
        defaultTranslations: {
          page1: { paths: ['path1'] },
          page2: { paths: ['path2'] }
        },
        expectedResult: [{ name: 'page2', params: {} }]
      });
    });

    it('should return route name for given relative url, treating as absolute', () => {
      test_recognizeByDefaultUrl({
        url: 'path2',
        defaultTranslations: {
          page1: { paths: ['path1'] },
          page2: { paths: ['path2'] }
        },
        expectedResult: [{ name: 'page2', params: {} }]
      });
    });

    it('should return null for unknown url (case 1)', () => {
      test_recognizeByDefaultUrl({
        url: 'unknown-path',
        defaultTranslations: {
          page1: { paths: ['path1'] },
          page2: { paths: ['path2'] }
        },
        expectedResult: null
      });
    });

    it('should return null for unknown url (case 2)', () => {
      test_recognizeByDefaultUrl({
        url: 'path1/path2/path3/unknown-path4',
        defaultTranslations: {
          page1: {
            paths: ['path1'],
            children: {
              page2: {
                paths: ['path2'],
                children: {
                  page3: {
                    paths: ['path3']
                  }
                }
              }
            }
          }
        },
        expectedResult: null
      });
    });

    it('should return route name and params for given url (case 1)', () => {
      test_recognizeByDefaultUrl({
        url: 'path2/value1/value2',
        defaultTranslations: {
          page1: { paths: ['path1/:param1/:param2'] },
          page2: { paths: ['path2/:param1/:param2'] }
        },
        expectedResult: [
          { name: 'page2', params: { param1: 'value1', param2: 'value2' } }
        ]
      });
    });

    it('should return route name and params for given url (case 2)', () => {
      test_recognizeByDefaultUrl({
        url: 'path/value1/path/value2',
        defaultTranslations: {
          page1: { paths: ['path/:param1/path', 'path/:param1/path/:param2'] },
          page2: { paths: ['path/:param1/path/:param2/:param3'] }
        },
        expectedResult: [
          { name: 'page1', params: { param1: 'value1', param2: 'value2' } }
        ]
      });
    });

    it('should return route name and params for given url (case 3)', () => {
      test_recognizeByDefaultUrl({
        url: 'path/value1/path/value2/value3',
        defaultTranslations: {
          page1: { paths: ['path/:param1/path', 'path/:param1/path/:param2'] },
          page2: { paths: ['path/:param1/path/:param2/:param3'] }
        },
        expectedResult: [
          {
            name: 'page2',
            params: {
              param1: 'value1',
              param2: 'value2',
              param3: 'value3'
            }
          }
        ]
      });
    });

    it('should return 2 names of nested routes for given url consisting of 2 nested routes (case 1)', () => {
      test_recognizeByDefaultUrl({
        url: 'path1/path2',
        defaultTranslations: {
          page1: {
            paths: ['path1'],
            children: {
              page2: {
                paths: ['path2']
              }
            }
          }
        },
        expectedResult: [
          { name: 'page1', params: {} },
          { name: 'page2', params: {} }
        ]
      });
    });

    it('should return 2 names of nested routes for given url consisting of 2 nested routes (case 2)', () => {
      test_recognizeByDefaultUrl({
        url: 'path1/path2',
        defaultTranslations: {
          page1: {
            paths: ['path1'],
            children: {
              page2: {
                paths: ['path2'],
                children: {
                  page3: {
                    paths: ['path3']
                  }
                }
              }
            }
          }
        },
        expectedResult: [
          { name: 'page1', params: {} },
          { name: 'page2', params: {} }
        ]
      });
    });

    it('should return 3 names of nested routes for given url consisting of 3 nested routes', () => {
      test_recognizeByDefaultUrl({
        url: 'path1/path2/path3',
        defaultTranslations: {
          page1: {
            paths: ['path1'],
            children: {
              page2: {
                paths: ['path2'],
                children: {
                  page3: {
                    paths: ['path3']
                  }
                }
              }
            }
          }
        },
        expectedResult: [
          { name: 'page1', params: {} },
          { name: 'page2', params: {} },
          { name: 'page3', params: {} }
        ]
      });
    });

    it('should return routes names and params objects in relevant order for url consisting of 2 nested routes (case 1)', () => {
      test_recognizeByDefaultUrl({
        url: 'path1/value1/path2/value2',
        defaultTranslations: {
          page1: {
            paths: ['path1/:param1'],
            children: {
              page2: {
                paths: ['path2/:param2']
              }
            }
          }
        },
        expectedResult: [
          { name: 'page1', params: { param1: 'value1' } },
          { name: 'page2', params: { param2: 'value2' } }
        ]
      });
    });

    it('should return routes names and params objects in relevant order for url consisting of 2 nested routes (case 2)', () => {
      test_recognizeByDefaultUrl({
        url: 'path1/value1/path2/value2',
        defaultTranslations: {
          page1: {
            paths: ['path1/:param1'],
            children: {
              page2: {
                paths: ['path2/:param2'],
                children: {
                  page3: {
                    paths: ['path3/:param3']
                  }
                }
              }
            }
          }
        },
        expectedResult: [
          { name: 'page1', params: { param1: 'value1' } },
          { name: 'page2', params: { param2: 'value2' } }
        ]
      });
    });

    it('should return routes names and params objects in relevant order for url consisting of 3 nested routes', () => {
      test_recognizeByDefaultUrl({
        url: 'path1/value1/path2/value2/path3/value3',
        defaultTranslations: {
          page1: {
            paths: ['path1/:param1'],
            children: {
              page2: {
                paths: ['path2/:param2'],
                children: {
                  page3: {
                    paths: ['path3/:param3']
                  }
                }
              }
            }
          }
        },
        expectedResult: [
          { name: 'page1', params: { param1: 'value1' } },
          { name: 'page2', params: { param2: 'value2' } },
          { name: 'page3', params: { param3: 'value3' } }
        ]
      });
    });

    it('should return routes exactly matching to given url - even if some other translations are matching partialy', () => {
      test_recognizeByDefaultUrl({
        url: 'path1/value1/path2/value2/path3',
        defaultTranslations: {
          page1: {
            paths: ['path1/:param1'],
            children: {
              page2: {
                paths: ['path2/:param2'],
                children: {
                  page3: {
                    paths: ['path3/:param3']
                  }
                }
              },
              page20: {
                paths: ['path2/:param2/path3']
              }
            }
          }
        },
        expectedResult: [
          { name: 'page1', params: { param1: 'value1' } },
          { name: 'page20', params: { param2: 'value2' } }
        ]
      });
    });
  });
});
