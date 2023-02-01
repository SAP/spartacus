import { TestBed, waitForAsync } from '@angular/core/testing';
import { CartModificationList } from '@spartacus/cart/base/root';
import { OCC_USER_ID_CURRENT } from '@spartacus/core';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { ReorderOrderAdapter } from './reorder-order.adapter';
import { ReorderOrderConnector } from './reorder-order.connector';
import createSpy = jasmine.createSpy;

const mockUserId = OCC_USER_ID_CURRENT;
const mockOrderId = 'orderID';
const mockCartModificationList: CartModificationList = {
  cartModifications: [],
};

class MockReorderOrderAdapter implements ReorderOrderAdapter {
  reorder = createSpy().and.returnValue(of({}));
}

describe('ReorderOrderConnector', () => {
  let adapter: ReorderOrderAdapter;
  let connector: ReorderOrderConnector;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          ReorderOrderConnector,
          {
            provide: ReorderOrderAdapter,
            useClass: MockReorderOrderAdapter,
          },
        ],
      });
    })
  );

  beforeEach(() => {
    adapter = TestBed.inject(ReorderOrderAdapter);
    connector = TestBed.inject(ReorderOrderConnector);
  });

  it('should create', () => {
    expect(connector).toBeTruthy();
  });

  it('reorder should call adapter', (done) => {
    adapter.reorder = createSpy().and.returnValue(of(mockCartModificationList));

    connector
      .reorder(mockOrderId, mockUserId)
      .pipe(take(1))
      .subscribe((result: any) => {
        expect(adapter.reorder).toHaveBeenCalledWith(mockOrderId, mockUserId);
        expect(result).toEqual(mockCartModificationList);
        done();
      });
  });
});
