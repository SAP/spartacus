import { TestBed } from '@angular/core/testing';
import {
  AsmCustomer360Response,
  AsmCustomer360TabComponent,
  AsmCustomer360Type,
} from '@spartacus/asm/customer-360/root';
import { User } from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { combineLatest, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { AsmCustomer360Connector } from '../connectors';

import { AsmCustomer360Service } from './asm-customer-360.service';
import { Component } from '@angular/core';

@Component({
  selector: 'cx-dummy',
  template: '<div>This is a dummy component</div>',
})
export class DummyComponent {}

describe('Asm360Service', () => {
  const data: AsmCustomer360Response = {
    value: [
      {
        type: AsmCustomer360Type.REVIEW_LIST,
        reviews: [
          {
            productCode: 'shirt',
            productName: 'Shirt',
            createdAt: '2022-12-05T22:31:35+0000',
            updatedAt: '2022-12-05T22:31:35+0000',
            rating: '3',
            reviewStatus: '',
            reviewText: '',
            localizedReviewStatus: '',
          },
        ],
      },
    ],
  };

  class MockAsmConnector {
    getAsmCustomer360Data(): Observable<AsmCustomer360Response> {
      return of(data);
    }
  }

  class MockUserAccountFacade {
    get(): Observable<User> {
      return of({
        uid: 'customer001',
        customerId: 'customer1234',
      });
    }
  }

  let service: AsmCustomer360Service;

  let asmCustomer360Connector: AsmCustomer360Connector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AsmCustomer360Service,
        { provide: AsmCustomer360Connector, useClass: MockAsmConnector },
        { provide: UserAccountFacade, useClass: MockUserAccountFacade },
      ],
    });

    asmCustomer360Connector = TestBed.inject(AsmCustomer360Connector);
    spyOn(asmCustomer360Connector, 'getAsmCustomer360Data').and.callThrough();

    service = TestBed.inject(AsmCustomer360Service);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should get data', () => {
    const components1: AsmCustomer360TabComponent[] = [
      {
        component: DummyComponent,
      },
    ];
    const components2: AsmCustomer360TabComponent[] = [
      {
        component: DummyComponent,
      },
      {
        component: DummyComponent,
        requestData: {
          type: AsmCustomer360Type.REVIEW_LIST,
        },
        config: { pageSize: 5 },
      },
    ];
    const getData1 = service.get360Data(components1);
    const getData2 = service.get360Data(components2);

    combineLatest([getData1, getData2])
      .pipe(take(1))
      .subscribe(([response1, response2]) => {
        expect(
          asmCustomer360Connector.getAsmCustomer360Data
        ).toHaveBeenCalledTimes(1);
        expect(
          asmCustomer360Connector.getAsmCustomer360Data
        ).toHaveBeenCalledWith({
          queries: [
            {
              type: AsmCustomer360Type.REVIEW_LIST,
            },
          ],
          options: {
            userId: 'customer1234',
          },
        });

        expect(response1).toEqual({
          value: [],
        });
        expect(response2).toEqual(data);
      });
  });
});
