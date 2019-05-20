import { TestBed } from '@angular/core/testing';

import { UserPaymentConnector } from './user-payment.connector';
import { of } from 'rxjs/internal/observable/of';
import { UserPaymentAdapter } from './user-payment.adapter';
import createSpy = jasmine.createSpy;

class MockUserPaymentAdapter implements UserPaymentAdapter {
  delete = createSpy('load').and.returnValue(of({}));
  loadAll = createSpy('loadAll').and.callFake(userId =>
    of(`loadList-${userId}`)
  );
  setDefault = createSpy('setDefault').and.returnValue(of({}));

  loadBillingCountries = createSpy('loadBillingCountries').and.returnValue(
    of([])
  );

  loadDeliveryCountries = createSpy('loadDeliveryCountries').and.returnValue(
    of([])
  );
  loadRegions = createSpy('loadRegions').and.callFake(countryCode =>
    of(`loadRegions-${countryCode}`)
  );
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

    service = TestBed.get(UserPaymentConnector);
    adapter = TestBed.get(UserPaymentAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('delete should call adapter', () => {
    let result;
    service.delete('user-id', 'payment-id').subscribe(res => (result = res));
    expect(result).toEqual({});
    expect(adapter.delete).toHaveBeenCalledWith('user-id', 'payment-id');
  });

  it('getAll should call adapter', () => {
    let result;
    service.getAll('user-id').subscribe(res => (result = res));
    expect(result).toEqual('loadList-user-id');
    expect(adapter.loadAll).toHaveBeenCalledWith('user-id');
  });

  it('setDefault should call adapter', () => {
    let result;
    service
      .setDefault('user-id', 'payment-id')
      .subscribe(res => (result = res));
    expect(result).toEqual({});
    expect(adapter.setDefault).toHaveBeenCalledWith('user-id', 'payment-id');
  });

  it('getBillingCountries should call adapter', () => {
    let result;
    service.getBillingCountries().subscribe(res => (result = res));
    expect(result).toEqual([]);
    expect(adapter.loadBillingCountries).toHaveBeenCalledWith();
  });

  it('getDeliveryCountries should call adapter', () => {
    let result;
    service.getDeliveryCountries().subscribe(res => (result = res));
    expect(result).toEqual([]);
    expect(adapter.loadDeliveryCountries).toHaveBeenCalledWith();
  });

  it('getRegions should call adapter', () => {
    let result;
    service.getRegions('CA').subscribe(res => (result = res));
    expect(result).toEqual('loadRegions-CA');
    expect(adapter.loadRegions).toHaveBeenCalledWith('CA');
  });
});
