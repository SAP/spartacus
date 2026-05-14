import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ContextService, RoutingContextService } from '@spartacus/storefront';
import createSpy = jasmine.createSpy;

const mockContext: any = { data: [1, 2, 3] };
const token = 'TOKEN';

class MockRoutingContextService implements Partial<RoutingContextService> {
  get = createSpy('get').and.returnValue(of(mockContext));
}

describe('ContextService', () => {
  let service: ContextService;
  let routingContextService: RoutingContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: RoutingContextService, useClass: MockRoutingContextService },
      ],
    });

    routingContextService = TestBed.inject(RoutingContextService);
    service = TestBed.inject(ContextService);
  });

  describe('get', () => {
    it('should return context', () => {
      let result;
      service
        .get(token)
        .subscribe((data) => (result = data))
        .unsubscribe();
      expect(routingContextService.get).toHaveBeenCalledWith(token);
      expect(result).toEqual(mockContext);
    });
  });
});
