import { TestBed } from '@angular/core/testing';
import { DynamicPathPipe } from './dynamic-path.pipe';
import { DynamicPathPipeService } from './dynamic-path-pipe.service';

const mockDynamicPathService = {
  transform: () => {}
};

describe('DynamicPathPipe', () => {
  let pipe: DynamicPathPipe;
  let service: DynamicPathPipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DynamicPathPipe,
        {
          provide: DynamicPathPipeService,
          useValue: mockDynamicPathService
        }
      ]
    });

    pipe = TestBed.get(DynamicPathPipe);
    service = TestBed.get(DynamicPathPipeService);
  });

  describe('transform', () => {
    it('should return the result from service', () => {
      const url = 'test-url';
      const expectedResult = 'expected-result';
      spyOn(service, 'transform').and.returnValue(expectedResult);

      const result = pipe.transform(url);
      expect(service.transform).toHaveBeenCalledWith(url);
      expect(result).toBe(expectedResult);
    });
  });
});
