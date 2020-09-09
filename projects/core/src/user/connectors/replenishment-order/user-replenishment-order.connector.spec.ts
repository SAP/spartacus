import { async, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { ReplenishmentOrder } from '../../../model/replenishment-order.model';
import { UserReplenishmentOrderAdapter } from './user-replenishment-order.adapter';
import { UserReplenishmentOrderConnector } from './user-replenishment-order.connector';
import createSpy = jasmine.createSpy;

class MockUserReplenishmentOrderAdapter
  implements UserReplenishmentOrderAdapter {
  loadHistory = createSpy(
    'UserReplenishmentOrderAdapter.loadHistory'
  ).and.callFake((userId) => of(`orderHistory-${userId}`));

  load(
    _userId: string,
    _replenishmentOrderCode: string
  ): Observable<ReplenishmentOrder> {
    return of({});
  }

  // loadHistory(
  //   _userId: string,
  //   _pageSize: number,
  //   _currentPage: number,
  //   _sort: string,
  // ): Observable<ReplenishmentOrderList> {
  //   return of({});
  // }
}

describe('UserReplenishmentOrderConnector', () => {
  let adapter: UserReplenishmentOrderAdapter;
  let connector: UserReplenishmentOrderConnector;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        UserReplenishmentOrderConnector,
        UserReplenishmentOrderConnector,
        {
          provide: UserReplenishmentOrderAdapter,
          useClass: MockUserReplenishmentOrderAdapter,
        },
      ],
    });
  }));

  beforeEach(() => {
    adapter = TestBed.inject(UserReplenishmentOrderAdapter);
    connector = TestBed.inject(UserReplenishmentOrderConnector);
  });

  it('should create', () => {
    expect(connector).toBeTruthy();
  });

  it('getHistory should call adapter', () => {
    let result;
    connector.getHistory('user3').subscribe((res) => (result = res));
    console.log(result);
    expect(result).toBe('orderHistory-user3');
    expect(adapter.loadHistory).toHaveBeenCalledWith(
      'user3',
      undefined,
      undefined,
      undefined
    );
  });
});
