import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';

import { ConfiguratorTextfieldInputFieldReadonlyComponent } from './configurator-textfield-input-field-readonly.component';

describe('TextfieldInputFieldReadonlyComponent', () => {
  let component: ConfiguratorTextfieldInputFieldReadonlyComponent;
  let htmlElem: HTMLElement;
  let fixture: ComponentFixture<ConfiguratorTextfieldInputFieldReadonlyComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [ConfiguratorTextfieldInputFieldReadonlyComponent],
      });
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ConfiguratorTextfieldInputFieldReadonlyComponent
    );
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

  it('should render a visually hidden span', () => {
    const idLabel = component.getIdLabel(component.attribute);
    const elementsSpan = htmlElem.querySelectorAll('#' + idLabel);
    expect(elementsSpan.length).toBe(1);
    const elementSpan = elementsSpan[0];
    expect(elementSpan.id).toBe(idLabel);
    expect(elementSpan.className).toBe('cx-visually-hidden');
  });

  it('should render a hidden label', () => {
    const elementsLabel = htmlElem.querySelectorAll('label');
    expect(elementsLabel.length).toBe(1);
    const elementLabel = elementsLabel[0];
    expect(elementLabel.innerHTML).toBe(component.attribute.configurationLabel);
  });

  it('should render a value', () => {
    const elementsDiv = htmlElem.querySelectorAll('div');
    expect(elementsDiv.length).toBe(1);
    const elementDiv = elementsDiv[0];
    expect(elementDiv.innerHTML).toContain(
      component.attribute.configurationValue
    );
  });

  describe('Accessibility', () => {
    it("should contain span element with class name 'cx-visually-hidden' and its corresponding introduction text", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'span',
        'cx-visually-hidden',
        undefined,
        undefined,
        undefined,
        'configurator.a11y.valueOfAttributeFull attribute:attributeName value:input123'
      );
    });

    it("should contain label element with 'aria-hidden' attribute and its 'true' value", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'label',
        undefined,
        undefined,
        'aria-hidden',
        'true'
      );
    });

    it("should contain label element with 'aria-describedby' attribute and its reference to corresponding value", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'label',
        undefined,
        undefined,
        'aria-describedby',
        'cx-configurator-textfieldlabelattributeName'
      );
    });

    it("should contain div element with 'aria-hidden' attribute and its 'true' value", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        undefined,
        undefined,
        'aria-hidden',
        'true'
      );
    });
  });
});
