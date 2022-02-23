import { TestBed } from '@angular/core/testing';
import { ActiveCartFacade, OrderEntry } from '@spartacus/cart/base/root';
import { Observable, of } from 'rxjs';
import { ClearCartDialogComponentService } from './clear-cart-dialog-component.service';
import { LaunchDialogService } from '@spartacus/storefront';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import createSpy = jasmine.createSpy;

const mockCloseReason = 'Close Dialog';
const mockCartEntry: OrderEntry = { entryNumber: 0 };

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy().and.stub();
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  closeDialog(_reason: string): void {}
}

class MockActiveCartFacade implements Partial<ActiveCartFacade> {
  getEntries(): Observable<OrderEntry[]> {
    return of();
  }

  isStable(): Observable<boolean> {
    return of();
  }

  removeEntry(): void {}
}

describe('ClearCartDialogComponentService', () => {
  let service: ClearCartDialogComponentService;
  let activeCartFacade: ActiveCartFacade;
  let launchDialogService: LaunchDialogService;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: ActiveCartFacade, useClass: MockActiveCartFacade },
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
    }).compileComponents();

    service = TestBed.inject(ClearCartDialogComponentService);
    launchDialogService = TestBed.inject(LaunchDialogService);
    activeCartFacade = TestBed.inject(ActiveCartFacade);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should determine clear cart process', (done) => {
    spyOn(activeCartFacade, 'isStable').and.returnValue(of(false));

    service
      .isClearCartInProgress()
      .subscribe((clearing) => {
        expect(clearing).toBeTruthy();
        done();
      })
      .unsubscribe();
  });

  it('should return clear cart not in process when cart is stable ', (done) => {
    spyOn(activeCartFacade, 'isStable').and.returnValue(of(true));

    service
      .isClearCartInProgress()
      .subscribe((clearing) => {
        expect(clearing).toBeFalsy();
        done();
      })
      .unsubscribe();
  });

  it('should remove entries from active cart', () => {
    spyOn(activeCartFacade, 'getEntries').and.returnValues(
      of([mockCartEntry]),
      of([])
    );
    spyOn(activeCartFacade, 'removeEntry').and.callThrough();
    spyOn(activeCartFacade, 'isStable').and.returnValue(of(true));
    spyOn(launchDialogService, 'closeDialog').and.callThrough();

    service.clearActiveCart();

    expect(activeCartFacade.getEntries).toHaveBeenCalledWith();
    expect(activeCartFacade.getEntries).toHaveBeenCalledTimes(2);
    expect(activeCartFacade.removeEntry).toHaveBeenCalledWith(mockCartEntry);
    expect(activeCartFacade.isStable).toHaveBeenCalledWith();
    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      'Close dialog after cart cleared'
    );
    expect(globalMessageService.add).toHaveBeenCalledWith(
      { key: 'clearCart.cartClearedSuccessfully' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  });

  it('should meet the problem while removing entries from active cart', () => {
    spyOn(activeCartFacade, 'getEntries').and.returnValues(
      of([mockCartEntry]),
      of([mockCartEntry])
    );
    spyOn(activeCartFacade, 'removeEntry').and.callThrough();
    spyOn(activeCartFacade, 'isStable').and.returnValue(of(true));
    spyOn(launchDialogService, 'closeDialog').and.callThrough();

    service.clearActiveCart();

    expect(activeCartFacade.getEntries).toHaveBeenCalledWith();
    expect(activeCartFacade.getEntries).toHaveBeenCalledTimes(2);
    expect(activeCartFacade.removeEntry).toHaveBeenCalledWith(mockCartEntry);
    expect(activeCartFacade.isStable).toHaveBeenCalledWith();
    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      'Close dialog after cart cleared'
    );
    expect(globalMessageService.add).not.toHaveBeenCalled();
  });

  it('should display global message on success', () => {
    spyOn<any>(service, 'displayGlobalMessage').and.callThrough();

    service['displayGlobalMessage'](true);

    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'clearCart.cartClearedSuccessfully',
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  });

  it('should not display global message if clear cart is not successful', () => {
    spyOn<any>(service, 'displayGlobalMessage').and.callThrough();

    service['displayGlobalMessage'](false);
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
