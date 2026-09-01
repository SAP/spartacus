import { of } from 'rxjs';
import { vi } from 'vitest';
import { ProductReviewsConnector } from './product-reviews.connector';

describe('ProductReviewsConnector', () => {
  let service: ProductReviewsConnector;
  let adapter: {
    load: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    adapter = {
      load: vi.fn().mockImplementation((code) => of('product' + code)),
      post: vi.fn().mockReturnValue(of('')),
    };
    service = new ProductReviewsConnector(adapter as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get', () => {
    it('should call adapter', () => {
      let result: any;
      service.get('333').subscribe((res) => (result = res));
      expect(result).toBe('product333');
      expect(adapter.load).toHaveBeenCalledWith('333', undefined);
    });
  });

  describe('add', () => {
    it('should call adapter', () => {
      service.add('333', 'review' as any).subscribe();
      expect(adapter.post).toHaveBeenCalledWith('333', 'review');
    });
  });
});
