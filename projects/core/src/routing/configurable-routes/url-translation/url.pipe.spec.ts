import { TestBed } from '@angular/core/testing';
import { SemanticPathService } from './semantic-path.service';
import { UrlPipe } from './url.pipe';

describe('UrlPipe', () => {
  let pipe: UrlPipe;
  let service: SemanticPathService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UrlPipe,
        { provide: SemanticPathService, useValue: { transform: () => {} } },
      ],
    });
    pipe = TestBed.get(UrlPipe);
    service = TestBed.get(SemanticPathService);
  });

  describe('transform', () => {
    it('should return result from service', () => {
      const serviceResult = 'test-sevice-result';
      spyOn(service, 'transform').and.returnValue(serviceResult);
      expect(pipe.transform({ cxRoute: 'testRoute' })).toBe(serviceResult);
      expect(service.transform).toHaveBeenCalled();
    });
  });
});
