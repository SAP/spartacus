import { TestBed } from '@angular/core/testing';
import { SemanticPathService } from './semantic-path.service';
import { ProductURLPipe } from './product-url.pipe';
import { Product } from '../../../model/product.model';

describe('ProductUrlPipe', () => {
  let pipe: ProductURLPipe;
  let service: SemanticPathService;
  const mockProduct: Product = { code: 'testId' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductURLPipe,
        { provide: SemanticPathService, useValue: { transform: () => {} } },
      ],
    });
    pipe = TestBed.inject(ProductURLPipe);
    service = TestBed.inject(SemanticPathService);
  });

  describe('transform', () => {
    it('should return result from service', () => {
      const serviceResult = 'test-sevice-result';
      spyOn(service, 'transform').and.returnValue(serviceResult as any);
      expect(pipe.transform(mockProduct)).toBe(serviceResult);
      expect(service.transform).toHaveBeenCalled();
    });
  });
});
