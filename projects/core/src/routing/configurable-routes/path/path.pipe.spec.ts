import { TestBed } from '@angular/core/testing';
import { PathPipe } from './path.pipe';
import { PathPipeService } from './path-pipe.service';

const mockPathPipeService = {
  transform: () => {}
};

describe('PathPipe', () => {
  let pipe: PathPipe;
  let service: PathPipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PathPipe,
        {
          provide: PathPipeService,
          useValue: mockPathPipeService
        }
      ]
    });

    pipe = TestBed.get(PathPipe);
    service = TestBed.get(PathPipeService);
  });

  describe('transform', () => {
    it('should should call service and return its result', () => {
      const serviceResult = ['transfromed-path'];
      spyOn(service, 'transform').and.returnValue(serviceResult);
      const result = pipe.transform(['testRouteName'], [{ param1: 'value1' }]);
      expect(service.transform).toHaveBeenCalledWith(
        ['testRouteName'],
        [{ param1: 'value1' }]
      );
      expect(result).toEqual(serviceResult);
    });
  });
});
