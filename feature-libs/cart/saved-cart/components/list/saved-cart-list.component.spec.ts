import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import {
  Cart,
  ClearCheckoutService,
  I18nTestingModule,
  RoutingService,
  TranslationService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { SavedCartListComponent } from './saved-cart-list.component';

const mockCart1: Cart = {
  code: '00001',
  name: 'test name',
  saveTime: new Date(2000, 2, 2),
  description: 'test description',
  totalItems: 2,
  totalPrice: {
    formattedValue: '$165.00',
  },
};
const mockCart2: Cart = {
  code: '00002',
  name: 'test name',
  saveTime: new Date(2000, 2, 2),
  description: 'test description',
  totalItems: 2,
  totalPrice: {
    formattedValue: '$167.00',
  },
};
const mockCarts: Cart[] = [mockCart1, mockCart2];

class MockSavedCartFacade implements Partial<SavedCartFacade> {
  deleteSavedCart(_cartId: string): void {}
  clearRestoreSavedCart(): void {}
  loadSavedCarts(): void {}
  clearSaveCart(): void {}
  clearSavedCarts(): void {}
  getList(): Observable<Cart[]> {
    return of(mockCarts);
  }
  restoreSavedCart(_cartId: string): void {}
  getRestoreSavedCartProcessSuccess(): Observable<boolean> {
    return of();
  }
  getSavedCartListProcessLoading(): Observable<boolean> {
    return of(false);
  }
}

class MockClearCheckoutService implements Partial<ClearCheckoutService> {
  resetCheckoutProcesses(): void {}
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockTranslationService {
  translate(text: string) {
    return text;
  }
}

class MockRoutingService implements Partial<RoutingService> {
  go(): void {}
}

describe('SavedCartListComponent', () => {
  let component: SavedCartListComponent;
  let fixture: ComponentFixture<SavedCartListComponent>;
  let savedCartFacade: SavedCartFacade | MockSavedCartFacade;
  let routingService: RoutingService | MockRoutingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [SavedCartListComponent, MockUrlPipe],
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: ClearCheckoutService, useClass: MockClearCheckoutService },
        { provide: TranslationService, useClass: MockTranslationService },
        { provide: SavedCartFacade, useClass: MockSavedCartFacade },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    savedCartFacade = TestBed.inject(SavedCartFacade);
    routingService = TestBed.inject(RoutingService);
    fixture = TestBed.createComponent(SavedCartListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render proper number of carts when user contains saved carts', () => {
    component.savedCarts$ = savedCartFacade.getList();
    fixture.detectChanges();
    const el = fixture.debugElement;
    expect(el.query(By.css('.cx-saved-cart-list-table'))).not.toBeNull();
    expect(el.queryAll(By.css('.cx-saved-cart-list-cart-id')).length).toEqual(
      mockCarts.length
    );
  });

  it('should render empty message if no saved carts exist', () => {
    const el = fixture.debugElement;
    component.savedCarts$ = of([]);
    fixture.detectChanges();
    expect(
      el.query(By.css('.cx-saved-cart-list-no-saved-carts'))
    ).not.toBeNull();
  });

  it('should trigger loadSavedCarts OnInit', () => {
    spyOn(savedCartFacade, 'loadSavedCarts').and.callThrough();
    component.savedCarts$ = savedCartFacade.getList();
    fixture.detectChanges();
    expect(savedCartFacade.loadSavedCarts).toHaveBeenCalledWith();
  });

  it('should trigger onRestoreComplete after OnInit', () => {
    const onRestoreCompleteReturn = true;
    spyOn(savedCartFacade, 'getRestoreSavedCartProcessSuccess').and.returnValue(
      of(onRestoreCompleteReturn)
    );
    spyOn(component, 'onRestoreComplete').and.callThrough();
    component.savedCarts$ = savedCartFacade.getList();
    fixture.detectChanges();
    expect(component.onRestoreComplete).toHaveBeenCalledWith(
      onRestoreCompleteReturn
    );
  });

  it('should trigger goToSavedCartDetails with proper route', () => {
    spyOn(routingService, 'go').and.callThrough();
    component.goToSavedCartDetails(mockCart1);
    fixture.detectChanges();
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'savedCartsDetails',
      params: { savedCartId: mockCart1.code },
    });
  });

  it('should restore proper cart when restoreSavedCart is triggered', () => {
    const mockMethod = function () {};
    const mockEvent: any = {};
    const cartId: string = '00001';
    mockEvent['stopPropagation'] = mockMethod;
    spyOn(savedCartFacade, 'restoreSavedCart').and.callThrough();
    component.restoreSavedCart(mockEvent, cartId);
    expect(savedCartFacade.restoreSavedCart).toHaveBeenCalledWith(
      mockCart1.code
    );
  });

  it('should clear cart when onRestoreComplete called', () => {
    spyOn(savedCartFacade, 'clearRestoreSavedCart').and.callThrough();
    spyOn(savedCartFacade, 'clearSaveCart').and.callThrough();
    component.onRestoreComplete(true);
    expect(savedCartFacade.clearRestoreSavedCart).toHaveBeenCalledWith();
    expect(savedCartFacade.clearSaveCart).toHaveBeenCalledWith();
  });
});
