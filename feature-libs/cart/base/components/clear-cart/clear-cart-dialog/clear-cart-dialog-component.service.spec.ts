import { TestBed } from '@angular/core/testing';
import { ActiveCartFacade, OrderEntry } from '@spartacus/cart/base/root';
import { Observable, of } from 'rxjs';
import { ClearCartDialogComponentService } from './clear-cart-dialog-component.service';
import { LaunchDialogService } from '@spartacus/storefront';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { tap } from 'rxjs/operators';
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

  it('should get and change clearing cart progess', () => {
    expect(service.isClearing$.value).toBeFalsy();
    service.clearActiveCart();
    service
      .getClearingCartProgess()
      .pipe(tap())
      .subscribe((clearing) => expect(clearing).toBeTruthy());
  });

  it('should call clearActiveCart', () => {
    spyOn(service, 'clearCart').and.returnValue(of(true));
    spyOn(activeCartFacade, 'getEntries').and.returnValue(of([mockCartEntry]));

    service.clearActiveCart();

    expect(activeCartFacade['getEntries']).toHaveBeenCalled();
    expect(service['clearCart']).toHaveBeenCalled();
  });

  it('should display global message on success', () => {
    spyOn(service, 'addSuccessGlobalMessage').and.callThrough();
    spyOn(activeCartFacade, 'getEntries').and.returnValue(of([]));

    service.onComplete();

    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'clearCart.cartClearedSuccessfully',
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  });

  it('should close dialog on close method', () => {
    spyOn(launchDialogService, 'closeDialog');
    service.closeDialog(mockCloseReason);

    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      mockCloseReason
    );
  });
});
