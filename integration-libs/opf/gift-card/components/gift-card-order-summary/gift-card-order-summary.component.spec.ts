import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftCardOrderSummaryComponent } from './gift-card-order-summary.component';
import { I18nTestingModule } from '@spartacus/core';
import { of } from 'rxjs';

// Mock cart data for testing
const mockCart: Cart = {
  code: '123456',
  totalPrice: { formattedValue: '$100.00' },
  entries: [{ product: { name: 'Gift Card' }, quantity: 1 }],
};

class MockActiveCartFacade {
  getActive = jasmine.createSpy('getActive').and.returnValue(of(mockCart));
}

describe('GiftCardOrderSummaryComponent', () => {
  let component: GiftCardOrderSummaryComponent;
  let fixture: ComponentFixture<GiftCardOrderSummaryComponent>;
  let activeCartFacade: ActiveCartFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [GiftCardOrderSummaryComponent],
      providers: [
        { provide: ActiveCartFacade, useClass: MockActiveCartFacade },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GiftCardOrderSummaryComponent);
    component = fixture.componentInstance;
    activeCartFacade = TestBed.inject(ActiveCartFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize cart$ with data from ActiveCartFacade', (done) => {
    // Assert that the facade method was called
    expect(activeCartFacade.getActive).toHaveBeenCalled();

    // Subscribe to the observable to verify the data
    component.cart$.subscribe((cart) => {
      expect(cart).toEqual(mockCart);
      expect(cart.code).toBe('123456');
      done();
    });
  });
});
