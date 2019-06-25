import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule, Voucher } from '@spartacus/core';
import { CartCouponAnchorComponent } from './cart-coupon-anchor.component';

describe('CartCouponAnchorComponent', () => {
  let component: CartCouponAnchorComponent;
  let fixture: ComponentFixture<CartCouponAnchorComponent>;

  const mockVouchers: Voucher[] = [{ code: 'mockVoucher' }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [CartCouponAnchorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartCouponAnchorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should prompt enter coupon codes', () => {
    component.vouchers = [];
    const anchorTitle = fixture.debugElement.query(
      By.css('.cx-cart-coupon-anchor-link')
    ).nativeElement; 
  
    anchorTitle.click();
    fixture.detectChanges();
    expect(component.scrollToAnchor).toHaveBeenCalled();
    expect(anchorTitle.innerText).toEqual('voucher.anchor.noVouchers');
  });

  it('should display coupons applied title and count', () => {
    component.vouchers = mockVouchers;
    
    const anchorTitle = fixture.debugElement.query(
      By.css('.cx-cart-coupon-anchor-link')
    ).nativeElement;

    anchorTitle.click();
    fixture.detectChanges();
    expect(component.scrollToAnchor).toHaveBeenCalled();
    expect(anchorTitle.innerText).toContain(mockVouchers.length);
    expect(anchorTitle.innerText).toContain('voucher.anchor.vouchers');
  });

  it('should display apply coupon tips', () => {
    fixture.detectChanges();
    const tipsContent = fixture.debugElement.query(
      By.css('.cx-cart-coupon-anchor-tips')
    ).nativeElement.innerText;

    expect(tipsContent).toEqual('voucher.anchor.tips');
  });
});
