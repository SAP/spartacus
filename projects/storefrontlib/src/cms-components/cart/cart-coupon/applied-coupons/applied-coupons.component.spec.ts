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

describe('AppliedCouponsComponent', () => {
  let component: AppliedCouponsComponent;
  let fixture: ComponentFixture<AppliedCouponsComponent>;

  const mockCartService = jasmine.createSpyObj('CartService', [
    'removeVoucher',
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [AppliedCouponsComponent, MockCxIconComponent],
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

  it('should sort conpons', () => {
    component.vouchers = [coupon2, coupon1];
    fixture.detectChanges();
    const elValue = fixture.debugElement.queryAll(
      By.css('.cx-cart-coupon-code')
    );
    expect(elValue.length).toBe(2);
    expect(elValue[0].nativeElement.innerText).toContain(coupon1.code);
    expect(elValue[1].nativeElement.innerText).toContain(coupon2.code);
    expect([coupon1, coupon2] === component.sortedVouchers);
  });

  describe('test applied coupons in "ReadOnly" mode', () => {
    beforeEach(() => {
      component.isReadOnly = true;
    });
    it('should not show coupon list when no coupons applied', () => {
      component.vouchers = [];
      fixture.detectChanges();
      const elTitle = fixture.debugElement.queryAll(
        By.css('.cx-applied-coupon-title')
      );
      const elValue = fixture.debugElement.queryAll(
        By.css('.cx-applied-coupon-code')
      );
      const elButton = fixture.debugElement.query(By.css('button'));

      expect(elTitle.length).toBe(0);
      expect(elValue.length).toBe(0);
      expect(elButton).toBeNull();
      expect(component.sortedVouchers.length === 0);
    });

    it('should not show coupon list when undefined list', () => {
      fixture.detectChanges();
      const elTitle = fixture.debugElement.queryAll(
        By.css('.cx-applied-coupon-title')
      );
      const elValue = fixture.debugElement.queryAll(
        By.css('.cx-applied-coupon-code')
      );
      const elButton = fixture.debugElement.query(By.css('button'));

      expect(elTitle.length).toBe(0);
      expect(elValue.length).toBe(0);
      expect(elButton).toBeNull();
      expect(component.sortedVouchers.length === 0);
    });

    it('should show singular coupon tile when 1 coupon applied', () => {
      component.vouchers = [coupon1];
      fixture.detectChanges();
      const couponTitle = fixture.debugElement.query(
        By.css('.cx-applied-coupon-title')
      ).nativeElement.innerText;
      const elValue = fixture.debugElement.queryAll(
        By.css('.cx-applied-coupon-code')
      );
      expect(elValue.length).toBe(1);
      expect(couponTitle).toContain('voucher.coupon');
      expect(elValue[0].nativeElement.innerText).toContain(coupon1.code);
    });

    it('should show plural coupon tile when more than 1 coupons applied', () => {
      component.vouchers = [coupon2, coupon1];
      fixture.detectChanges();

      const couponTitle = fixture.debugElement.query(
        By.css('.cx-applied-coupon-title')
      ).nativeElement.innerText;
      const elValue = fixture.debugElement.queryAll(
        By.css('.cx-applied-coupon-code')
      );
      expect(elValue.length).toBe(2);
      expect(couponTitle).toContain('voucher.coupons');
      expect(elValue[0].nativeElement.innerText).toContain(coupon1.code);
      expect(elValue[1].nativeElement.innerText).toContain(coupon2.code);
    });
  });

  describe('test applied coupons in "Editable" mode', () => {
    it('should not show coupon list when no coupons applied', () => {
      component.vouchers = [];
      fixture.detectChanges();
      const elTitle = fixture.debugElement.queryAll(
        By.css('.cx-cart-coupon-title')
      );
      const elValue = fixture.debugElement.queryAll(
        By.css('.cx-cart-coupon-code')
      );
      const elButton = fixture.debugElement.query(By.css('button'));

      expect(elTitle.length).toBe(0);
      expect(elValue.length).toBe(0);
      expect(elButton).toBeNull();
      expect(component.sortedVouchers.length === 0);
    });

    it('should show applied coupons', () => {
      component.vouchers = [coupon2, coupon1];
      fixture.detectChanges();
      const elTitle = fixture.debugElement.query(
        By.css('.cx-cart-coupon-title')
      );
      const elValue = fixture.debugElement.queryAll(
        By.css('.cx-cart-coupon-code')
      );
      const elButton = fixture.debugElement.queryAll(By.css('button'));

      expect(elTitle).toBeNull();
      expect(elButton.length).toBe(2);
      expect(elValue.length).toBe(2);
      expect(elValue[0].nativeElement.innerText).toContain(coupon1.code);
      expect(elValue[1].nativeElement.innerText).toContain(coupon2.code);
    });

    it('should call remove for remove button not ready only', () => {
      component.vouchers = [coupon1];
      fixture.detectChanges();

      const elButton = fixture.debugElement.query(By.css('button'))
        .nativeElement;
      elButton.click();

      expect(mockCartService.removeVoucher).toHaveBeenCalledWith(coupon1.code);
    });
  });
});
