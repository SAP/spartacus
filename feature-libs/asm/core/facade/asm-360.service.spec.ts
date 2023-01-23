import { TestBed } from '@angular/core/testing';
import {
  AsmCustomer360Response,
  AsmCustomer360Type,
} from '@spartacus/asm/root';
import { Query, QueryService, QueryState, User } from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { combineLatest, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

import { AsmConfig } from '../config/asm-config';
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

  const dataState: QueryState<AsmCustomer360Response> = {
    loading: false,
    error: false,
    data,
  };

  const asmConfig: AsmConfig = {
    asm: {
      customer360: {
        tabs: [
          {
            i18nNameKey: 'asm.customer360.overviewTab',
            components: [
              {
                component: 'AsmCustomer360OverviewComponent',
              },
            ],
          },
          {
            i18nNameKey: 'asm.customer360.profileTab',
            components: [
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
            ],
          },
        ],
      },
    },
  };

  class MockQueryService {
    create(): Query<AsmCustomer360Response> {
      return {
        get(): Observable<AsmCustomer360Response> {
          return of(data);
        },
        getState(): Observable<QueryState<AsmCustomer360Response>> {
          return of(dataState);
        },
      };
    }
  }

  class MockAsmConnector {
    getCustomer360Data(): Observable<AsmCustomer360Response> {
      return of(data);
    }
  }

  class MockUserAccountFacade {
    get(): Observable<User> {
      return of({
        customerId: 'customer001',
      });
    }
  }

  let service: Asm360Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Asm360Service,
        { provide: AsmConfig, useValue: asmConfig },
        { provide: QueryService, useClass: MockQueryService },
        { provide: AsmConnector, useClass: MockAsmConnector },
        { provide: UserAccountFacade, useClass: MockUserAccountFacade },
      ],
    });

    const queryService = TestBed.inject(QueryService);
    spyOn(queryService, 'create').and.callThrough();

    const asmConnector = TestBed.inject(AsmConnector);
    spyOn(asmConnector, 'getCustomer360Data').and.callThrough();

    service = TestBed.inject(Asm360Service);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should create queries for each tab', () => {
    const queryService = TestBed.inject(QueryService);
    const spy = queryService.create as jasmine.Spy;

    let [callback] = spy.calls.argsFor(0);
    callback();
    [callback] = spy.calls.argsFor(1);
    callback();

    const asmConnector = TestBed.inject(AsmConnector);
    expect(asmConnector.getCustomer360Data).toHaveBeenCalledTimes(2);
    expect(asmConnector.getCustomer360Data).toHaveBeenCalledWith({
      queries: [],
      options: {
        userId: 'customer001',
      },
    });
    expect(asmConnector.getCustomer360Data).toHaveBeenCalledWith({
      queries: [
        {
          customer360Type: AsmCustomer360Type.REVIEW_LIST,
        },
      ],
      options: {
        userId: 'customer001',
      },
    });
  });

  it('should get data', () => {
    expect(service.get360Data(2)).toBeUndefined();

    const getData1 = service.get360Data(0);
    expect(getData1).toBeDefined();

    const getData2 = service.get360Data(1);
    expect(getData2).toBeDefined();

    combineLatest([getData1 as any, getData2 as any])
      .pipe(take(1))
      .subscribe(([response1, response2]) => {
        expect(response1).toBe(data);
        expect(response2).toBe(data);
      });
  });

  it('should get data state', () => {
    expect(service.get360DataState(2)).toBeUndefined();

    const getDataState1 = service.get360DataState(0);
    expect(getDataState1).toBeDefined();

    const getDataState2 = service.get360DataState(1);
    expect(getDataState2).toBeDefined();

    combineLatest([getDataState1 as any, getDataState2 as any])
      .pipe(take(1))
      .subscribe(([response1, response2]) => {
        expect(response1).toBe(dataState);
        expect(response2).toBe(dataState);
      });
  });
});
