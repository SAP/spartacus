import { of } from 'rxjs';
import { vi } from 'vitest';
import { UserPaymentConnector } from './user-payment.connector';

describe('UserPaymentConnector', () => {
  let service: UserPaymentConnector;
  let adapter: {
    delete: ReturnType<typeof vi.fn>;
    loadAll: ReturnType<typeof vi.fn>;
    setDefault: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    adapter = {
      delete: vi.fn().mockReturnValue(of({})),
      loadAll: vi.fn().mockImplementation((userId) => of(`loadList-${userId}`)),
      setDefault: vi.fn().mockReturnValue(of({})),
    };
    service = new UserPaymentConnector(adapter as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('delete should call adapter', () => {
    let result: any;
    service.delete('user-id', 'payment-id').subscribe((res) => (result = res));
    expect(result).toEqual({});
    expect(adapter.delete).toHaveBeenCalledWith('user-id', 'payment-id');
  });

  it('getAll should call adapter', () => {
    let result: any;
    service.getAll('user-id').subscribe((res) => (result = res));
    expect(result).toEqual('loadList-user-id');
    expect(adapter.loadAll).toHaveBeenCalledWith('user-id');
  });

  it('setDefault should call adapter', () => {
    let result: any;
    service
      .setDefault('user-id', 'payment-id')
      .subscribe((res) => (result = res));
    expect(result).toEqual({});
    expect(adapter.setDefault).toHaveBeenCalledWith('user-id', 'payment-id');
  });
});
