import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Configurator } from '@spartacus/core';
import { ConfigComponentTestUtilsService } from '../../../../shared/testing/config-component-test-utils.service';
import { ConfigUIKeyGeneratorService } from '../../../service/config-ui-key-generator.service';
import { ConfigAttributeReadOnlyComponent } from './config-attribute-read-only.component';

describe('ConfigAttributeReadOnlyComponent', () => {
  let component: ConfigAttributeReadOnlyComponent;
  let fixture: ComponentFixture<ConfigAttributeReadOnlyComponent>;
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
      declarations: [ConfigAttributeReadOnlyComponent],
      imports: [ReactiveFormsModule],
      providers: [ConfigUIKeyGeneratorService],
    })
      .overrideComponent(ConfigAttributeReadOnlyComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigAttributeReadOnlyComponent);
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
    ConfigComponentTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-config-attribute-value-label-read-only'
    );
    ConfigComponentTestUtilsService.expectElementToContainText(
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
    ConfigComponentTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-config-attribute-value-label-read-only'
    );
    ConfigComponentTestUtilsService.expectElementToContainText(
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
    ConfigComponentTestUtilsService.expectElementPresent(
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
