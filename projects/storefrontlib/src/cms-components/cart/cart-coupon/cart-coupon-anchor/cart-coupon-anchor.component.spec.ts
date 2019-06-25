import { EventEmitter } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule, Voucher } from '@spartacus/core';
import { CartCouponAnchorComponent } from './cart-coupon-anchor.component';
import { CartCouponAnchorService } from './cart-coupon-anchor.service';

class MockCartCouponAnchorService {
  getEventEmit(): EventEmitter<string> {
    return new EventEmitter<string>();
  }
}
describe('CartCouponAnchorComponent', () => {
  let component: CartCouponAnchorComponent;
  let fixture: ComponentFixture<CartCouponAnchorComponent>;

  let cartCouponAnchorService;
  const mockVouchers: Voucher[] = [{ code: 'mockVoucher' }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [CartCouponAnchorComponent],
      providers: [
        {
          provide: CartCouponAnchorService,
          useClass: MockCartCouponAnchorService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartCouponAnchorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    cartCouponAnchorService = TestBed.get(CartCouponAnchorService);
    spyOn(component, 'sendScrollEvent').and.callThrough();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should prompt enter coupon codes', () => {
    spyOn(cartCouponAnchorService, 'getEventEmit').and.callThrough();
    component.vouchers = [];
    const anchorTitle = fixture.debugElement.query(
      By.css('.cx-cart-coupon-anchor-link')
    ).nativeElement;

    anchorTitle.click();
    fixture.detectChanges();
    expect(component.sendScrollEvent).toHaveBeenCalledWith('#applyVoucher');
    expect(cartCouponAnchorService.getEventEmit).toHaveBeenCalled();
    expect(anchorTitle.innerText).toEqual('voucher.anchor.noVouchers');
  });

  it('should display coupons applied title and count', () => {
    spyOn(cartCouponAnchorService, 'getEventEmit').and.callThrough();
    component.vouchers = mockVouchers;
    const anchorTitle = fixture.debugElement.query(
      By.css('.cx-cart-coupon-anchor-link')
    ).nativeElement;
    anchorTitle.click();
    fixture.detectChanges();
    expect(component.sendScrollEvent).toHaveBeenCalledWith('#applyVoucher');
    expect(cartCouponAnchorService.getEventEmit).toHaveBeenCalled();
    expect(anchorTitle.innerText).toContain('voucher.anchor.vouchers');
    expect(anchorTitle.innerText).toContain(mockVouchers.length);
  });

  it('should display apply coupon tips', () => {
    const tipsContent = fixture.debugElement.query(
      By.css('.cx-cart-coupon-anchor-tips')
    ).nativeElement.innerText;
    expect(tipsContent).toEqual('voucher.anchor.tips');
  });
});
