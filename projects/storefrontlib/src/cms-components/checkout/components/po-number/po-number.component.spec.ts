import { Component, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { PaymentTypeService, I18nTestingModule } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CheckoutStepService } from '../../services/checkout-step.service';
import { PoNumberComponent } from './po-number.component';
import createSpy = jasmine.createSpy;

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockSpinnerComponent {}

class MockPaymentTypeService {
  getSelectedPaymentType(): Observable<string> {
    return of('ACCOUNT');
  }
  getPoNumber(): Observable<string> {
    return of('test-number');
  }
  setPaymentType(): void {}
}

class MockCheckoutStepService {
  next = createSpy();
  back = createSpy();
  getBackBntText(): string {
    return '';
  }
}

const mockActivatedRoute = {
  snapshot: {
    url: ['checkout', 'payment-type'],
  },
};

describe('PoNumberComponent', () => {
  let component: PoNumberComponent;
  let fixture: ComponentFixture<PoNumberComponent>;
  let checkoutStepService: CheckoutStepService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule],
      declarations: [PoNumberComponent, MockSpinnerComponent],
      providers: [
        {
          provide: PaymentTypeService,
          useClass: MockPaymentTypeService,
        },
        {
          provide: CheckoutStepService,
          useClass: MockCheckoutStepService,
        },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    checkoutStepService = TestBed.inject(
      CheckoutStepService as Type<CheckoutStepService>
    );
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoNumberComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to go to next step', () => {
    fixture.detectChanges();
    component.next();
    expect(checkoutStepService.next).toHaveBeenCalledWith(
      <any>mockActivatedRoute
    );
  });

  it('should set the po and cost center to cart after invoking next()', () => {
    // will implmented
  });

  it('should be able to go to previous step', () => {
    component.back();
    expect(checkoutStepService.back).toHaveBeenCalledWith(
      <any>mockActivatedRoute
    );
  });

  describe('UI back button', () => {
    const getContinueBtn = () =>
      fixture.debugElement.query(By.css('.cx-checkout-btns .btn-action'));

    it('should call "back" function after being clicked', () => {
      spyOn(component, 'back');
      getContinueBtn().nativeElement.click();
      fixture.detectChanges();

      expect(component.back).toHaveBeenCalled();
    });
  });

  describe('UI continue button', () => {
    const getContinueBtn = () =>
      fixture.debugElement.query(By.css('.cx-checkout-btns .btn-primary'));

    it('should call "next" function after being clicked', () => {
      spyOn(component, 'next');
      getContinueBtn().nativeElement.click();
      fixture.detectChanges();

      expect(component.next).toHaveBeenCalled();
    });
  });
});
