import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule, Voucher } from '@spartacus/core';
import { CartCouponAnchorComponent } from './cart-coupon-anchor.component';
import { CartCouponAnchorService } from './cart-coupon-anchor.service';

describe('CartCouponAnchorComponent', () => {
  let component: CartCouponAnchorComponent;
  let fixture: ComponentFixture<CartCouponAnchorComponent>;
  const cartCouponAnchorService = jasmine.createSpyObj(
    'CartCouponAnchorService',
    ['getEventEmit']
  );

  const mockVouchers: Voucher[] = [{ code: 'mockVoucher' }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [CartCouponAnchorComponent],
      providers: [
        {
          provide: CartCouponAnchorService,
          useValue: cartCouponAnchorService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartCouponAnchorComponent);
    component = fixture.componentInstance;
    cartCouponAnchorService.getEventEmit.and.stub();
    spyOn(component, 'sendScrollEvent').and.callThrough();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should prompt enter coupon codes', () => {
    component.vouchers = [];
    fixture.detectChanges();
    const anchorTitle = fixture.debugElement.query(
      By.css('.cx-cart-coupon-anchor-link')
    ).nativeElement;

    anchorTitle.click();

    expect(component.sendScrollEvent).toHaveBeenCalledWith('#applyVoucher');
    expect(cartCouponAnchorService.getEventEmit).toHaveBeenCalled();
    expect(anchorTitle.innerText).toEqual('voucher.anchor.noVouchers');
  });

  it('should display coupons applied title and count', () => {
    component.vouchers = mockVouchers;
    fixture.detectChanges();

    const anchorTitle = fixture.debugElement.query(
      By.css('.cx-cart-coupon-anchor-link')
    ).nativeElement;
    anchorTitle.click();

    expect(component.sendScrollEvent).toHaveBeenCalledWith('#applyVoucher');
    expect(cartCouponAnchorService.getEventEmit).toHaveBeenCalled();
    expect(anchorTitle.innerText).toContain('voucher.anchor.vouchers');
    expect(anchorTitle.innerText).toContain(mockVouchers.length);
  });

  it('should display apply coupon tips', () => {
    fixture.detectChanges();
    const tipsContent = fixture.debugElement.query(
      By.css('.cx-cart-coupon-anchor-tips')
    ).nativeElement.innerText;
    expect(tipsContent).toEqual('voucher.anchor.tips');
  });
});
