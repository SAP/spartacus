import { of } from 'rxjs';
import { vi } from 'vitest';
import { ProductReferencesConnector } from './product-references.connector';

describe('ProductReferencesConnector', () => {
  let service: ProductReferencesConnector;
  let adapter: { load: ReturnType<typeof vi.fn> };
  let result: any;

  beforeEach(() => {
    adapter = {
      load: vi.fn().mockImplementation((code) => of('product' + code)),
    };
    service = new ProductReferencesConnector(adapter as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call adapter', () => {
    service.get('333').subscribe((res) => (result = res));
    expect(result).toBe('product333');
    expect(adapter.load).toHaveBeenCalledWith('333', undefined, undefined);
  });
});
