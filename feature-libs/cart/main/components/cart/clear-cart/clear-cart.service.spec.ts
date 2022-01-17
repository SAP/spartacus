import { TestBed } from '@angular/core/testing';
import { ActiveCartFacade, OrderEntry } from '@spartacus/cart/main/root';
import { Observable, of } from 'rxjs';
import { ClearCartService } from './clear-cart.service';
import { GlobalMessageService } from '@spartacus/core';
import createSpy = jasmine.createSpy;

// const mockCartEntry0: OrderEntry = {
//   entryNumber: 0,
//   product: { code: 'code0' },
//   quantity: 1,
// };
// const mockCartEntry1: OrderEntry = {
//   entryNumber: 1,
//   product: { code: 'code1' },
//   quantity: 1,
// };
// const mockCartEntry2: OrderEntry = {
//   entryNumber: 2,
//   product: { code: 'code2' },
//   quantity: 1,
// };

//const entries: OrderEntry[] = [mockCartEntry0, mockCartEntry1, mockCartEntry2];

// const mockCart: Cart = {
//   code: '123456789',
//   description: 'testCartDescription',
//   name: 'testCartName',
// };

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy().and.stub();
}

class MockActiveCartFacade implements Partial<ActiveCartFacade> {
  addEntry(_productCode: string, _quantity: number): void {}
  clearActiveCart(): Observable<boolean> {
    return of(true);
  }
  isStable(): Observable<boolean> {
    return of();
  }
  getEntries(): Observable<OrderEntry[]> {
    return of([]);
  }
}

fdescribe('ClearCartService', () => {
  let service: ClearCartService;
  let activeCartFacade: ActiveCartFacade;
  //let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { useClass: MockActiveCartFacade, provide: ActiveCartFacade },
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
    }).compileComponents();

    service = TestBed.inject(ClearCartService);
    activeCartFacade = TestBed.inject(ActiveCartFacade);
    // globalMessageService = TestBed.inject(GlobalMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should clear the cart', () => {
    spyOn(activeCartFacade, 'clearActiveCart').and.returnValue(of(true));
    spyOn(activeCartFacade, 'isStable').and.returnValue(of(true));

    service.clearActiveCart();

    expect(activeCartFacade['clearActiveCart']).toHaveBeenCalled();
    expect(activeCartFacade['isStable']).toHaveBeenCalled();
  });
});
