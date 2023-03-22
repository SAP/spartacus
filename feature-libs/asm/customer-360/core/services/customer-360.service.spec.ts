import { TestBed } from '@angular/core/testing';
import {
  Customer360Response,
  Customer360TabComponent,
  Customer360Type,
} from '@spartacus/asm/customer-360/root';
import { User } from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { combineLatest, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { Customer360Connector } from '../connectors';

import { Customer360Service } from './customer-360.service';

describe('Asm360Service', () => {
  const data: Customer360Response = {
    value: [
      {
        type: Customer360Type.REVIEW_LIST,
        reviews: [
          {
            productCode: 'shirt',
            productName: 'Shirt',
            createdAt: '2022-12-05T22:31:35+0000',
            updatedAt: '2022-12-05T22:31:35+0000',
            rating: '3',
            reviewStatus: '',
            reviewText: '',
          },
        ],
      },
    ],
  };

  class MockAsmConnector {
    getCustomer360Data(): Observable<Customer360Response> {
      return of(data);
    }
  }

  class MockUserAccountFacade {
    get(): Observable<User> {
      return of({
        uid: 'customer001',
      });
    }
  }

  let service: Customer360Service;

  let customer360Connector: Customer360Connector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Customer360Service,
        { provide: Customer360Connector, useClass: MockAsmConnector },
        { provide: UserAccountFacade, useClass: MockUserAccountFacade },
      ],
    });

    customer360Connector = TestBed.inject(Customer360Connector);
    spyOn(customer360Connector, 'getCustomer360Data').and.callThrough();

    service = TestBed.inject(Customer360Service);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should get data', () => {
    const components1: Customer360TabComponent[] = [
      {
        component: 'AsmCustomer360OverviewComponent',
      },
    ];
    const components2: Customer360TabComponent[] = [
      {
        component: 'AsmCustomer360ProfileComponent',
      },
      {
        component: 'AsmCustomer360ProductReviewsComponent',
        requestData: {
          type: Customer360Type.REVIEW_LIST,
        },
        config: { pageSize: 5 },
      },
    ];
    const getData1 = service.get360Data(components1);
    const getData2 = service.get360Data(components2);

    combineLatest([getData1, getData2])
      .pipe(take(1))
      .subscribe(([response1, response2]) => {
        expect(customer360Connector.getCustomer360Data).toHaveBeenCalledTimes(
          1
        );
        expect(customer360Connector.getCustomer360Data).toHaveBeenCalledWith({
          queries: [
            {
              type: Customer360Type.REVIEW_LIST,
            },
          ],
          options: {
            userId: 'customer001',
          },
        });

        expect(response1).toEqual({
          value: [],
        });
        expect(response2).toEqual(data);
      });
  });
});
