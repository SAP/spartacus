import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CouponDialogComponent } from './coupon-dialog.component';
import { ModalService } from '../../../../../shared/components/modal/index';
import { By } from '@angular/platform-browser';
import { CustomerCoupon, I18nTestingModule } from '@spartacus/core';
import { Input, Component, DebugElement } from '@angular/core';
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

describe('CouponDialogComponent', () => {
  let component: CouponDialogComponent;
  let fixture: ComponentFixture<CouponDialogComponent>;
  let el: DebugElement;
  const modalService = jasmine.createSpyObj('ModalService', [
    'dismissActiveModal',
  ]);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CouponDialogComponent, MockCxIconComponent],
      imports: [I18nTestingModule],
      providers: [{ provide: ModalService, useValue: modalService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponDialogComponent);
    el = fixture.debugElement;
    component = fixture.componentInstance;
    component.coupon = mockCoupon;
    modalService.dismissActiveModal.and.stub();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show coupon details', () => {
    fixture.detectChanges();
    expect(el.query(By.css('[data-test]="coupon-name"'))).toBeTruthy();
    expect(el.query(By.css('[data-test]="coupon-status"'))).toBeTruthy();
    expect(el.query(By.css('[data-test]="date-start"'))).toBeTruthy();
    expect(el.query(By.css('[data-test]="date-end"'))).toBeTruthy();
    expect(el.query(By.css('[data-test]="header"'))).toBeTruthy();
    expect(el.query(By.css('[data-test]="description"'))).toBeTruthy();
    expect(el.query(By.css('[data-test]="btn-close"'))).toBeTruthy();
  });

  it('should be able to close dialog', () => {
    fixture.detectChanges();
    el.query(By.css('[data-test]="btn-close"')).nativeElement.click();
    expect(modalService.dismissActiveModal).toHaveBeenCalled();
  });
});
