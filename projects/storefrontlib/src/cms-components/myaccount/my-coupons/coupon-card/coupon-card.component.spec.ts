import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponCardComponent } from './coupon-card.component';
import { I18nTestingModule, CustomerCoupon } from '@spartacus/core';
import { By } from '@angular/platform-browser';
import { ModalService } from '@spartacus/storefront';

const mockCoupon: CustomerCoupon = {
  couponId: 'CustomerCoupon1',
  description: 'CustomerCoupon1',
  endDate: new Date('2019-12-30T23:59:59+0000'),
  name: 'CustomerCoupon1:name',
  notificationOn: 'false',
  solrFacets: '%3Arelevance%3Acategory%3A1',
  startDate: new Date('1970-01-01T00:00:00+0000'),
  status: 'Effective',
};

fdescribe('CouponCardComponent', () => {
  let component: CouponCardComponent;
  let fixture: ComponentFixture<CouponCardComponent>;
  const modalService = jasmine.createSpyObj('ModalService', ['open']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CouponCardComponent],
      imports: [I18nTestingModule],
      providers: [{ provide: ModalService, useValue: modalService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponCardComponent);
    component = fixture.componentInstance;
    modalService.open.and.stub();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display coupon data', () => {
    component.coupon = mockCoupon;
    fixture.detectChanges();

    const couponName = fixture.debugElement.query(
      By.css('.cx-coupon-card-name')
    ).nativeElement.textContent;
    expect(couponName).toContain('CustomerCoupon1:name');

    const couponStatus = fixture.debugElement.queryAll(
      By.css('.cx-coupon-card-status')
    );
    expect(couponStatus.length).toBe(1);

    const couponEffectiveDate = fixture.debugElement.queryAll(
      By.css('.cx-coupon-date')
    );
    expect(couponEffectiveDate.length).toBe(1);

    const couponNotificationCheckbox = fixture.debugElement.queryAll(
      By.css('.form-check-input')
    );
    expect(couponNotificationCheckbox.length).toBe(1);
    const couponNotificationLabel = fixture.debugElement.queryAll(
      By.css('.form-check-label')
    );
    expect(couponNotificationLabel.length).toBe(1);

    const readMoreLink = fixture.debugElement.queryAll(By.css('a'));
    expect(readMoreLink.length).toBe(1);

    const findProductBtn = fixture.debugElement.query(By.css('button'))
      .nativeElement.textContent;
    expect(findProductBtn).toContain('myCoupons.findProducts');
  });

  it('should be able to open coupon detail dialog', () => {
    const readMoreLink = fixture.debugElement.query(By.css('a'));
    readMoreLink.nativeElement.click();
    expect(modalService.open).toHaveBeenCalled();
  });

  it('should be able to show correct notification status', () => {
    let couponNotificationCheckbox = fixture.debugElement.queryAll(
      By.css('.form-check-input')
    );
    expect(couponNotificationCheckbox.length).toBe(1);
    expect(couponNotificationCheckbox[0].nativeElement.checked).toBeFalsy();
    component.coupon.notificationOn = 'true';
    fixture.detectChanges();
    couponNotificationCheckbox = fixture.debugElement.queryAll(
      By.css('.form-check-input')
    );
    expect(couponNotificationCheckbox.length).toBe(1);
    expect(couponNotificationCheckbox[0].nativeElement.checked).toBeTruthy();
  });
});
