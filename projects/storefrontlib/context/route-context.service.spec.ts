import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ActivatedRoutesService } from '@spartacus/core';
import { RoutingContextService } from '@spartacus/storefront';
import createSpy = jasmine.createSpy;

const token = 'TOKEN';
const providerToken = 'providerToken';
const mockContext: any = { data: [1, 2, 3] };
const mockSnapshot: ActivatedRouteSnapshot[] = [
  { data: { cxContext: { [token]: providerToken } } },
] as unknown as ActivatedRouteSnapshot[];

class MockActivatedRoutesService implements Partial<ActivatedRoutesService> {
  routes$: Observable<ActivatedRouteSnapshot[]> = of(mockSnapshot);
}

const mockInjector = {
  get: createSpy('get').and.returnValue(mockContext),
};

describe('RoutingContextService', () => {
  let service: RoutingContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoutesService,
          useClass: MockActivatedRoutesService,
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
        .get(token)
        .subscribe((data) => (result = data))
        .unsubscribe();
      expect(mockInjector.get).toHaveBeenCalledWith(providerToken, undefined);
      expect(result).toEqual(mockContext);
    });
  });
});
