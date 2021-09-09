import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  CartVoucherService,
  I18nTestingModule,
  Voucher,
} from '@spartacus/core';
import { MockFeatureLevelDirective } from '../../../../shared/test/mock-feature-level-directive';
import { PromotionsModule } from '../../../misc/promotions/promotions.module';
import { OrderSummaryComponent } from './order-summary.component';

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

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CommonModule, PromotionsModule, I18nTestingModule],
        declarations: [
          OrderSummaryComponent,
          MockAppliedCouponsComponent,
          MockFeatureLevelDirective,
        ],
        providers: [{ provide: CartVoucherService, useValue: {} }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSummaryComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
