import { ProductAdapter } from './product.adapter';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProductConnector } from './product.connector';

describe('ProductConnector', () => {
  let service: ProductConnector;
  let adapter: {
    load: ReturnType<typeof vi.fn>;
    loadMany: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    adapter = {
      load: vi.fn().mockImplementation((code) => of('product' + code)),
      loadMany: vi.fn().mockImplementation((products) => products),
    };
    TestBed.configureTestingModule({
      providers: [
        ProductConnector,
        { provide: ProductAdapter, useValue: adapter },
      ],
    });
    service = TestBed.inject(ProductConnector);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get should call adapter', async () => {
    let result;
    service.get('333').subscribe((res) => (result = res));
    expect(result).toBe('product333');
    expect(adapter.load).toHaveBeenCalledWith('333', '');
  });

  it('getMany should call adapter', () => {
    const products = [{ code: '333', scope: 'test' }];

    const result = service.getMany(products);
    expect(result).toBe(products);
    expect(adapter.loadMany).toHaveBeenCalledWith([
      { code: '333', scope: 'test' },
    ]);
  });

  it('getMany should fallback to load', () => {
    delete (adapter as any).loadMany;

    const products = [{ code: '333', scope: 'test' }];

    service.getMany(products);
    expect(adapter.load).toHaveBeenCalledWith('333', 'test');
  });
});
