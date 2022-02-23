import { TestBed } from '@angular/core/testing';
import { ActiveCartFacade, OrderEntry } from '@spartacus/cart/base/root';
import { Observable, of } from 'rxjs';
import { ClearCartDialogComponentService } from './clear-cart-dialog-component.service';
import { LaunchDialogService } from '@spartacus/storefront';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { take } from 'rxjs/operators';
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

  it('should determine clear cart progess', (done) => {
    spyOn(activeCartFacade, 'isStable').and.returnValue(of(false));

    service.clearActiveCart();
    service
      .isClearCartInProgress()
      .pipe(take(1))
      .subscribe((clearing) => {
        expect(clearing).toBeTruthy();
        done();
      });
  });

  it('should return clear cart not in progess when cart is stable ', (done) => {
    spyOn(activeCartFacade, 'isStable').and.returnValue(of(true));
    service
      .isClearCartInProgress()
      .pipe(take(1))
      .subscribe((clearing) => {
        expect(clearing).toBeFalsy();
        done();
      });
  });

  it('should get entries from active cart', () => {
    spyOn(activeCartFacade, 'getEntries').and.returnValue(of([mockCartEntry]));

    service.clearActiveCart();

    expect(activeCartFacade['getEntries']).toHaveBeenCalled();
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
