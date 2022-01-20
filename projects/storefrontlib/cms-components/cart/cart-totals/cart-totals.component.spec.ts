import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActiveCartService,
  Cart,
  FeaturesConfigModule,
  I18nTestingModule,
  OrderEntry,
} from '@spartacus/core';
import { Observable, of, Subject } from 'rxjs';
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

class MockActiveCartService {
  getActive(): Observable<Cart> {
    return of(cartMock);
  }
  getEntries(): Observable<OrderEntry[]> {
    return of(entriesMock);
  }
}

let mockRouterEvents$ = new Subject<RouterEvent>();
class MockRouter implements Partial<Router> {
  events = mockRouterEvents$;
  routerState = { snapshot: { root: {} } } as any;
}

describe('CartTotalsComponent', () => {
  let component: CartTotalsComponent;
  let fixture: ComponentFixture<CartTotalsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          I18nTestingModule,
          CartCouponModule,
          FeaturesConfigModule,
        ],
        declarations: [
          CartTotalsComponent,
          MockOrderSummaryComponent,
          MockUrlPipe,
        ],
        providers: [
          {
            provide: ActiveCartService,
            useClass: MockActiveCartService,
          },
          {
            provide: Router,
            useClass: MockRouter,
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

  it('should get entries on ngOnInit()', () => {
    let entries: OrderEntry[];

    component.ngOnInit();
    fixture.detectChanges();

    component.entries$.subscribe((data: OrderEntry[]) => (entries = data));
    expect(entries).toEqual(entriesMock);
  });

  it('should disable button when checkout routing with cart validation is active and enable once navigation is over', () => {
    component.ngOnInit();
    fixture.detectChanges();

    component.disableButtonWhileNavigation();
    expect(component.cartValidationInProgress).toEqual(true);
    mockRouterEvents$.next(new NavigationEnd(null, null, null));
    expect(component.cartValidationInProgress).toEqual(false);
  });
});
