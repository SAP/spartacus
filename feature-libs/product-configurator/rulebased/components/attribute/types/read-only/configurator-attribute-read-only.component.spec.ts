import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nTestingModule } from '@spartacus/core';
import { CommonConfiguratorTestUtilsService } from '../../../../../common/testing/common-configurator-test-utils.service';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeReadOnlyComponent } from './configurator-attribute-read-only.component';

describe('ConfigAttributeReadOnlyComponent', () => {
  let component: ConfiguratorAttributeReadOnlyComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeReadOnlyComponent>;
  let htmlElem: HTMLElement;
  const myValues: Configurator.Value[] = [
    {
      valueCode: 'val1',
      valueDisplay: 'val1',
      selected: false,
    },
    {
      valueCode: 'val2',
      valueDisplay: 'val2',
      selected: true,
    },
  ];

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ConfiguratorAttributeReadOnlyComponent],
        imports: [ReactiveFormsModule, I18nTestingModule],
      })
        .overrideComponent(ConfiguratorAttributeReadOnlyComponent, {
          set: {
            changeDetection: ChangeDetectionStrategy.Default,
          },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorAttributeReadOnlyComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
    component.attribute = {
      name: 'attributeName',
      label: 'attributeName',
      attrCode: 444,
      uiType: Configurator.UiType.READ_ONLY,
      selectedSingleValue: 'selectedValue',
      quantity: 1,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display selectedSingleValue for attribute without domain', () => {
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-read-only-label'
    );
    CommonConfiguratorTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-read-only-label',
      'selectedValue'
    );
  });

  it('should display valueDisplay of selected value for attribute with domain', () => {
    myValues[0].selected = false;
    component.attribute.values = myValues;
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-read-only-label'
    );
    CommonConfiguratorTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-read-only-label',
      'val2'
    );
  });

  it('should display valueDisplay of all selected values for attribute with domain', () => {
    myValues[0].selected = true;
    component.attribute.values = myValues;
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-read-only-label'
    );
    expect(htmlElem.querySelectorAll('.cx-read-only-label').length).toBe(2);
  });

  describe('Accessibility', () => {
    it("should contain span element with class name 'cx-visually-hidden' and corresponding span content", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'span',
        'cx-visually-hidden',
        0,
        undefined,
        undefined,
        'configurator.a11y.readOnlyValueOfAttributeFull attribute:attributeName value:selectedValue '
      );
    });

    it("should contain div element with class name 'cx-read-only-label' and 'aria-hidden' attribute that hides div content for the screen reader", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'cx-read-only-label',
        0,
        'aria-hidden',
        'true'
      );
    });

    it("should contain span element with 'aria-hidden' attribute that hides span content for the screen reader", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'span',
        undefined,
        1,
        'aria-hidden',
        'true',
        component.attribute.selectedSingleValue
      );
    });
  });
});
