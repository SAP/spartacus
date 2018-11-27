import { TestBed } from '@angular/core/testing';
import { DynamicUrlPipeService } from './dynamic-url-pipe.service';
import { PathPipeService } from './path-pipe.service';
import { DynamicUrlRecognizerService } from './dynamic-url-recognizer.service';

const mockPathService = {
  transform: () => {}
};

const mockDynamicUrlRecognizerService = {
  getNestedRoutes: () => {}
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
      const expectedResult = ['expected-result'];
      spyOn(pathService, 'transform').and.returnValue(expectedResult);
      spyOn(dynamicUrlRecognizer, 'getNestedRoutes').and.returnValue({
        nestedRoutesNames: 'testRouteName',
        nestedRoutesParams: { param1: 'value1', param2: 'value2' }
      });

      const result = service.transform(inputUrl);

      expect(pathService.transform).toHaveBeenCalledWith('testRouteName', {
        param1: 'value1',
        param2: 'value2'
      });
      expect(result).toBe(expectedResult);
    });

    it('should get matching route name and params from DynamicUrlRecognizerService', () => {
      const inputUrl = 'test-path/value1/value2';
      spyOn(dynamicUrlRecognizer, 'getNestedRoutes').and.returnValue({
        nestedRoutesNames: null,
        nestedRoutesParams: null
      });
      service.transform(inputUrl);
      expect(dynamicUrlRecognizer.getNestedRoutes).toHaveBeenCalledWith(
        inputUrl
      );
    });

    it('should return original url wrapped in an array if there is no matching route for this url', () => {
      const inputUrl = 'unknown-path';
      spyOn(dynamicUrlRecognizer, 'getNestedRoutes').and.returnValue({
        nestedRoutesNames: null,
        nestedRoutesParams: null
      });
      expect(service.transform(inputUrl)).toEqual([inputUrl]);
    });
  });
});
