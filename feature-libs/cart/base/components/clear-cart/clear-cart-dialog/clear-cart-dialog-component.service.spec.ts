import { TestBed } from '@angular/core/testing';
import {
  ActiveCartFacade,
  DeleteCartSuccessEvent as ClearActiveCartSuccessEvent,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import {
  EventService,
  GlobalMessageService,
  GlobalMessageType,
  UserIdService,
} from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { EMPTY, Observable, of } from 'rxjs';
import { ClearCartDialogComponentService } from './clear-cart-dialog-component.service';
import createSpy = jasmine.createSpy;

const mockCloseReason = 'Close Dialog';

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy().and.stub();
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  closeDialog(_reason: string): void {}
}

class MockActiveCartFacade implements Partial<ActiveCartFacade> {
  getActiveCartId(): Observable<string> {
    return EMPTY;
  }
}
class MockMultiCartFacade implements Partial<MultiCartFacade> {
  deleteCart(): void {}
}

class MockEventService implements Partial<EventService> {
  get(): Observable<any> {
    return EMPTY;
  }
}
class MockUserIdService implements Partial<UserIdService> {
  getUserId(): Observable<string> {
    return EMPTY;
  }
}

describe('ClearCartDialogComponentService', () => {
  let service: ClearCartDialogComponentService;
  let activeCartFacade: ActiveCartFacade;
  let multiCartFacade: MultiCartFacade;
  let launchDialogService: LaunchDialogService;
  let globalMessageService: GlobalMessageService;
  let eventService: EventService;
  let userIdService: UserIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: ActiveCartFacade, useClass: MockActiveCartFacade },
        { provide: MultiCartFacade, useClass: MockMultiCartFacade },
        { provide: EventService, useClass: MockEventService },
        { provide: UserIdService, useClass: MockUserIdService },
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
    }).compileComponents();

    service = TestBed.inject(ClearCartDialogComponentService);
    eventService = TestBed.inject(EventService);
    launchDialogService = TestBed.inject(LaunchDialogService);
    userIdService = TestBed.inject(UserIdService);
    activeCartFacade = TestBed.inject(ActiveCartFacade);
    multiCartFacade = TestBed.inject(MultiCartFacade);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should clear the active cart and display success message', () => {
    spyOn(eventService, 'get').and.returnValue(of(ClearActiveCartSuccessEvent));
    spyOn(multiCartFacade, 'deleteCart').and.callThrough();
    spyOn(launchDialogService, 'closeDialog').and.callThrough();
    spyOn(userIdService, 'getUserId').and.returnValue(of('current'));
    spyOn(activeCartFacade, 'getActiveCartId').and.returnValue(of('00001122'));
    spyOn<any>(service, 'displayGlobalMessage').and.callThrough();

    service.deleteActiveCart();

    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      'Close dialog after cart cleared'
    );
    expect(eventService.get).toHaveBeenCalled();
    expect(multiCartFacade.deleteCart).toHaveBeenCalled();
    expect(userIdService.getUserId).toHaveBeenCalled();

    expect(globalMessageService.add).toHaveBeenCalledWith(
      { key: 'clearCart.cartClearedSuccessfully' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  });

  it('should not display global message if clear cart is not successful', () => {
    spyOn(eventService, 'get').and.returnValue(EMPTY);
    spyOn(multiCartFacade, 'deleteCart').and.callThrough();
    spyOn(launchDialogService, 'closeDialog').and.callThrough();
    spyOn(userIdService, 'getUserId').and.returnValue(of('current'));
    spyOn(activeCartFacade, 'getActiveCartId').and.returnValue(of('00001122'));

    service.deleteActiveCart();

    expect(globalMessageService.add).not.toHaveBeenCalled();
  });

  it('should close dialog on close method', () => {
    spyOn(launchDialogService, 'closeDialog');
    service.closeDialog(mockCloseReason);

    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      mockCloseReason
    );
  });
});
