import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CouponDialogComponent } from './coupon-dialog.component';
import { ModalService } from '../../../../../shared/components/modal/index';
import { By } from '@angular/platform-browser';
import { CustomerCoupon } from '@spartacus/core';
import { Input, Component } from '@angular/core';
import { ICON_TYPE } from '../../../../../cms-components/misc/icon/index';

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

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

fdescribe('CouponDialogComponent', () => {
  let component: CouponDialogComponent;
  let fixture: ComponentFixture<CouponDialogComponent>;
  const modalService = jasmine.createSpyObj('ModalService', [
    'dismissActiveModal',
  ]);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CouponDialogComponent, MockCxIconComponent],
      providers: [{ provide: ModalService, useValue: modalService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponDialogComponent);
    component = fixture.componentInstance;
    modalService.dismissActiveModal.and.stub();
    component.coupon = mockCoupon;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to show coupon information', () => {
    const dialogTitle = fixture.debugElement.query(By.css('.cx-dialog-title'))
      .nativeElement.textContent;
    expect(dialogTitle).toContain('myCoupons:coupon');

    const closeBtn = fixture.debugElement.query(By.css('button'));
    expect(closeBtn).toBeTruthy();

    const couponDescription = fixture.debugElement.query(
      By.css('.cx-coupon-description')
    ).nativeElement.textContent;
    expect(couponDescription).toContain('CustomerCouponDescription');

    const couponEffectiveDate = fixture.debugElement.queryAll(
      By.css('.cx-coupon-date')
    );
    expect(couponEffectiveDate.length).toBe(1);

    const couponStatus = fixture.debugElement.query(
      By.css('.cx-coupon-card-status')
    ).nativeElement.textContent;
    expect(couponStatus).toContain('myCoupons:Effective');
  });

  it('should be able to close dialog', () => {
    const closeBtn = fixture.debugElement.query(By.css('button'));
    closeBtn.nativeElement.click();
    expect(modalService.dismissActiveModal).toHaveBeenCalled();
  });
});
