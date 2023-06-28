import { TestBed } from '@angular/core/testing';
import {
  ActiveCartFacade,
  MultiCartFacade,
  DeleteCartSuccessEvent as ClearActiveCartSuccessEvent,
} from '@spartacus/cart/base/root';
import { Observable, of } from 'rxjs';
import { UserIdService, EventService, RoutingService } from '@spartacus/core';
import { QuoteActionLinksService } from './quote-action-links.service';
import createSpy = jasmine.createSpy;

class MockActiveCartFacade implements Partial<ActiveCartFacade> {
  getActiveCartId(): Observable<string> {
    return of();
  }
}

class MockMultiCartFacade implements Partial<MultiCartFacade> {
  deleteCart(): void {}
}

class MockEventService implements Partial<EventService> {
  get(): Observable<any> {
    return of();
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
  let activeCartFacade: ActiveCartFacade;
  let multiCartFacade: MultiCartFacade;
  let eventService: EventService;
  let userIdService: UserIdService;
  let routingService: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ActiveCartFacade, useClass: MockActiveCartFacade },
        { provide: MultiCartFacade, useClass: MockMultiCartFacade },
        { provide: EventService, useClass: MockEventService },
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: RoutingService, useClass: MockRoutingService },
      ],
    }).compileComponents();

    service = TestBed.inject(QuoteActionLinksService);
    eventService = TestBed.inject(EventService);
    userIdService = TestBed.inject(UserIdService);
    activeCartFacade = TestBed.inject(ActiveCartFacade);
    multiCartFacade = TestBed.inject(MultiCartFacade);
    routingService = TestBed.inject(RoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should clear the active cart', () => {
    spyOn(eventService, 'get').and.returnValue(of(ClearActiveCartSuccessEvent));
    spyOn(multiCartFacade, 'deleteCart').and.callThrough();
    spyOn(userIdService, 'getUserId').and.returnValue(of('current'));
    spyOn(activeCartFacade, 'getActiveCartId').and.returnValue(of('00001122'));

    service.clearCart().subscribe().unsubscribe();

    expect(eventService.get).toHaveBeenCalled();
    expect(multiCartFacade.deleteCart).toHaveBeenCalled();
    expect(userIdService.getUserId).toHaveBeenCalled();
  });

  it('should redirect to the cart page', () => {
    spyOn(service, 'clearCart').and.returnValue(of(true));
    service.goToNewCart();

    expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'cart' });
  });
});
