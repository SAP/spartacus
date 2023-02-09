import { TestBed } from '@angular/core/testing';
import {
  AsmCustomer360Response,
  AsmCustomer360Type,
} from '@spartacus/asm/root';
import { User } from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { combineLatest, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

import { AsmConnector } from '../connectors/asm.connector';

import { Asm360Service } from './asm-360.service';

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
          },
        ],
      },
    ],
  };

  class MockAsmConnector {
    getCustomer360Data(): Observable<AsmCustomer360Response> {
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

  let service: Asm360Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Asm360Service,
        { provide: AsmConnector, useClass: MockAsmConnector },
        { provide: UserAccountFacade, useClass: MockUserAccountFacade },
      ],
    });

    const asmConnector = TestBed.inject(AsmConnector);
    spyOn(asmConnector, 'getCustomer360Data').and.callThrough();

    service = TestBed.inject(Asm360Service);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should get data', () => {
    const asmConnector = TestBed.inject(AsmConnector);

    const components1 = [
      {
        component: 'AsmCustomer360OverviewComponent',
      },
    ];
    const components2 = [
      {
        component: 'AsmCustomer360ProfileComponent',
      },
      {
        component: 'AsmCustomer360ProductReviewsComponent',
        requestData: {
          type: AsmCustomer360Type.REVIEW_LIST,
        },
        config: { pageSize: 5 },
      },
    ];

    const getData1 = service.get360Data(components1);
    expect(getData1).toBeDefined();

    const getData2 = service.get360Data(components2);
    expect(getData2).toBeDefined();

    combineLatest([getData1, getData2])
      .pipe(take(1))
      .subscribe(([response1, response2]) => {
        expect(asmConnector.getCustomer360Data).toHaveBeenCalledTimes(1);
        expect(asmConnector.getCustomer360Data).toHaveBeenCalledWith({
          queries: [
            {
              type: AsmCustomer360Type.REVIEW_LIST,
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
