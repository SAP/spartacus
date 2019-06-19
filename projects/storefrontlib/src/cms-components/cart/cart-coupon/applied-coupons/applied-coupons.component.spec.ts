import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule, Voucher } from '@spartacus/core';
import { AppliedCouponsComponent } from './applied-coupons.component';
describe('AppliedCouponsComponent', () => {
  let component: AppliedCouponsComponent;
  let fixture: ComponentFixture<AppliedCouponsComponent>;

  const mockVoucher: Voucher = {
    code: 'MockVoucer',
  };

  const mockVouchers: Voucher[] = [mockVoucher];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [AppliedCouponsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedCouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render voucer list', () => {
    component.vouchers = mockVouchers;
    fixture.detectChanges();
    const promotionsContent = fixture.debugElement.query(
      By.css('.cx-promotions')
    ).nativeElement.textContent;

    expect(promotionsContent).toContain(mockVoucher.code);
  });
});