import { async, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { ReplenishmentOrder } from '../../../model/replenishment-order.model';
import { UserReplenishmentOrderAdapter } from './user-replenishment-order.adapter';
import { UserReplenishmentOrderConnector } from './user-replenishment-order.connector';

class MockUserReplenishmentOrderAdapter
  implements UserReplenishmentOrderAdapter {
  get(
    _userId: string,
    _replenishmentOrderCode: string
  ): Observable<ReplenishmentOrder> {
    return of({});
  }
}

describe('UserReplenishmentOrderConnector', () => {
  // let adapter: UserReplenishmentOrderAdapter;
  let connector: UserReplenishmentOrderConnector;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        UserReplenishmentOrderConnector,
        {
          provide: UserReplenishmentOrderAdapter,
          useClass: MockUserReplenishmentOrderAdapter,
        },
      ],
    });
  }));

  beforeEach(() => {
    // adapter = TestBed.inject(UserReplenishmentOrderAdapter);
    connector = TestBed.inject(UserReplenishmentOrderConnector);
  });

  it('should create', () => {
    expect(connector).toBeTruthy();
  });
});
