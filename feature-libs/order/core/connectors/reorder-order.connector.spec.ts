import { TestBed } from '@angular/core/testing';
import { CartModificationList } from '@spartacus/cart/base/root';
import { OCC_USER_ID_CURRENT } from '@spartacus/core';
import { firstValueFrom, of } from 'rxjs';
import { ReorderOrderAdapter } from './reorder-order.adapter';
import { ReorderOrderConnector } from './reorder-order.connector';

const mockUserId = OCC_USER_ID_CURRENT;
const mockOrderId = 'orderID';
const mockCartModificationList: CartModificationList = {
  cartModifications: [],
};

class MockReorderOrderAdapter implements ReorderOrderAdapter {
  reorder = vi.fn().mockReturnValue(of({}));
}

describe('ReorderOrderConnector', () => {
  let adapter: ReorderOrderAdapter;
  let connector: ReorderOrderConnector;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        ReorderOrderConnector,
        {
          provide: ReorderOrderAdapter,
          useClass: MockReorderOrderAdapter,
        },
      ],
    });
  });

  beforeEach(() => {
    adapter = TestBed.inject(ReorderOrderAdapter);
    connector = TestBed.inject(ReorderOrderConnector);
  });

  it('should create', () => {
    expect(connector).toBeTruthy();
  });

  it('reorder should call adapter', async () => {
    adapter.reorder = vi.fn().mockReturnValue(of(mockCartModificationList));

    const result = await firstValueFrom(
      connector.reorder(mockOrderId, mockUserId)
    );
    expect(adapter.reorder).toHaveBeenCalledWith(mockOrderId, mockUserId);
    expect(result).toEqual(mockCartModificationList);
  });
});
