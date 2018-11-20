import { TestBed } from '@angular/core/testing';
import { DynamicUrlPipeService } from './dynamic-url-pipe.service';
import { PathPipeService } from './path-pipe.service';
import { DynamicUrlRecognizerService } from './dynamic-url-recognizer.service';

const mockPathService = {
  transform: () => {}
};

const mockDynamicUrlRecognizerService = {
  getPageAndParameters: () => {}
};

describe('DynamicUrlPipeService', () => {
  let pathService: PathPipeService;
  let service: DynamicUrlPipeService;
  let dynamicUrlRecognizer: DynamicUrlRecognizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DynamicUrlPipeService,
        {
          provide: PathPipeService,
          useValue: mockPathService
        },
        {
          provide: DynamicUrlRecognizerService,
          useValue: mockDynamicUrlRecognizerService
        }
      ]
    });

    pathService = TestBed.get(PathPipeService);
    dynamicUrlRecognizer = TestBed.get(DynamicUrlRecognizerService);
    service = TestBed.get(DynamicUrlPipeService);
  });

  describe('transform', () => {
    it('should return result from PathPipeService', () => {
      const inputUrl = 'test-path/value1/value2';
      const expectedResult = 'expected-result';
      spyOn(pathService, 'transform').and.returnValue(expectedResult);
      spyOn(dynamicUrlRecognizer, 'getPageAndParameters').and.returnValue({
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

    it('should get matching page name and parameters from DynamicUrlRecognizerService', () => {
      const inputUrl = 'test-path/value1/value2';
      spyOn(dynamicUrlRecognizer, 'getPageAndParameters').and.returnValue({
        pageName: null,
        parameters: null
      });
      service.transform(inputUrl);
      expect(dynamicUrlRecognizer.getPageAndParameters).toHaveBeenCalledWith(
        inputUrl
      );
    });

    it('should return original url if there is no matching page for this url', () => {
      const inputUrl = 'unknown-path';
      spyOn(dynamicUrlRecognizer, 'getPageAndParameters').and.returnValue({
        pageName: null,
        parameters: null
      });
      expect(service.transform(inputUrl)).toBe(inputUrl);
    });
  });
});
