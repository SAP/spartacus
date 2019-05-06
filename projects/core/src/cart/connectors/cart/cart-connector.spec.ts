import { TestBed } from '@angular/core/testing';
import { CartConnector } from './cart.connector';
import createSpy = jasmine.createSpy;
import { CartAdapter } from './cart.adapter';
import { of } from 'rxjs';

class MockCartAdapter implements CartAdapter {
  create = createSpy().and.callFake(id => of('create' + id));
  load = createSpy().and.callFake((user, cart) => of('load' + user + cart));
  loadAll = createSpy().and.callFake(user => of('loadAll' + user));
  loadCheckoutDetails = createSpy().and.callFake((user, cart) =>
    of('loadCheckoutDetails' + user + cart)
  );
}

describe('CartConnector', () => {
  let service: CartConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: CartAdapter, useClass: MockCartAdapter }],
    });

    service = TestBed.get(CartConnector);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('create should call adapter', () => {
    const adapter = TestBed.get(CartAdapter);

    let result;
    service.create('1').subscribe(res => (result = res));
    expect(result).toBe('create1');
    expect(adapter.create).toHaveBeenCalledWith('1', undefined, undefined);
  });

  it('load should call adapter', () => {
    const adapter = TestBed.get(CartAdapter);

    let result;
    service.load('1', '4').subscribe(res => (result = res));
    expect(result).toBe('load14');
    expect(adapter.load).toHaveBeenCalledWith('1', '4', undefined);
  });

  it('loadAll should call adapter', () => {
    const adapter = TestBed.get(CartAdapter);

    let result;
    service.loadAll('1').subscribe(res => (result = res));
    expect(result).toBe('loadAll1');
    expect(adapter.loadAll).toHaveBeenCalledWith('1', undefined);
  });
});
