import { TestBed } from '@angular/core/testing';
import { UrlTranslationService } from './url-translation.service';
import { UrlPipe } from './translate-url.pipe';

describe('UrlPipe', () => {
  let pipe: UrlPipe;
  let service: UrlTranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UrlPipe,
        { provide: UrlTranslationService, useValue: { translate: () => {} } },
      ],
    });
    pipe = TestBed.get(UrlPipe);
    service = TestBed.get(UrlTranslationService);
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
