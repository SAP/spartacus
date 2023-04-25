import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Customer360SectionConfig } from '@spartacus/asm/customer-360/root';
import { Cart } from '@spartacus/cart/base/root';
import { UrlCommand, User } from '@spartacus/core';
import { OrderHistoryList } from '@spartacus/order/root';
import { combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';

import { Customer360SectionContext } from '../customer-360-section-context.model';
import { AsmCustomerSectionComponent } from './asm-customer-section.component';

describe('AsmCustomerSectionComponent', () => {
  let component: AsmCustomerSectionComponent;
  let fixture: ComponentFixture<AsmCustomerSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsmCustomerSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AsmCustomerSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should channel data to its children through the context source', (done) => {
    const activeCart: Cart = {
      code: 'cart001',
    };

    const config: Customer360SectionConfig = {
      pageSize: 5,
    };

    const customer: User = {
      uid: 'customer001',
    };

    const data: any = 'foo';

    const orderHistory: OrderHistoryList = {
      orders: [],
    };

    const savedCarts: Array<Cart> = [activeCart, { code: 'cart002' }];

    const context = fixture.debugElement.injector.get(
      Customer360SectionContext
    );

    const subscription = combineLatest([
      context.activeCart$,
      context.config$,
      context.customer$,
      context.data$,
      context.orderHistory$,
      context.savedCarts$,
    ])
      .pipe(take(1))
      .subscribe(([value1, value2, value3, value4, value5, value6]) => {
        expect(value1).toBe(activeCart);
        expect(value2).toBe(config);
        expect(value3).toBe(customer);
        expect(value4).toBe(data);
        expect(value5).toBe(orderHistory);
        expect(value6).toBe(savedCarts);

        subscription.unsubscribe();

        done();
      });

    component.activeCart = activeCart;
    component.config = config;
    component.customer = customer;
    component.data = data;
    component.orderHistory = orderHistory;
    component.savedCarts = savedCarts;
  });

  it('should channel data from its children to its parent', (done) => {
    const command: UrlCommand = {
      cxRoute: 'cart',
    };

    const subscription = component.navigate.subscribe((event) => {
      expect(event).toBe(command);

      subscription.unsubscribe();

      done();
    });

    const context = fixture.debugElement.injector.get(
      Customer360SectionContext
    );

    context.navigate$.next(command);
  });
});
