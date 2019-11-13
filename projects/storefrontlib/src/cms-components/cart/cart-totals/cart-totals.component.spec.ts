import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  Cart,
  CartService,
  I18nTestingModule,
  OrderEntry,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CartCouponModule } from '../cart-coupon/cart-coupon.module';
import { CartTotalsComponent } from './cart-totals.component';

const cartMock: Cart = {
  name: 'cart-mock',
};

const entriesMock: OrderEntry[] = [
  {
    entryNumber: 1,
  },
  {
    entryNumber: 2,
  },
];

@Component({
  template: '',
  selector: 'cx-order-summary',
})
class MockOrderSummaryComponent {
  @Input()
  cart: Observable<Cart>;
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockCartService {
  getActive(): Observable<Cart> {
    return of(cartMock);
  }
  getEntries(): Observable<OrderEntry[]> {
    return of(entriesMock);
  }
}

describe('CartTotalsComponent', () => {
  let component: CartTotalsComponent;
  let fixture: ComponentFixture<CartTotalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, I18nTestingModule, CartCouponModule],
      declarations: [
        CartTotalsComponent,
        MockOrderSummaryComponent,
        MockUrlPipe,
      ],
      providers: [
        {
          provide: CartService,
          useClass: MockCartService,
        },
      ],
    }).compileComponents();
  }));

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

  it('should get entries on ngOnInit()', () => {
    let entries: OrderEntry[];

    component.ngOnInit();
    fixture.detectChanges();

    component.entries$.subscribe((data: OrderEntry[]) => (entries = data));
    expect(entries).toEqual(entriesMock);
  });
});
