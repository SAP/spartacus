import { TestBed } from '@angular/core/testing';

import { UserAddressConnector } from './user-address.connector';
import { of } from 'rxjs/internal/observable/of';
import { UserAddressAdapter } from './user-address.adapter';
import { Address } from '../../../model/address.model';
import createSpy = jasmine.createSpy;

const mockAddress: Address = {
  email: 'mockEmail',
  firstName: 'mockFirstName',
};

class MockAddressUserAdapter implements UserAddressAdapter {
  add = createSpy('add').and.returnValue(of({}));
  delete = createSpy('delete').and.returnValue(of({}));
  load = createSpy('load').and.callFake(userId => of(`load-${userId}`));
  update = createSpy('update').and.returnValue(of({}));
  verify = createSpy('verify').and.callFake(userId => of(`verify-${userId}`));
}

describe('UserAddressConnector', () => {
  let service: UserAddressConnector;
  let adapter: UserAddressAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UserAddressAdapter, useClass: MockAddressUserAdapter },
      ],
    });

    service = TestBed.get(UserAddressConnector);
    adapter = TestBed.get(UserAddressAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('add should call adapter', () => {
    let result;
    service.add('user-id', mockAddress).subscribe(res => (result = res));
    expect(result).toEqual({});
    expect(adapter.add).toHaveBeenCalledWith('user-id', mockAddress);
  });

  it('delete should call adapter', () => {
    let result;
    service.delete('user-id', 'address-id').subscribe(res => (result = res));
    expect(result).toEqual({});
    expect(adapter.delete).toHaveBeenCalledWith('user-id', 'address-id');
  });

  it('load should call adapter', () => {
    let result;
    service.load('user-id').subscribe(res => (result = res));
    expect(result).toEqual('load-user-id');
    expect(adapter.load).toHaveBeenCalledWith('user-id');
  });

  it('update should call adapter', () => {
    let result;
    service
      .update('user-id', 'address-id', mockAddress)
      .subscribe(res => (result = res));
    expect(result).toEqual({});
    expect(adapter.update).toHaveBeenCalledWith(
      'user-id',
      'address-id',
      mockAddress
    );
  });

  it('verify should call adapter', () => {
    let result;
    service.verify('user-id', mockAddress).subscribe(res => (result = res));
    expect(result).toEqual('verify-user-id');
    expect(adapter.verify).toHaveBeenCalledWith('user-id', mockAddress);
  });
});
