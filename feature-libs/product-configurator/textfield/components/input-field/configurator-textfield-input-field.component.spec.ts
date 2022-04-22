import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorTextfieldInputFieldComponent } from './configurator-textfield-input-field.component';

describe('TextfieldInputFieldComponent', () => {
  let component: ConfiguratorTextfieldInputFieldComponent;
  let fixture: ComponentFixture<ConfiguratorTextfieldInputFieldComponent>;
  let htmlElem: HTMLElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [ConfiguratorTextfieldInputFieldComponent],
      });
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorTextfieldInputFieldComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
    component.attribute = {
      configurationLabel: 'attributeName',
      configurationValue: 'input123',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set value on init', () => {
    expect(component.attributeInputForm.value).toEqual('input123');
  });

  it('should emit a change event on change ', () => {
    spyOn(component.inputChange, 'emit').and.callThrough();
    component.onInputChange();
    expect(component.inputChange.emit).toHaveBeenCalledWith(
      component.attribute
    );
  });

  it('should generate id with prefixt', () => {
    expect(component.getId(component.attribute)).toEqual(
      'cx-configurator-textfieldattributeName'
    );
  });

  describe('Accessibility', () => {
    it("should contain label element with class name 'cx-configurator-textfield-label' and 'aria-label' attribute", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'label',
        'cx-configurator-textfield-label',
        undefined,
        'aria-label',
        'configurator.a11y.nameOfAttribute'
      );
    });

    it("should contain input element with class name 'form-control' and 'aria-label' attribute", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'input',
        'form-control',
        undefined,
        'aria-label',
        'configurator.a11y.valueOfAttributeFull attribute:attributeName value:input123'
      );
    });
  });
});
