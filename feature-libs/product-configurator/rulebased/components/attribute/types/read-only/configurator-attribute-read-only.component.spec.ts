import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
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
      valueDisplay: 'Value 1',
      selected: false,
    },
    {
      valueCode: 'val2',
      valueDisplay: 'Value 2',
      selected: true,
    },
  ];

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ConfiguratorAttributeReadOnlyComponent],
        imports: [ReactiveFormsModule],
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
      name: 'valueName',
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
      'Value 2'
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
});
