import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { Cart } from '@spartacus/core';
import { SavedCartService } from 'feature-libs/cart/saved-cart/core/services/saved-cart.service';
import { Observable, of } from 'rxjs';
import { SavedCartDetailService } from '../saved-cart-detail.service';

import { SavedCartDetailItemsComponent } from './saved-cart-detail-items.component';

class MockSavedCartDetailService implements Partial<SavedCartDetailService> {
  getCartDetails(): Observable<Cart> {
    return of();
  }
  getSavedCartId(): Observable<string> {
    return of();
  }
}

class MockSavedCartService implements Partial<SavedCartService> {
  isStable(_cartId: string): Observable<boolean> {
    return of();
  }
}

describe('SavedCartDetailItemsComponent', () => {
  let component: SavedCartDetailItemsComponent;
  let fixture: ComponentFixture<SavedCartDetailItemsComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [SavedCartDetailItemsComponent],
      providers: [
        {
          provide: SavedCartService,
          useClass: MockSavedCartService,
        },
        {
          provide: SavedCartDetailService,
          useClass: MockSavedCartDetailService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedCartDetailItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
