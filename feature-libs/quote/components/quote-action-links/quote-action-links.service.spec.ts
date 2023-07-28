import { TestBed } from '@angular/core/testing';
import { Cart, MultiCartFacade } from '@spartacus/cart/base/root';
import { Observable, of } from 'rxjs';
import { UserIdService, RoutingService } from '@spartacus/core';
import { QuoteActionLinksService } from './quote-action-links.service';
import createSpy = jasmine.createSpy;

const newCart: Cart = {};

class MockMultiCartFacade implements Partial<MultiCartFacade> {
  createCart(): Observable<Cart> {
    return of(newCart);
  }
}

class MockUserIdService implements Partial<UserIdService> {
  getUserId(): Observable<string> {
    return of();
  }
}

class MockRoutingService implements Partial<RoutingService> {
  go = createSpy();
}

describe('QuoteActionLinksService', () => {
  let service: QuoteActionLinksService;
  let userIdService: UserIdService;
  let routingService: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MultiCartFacade, useClass: MockMultiCartFacade },
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    }).compileComponents();

    service = TestBed.inject(QuoteActionLinksService);
    userIdService = TestBed.inject(UserIdService);
    routingService = TestBed.inject(RoutingService);
    spyOn(userIdService, 'getUserId').and.returnValue(of('current'));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createNewCart', () => {
    it('should create a new cart ', (done) => {
      service['createNewCart']().subscribe((cart) => {
        expect(cart).toBe(newCart);
        expect(userIdService.getUserId).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('goToNewCart', () => {
    it('should redirect to the cart page', () => {
      service.goToNewCart();
      expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'cart' });
    });
  });
});
