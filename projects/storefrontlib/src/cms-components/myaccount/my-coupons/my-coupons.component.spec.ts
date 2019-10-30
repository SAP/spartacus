import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MyCouponsComponent } from './my-coupons.component';
import { I18nTestingModule } from '@spartacus/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  DebugElement,
} from '@angular/core';
import { CustomerCoupon } from 'projects/core/src/model/customer-coupon.model';

@Component({
  selector: 'cx-coupon-card',
  template: `
    <input
      type="checkbox"
      class="form-check-input"
      [checked]="coupon?.notificationOn"
      (change)="notificationChange()"
    />
  `,
})
class MockedCouponCardComponent {
  @Input()
  coupon: CustomerCoupon;
  @Output()
  notificationChanged = new EventEmitter<{
    couponId: string;
    notification: boolean;
  }>();

  notificationChange(): void {
    this.notificationChanged.emit({
      couponId: this.coupon.couponId,
      notification: !this.coupon.notificationOn,
    });
  }
}

describe('MyCouponsComponent', () => {
  let component: MyCouponsComponent;
  let fixture: ComponentFixture<MyCouponsComponent>;
  let el: DebugElement;

  const customerCouponService = jasmine.createSpyObj('CustomerCouponService', [
    'getCustomerCoupons',
    'getCustomerCouponsLoading',
    'loadCustomerCoupons',
    'subscribeCustomerCoupon',
    'unsubscribeCustomerCoupon',
    'getSubscribeCustomerCouponResultLoading',
    'getUnsubscribeCustomerCouponResultLoading',
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, RouterTestingModule],
      declarations: [MyCouponsComponent, MockedCouponCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCouponsComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    customerCouponService.getCustomerCoupons.and.returnValue(of(''));
    customerCouponService.getCustomerCouponsLoading.and.returnValue(of(false));
    customerCouponService.loadCustomerCoupons.and.stub();
    customerCouponService.getSubscribeCustomerCouponResultLoading.and.returnValue(
      of(true)
    );
    customerCouponService.getUnsubscribeCustomerCouponResultLoading.and.returnValue(
      of(true)
    );
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should be able to show message when there is no coupon', () => {
    fixture.detectChanges();
    const message = el.query(By.css('.cx-section-msg')).nativeElement
      .textContent;
    expect(!message).toBeFalsy();
  });

  it('should be able to show coupons', () => {
    fixture.detectChanges();

    const message = el.queryAll(By.css('.cx-section-msg'));
    expect(message.length).toBe(0);

    const sortComponent = el.nativeElement.querySelectorAll('cx-sorting');
    expect(sortComponent.length).toBe(2);

    const paginationComponent = el.nativeElement.querySelectorAll(
      'cx-pagination'
    );
    expect(paginationComponent.length).toBe(2);
    const couponCardComponent = el.nativeElement.querySelectorAll(
      'cx-coupon-card'
    );
    expect(couponCardComponent.length).toBe(2);
  });
  it('should be able to change sort', () => {
    fixture.detectChanges();
    component.sortChange('byStartDateAsc');
    expect(customerCouponService.loadCustomerCoupons).toHaveBeenCalledWith(
      10,
      0,
      'startDate:asc'
    );
  });
  it('should be able to change page', () => {
    customerCouponService.getCustomerCoupons.and.returnValue(of());
    component.pageChange(1);
    fixture.detectChanges();
    expect(customerCouponService.loadCustomerCoupons).toHaveBeenCalledWith(
      10,
      1,
      'startDate:asc'
    );
  });

  it('should be able to change coupon notification', () => {
    fixture.detectChanges();
    el.query(By.css('form-check-input')).triggerEventHandler('click', null);
    expect(customerCouponService.subscribeCustomerCoupon).toHaveBeenCalledWith(
      'CustomerCoupon1'
    );
    fixture.debugElement
      .query(By.css('form-check-input'))
      .triggerEventHandler('click', null);
    expect(
      customerCouponService.unsubscribeCustomerCoupon
    ).toHaveBeenCalledWith('CustomerCoupon1');
  });
});
