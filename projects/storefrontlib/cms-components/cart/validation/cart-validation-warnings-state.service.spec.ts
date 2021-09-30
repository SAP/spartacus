import { TestBed } from '@angular/core/testing';
import { CartValidationWarningsStateService } from './cart-validation-warnings-state.service';
import {
  CartValidationStatusCode,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';

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

describe('CartValidationWarningsStateService', () => {
  let service: CartValidationWarningsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CartValidationWarningsStateService,
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
      ],
    });

    service = TestBed.inject(CartValidationWarningsStateService);
  });

  afterEach(() => {
    service.ngOnDestroy();
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should clear validation data after configured number of routing steps', () => {
    service.cartValidationResult$.next([]);
    routerStateSubject.next({ navigationId: 1 });

    routerStateSubject.next({ navigationId: 5 });
    service.cartValidationResult$.next(mockData);

    service.checkForValidationResultClear$
      .subscribe(() => {
        let result;
        service.cartValidationResult$.subscribe((val) => (result = val));
        expect(service.navigationIdCount).toEqual(5);
        expect(result.length).toEqual(0);
      })
      .unsubscribe();
  });
});
