import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserPaymentAdapter } from './user-payment.adapter';
import { UserPaymentConnector } from './user-payment.connector';
import createSpy = jasmine.createSpy;

class MockUserPaymentAdapter implements UserPaymentAdapter {
  delete = createSpy('load').and.returnValue(of({}));
  loadAll = createSpy('loadAll').and.callFake((userId) =>
    of(`loadList-${userId}`)
  );
  setDefault = createSpy('setDefault').and.returnValue(of({}));
}

describe('UserPaymentConnector', () => {
  let service: UserPaymentConnector;
  let adapter: UserPaymentAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UserPaymentAdapter, useClass: MockUserPaymentAdapter },
      ],
    });

    service = TestBed.inject(UserPaymentConnector);
    adapter = TestBed.inject(UserPaymentAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('delete should call adapter', () => {
    let result;
    service.delete('user-id', 'payment-id').subscribe((res) => (result = res));
    expect(result).toEqual({});
    expect(adapter.delete).toHaveBeenCalledWith('user-id', 'payment-id');
  });

  it('getAll should call adapter', () => {
    let result;
    service.getAll('user-id').subscribe((res) => (result = res));
    expect(result).toEqual('loadList-user-id');
    expect(adapter.loadAll).toHaveBeenCalledWith('user-id');
  });

  it('setDefault should call adapter', () => {
    let result;
    service
      .setDefault('user-id', 'payment-id')
      .subscribe((res) => (result = res));
    expect(result).toEqual({});
    expect(adapter.setDefault).toHaveBeenCalledWith('user-id', 'payment-id');
  });
});
