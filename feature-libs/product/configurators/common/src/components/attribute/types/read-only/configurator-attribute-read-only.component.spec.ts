import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Configurator } from '@spartacus/core';
import { ConfiguratorComponentTestUtilsService } from '../../../../shared/testing/configurator-component-test-utils.service';
import { ConfiguratorUIKeyGenerator } from '../../../service/configurator-ui-key-generator';
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfiguratorAttributeReadOnlyComponent],
      imports: [ReactiveFormsModule],
      providers: [ConfiguratorUIKeyGenerator],
    })
      .overrideComponent(ConfiguratorAttributeReadOnlyComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

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
    ConfiguratorComponentTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-config-attribute-value-label-read-only'
    );
    ConfiguratorComponentTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-config-attribute-value-label-read-only',
      'selectedValue'
    );
  });

  it('should display valueDisplay of selected value for attribute with domain', () => {
    myValues[0].selected = false;
    component.attribute.values = myValues;
    fixture.detectChanges();
    ConfiguratorComponentTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-config-attribute-value-label-read-only'
    );
    ConfiguratorComponentTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-config-attribute-value-label-read-only',
      'Value 2'
    );
  });

  it('should display valueDisplay of all selected values for attribute with domain', () => {
    myValues[0].selected = true;
    component.attribute.values = myValues;
    fixture.detectChanges();
    ConfiguratorComponentTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-config-attribute-value-label-read-only'
    );
    expect(
      htmlElem.querySelectorAll('.cx-config-attribute-value-label-read-only')
        .length
    ).toBe(2);
  });
});
