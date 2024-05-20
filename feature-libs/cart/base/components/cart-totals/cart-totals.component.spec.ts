import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import { Observable, of } from 'rxjs';
import { CartTotalsComponent } from './cart-totals.component';

const cartMock: Cart = {
  name: 'cart-mock',
};

class MockActiveCartService {
  getActive(): Observable<Cart> {
    return of(cartMock);
  }
}

@Component({
  selector: 'cx-order-summary',
  template: '',
})
class MockOrderSummaryComponent {
  @Input() cart: Cart;
}

describe('CartTotalsComponent', () => {
  let component: CartTotalsComponent;
  let fixture: ComponentFixture<CartTotalsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CartTotalsComponent, MockOrderSummaryComponent],
        providers: [
          {
            provide: ActiveCartFacade,
            useClass: MockActiveCartService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CartTotalsComponent);
    component = fixture.componentInstance;
  });

  it('should get active cart on ngOnInit()', () => {
    let cart: Cart;

    component.ngOnInit();
    fixture.detectChanges();

    component.cart$.subscribe((data: Cart) => (cart = data));
    expect(cart).toEqual(cartMock);
  });
});
