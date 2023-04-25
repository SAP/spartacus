import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CustomerCoupon, I18nTestingModule } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ICON_TYPE } from '../../../../../cms-components/misc/icon/index';
import { LaunchDialogService } from '../../../../../layout/index';
import { CouponDialogComponent } from './coupon-dialog.component';

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
class MockLaunchDialogService implements Partial<LaunchDialogService> {
  get data$(): Observable<any> {
    return of(undefined);
  }

  closeDialog(_reason: string): void {}
}

describe('CouponDialogComponent', () => {
  let component: CouponDialogComponent;
  let fixture: ComponentFixture<CouponDialogComponent>;
  let el: DebugElement;
  let launchDialogService: LaunchDialogService;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CouponDialogComponent, MockCxIconComponent],
        imports: [I18nTestingModule],
        providers: [
          { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponDialogComponent);
    el = fixture.debugElement;
    component = fixture.componentInstance;
    launchDialogService = TestBed.inject(LaunchDialogService);
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
    spyOn(launchDialogService, 'closeDialog').and.stub();
    fixture.detectChanges();
    const closeBtn = fixture.debugElement.query(By.css('button'));
    closeBtn.nativeElement.click();
    expect(launchDialogService.closeDialog).toHaveBeenCalled();
  });

  it('should emit handleClick event', () => {
    spyOn(component, 'handleClick').and.callThrough();
    spyOn(component, 'close');

    expect(component.handleClick).toHaveBeenCalledTimes(0);

    el.nativeElement.click();
    fixture.detectChanges();

    expect(component.handleClick).toHaveBeenCalledTimes(1);
    expect(component.close).toHaveBeenCalledWith('Cross click');
  });
});
