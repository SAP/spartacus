import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SavedCartService } from '@spartacus/cart/saved-cart/core';
import {
  Cart,
  ClearCheckoutService,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { SavedCartListComponent } from './saved-cart-list.component';

class MockSavedCartService implements Partial<SavedCartService> {
  deleteSavedCart(_cartId: string): void {}
  clearRestoreSavedCart(): void {}
  loadSavedCarts(): void {}
  clearSaveCart(): void {}
  clearSavedCarts(): void {}
  getList(): Observable<Cart[]> {
    return of([]);
  }
  restoreSavedCart(_cartId: string): void {}
  getRestoreSavedCartProcessSuccess(): Observable<boolean> {
    return of();
  }
  getSavedCartListProcessLoading(): Observable<boolean> {
    return of(true);
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [SavedCartListComponent],
      providers: [
        { provide: SavedCartService, useClass: MockSavedCartService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: ClearCheckoutService, useClass: MockClearCheckoutService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SavedCartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
