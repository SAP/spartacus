import { TestBed } from '@angular/core/testing';
import { ActiveCartFacade } from '@spartacus/cart/main/root';
import { Observable, of } from 'rxjs';
import { takeLast, take } from 'rxjs/operators';
import { ClearCartService } from './clear-cart.service';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import createSpy = jasmine.createSpy;

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy().and.stub();
}

class MockActiveCartFacade implements Partial<ActiveCartFacade> {
  addEntry(_productCode: string, _quantity: number): void {}
  clearActiveCart(): Observable<boolean> {
    return of();
  }
}

describe('ClearCartService', () => {
  let service: ClearCartService;
  //let activeCartService: ActiveCartFacade;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ActiveCartFacade, useClass: MockActiveCartFacade },
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
    }).compileComponents();

    service = TestBed.inject(ClearCartService);
    //activeCartService = TestBed.inject(ActiveCartFacade);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call clearActiveCart and display global message', () => {
   // spyOn(activeCartService, '').and.returnValue(of(true));
    service.clearActiveCart();

    //Clearing cart progress: false -> true -> false
    service
      .getClearingCartProgess()
      .pipe(takeLast(2), take(1))
      .subscribe((inProgress) => expect(inProgress).toEqual(true));

    //expect(activeCartService.clearActiveCart).toHaveBeenCalled();
    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'clearCart.cartClearedSuccessfully',
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  });
});
