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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should only show the coupon list for ready only', () => {
    component.isReadOnly = true;
    component.vouchers = [coupon2, coupon1];
    fixture.detectChanges();
    const elTitle = fixture.debugElement.query(By.css('.cx-cart-coupon-title'));
    const couponTitle = elTitle.nativeElement.innerText;
    const elValue = fixture.debugElement.query(
      By.css('.cx-coupon-code-pill-value')
    );
    const couponCode = elValue.context;
    const elButton = fixture.debugElement.query(By.css('button'));

    expect(couponTitle).toEqual('voucher.coupons');
    expect(component.sortedVouchers.length > 0);
    component.sortedVouchers.forEach(coupon =>
      expect(coupon.code === couponCode)
    );

    expect(elButton).toBeNull();
  });

  it('should only show no coupon list for empty list', () => {
    component.isReadOnly = true;
    component.vouchers = [];
    fixture.detectChanges();
    const elTitle = fixture.debugElement.query(By.css('.cx-cart-coupon-title'));
    const elValue = fixture.debugElement.query(
      By.css('.cx-coupon-code-pill-value')
    );
    const elButton = fixture.debugElement.query(By.css('button'));

    expect(elValue).toBeNull();
    expect(elTitle).toBeNull();
    expect(elButton).toBeNull();
    expect(component.sortedVouchers.length === 0);
  });

  it('should only show coupon list for apply', () => {
    component.vouchers = [coupon1, coupon2];
    fixture.detectChanges();
    const elTitle = fixture.debugElement.query(By.css('.cx-cart-coupon-title'));
    const elValue = fixture.debugElement.query(
      By.css('.cx-coupon-code-pill-value')
    );
    const elButton = fixture.debugElement.query(By.css('button'));

    const couponCode = elValue.context;
    component.sortedVouchers.forEach(coupon =>
      expect(coupon.code === couponCode)
    );
    expect(elTitle).toBeNull();
    expect(elButton).toBeDefined();
  });

  it('should only show no coupon list for apply', () => {
    component.vouchers = [];
    fixture.detectChanges();
    const elTitle = fixture.debugElement.query(By.css('.cx-cart-coupon-title'));
    const elValue = fixture.debugElement.query(
      By.css('.cx-coupon-code-pill-value')
    );
    const elButton = fixture.debugElement.query(By.css('button'));

    expect(elValue).toBeNull();
    expect(elTitle).toBeNull();
    expect(elButton).toBeNull();
    expect(component.sortedVouchers.length === 0);
  });

  it('should call remove for remove button', () => {
    component.vouchers = [coupon1];
    fixture.detectChanges();

    const elButton = fixture.debugElement.query(By.css('button')).nativeElement;
    elButton.click();

    expect(mockCartService.removeVoucher).toHaveBeenCalledWith(coupon1.code);
  });

  it('should singular coupon tile  with one coupon', () => {
    component.isReadOnly = true;
    component.vouchers = [coupon1];
    fixture.detectChanges();

    const elTitle = fixture.debugElement.query(By.css('.cx-cart-coupon-title'));
    const couponTitle = elTitle.nativeElement.innerText;
    expect(couponTitle).toEqual('voucher.coupon');
  });
});
