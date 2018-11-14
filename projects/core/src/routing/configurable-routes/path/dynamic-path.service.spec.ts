import { TestBed } from '@angular/core/testing';
import { DynamicPathService } from './dynamic-path.service';
import { PathService } from './path.service';
import { PathRecognizerService } from './path-recognizer.service';

const mockPathService = {
  transform: () => {}
};

const mockPathRecognizerService = {
  getMatchingPageAndParameters: () => {}
};

describe('DynamicPathService', () => {
  let pathService: PathService;
  let service: DynamicPathService;
  let pathRecognizer: PathRecognizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DynamicPathService,
        {
          provide: PathService,
          useValue: mockPathService
        },
        {
          provide: PathRecognizerService,
          useValue: mockPathRecognizerService
        }
      ]
    });

    pathService = TestBed.get(PathService);
    pathRecognizer = TestBed.get(PathRecognizerService);
    service = TestBed.get(DynamicPathService);
  });

  describe('transform', () => {
    it('should return result from PathService', () => {
      const inputUrl = 'test-path/value1/value2';
      const expectedResult = 'expected-result';
      spyOn(pathService, 'transform').and.returnValue(expectedResult);
      spyOn(pathRecognizer, 'getMatchingPageAndParameters').and.returnValue({
        pageName: 'testPageName',
        parameters: { param1: 'value1', param2: 'value2' }
      });

      const result = service.transform(inputUrl);

      expect(pathService.transform).toHaveBeenCalledWith('testPageName', {
        param1: 'value1',
        param2: 'value2'
      });
      expect(result).toBe(expectedResult);
    });

    it('should use PathRecognizerService to get matching page name and parameters', () => {
      const inputUrl = 'test-path/value1/value2';
      spyOn(pathRecognizer, 'getMatchingPageAndParameters').and.returnValue({
        pageName: null,
        parameters: null
      });
      service.transform(inputUrl);
      expect(pathRecognizer.getMatchingPageAndParameters).toHaveBeenCalledWith(
        inputUrl
      );
    });

    it('should return original url if there is no matching page for this url', () => {
      const inputUrl = 'unknown-path';
      spyOn(pathRecognizer, 'getMatchingPageAndParameters').and.returnValue({
        pageName: null,
        parameters: null
      });
      expect(service.transform(inputUrl)).toBe(inputUrl);
    });
  });
});
