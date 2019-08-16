import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { I18nTestingModule } from '@spartacus/core';
import * as testUtils from '../../../shared/utils/forms/form-test-utils';
import { FormUtils } from '../../../shared/utils/forms/form-utils';
import { CustomerSelectionComponent } from './customer-selection.component';

fdescribe('CustomerSelectionComponent', () => {
  let component: CustomerSelectionComponent;
  let fixture: ComponentFixture<CustomerSelectionComponent>;
  let customerIdFormControl: AbstractControl;

  const validCustomerId = 'testCustomerId1234567';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule],
      declarations: [CustomerSelectionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    customerIdFormControl = component.form.controls['customerId'];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isNotValid() should delegate to FormUtils.isNotValidField()', () => {
    spyOn(FormUtils, 'isNotValidField').and.stub();

    component.isNotValid('customerId');
    expect(FormUtils.isNotValidField).toHaveBeenCalledWith(
      component.form,
      'customerId',
      component['submitClicked']
    );
  });

  describe('onSubmit() ', () => {
    it('should be called when submit button is clicked', () => {
      spyOn(component, 'onSubmit').and.stub();

      testUtils.clickSubmit(fixture);

      expect(component.onSubmit).toHaveBeenCalled();
    });

    it('should NOT emit submited event if the form is not valid', () => {
      spyOn(component, 'onSubmit').and.stub();
      spyOn(component.submitEvent, 'emit').and.stub();

      component.onSubmit();

      expect(component.form.valid).toBeFalsy();
      expect(component.onSubmit).toHaveBeenCalled();
      expect(component.submitEvent.emit).not.toHaveBeenCalled();
    });

    it('should emit submited event when the form is valid', () => {
      spyOn(component.submitEvent, 'emit').and.stub();

      customerIdFormControl.setValue(validCustomerId);
      fixture.detectChanges();
      component.onSubmit();

      expect(component.form.valid).toBeTruthy();
      expect(component.submitEvent.emit).toHaveBeenCalled();
    });
  });

  describe('Error messages on form submit', () => {
    it('should NOT display when displaying the form', () => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(testUtils.isCtrlShowingError(fixture, 'customerId')).toBeFalsy();
      });
    });
    it('should display when submit an empty form', () => {
      testUtils.clickSubmit(fixture);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(
          testUtils.isCtrlShowingError(fixture, 'customerId')
        ).toBeTruthy();
      });
    });

    it('should NOT display when all field have valid valies', () => {
      customerIdFormControl.setValue(validCustomerId);
      testUtils.clickSubmit(fixture);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(testUtils.isCtrlShowingError(fixture, 'customerId')).toBeFalsy();
      });
    });

    it('should display when the user submits invalid input', () => {
      customerIdFormControl.setValue('');
      testUtils.clickSubmit(fixture);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(
          testUtils.isCtrlShowingError(fixture, 'customerId')
        ).toBeTruthy();
      });
    });
  });

  describe('Error messages without submit', () => {
    it('should NOT display for empty abandonment', () => {
      customerIdFormControl.setValue('');
      customerIdFormControl.markAsTouched();

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(testUtils.isCtrlShowingError(fixture, 'customerId')).toBeFalsy();
      });
    });
    it('should NOT display until the user is finished typing', () => {
      customerIdFormControl.setValue('');
      customerIdFormControl.markAsDirty();

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(testUtils.isCtrlShowingError(fixture, 'customerId')).toBeFalsy();
      });
    });

    it('should display when the user is finished typing invalid input', () => {
      customerIdFormControl.setValue('');
      customerIdFormControl.markAsDirty();
      customerIdFormControl.markAsTouched();

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(
          testUtils.isCtrlShowingError(fixture, 'customerId')
        ).toBeTruthy();
      });
    });
    it('should NOT display when the user is finished typing valid input', () => {
      customerIdFormControl.setValue(validCustomerId);
      customerIdFormControl.markAsDirty();
      customerIdFormControl.markAsTouched();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(testUtils.isCtrlShowingError(fixture, 'customerId')).toBeFalsy();
      });
    });
  });
});
