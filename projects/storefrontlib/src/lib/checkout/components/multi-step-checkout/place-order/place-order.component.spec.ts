import {
  CheckoutService,
  RoutingService,
  Order,
  I18nTestingModule,
} from '@spartacus/core';
import { Pipe, PipeTransform } from '@angular/core';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { PlaceOrderComponent } from './place-order.component';
import { Observable, of } from 'rxjs';

const checkoutServiceStub = {
  placeOrder(): void {},
  getOrderDetails(): Observable<Order> {
    return of({});
  },
};

const routingServiceStub = {
  go(): void {},
};

@Pipe({
  name: 'cxTranslateUrl',
})
class MockTranslateUrlPipe implements PipeTransform {
  transform(): any {}
}

describe('PlaceOrderComponent', () => {
  let component: PlaceOrderComponent;
  let fixture: ComponentFixture<PlaceOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, I18nTestingModule],
      declarations: [MockTranslateUrlPipe, PlaceOrderComponent],
      providers: [
        { provide: CheckoutService, useValue: checkoutServiceStub },
        { provide: RoutingService, useValue: routingServiceStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceOrderComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('UI Place order button', () => {
    const placeOrderChbx = () =>
      fixture.debugElement.query(By.css('.form-check-input'));

    const placeOrderBtn = () =>
      fixture.debugElement.query(By.css('.btn-block'));

    it('should be disabled by default', () => {
      fixture.detectChanges();

      expect(placeOrderChbx().nativeElement.checked).toBeFalsy();
      expect(placeOrderBtn().nativeElement.disabled).toBeTruthy();
    });

    it('should be enabled when TandC checkbox is selected', () => {
      placeOrderChbx().nativeElement.click();

      fixture.detectChanges();

      expect(placeOrderChbx().nativeElement.checked).toBeTruthy();
      expect(placeOrderBtn().nativeElement.disabled).toBeFalsy();
    });
  });
});
