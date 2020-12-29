import { Component, Input } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  I18nTestingModule,
  Voucher,
  CartVoucherService,
} from '@spartacus/core';
import { ICON_TYPE } from '../../../../cms-components/misc/icon/index';
import { AppliedCouponsComponent } from './applied-coupons.component';

const coupon1: Voucher = { code: 'coupon1', voucherCode: 'coupon1' };
const coupon2: Voucher = { code: 'coupon2', voucherCode: 'coupon2' };

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
      [vouchers]="coupons"
      [cartIsLoading]="cartIsLoading"
      [isReadOnly]="isReadOnly"
    >
    </cx-applied-coupons>
  `,
})
class MockedCartCouponComponent {
  coupons = [coupon2, coupon1];
  cartIsLoading = false;
  isReadOnly = false;
}

describe('AppliedCouponsComponent', () => {
  let component: MockedCartCouponComponent;
  let fixture: ComponentFixture<MockedCartCouponComponent>;

  const mockCartVoucherService = jasmine.createSpyObj('CartVoucherService', [
    'removeVoucher',
  ]);

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [
          AppliedCouponsComponent,
          MockCxIconComponent,
          MockedCartCouponComponent,
        ],
        providers: [
          { provide: CartVoucherService, useValue: mockCartVoucherService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MockedCartCouponComponent);
    component = fixture.componentInstance;
    mockCartVoucherService.removeVoucher.and.stub();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('test applied coupons in "ReadOnly" mode', () => {
    beforeEach(() => {
      component.isReadOnly = true;
    });
    it('should not show coupon list when no coupons applied', () => {
      component.coupons = [];
      fixture.detectChanges();
      const elTitle = fixture.debugElement.queryAll(
        By.css('.cx-applied-coupon-title')
      );
      const elValue = fixture.debugElement.queryAll(
        By.css('.cx-applied-coupon-code')
      );

      expect(elTitle.length).toBe(0);
      expect(elValue.length).toBe(0);
    });

    it('should show coupon tile and coupon when coupon applied', () => {
      component.coupons = [coupon2, coupon1];
      fixture.detectChanges();
      const couponTitle = fixture.debugElement.query(
        By.css('.cx-applied-coupon-title')
      ).nativeElement.innerText;
      const elValue = fixture.debugElement.queryAll(
        By.css('.cx-applied-coupon-code')
      );
      expect(couponTitle).toContain('voucher.vouchersApplied');
      expect(elValue[0].nativeElement.innerText).toContain(coupon1.voucherCode);
      expect(elValue[1].nativeElement.innerText).toContain(coupon2.voucherCode);
    });
  });

  describe('test applied coupons in "Editable" mode', () => {
    beforeEach(() => {
      component.isReadOnly = false;
    });
    it('should not show coupon list with remove button when no coupons applied', () => {
      component.coupons = [];
      fixture.detectChanges();
      const elValue = fixture.debugElement.queryAll(
        By.css('.cx-cart-coupon-code')
      );
      const elButton = fixture.debugElement.query(By.css('.close'));

      expect(elValue.length).toBe(0);
      expect(elButton).toBeNull();
    });

    it('should show applied coupons', () => {
      component.coupons = [coupon2, coupon1];
      fixture.detectChanges();
      const elValue = fixture.debugElement.queryAll(
        By.css('.cx-cart-coupon-code')
      );
      const elButton = fixture.debugElement.queryAll(By.css('.close'));

      expect(elButton.length).toBe(2);
      expect(elValue.length).toBe(2);
      expect(elValue[0].nativeElement.innerText).toContain(coupon1.voucherCode);
      expect(elValue[1].nativeElement.innerText).toContain(coupon2.voucherCode);
    });

    it('should remove applied coupon', () => {
      component.coupons = [coupon1];
      fixture.detectChanges();

      fixture.debugElement.query(By.css('.close')).nativeElement.click();

      expect(mockCartVoucherService.removeVoucher).toHaveBeenCalledWith(
        coupon1.voucherCode
      );
    });

    it('should sort applied coupons', () => {
      component.coupons = [coupon2, coupon1];
      fixture.detectChanges();
      const elValue = fixture.debugElement.queryAll(
        By.css('.cx-cart-coupon-code')
      );

      expect(elValue.length).toBe(2);
      expect(elValue[0].nativeElement.innerText).toContain(coupon1.voucherCode);
      expect(elValue[1].nativeElement.innerText).toContain(coupon2.voucherCode);
    });
  });
});
