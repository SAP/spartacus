import { TestBed } from '@angular/core/testing';
import {
  CartModification,
  CartValidationStatusCode,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { CartValidationStateService } from './cart-validation-state.service';

const mockData = [
  {
    statusCode: CartValidationStatusCode.NO_STOCK,
    entry: {
      product: {
        code: 'productCode1',
      },
    },
  },
  {
    statusCode: CartValidationStatusCode.LOW_STOCK,
    entry: {
      product: {
        code: 'productCode2',
      },
    },
  },
];
const routerStateSubject = new BehaviorSubject({ navigationId: 0 });
class MockRoutingService implements Partial<RoutingService> {
  getRouterState() {
    return routerStateSubject.asObservable() as Observable<RouterState>;
  }
}

describe('CartValidationStateService', () => {
  let service: CartValidationStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartValidationStateService,
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
      ],
    });

    service = TestBed.inject(CartValidationStateService);
  });

  afterEach(() => {
    service.ngOnDestroy();
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should clear validation data after configured number of routing steps', () => {
    (service.cartValidationResult$ as ReplaySubject<CartModification[]>).next(
      []
    );
    routerStateSubject.next({ navigationId: 1 });

    routerStateSubject.next({ navigationId: 5 });
    (service.cartValidationResult$ as ReplaySubject<CartModification[]>).next(
      mockData
    );

    (service as any).checkForValidationResultClear$
      .subscribe(() => {
        let result;
        service.cartValidationResult$.subscribe((val) => (result = val));
        expect((service as any).navigationIdCount).toEqual(5);
        expect(result?.length).toEqual(0);
      })
      .unsubscribe();
  });

  it('should update result and navigation id', () => {
    routerStateSubject.next({ navigationId: 2 });

    service.updateValidationResultAndRoutingId([mockData[1]]);

    (service as any).checkForValidationResultClear$
      .subscribe(() => {
        let result;
        service.cartValidationResult$.subscribe((val) => (result = val));
        expect((service as any).navigationIdCount).toEqual(2);
        expect(result).toEqual([mockData[1]]);
      })
      .unsubscribe();
  });

  it('should update navigationIdCount', () => {
    routerStateSubject.next({ navigationId: 3 });
    (service as any).setNavigationIdStep();
    expect((service as any).navigationIdCount).toEqual(3);
  });
});
