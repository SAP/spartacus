import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { SavedCartService } from '@spartacus/cart/saved-cart/core';
import { Cart } from '@spartacus/core';
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

  beforeEach(() => {
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

    fixture = TestBed.createComponent(SavedCartDetailItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
