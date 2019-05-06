import { TestBed } from '@angular/core/testing';
import { UrlService } from './url-translation.service';
import { UrlPipe } from './url.pipe';

describe('UrlPipe', () => {
  let pipe: UrlPipe;
  let service: UrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UrlPipe,
        { provide: UrlService, useValue: { translate: () => {} } },
      ],
    });
    pipe = TestBed.get(UrlPipe);
    service = TestBed.get(UrlService);
  });

  describe('transform', () => {
    it('should return result from service', () => {
      const serviceResult = 'test-sevice-result';
      spyOn(service, 'translate').and.returnValue(serviceResult);
      expect(pipe.transform({ route: 'testRoute' })).toBe(serviceResult);
      expect(service.translate).toHaveBeenCalled();
    });
  });
});
