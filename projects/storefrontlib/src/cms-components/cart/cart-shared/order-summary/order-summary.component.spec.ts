import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Cart,
  CartService,
  I18nTestingModule,
  CartVoucherService,
  Voucher,
} from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { PromotionsModule } from '../../../checkout';
import { OrderSummaryComponent } from './order-summary.component';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockFeatureLevelDirective } from '../../../../shared/test/mock-feature-level-directive';

class MockCartService {
  getActive(): BehaviorSubject<Cart> {
    return new BehaviorSubject({
      totalItems: 5141,
      subTotal: { formattedValue: '11119' },
    });
  }
}

@Component({
  selector: 'cx-applied-coupons',
  template: '',
})
class MockAppliedCouponsComponent {
  @Input()
  vouchers: Voucher[];
  @Input()
  cartIsLoading = false;
  @Input()
  isReadOnly = false;
}

describe('OrderSummary', () => {
  let component: OrderSummaryComponent;
  let fixture: ComponentFixture<OrderSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, PromotionsModule, I18nTestingModule],
      declarations: [
        OrderSummaryComponent,
        MockAppliedCouponsComponent,
        MockFeatureLevelDirective,
      ],
      providers: [
        { provide: CartService, useValue: MockCartService },
        { provide: CartVoucherService, useValue: {} },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSummaryComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
