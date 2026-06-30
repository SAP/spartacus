import { of } from 'rxjs';
import { vi } from 'vitest';
import { Address } from '../../../model/address.model';
import { UserAddressConnector } from './user-address.connector';

const mockAddress: Address = {
  email: 'mockEmail',
  firstName: 'mockFirstName',
};

describe('UserAddressConnector', () => {
  let service: UserAddressConnector;
  let adapter: {
    add: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
    loadAll: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
    verify: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    adapter = {
      add: vi.fn().mockReturnValue(of({})),
      delete: vi.fn().mockReturnValue(of({})),
      loadAll: vi.fn().mockImplementation((userId) => of(`load-${userId}`)),
      update: vi.fn().mockReturnValue(of({})),
      verify: vi.fn().mockImplementation((userId) => of(`verify-${userId}`)),
    };
    service = new UserAddressConnector(adapter as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('add should call adapter', () => {
    let result: any;
    service.add('user-id', mockAddress).subscribe((res) => (result = res));
    expect(result).toEqual({});
    expect(adapter.add).toHaveBeenCalledWith('user-id', mockAddress);
  });

  it('delete should call adapter', () => {
    let result: any;
    service.delete('user-id', 'address-id').subscribe((res) => (result = res));
    expect(result).toEqual({});
    expect(adapter.delete).toHaveBeenCalledWith('user-id', 'address-id');
  });

  it('getAll should call adapter', () => {
    let result: any;
    service.getAll('user-id').subscribe((res) => (result = res));
    expect(result).toEqual('load-user-id');
    expect(adapter.loadAll).toHaveBeenCalledWith('user-id');
  });

  it('update should call adapter', () => {
    let result: any;
    service
      .update('user-id', 'address-id', mockAddress)
      .subscribe((res) => (result = res));
    expect(result).toEqual({});
    expect(adapter.update).toHaveBeenCalledWith(
      'user-id',
      'address-id',
      mockAddress
    );
  });

  it('verify should call adapter', () => {
    let result: any;
    service.verify('user-id', mockAddress).subscribe((res) => (result = res));
    expect(result).toEqual('verify-user-id');
    expect(adapter.verify).toHaveBeenCalledWith('user-id', mockAddress);
  });
});
