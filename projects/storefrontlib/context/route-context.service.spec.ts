import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ActivatedRoutesService } from '@spartacus/core';
import { RoutingContextService } from '@spartacus/storefront';

const token = 'TOKEN';
const providerToken = 'providerToken';
const mockContext: any = { data: [1, 2, 3] };
const mockSnapshot: ActivatedRouteSnapshot[] = [
  { data: { cxContext: { [token]: providerToken } } },
] as unknown as ActivatedRouteSnapshot[];

class MockActivatedRoutesService implements Partial<ActivatedRoutesService> {
  routes$: Observable<ActivatedRouteSnapshot[]> = of(mockSnapshot);
}

class MockInjector implements Partial<Injector> {
  get(_token, _params) {
    return mockContext;
  }
}

describe('RoutingContextService', () => {
  let service: RoutingContextService;
  let injector: Injector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoutesService,
          useClass: MockActivatedRoutesService,
        },
        { provide: Injector, useClass: MockInjector },
      ],
    });

    injector = TestBed.inject(Injector);
    service = TestBed.inject(RoutingContextService);
  });

  describe('get', () => {
    it('should return context', () => {
      spyOn(injector, 'get').and.returnValue(of(mockContext));
      let result;
      service
        .get(token)
        .subscribe((data) => (result = data))
        .unsubscribe();
      // expect(injector.get).toHaveBeenCalledWith(providerToken, undefined);
      expect(result).toEqual(mockContext);
    });
  });
});
