import { TestBed } from '@angular/core/testing';
import createSpy = jasmine.createSpy;

import { ProductConnector } from './product.connector';
import { of } from 'rxjs/internal/observable/of';
import { ProductAdapter } from './product.adapter';

class MockProductAdapter implements ProductAdapter {
  load = createSpy('ProductAdapter.load').and.callFake(code =>
    of('product' + code)
  );
}

describe('ProductConnector', () => {
  let service: ProductConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ProductAdapter, useClass: MockProductAdapter }],
    });

    service = TestBed.get(ProductConnector);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getList should call adapter', () => {
    const adapter = TestBed.get(ProductAdapter);

    let result;
    service.get('333').subscribe(res => (result = res));
    expect(result).toBe('product333');
    expect(adapter.load).toHaveBeenCalledWith('333');
  });
});
