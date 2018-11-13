import { TestBed } from '@angular/core/testing';
import { PathPipe } from './path.pipe';
import { PathService } from './path.service';

const mockPathService = {
  transform: () => {}
};

describe('PathPipe', () => {
  let pipe: PathPipe;
  let service: PathService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PathPipe,
        {
          provide: PathService,
          useValue: mockPathService
        }
      ]
    });

    pipe = TestBed.get(PathPipe);
    service = TestBed.get(PathService);
  });

  describe('transform', () => {
    it('should return the result from service', () => {
      const argument = 'argument';
      const expectedResult = 'expected-result';
      spyOn(service, 'transform').and.returnValue(expectedResult);

      const result = pipe.transform(argument);
      expect(service.transform).toHaveBeenCalled();
      expect(result).toBe(expectedResult);
    });

    it('should interpret string argument as page name and should call service', () => {
      spyOn(service, 'transform');
      pipe.transform('testPageName');
      expect(service.transform).toHaveBeenCalledWith('testPageName', {});
    });

    it('should interpret one-element array argument as page name and should call service', () => {
      spyOn(service, 'transform');
      pipe.transform(['testPageName']);
      expect(service.transform).toHaveBeenCalledWith('testPageName', {});
    });

    it('should interpret two-elements array argument as tuple of page name and parameters object and should call service', () => {
      spyOn(service, 'transform');
      pipe.transform(['testPageName', { param1: 'value1' }]);
      expect(service.transform).toHaveBeenCalledWith('testPageName', {
        param1: 'value1'
      });
    });
  });
});
