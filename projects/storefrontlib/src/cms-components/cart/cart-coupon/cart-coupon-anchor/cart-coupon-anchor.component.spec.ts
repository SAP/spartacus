import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import { CartCouponAnchorComponent } from './cart-coupon-anchor.component';
import { CartCouponAnchorService } from './cart-coupon-anchor.service';

describe('CartCouponAnchorComponent', () => {
  let component: CartCouponAnchorComponent;
  let fixture: ComponentFixture<CartCouponAnchorComponent>;

  let cartCouponAnchorService;
  let spyEmitter;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [CartCouponAnchorComponent],
      providers: [CartCouponAnchorService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartCouponAnchorComponent);
    component = fixture.componentInstance;
    cartCouponAnchorService = TestBed.get(CartCouponAnchorService);
    spyEmitter = jasmine.createSpyObj('EventEmitter', ['emit']);
    spyOn(cartCouponAnchorService, 'getEventEmit').and.returnValue(spyEmitter);
    spyOn(component, 'sendScrollEvent').and.callThrough();
    spyEmitter.emit.and.stub();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display coupons anchor title and clickable', () => {
    fixture.detectChanges();

    const anchorTitle = fixture.debugElement.query(
      By.css('[data-test="anchor-coupon"]')
    ).nativeElement;
    anchorTitle.click();
    expect(spyEmitter.emit).toHaveBeenCalledWith();
    expect(anchorTitle.innerText).toContain('voucher.anchorLabel');
  });
});
