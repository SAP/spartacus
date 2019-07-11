import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponCardComponent } from './coupon-card.component';
import { CustomerCoupon, I18nTestingModule } from '@spartacus/core';
import { By } from '@angular/platform-browser';
import { Pipe, PipeTransform, DebugElement, Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalService } from '@spartacus/storefront';

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

class MockParm {
  couponId: string;
  notification: boolean;
}

@Component({
  template: `
    <cx-coupon-card
      [coupon]="coupon"
      [couponLoading]="loading"
      (notificationChanged)="onNotificationChange($event)"
    >
    </cx-coupon-card>
  `,
})
class MockedMyCouponsComponent {
  coupon = mockCoupon;
  loading = false;

  onNotificationChange(_parm: MockParm): void {
    this.loading = true;
  }
}

describe('CouponCardComponent', () => {
  let component: MockedMyCouponsComponent;
  let fixture: ComponentFixture<MockedMyCouponsComponent>;
  let el: DebugElement;
  const modalService = jasmine.createSpyObj('ModalService', ['open']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CouponCardComponent,
        MockUrlPipe,
        MockedMyCouponsComponent,
      ],
      imports: [I18nTestingModule, RouterTestingModule],
      providers: [{ provide: ModalService, useValue: modalService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockedMyCouponsComponent);
    el = fixture.debugElement;
    component = fixture.componentInstance;
    component.coupon = mockCoupon;
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
    expect(el.query(By.css('[data-test]="read-more"'))).toBeTruthy();
    expect(el.query(By.css('[data-test]="notify-checkbox"'))).toBeTruthy();
    expect(el.query(By.css('[data-test]="find-button"'))).toBeTruthy();
  });

  it('should be able to open "read more" dialog', () => {
    fixture.detectChanges();
    el.query(By.css('[data-test]="read-more"')).nativeElement.click();
    expect(modalService.open).toHaveBeenCalled();
  });

  it('should be able to subscribe/unsubscribe notification', () => {
    fixture.detectChanges();
    const chx = el.query(By.css('[data-test]="notify-checkbox"')).nativeElement;
    expect(chx.disabled).toEqual(false);

    chx.click();
    expect(component.loading).toEqual(true);
  });
});
