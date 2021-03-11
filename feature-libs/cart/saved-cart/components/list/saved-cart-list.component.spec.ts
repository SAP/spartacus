import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cart, I18nTestingModule, RoutingService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { SavedCartService } from '../../core/services/saved-cart.service';
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
