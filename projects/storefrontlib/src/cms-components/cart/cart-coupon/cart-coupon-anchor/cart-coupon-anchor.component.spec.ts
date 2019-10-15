import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { CartCouponAnchorComponent } from './cart-coupon-anchor.component';
import { CartCouponComponentService } from '../cart-coupon.component.service';

describe('CartCouponAnchorComponent', () => {
  let component: CartCouponAnchorComponent;
  let fixture: ComponentFixture<CartCouponAnchorComponent>;

  let cartCouponComponentService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [CartCouponAnchorComponent],
      providers: [CartCouponComponentService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartCouponAnchorComponent);
    component = fixture.componentInstance;
    cartCouponComponentService = TestBed.get(CartCouponComponentService);
    spyOn(component, 'sendScrollEvent').and.callThrough();
    spyOn(cartCouponComponentService, 'scrollIn').and.callThrough();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display coupons anchor title and clickable', () => {
    fixture.detectChanges();

    const anchorTitle = fixture.debugElement.query(
      By.css('.cx-cart-coupon-anchor-link')
    ).nativeElement;
    anchorTitle.click();
    expect(cartCouponComponentService.scrollIn).toHaveBeenCalledWith();
    expect(anchorTitle.innerText).toContain('voucher.anchorLabel');
  });
});
