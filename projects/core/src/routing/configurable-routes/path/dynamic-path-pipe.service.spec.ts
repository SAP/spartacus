import { TestBed } from '@angular/core/testing';
import { DynamicPathPipeService } from './dynamic-path-pipe.service';
import { PathPipeService } from './path-pipe.service';
import { PathRecognizerService } from './path-recognizer.service';

const mockPathService = {
  transform: () => {}
};

const mockPathRecognizerService = {
  getPageAndParameters: () => {}
};

describe('DynamicPathPipeService', () => {
  let pathService: PathPipeService;
  let service: DynamicPathPipeService;
  let pathRecognizer: PathRecognizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DynamicPathPipeService,
        {
          provide: PathPipeService,
          useValue: mockPathService
        },
        {
          provide: PathRecognizerService,
          useValue: mockPathRecognizerService
        }
      ]
    });

    pathService = TestBed.get(PathPipeService);
    pathRecognizer = TestBed.get(PathRecognizerService);
    service = TestBed.get(DynamicPathPipeService);
  });

  describe('transform', () => {
    it('should return result from PathPipeService', () => {
      const inputUrl = 'test-path/value1/value2';
      const expectedResult = 'expected-result';
      spyOn(pathService, 'transform').and.returnValue(expectedResult);
      spyOn(pathRecognizer, 'getPageAndParameters').and.returnValue({
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

    it('should get matching page name and parameters from PathRecognizerService', () => {
      const inputUrl = 'test-path/value1/value2';
      spyOn(pathRecognizer, 'getPageAndParameters').and.returnValue({
        pageName: null,
        parameters: null
      });
      service.transform(inputUrl);
      expect(pathRecognizer.getPageAndParameters).toHaveBeenCalledWith(
        inputUrl
      );
    });

    it('should return original url if there is no matching page for this url', () => {
      const inputUrl = 'unknown-path';
      spyOn(pathRecognizer, 'getPageAndParameters').and.returnValue({
        pageName: null,
        parameters: null
      });
      expect(service.transform(inputUrl)).toBe(inputUrl);
    });
  });
});
