import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponCardComponent } from './coupon-card.component';
import { I18nTestingModule, CustomerCoupon } from '@spartacus/core';
import { By } from '@angular/platform-browser';
import { ModalService } from '../../../../shared/components/modal/index';
import { Pipe, PipeTransform } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

const mockCoupon: CustomerCoupon = {
  couponId: 'CustomerCoupon',
  description: 'CustomerCouponDescription',
  endDate: new Date('2019-12-30T23:59:59+0000'),
  name: 'CustomerCoupon:name',
  notificationOn: false,
  solrFacets: '%3Arelevance%3Acategory%3A1',
  startDate: new Date('1970-01-01T00:00:00+0000'),
  status: 'Effective',
};

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

describe('CouponCardComponent', () => {
  let component: CouponCardComponent;
  let fixture: ComponentFixture<CouponCardComponent>;
  const modalService = jasmine.createSpyObj('ModalService', ['open']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CouponCardComponent, MockUrlPipe],
      imports: [I18nTestingModule, RouterTestingModule],
      providers: [{ provide: ModalService, useValue: modalService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponCardComponent);
    component = fixture.componentInstance;
    component.coupon = mockCoupon;
    component.couponLoading = false;
    modalService.open.and.stub();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display coupon information', () => {
    fixture.detectChanges();
    const couponName = fixture.debugElement.query(
      By.css('.cx-coupon-card-name')
    ).nativeElement.textContent;
    expect(couponName).toContain('CustomerCoupon:name');

    const couponStatus = fixture.debugElement.query(By.css('.cx-coupon-status'))
      .nativeElement.textContent;
    expect(couponStatus).toContain('myCoupons.Effective');

    const couponEffectiveDateTitle = fixture.debugElement.query(
      By.css('.cx-coupon-card-date p')
    ).nativeElement.textContent;
    expect(couponEffectiveDateTitle).toContain('myCoupons.effectiveTitle');
    const couponStartDate = fixture.debugElement.query(
      By.css('.cx-coupon-date-start')
    ).nativeElement.textContent;
    expect(couponStartDate).toContain('Jan 1, 1970, 8:00:00 AM');
    const couponEndDate = fixture.debugElement.query(
      By.css('.cx-coupon-date-end')
    ).nativeElement.textContent;
    expect(couponEndDate).toContain('Dec 31, 2019, 7:59:59 AM');

    const readMoreLink = fixture.debugElement.query(By.css('a')).nativeElement
      .textContent;
    expect(readMoreLink).toContain('myCoupons.readMore');

    const couponNotificationCheckbox = fixture.debugElement.queryAll(
      By.css('.form-check-input')
    );
    expect(couponNotificationCheckbox.length).toBe(1);
    const couponNotificationLabel = fixture.debugElement.query(
      By.css('.form-check-label')
    ).nativeElement.textContent;
    expect(couponNotificationLabel).toContain('myCoupons.notification');

    const findProductBtn = fixture.debugElement.query(By.css('button'))
      .nativeElement.textContent;
    expect(findProductBtn).toContain('myCoupons.findProducts');
  });

  it('should be able to open coupon detail dialog', () => {
    fixture.detectChanges();
    const readMoreLink = fixture.debugElement.query(By.css('a'));
    readMoreLink.nativeElement.click();
    expect(modalService.open).toHaveBeenCalled();
  });

  it('should be able to subscribe/unsubscribe coupon notification', () => {
    spyOn(component.notificationChanged, 'emit').and.callThrough();
    fixture.detectChanges();
    const couponNotificationCheckbox = fixture.debugElement.query(
      By.css('.form-check-input')
    );
    couponNotificationCheckbox.nativeElement.click();

    expect(component.notificationChanged.emit).toHaveBeenCalledWith({
      notification: true,
      couponId: 'CustomerCoupon',
    });
  });

  it('should be able to show correct notification status', () => {
    fixture.detectChanges();
    let couponNotificationCheckbox = fixture.debugElement.queryAll(
      By.css('.form-check-input')
    );
    expect(couponNotificationCheckbox.length).toBe(1);
    expect(couponNotificationCheckbox[0].nativeElement.checked).toBeFalsy();
    component.coupon.notificationOn = true;
    fixture.detectChanges();
    couponNotificationCheckbox = fixture.debugElement.queryAll(
      By.css('.form-check-input')
    );
    expect(couponNotificationCheckbox.length).toBe(1);
    expect(couponNotificationCheckbox[0].nativeElement.checked).toBeTruthy();
  });
});
