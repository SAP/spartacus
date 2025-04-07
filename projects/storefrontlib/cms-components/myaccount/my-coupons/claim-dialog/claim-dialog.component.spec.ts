import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import {
  RoutingService,
  CustomerCouponService,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FocusDirective, FormErrorsModule } from '@spartacus/storefront';
import { MockFeatureDirective } from 'projects/storefrontlib/shared/test/mock-feature-directive';
import { Observable, of } from 'rxjs';
import { ICON_TYPE } from '../../../../cms-components/misc/icon/index';
import { LaunchDialogService } from '../../../../layout/index';
import { ClaimDialogComponent } from './claim-dialog.component';

const mockCoupon: string = 'testCode';
const form = new FormGroup({
  couponCode: new FormControl('', [Validators.required]),
});

@Component({
  selector: 'cx-icon',
  template: '',
  standalone: false,
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}
class MockLaunchDialogService implements Partial<LaunchDialogService> {
  get data$(): Observable<any> {
    return of({ coupon: 'testCode', pageSize: 10 });
  }

  closeDialog(_reason: string): void {}
}

describe('ClaimDialogComponent', () => {
  let component: ClaimDialogComponent;
  let fixture: ComponentFixture<ClaimDialogComponent>;
  let launchDialogService: LaunchDialogService;

  const couponService = jasmine.createSpyObj('CustomerCouponService', [
    'claimCustomerCoupon',
    'getClaimCustomerCouponResultSuccess',
    'loadCustomerCoupons',
  ]);
  const routingService = jasmine.createSpyObj('RoutingService', ['go']);
  const globalMessageService = jasmine.createSpyObj('GlobalMessageService', [
    'add',
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ClaimDialogComponent,
        MockCxIconComponent,
        FocusDirective,
        MockFeatureDirective,
      ],
      imports: [ReactiveFormsModule, I18nTestingModule, FormErrorsModule],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: CustomerCouponService, useValue: couponService },
        { provide: RoutingService, useValue: routingService },
        { provide: GlobalMessageService, useValue: globalMessageService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimDialogComponent);
    component = fixture.componentInstance;
    launchDialogService = TestBed.inject(LaunchDialogService);
    component.couponCode = mockCoupon;
    component.form = form;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should be able to show claim customer coupon dialog', () => {
    fixture.detectChanges();
    const dialogTitle = fixture.debugElement.query(By.css('.cx-dialog-title'))
      .nativeElement.textContent;
    expect(dialogTitle).toContain('myCoupons.claimCoupondialogTitle');

    const closeBtn = fixture.debugElement.query(By.css('button'));
    expect(closeBtn).toBeTruthy();

    const couponLabel = fixture.debugElement.query(
      By.css('.cx-dialog-body .label-content')
    ).nativeElement.textContent;
    expect(couponLabel).toContain('myCoupons.claimCouponCode.label');
  });

  it('should be able to close dialog', () => {
    spyOn(launchDialogService, 'closeDialog').and.stub();
    fixture.detectChanges();
    const closeBtn = fixture.debugElement.query(By.css('button'));
    closeBtn.nativeElement.click();
    expect(launchDialogService.closeDialog).toHaveBeenCalled();
  });

  describe('Form Interactions', () => {
    it('should reset the coupon code after click reset button', () => {
      component.ngOnInit();
      expect(component.couponCode).toBe(mockCoupon);

      (form.get('couponCode') as FormControl).setValue('testcodechanged');

      component.cancelEdit();
      fixture.detectChanges();
      expect((form.get('couponCode') as FormControl).value).toBe(mockCoupon);
    });

    it('should succeed on submit', () => {
      (form.get('couponCode') as FormControl).setValue(mockCoupon);
      fixture.detectChanges();
      couponService.claimCustomerCoupon.and.stub();
      couponService.loadCustomerCoupons.and.stub();
      couponService.getClaimCustomerCouponResultSuccess.and.returnValue(
        of(true)
      );
      routingService.go.and.stub();
      globalMessageService.add.and.stub();
      component.onSubmit();

      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'myCoupons.claimCustomerCoupon' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
      expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'coupons' });
      expect(couponService.claimCustomerCoupon).toHaveBeenCalledTimes(1);
      expect(couponService.loadCustomerCoupons).toHaveBeenCalledTimes(1);
    });

    it('should fail on submit', () => {
      (form.get('couponCode') as FormControl).setValue(mockCoupon);
      fixture.detectChanges();
      couponService.claimCustomerCoupon.and.stub();
      couponService.loadCustomerCoupons.and.stub();
      couponService.getClaimCustomerCouponResultSuccess.and.returnValue(
        of(false)
      );
      routingService.go.and.stub();
      globalMessageService.add.and.stub();
      component.onSubmit();
      expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'coupons' });
    });
  });
});
