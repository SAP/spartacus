import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponCardComponent } from './coupon-card.component';
import { I18nTestingModule, CustomerCoupon } from '@spartacus/core';
import { By } from '@angular/platform-browser';
import { ModalService } from '../../../../shared/components/modal/index';
import {
  Pipe,
  PipeTransform,
  Component,
  DebugElement,
  Input,
  HostListener,
  Directive,
} from '@angular/core';
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

@Component({
  selector: 'cx-my-coupons',
  template: `
    <cx-coupon-card
      [coupond]="mockCoupon"
      [couponLoading]="true"
      (notificationChanged)="notificationChange($event)"
    >
    </cx-coupon-card>
  `,
})
class MyCouponsComponent {
  eventObj: {
    couponId: string;
    notification: boolean;
  };
  coupon = mockCoupon;

  notificationChange({
    couponId,
    notification,
  }: {
    couponId: string;
    notification: boolean;
  }): void {
    this.eventObj = {
      couponId,
      notification,
    };
  }
}

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[routerLink]',
})
export class RouterLinkDirective {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  @HostListener('click')
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

describe('CouponCardComponent', () => {
  let component: MyCouponsComponent;
  let fixture: ComponentFixture<MyCouponsComponent>;
  let el: DebugElement;
  const modalService = jasmine.createSpyObj('ModalService', ['open']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CouponCardComponent,
        MyCouponsComponent,
        MockUrlPipe,
        RouterLinkDirective,
      ],
      imports: [I18nTestingModule, RouterTestingModule],
      providers: [{ provide: ModalService, useValue: modalService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCouponsComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    modalService.open.and.stub();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(el.query(By.css('cx-coupon-card'))).toBeTruthy();
  });

  it('should display coupon information', () => {
    fixture.detectChanges();
    const couponName = el.query(By.css('.cx-coupon-card-name')).nativeElement
      .textContent;
    expect(couponName).toContain('CustomerCoupon:name');

    const couponStatus = el.query(By.css('.cx-coupon-status')).nativeElement
      .textContent;
    expect(couponStatus).toContain('myCoupons.Effective');

    const couponEffectiveDateTitle = el.query(By.css('.cx-coupon-card-date p'))
      .nativeElement.textContent;
    expect(couponEffectiveDateTitle).toContain('myCoupons.effectiveTitle');
    const couponStartDate = el.query(By.css('.cx-coupon-date-start'))
      .nativeElement.textContent;
    expect(couponStartDate).toContain('Jan 1, 1970, 8:00:00 AM');
    const couponEndDate = el.query(By.css('.cx-coupon-date-end')).nativeElement
      .textContent;
    expect(couponEndDate).toContain('Dec 31, 2019, 7:59:59 AM');

    const readMoreLink = el.query(By.css('a')).nativeElement.textContent;
    expect(readMoreLink).toContain('myCoupons.readMore');

    const couponNotificationCheckbox = el.queryAll(By.css('.form-check-input'));
    expect(couponNotificationCheckbox.length).toBe(1);
    const couponNotificationLabel = el.query(By.css('.form-check-label'))
      .nativeElement.textContent;
    expect(couponNotificationLabel).toContain('myCoupons.notification');

    const findProductBtn = el.query(By.css('button')).nativeElement.textContent;
    expect(findProductBtn).toContain('myCoupons.findProducts');
  });

  it('should be able to open coupon detail dialog', () => {
    fixture.detectChanges();
    const readMoreLink = el.query(By.css('a'));
    readMoreLink.nativeElement.click();
    expect(modalService.open).toHaveBeenCalled();
  });

  it('should raise subscribe/unsubscribe event when clicked', () => {
    fixture.detectChanges();
    const couponNotificationCheckbox = el.query(By.css('.form-check-input'));
    couponNotificationCheckbox.triggerEventHandler('click', null);
    expect(component.eventObj).toBeTruthy();
  });

  it('should be able to show correct notification status', () => {
    fixture.detectChanges();
    const checkbox = el.query(By.css('.form-check-input')).nativeElement;
    expect(checkbox.checked).toBeFalsy();
    component.coupon.notificationOn = true;
    fixture.detectChanges();
    expect(checkbox.checked).toBeTruthy();
  });

  it('should be able to click `Find Product` button', () => {
    fixture.detectChanges();
    const btn = el.query(By.directive(RouterLinkDirective));
    const de = btn.injector.get(RouterLinkDirective);
    expect(de.linkParams).toBe('/');
    btn.triggerEventHandler('click', null);
    expect(de.navigatedTo).toBe('/');
  });
});
