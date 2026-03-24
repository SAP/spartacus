import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockTranslatePipe, TranslatePipe } from '@spartacus/core';
import { IconComponent } from '@spartacus/storefront';
import { of } from 'rxjs';
import { OpfCheckoutBillingAddressFormService } from '../opf-checkout-billing-address-form';
import { OpfCheckoutTermsAndConditionsAlertComponent } from './opf-checkout-terms-and-conditions-alert.component';

@Component({
  selector: 'cx-icon',
  template: '<ng-content></ng-content>',
})
class MockIconComponent {
  @Input() type: string;
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
      imports: [OpfCheckoutTermsAndConditionsAlertComponent],
      providers: [
        {
          provide: OpfCheckoutBillingAddressFormService,
          useValue: mockBillingAddressFormService,
        },
      ],
    })
      .overrideComponent(OpfCheckoutTermsAndConditionsAlertComponent, {
        remove: {
          imports: [TranslatePipe, IconComponent],
        },
        add: {
          imports: [MockTranslatePipe, MockIconComponent],
        },
      })
      .compileComponents();

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
