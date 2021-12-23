import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CartAdapter } from './cart.adapter';
import { CartConnector } from './cart.connector';
import createSpy = jasmine.createSpy;

class MockCartAdapter implements CartAdapter {
  create = createSpy().and.callFake((id) => of('create' + id));
  load = createSpy().and.callFake((user, cart) => of('load' + user + cart));
  loadAll = createSpy().and.callFake((user) => of('loadAll' + user));
  addEmail = createSpy().and.callFake((userId, cartId, email) =>
    of('addEmail' + userId + cartId + email)
  );
  delete = createSpy().and.callFake((userId: string, cartId: string) =>
    of('delete' + userId + cartId)
  );
}

describe('CartConnector', () => {
  let service: CartConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: CartAdapter, useClass: MockCartAdapter }],
    });

    service = TestBed.inject(CartConnector);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('create should call adapter', () => {
    const adapter = TestBed.inject(CartAdapter);

    let result;
    service.create('1').subscribe((res) => (result = res));
    expect(result).toBe('create1');
    expect(adapter.create).toHaveBeenCalledWith('1', undefined, undefined);
  });

  it('load should call adapter', () => {
    const adapter = TestBed.inject(CartAdapter);

    let result;
    service.load('1', '4').subscribe((res) => (result = res));
    expect(result).toBe('load14');
    expect(adapter.load).toHaveBeenCalledWith('1', '4');
  });

  it('loadAll should call adapter', () => {
    const adapter = TestBed.inject(CartAdapter);

    let result;
    service.loadAll('1').subscribe((res) => (result = res));
    expect(result).toBe('loadAll1');
    expect(adapter.loadAll).toHaveBeenCalledWith('1');
  });

  it('create should call adapter', () => {
    const adapter = TestBed.inject(CartAdapter);

    let result;
    service
      .addEmail('userId', 'cartId', 'test@test.com')
      .subscribe((res) => (result = res));
    expect(result).toBe('addEmail' + 'userId' + 'cartId' + 'test@test.com');
    expect(adapter.addEmail).toHaveBeenCalledWith(
      'userId',
      'cartId',
      'test@test.com'
    );
  });

  it('delete should call adapter', () => {
    const adapter = TestBed.inject(CartAdapter);

    let result;
    service.delete('userId', 'cartId').subscribe((res) => (result = res));
    expect(result).toBe('delete' + 'userId' + 'cartId');
    expect(adapter.delete).toHaveBeenCalledWith('userId', 'cartId');
  });
});
