import {
  CheckoutService,
  RoutingService,
  Order,
  I18nTestingModule,
} from '@spartacus/core';
import { Pipe, PipeTransform } from '@angular/core';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PlaceOrderComponent } from './place-order.component';
import { Observable, of } from 'rxjs';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormErrorsModule } from '../../../../shared/index';

class MockCheckoutService {
  placeOrder(): void {}
  getOrderDetails(): Observable<Order> {
    return of({});
  }
}

const routingServiceStub = {
  go(): void {},
};

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

describe('PlaceOrderComponent', () => {
  let component: PlaceOrderComponent;
  let fixture: ComponentFixture<PlaceOrderComponent>;
  let controls: FormGroup['controls'];
  let mockCheckoutService: MockCheckoutService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        I18nTestingModule,
        FormErrorsModule,
      ],
      declarations: [MockUrlPipe, PlaceOrderComponent],
      providers: [
        { provide: CheckoutService, useClass: MockCheckoutService },
        { provide: RoutingService, useValue: routingServiceStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceOrderComponent);
    component = fixture.componentInstance;
    mockCheckoutService = TestBed.inject(CheckoutService);

    controls = component.checkoutSubmitForm.controls;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should not place order when checkbox not checked', () => {
    spyOn(mockCheckoutService, 'placeOrder').and.callThrough();
    controls.termsAndConditions.setValue(false);
    component.submitForm();

    expect(mockCheckoutService.placeOrder).not.toHaveBeenCalled();
  });

  it('should place order when checkbox checked', () => {
    spyOn(mockCheckoutService, 'placeOrder').and.callThrough();
    controls.termsAndConditions.setValue(true);
    component.submitForm();

    expect(mockCheckoutService.placeOrder).toHaveBeenCalled();
  });
});
