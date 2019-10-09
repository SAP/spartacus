import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CartService, I18nTestingModule, Voucher } from '@spartacus/core';
import { ICON_TYPE } from '../../../../cms-components/misc/icon/index';
import { AppliedCouponsComponent } from './applied-coupons.component';

const coupon1: Voucher = { code: 'coupon1' };
const coupon2: Voucher = { code: 'coupon2' };

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

@Component({
  template: `
    <cx-applied-coupons
      [vouchers]="cart.appliedVouchers"
      [cartIsLoading]="cartIsLoading"
      [isReadOnly]="false"
    >
    </cx-applied-coupons>
  `,
})
class MockedCartCouponComponent {
  coupon = coupon1;
  cartIsLoading = false;
}

describe('AppliedCouponsComponent', () => {
  let component: AppliedCouponsComponent;
  let fixture: ComponentFixture<AppliedCouponsComponent>;

  const mockCartService = jasmine.createSpyObj('CartService', [
    'removeVoucher',
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        AppliedCouponsComponent, 
        MockCxIconComponent, 
        MockedCartCouponComponent],
      providers: [{ provide: CartService, useValue: mockCartService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedCouponsComponent);
    component = fixture.componentInstance;
    mockCartService.removeVoucher.and.stub();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('test applied coupons in "ReadOnly" mode', () => {
    beforeEach(() => {
      component.isReadOnly = true;
    });
    fit('should not show coupon list when no coupons applied', () => {
      fixture.detectChanges();
      const elTitle = fixture.debugElement.queryAll(
        By.css('[data-test="summary-title-coupon"]')
      );
      const elValue = fixture.debugElement.queryAll(
        By.css('[data-test="applied-coupon"]')
      );

      expect(elTitle.length).toBe(0);
      expect(elValue.length).toBe(0);
      expect(component.sortedVouchers.length === 0);
    });

    it('should show coupon tile and coupon when coupon applied', () => {
      component.vouchers = [coupon2, coupon1];
      fixture.detectChanges();
      const couponTitle = fixture.debugElement.query(
        By.css('[data-test="summary-title-coupon"]')
      ).nativeElement.innerText;
      const elValue = fixture.debugElement.queryAll(
        By.css('[data-test="applied-coupon"]')
      );
      expect(couponTitle).toContain('voucher.coupon');
      expect(elValue.length).toBe(2);
      expect(elValue[0].nativeElement.innerText).toContain(coupon1.code);
      expect(elValue[1].nativeElement.innerText).toContain(coupon2.code);
    });
  });

  describe('test applied coupons in "Editable" mode', () => {
    beforeEach(() => {
      component.isReadOnly = false;
    });
    it('should not show coupon list with remove button when no coupons applied', () => {
      fixture.detectChanges();
      const elValue = fixture.debugElement.queryAll(
        By.css('[data-test="applied-coupon"]')
      );
      const elButton = fixture.debugElement.query(
        By.css('[data-test="remove-coupon"]')
      );

      expect(elValue.length).toBe(0);
      expect(elButton).toBeNull();
      expect(component.sortedVouchers.length === 0);
    });

    it('should show applied coupons', () => {
      component.vouchers = [coupon2, coupon1];
      fixture.detectChanges();
      const elValue = fixture.debugElement.queryAll(
        By.css('[data-test="applied-coupon"]')
      );
      const elButton = fixture.debugElement.queryAll(
        By.css('[data-test="remove-coupon"]')
      );

      expect(elButton.length).toBe(2);
      expect(elValue.length).toBe(2);
      expect(elValue[0].nativeElement.innerText).toContain(coupon1.code);
      expect(elValue[1].nativeElement.innerText).toContain(coupon2.code);
    });

    it('should remove applied coupon', () => {
      component.vouchers = [coupon1];
      fixture.detectChanges();

      fixture.debugElement
        .query(By.css('[data-test="remove-coupon"]'))
        .nativeElement.click();

      expect(mockCartService.removeVoucher).toHaveBeenCalledWith(coupon1.code);
    });

    it('should sort applied coupons', () => {
      component.vouchers = [coupon2, coupon1];
      fixture.detectChanges();
      const elValue = fixture.debugElement.queryAll(
        By.css('[data-test="applied-coupon"]')
      );

      expect(elValue.length).toBe(2);
      expect(elValue[0].nativeElement.innerText).toContain(coupon1.code);
      expect(elValue[1].nativeElement.innerText).toContain(coupon2.code);
    });

  });
});
