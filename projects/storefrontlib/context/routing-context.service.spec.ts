import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ActivatedRoutesService } from '@spartacus/core';
import { RoutingContextService } from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';
import createSpy = jasmine.createSpy;

const contextToken1 = 'contextToken1';
const contextToken2 = Symbol('contextToken2');

const providerToken1 = 'providerToken1';
const providerToken2 = 'providerToken2';

const contextInstance1 = 'contextInstance1';
const contextInstance2 = 'contextInstance2';

const mockInjector = {
  get: createSpy('get').and.callFake((providerToken: string) =>
    providerToken === providerToken1 ? contextInstance1 : contextInstance2
  ),
};

const mockActivatedRoute1: ActivatedRouteSnapshot = {
  data: { cxContext: { [contextToken1]: providerToken1 } },
} as unknown as ActivatedRouteSnapshot;

const mockActivatedRoute2: ActivatedRouteSnapshot = {
  data: { cxContext: { [contextToken2]: providerToken2 } },
} as unknown as ActivatedRouteSnapshot;

describe('RoutingContextService', () => {
  let service: RoutingContextService;
  let mockActivatedRoutes$: BehaviorSubject<ActivatedRouteSnapshot[]>;

  beforeEach(() => {
    mockActivatedRoutes$ = new BehaviorSubject([mockActivatedRoute1]);
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoutesService,
          useValue: {
            routes$: mockActivatedRoutes$,
          } as Partial<ActivatedRoutesService>,
        },
        { provide: Injector, useValue: mockInjector },
      ],
    });
    service = TestBed.inject(RoutingContextService);
  });

  describe('get', () => {
    it('should return context', () => {
      let result;
      service
        .get(contextToken1)
        .subscribe((data) => (result = data))
        .unsubscribe();
      expect(mockInjector.get).toHaveBeenCalledWith(providerToken1, undefined);
      expect(result).toEqual(contextInstance1);
    });
  });

  describe('get', () => {
    it('should return context defined in many routes', () => {
      mockActivatedRoutes$.next([mockActivatedRoute1, mockActivatedRoute2]);

      let result1;
      service
        .get(contextToken1)
        .subscribe((contextInstance) => (result1 = contextInstance))
        .unsubscribe();
      expect(mockInjector.get).toHaveBeenCalledWith(providerToken1, undefined);
      expect(result1).toEqual(contextInstance1);

      let result2;
      service
        .get(contextToken2)
        .subscribe((contextInstance) => (result2 = contextInstance))
        .unsubscribe();
      expect(mockInjector.get).toHaveBeenCalledWith(providerToken2, undefined);
      expect(result2).toEqual(contextInstance2);
    });
  });
});
