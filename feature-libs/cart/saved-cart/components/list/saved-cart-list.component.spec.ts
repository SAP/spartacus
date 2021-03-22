import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SavedCartService } from '@spartacus/cart/saved-cart/core';
import {
  Cart,
  ClearCheckoutService,
  I18nTestingModule,
  RoutingService,
  TranslationService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { SavedCartListComponent } from './saved-cart-list.component';

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

class MockSavedCartService implements Partial<SavedCartService> {
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

class MockRoutingService implements Partial<RoutingService> {
  go(): void {}
}

describe('SavedCartListComponent', () => {
  let component: SavedCartListComponent;
  let fixture: ComponentFixture<SavedCartListComponent>;
  let savedCartService: SavedCartService | MockSavedCartService;
  let routingService: RoutingService | MockRoutingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [SavedCartListComponent, MockUrlPipe],
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: ClearCheckoutService, useClass: MockClearCheckoutService },
        { provide: TranslationService, useClass: MockTranslationService },
        { provide: SavedCartService, useClass: MockSavedCartService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    savedCartService = TestBed.inject(SavedCartService);
    routingService = TestBed.inject(RoutingService);
    fixture = TestBed.createComponent(SavedCartListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render proper number of carts when user contains saved carts', () => {
    component.savedCarts$ = savedCartService.getList();
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
    spyOn(savedCartService, 'loadSavedCarts').and.callThrough();
    component.savedCarts$ = savedCartService.getList();
    fixture.detectChanges();
    expect(savedCartService.loadSavedCarts).toHaveBeenCalledWith();
  });

  it('should trigger OnSuccess after OnInit', () => {
    const OnSuccessReturn = true;
    spyOn(
      savedCartService,
      'getRestoreSavedCartProcessSuccess'
    ).and.returnValue(of(OnSuccessReturn));
    spyOn(component, 'onSuccess').and.callThrough();
    component.savedCarts$ = savedCartService.getList();
    fixture.detectChanges();
    expect(component.onSuccess).toHaveBeenCalledWith(OnSuccessReturn);
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
    spyOn(savedCartService, 'restoreSavedCart').and.callThrough();
    component.restoreSavedCart(mockEvent, cartId);
    expect(savedCartService.restoreSavedCart).toHaveBeenCalledWith(
      mockCart1.code
    );
  });

  it('should clear cart when OnSuccess called', () => {
    spyOn(savedCartService, 'clearRestoreSavedCart').and.callThrough();
    spyOn(savedCartService, 'clearSaveCart').and.callThrough();
    component.onSuccess(true);
    expect(savedCartService.clearRestoreSavedCart).toHaveBeenCalledWith();
    expect(savedCartService.clearSaveCart).toHaveBeenCalledWith();
  });
});
