import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CouponDialogComponent } from './coupon-dialog.component';
import { ModalService } from '../../../../../shared/components/modal/index';
import { By } from '@angular/platform-browser';
import { CustomerCoupon, I18nTestingModule } from '@spartacus/core';
import { Input, Component } from '@angular/core';
import { ICON_TYPE } from '../../../../../cms-components/misc/icon/index';

const mockCoupon: CustomerCoupon = {
  couponId: 'CustomerCoupon',
  description: 'CustomerCouponDescription',
  endDate: '2019-12-30T23:59:59+0000',
  name: 'CustomerCoupon:name',
  notificationOn: false,
  allProductsApplicable: false,
  startDate: '1970-01-01T00:00:00+0000',
  status: 'Effective',
};

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

describe('CouponDialogComponent', () => {
  let component: CouponDialogComponent;
  let fixture: ComponentFixture<CouponDialogComponent>;
  const modalService = jasmine.createSpyObj('ModalService', [
    'dismissActiveModal',
  ]);
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CouponDialogComponent, MockCxIconComponent],
        imports: [I18nTestingModule],
        providers: [{ provide: ModalService, useValue: modalService }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponDialogComponent);
    component = fixture.componentInstance;
    modalService.dismissActiveModal.and.stub();
    component.coupon = mockCoupon;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should be able to show coupon information', () => {
    fixture.detectChanges();
    const dialogTitle = fixture.debugElement.query(By.css('.cx-dialog-title'))
      .nativeElement.textContent;
    expect(dialogTitle).toContain('myCoupons.dialogTitle');

    const closeBtn = fixture.debugElement.query(By.css('button'));
    expect(closeBtn).toBeTruthy();

    const couponDescription = fixture.debugElement.query(
      By.css('.cx-coupon-description')
    ).nativeElement.textContent;
    expect(couponDescription).toContain('CustomerCouponDescription');

    const couponEffectiveTitle = fixture.debugElement.query(
      By.css('.cx-coupon-dialog-date p')
    ).nativeElement.textContent;
    expect(couponEffectiveTitle).toContain('myCoupons.effectiveTitle');
    const couponEffectiveDate = fixture.debugElement.query(
      By.css('.cx-coupon-date')
    ).nativeElement.textContent;
    expect(couponEffectiveDate).toBeTruthy();

    const couponStatusTitle = fixture.debugElement.query(
      By.css('.cx-coupon-dialog-status p')
    ).nativeElement.textContent;
    expect(couponStatusTitle).toContain('myCoupons.status');
    const couponStatus = fixture.debugElement.query(By.css('.cx-coupon-status'))
      .nativeElement.textContent;
    expect(couponStatus).toContain('myCoupons.Effective');
  });

  it('should be able to close dialog', () => {
    fixture.detectChanges();
    const closeBtn = fixture.debugElement.query(By.css('button'));
    closeBtn.nativeElement.click();
    expect(modalService.dismissActiveModal).toHaveBeenCalled();
  });
});
