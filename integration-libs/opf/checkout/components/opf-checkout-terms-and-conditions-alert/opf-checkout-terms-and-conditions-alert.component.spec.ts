import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpfCheckoutBillingAddressFormService } from '../opf-checkout-billing-address-form';
import { OpfCheckoutTermsAndConditionsAlertComponent } from './opf-checkout-terms-and-conditions-alert.component';
import { of } from 'rxjs';

@Component({
  selector: 'cx-icon',
  template: '<ng-content></ng-content>',
  standalone: false,
})
class MockIconComponent {
  @Input() type: string;
}

@Pipe({
  name: 'cxTranslate',
  standalone: false,
})
class MockTranslatePipe implements PipeTransform {
  transform(): any {}
}

const alertSelector = '.cx-opf-checkout-terms-and-conditions-alert';

describe('OpfCheckoutTermsAndConditionsAlertComponent', () => {
  let fixture: ComponentFixture<OpfCheckoutTermsAndConditionsAlertComponent>;
  let component: OpfCheckoutTermsAndConditionsAlertComponent;
  let mockBillingAddressFormService: Partial<OpfCheckoutBillingAddressFormService>;

  beforeEach(() => {
    mockBillingAddressFormService = {
      paymentOptionsDisabled$: of(false),
    };
    TestBed.configureTestingModule({
      declarations: [
        OpfCheckoutTermsAndConditionsAlertComponent,
        MockIconComponent,
        MockTranslatePipe,
      ],
      providers: [
        {
          provide: OpfCheckoutBillingAddressFormService,
          useValue: mockBillingAddressFormService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(
      OpfCheckoutTermsAndConditionsAlertComponent
    );
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render component if isVisible is set to true', () => {
    component.isVisible = true;
    fixture.detectChanges();
    const alertElement = fixture.nativeElement.querySelector(alertSelector);

    expect(alertElement).toBeTruthy();
  });

  it('should not render component if isVisible is set to false', () => {
    component.isVisible = false;
    fixture.detectChanges();
    const alertElement = fixture.nativeElement.querySelector(alertSelector);

    expect(alertElement).toBeNull();
  });

  it('should set isVisible to false, if close method is called', () => {
    component.isVisible = true;
    fixture.detectChanges();
    const alertElement = fixture.nativeElement.querySelector(alertSelector);

    expect(alertElement).toBeTruthy();

    component.close();
    expect(component.isVisible).toBeFalsy();
  });
});
