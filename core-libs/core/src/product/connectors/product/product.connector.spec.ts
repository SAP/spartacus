import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProductAdapter } from './product.adapter';
import { ProductConnector } from './product.connector';
import createSpy = jasmine.createSpy;

class MockProductAdapter implements ProductAdapter {
  load = createSpy('ProductAdapter.load').and.callFake((code) =>
    of('product' + code)
  );
  loadMany = createSpy('ProductAdapter.loadMany').and.callFake(
    (products) => products
  );
}

describe('ProductConnector', () => {
  let service: ProductConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ProductAdapter, useClass: MockProductAdapter }],
    });

    service = TestBed.inject(ProductConnector);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get should call adapter', () => {
    const adapter = TestBed.inject(ProductAdapter);

    let result;
    service.get('333').subscribe((res) => (result = res));
    expect(result).toBe('product333');
    expect(adapter.load).toHaveBeenCalledWith('333', '');
  });

  it('getMany should call adapter', () => {
    const adapter = TestBed.inject(ProductAdapter);

    const products = [{ code: '333', scope: 'test' }];

    const result = service.getMany(products);
    expect(result).toBe(products);
    expect(adapter.loadMany).toHaveBeenCalledWith([
      { code: '333', scope: 'test' },
    ]);
  });

  it('getMany should fallback to load', () => {
    const adapter = TestBed.inject(ProductAdapter);
    delete adapter.loadMany;

    const products = [{ code: '333', scope: 'test' }];

    service.getMany(products);
    expect(adapter.load).toHaveBeenCalledWith('333', 'test');
  });
});
