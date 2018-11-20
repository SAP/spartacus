import { TestBed } from '@angular/core/testing';
import { DynamicUrlPipe } from './dynamic-url.pipe';
import { DynamicUrlPipeService } from './dynamic-url-pipe.service';

const mockDynamicUrlService = {
  transform: () => {}
};

describe('DynamicUrlPipe', () => {
  let pipe: DynamicUrlPipe;
  let service: DynamicUrlPipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DynamicUrlPipe,
        {
          provide: DynamicUrlPipeService,
          useValue: mockDynamicUrlService
        }
      ]
    });

    pipe = TestBed.get(DynamicUrlPipe);
    service = TestBed.get(DynamicUrlPipeService);
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
