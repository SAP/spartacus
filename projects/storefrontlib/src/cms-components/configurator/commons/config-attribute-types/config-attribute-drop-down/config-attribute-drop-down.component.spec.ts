import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Configurator, LanguageService } from '@spartacus/core';
import { of } from 'rxjs';
import { ConfigUIKeyGeneratorService } from '../../service/config-ui-key-generator.service';
import { ConfigAttributeDropDownComponent } from './config-attribute-drop-down.component';

describe('ConfigAttributeDropDownComponent', () => {
  let component: ConfigAttributeDropDownComponent;
  let fixture: ComponentFixture<ConfigAttributeDropDownComponent>;
  let mockLanguageService;
  let locale = 'de';

  beforeEach(async(() => {
    mockLanguageService = {
      getAll: () => of([]),
      //getActive: jasmine.createSpy().and.returnValue('de'),
      getActive: jasmine.createSpy().and.returnValue(of(locale)),
      setActive: jasmine.createSpy(),
    };
    TestBed.configureTestingModule({
      declarations: [ConfigAttributeDropDownComponent],
      imports: [ReactiveFormsModule, NgSelectModule],
      providers: [
        ConfigUIKeyGeneratorService,
        { provide: LanguageService, useValue: mockLanguageService },
      ],
    })
      .overrideComponent(ConfigAttributeDropDownComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  function createValue(
    code: string,
    name: string,
    isSelected: boolean,
    valueDisplay: string
  ) {
    const value: Configurator.Value = {
      valueCode: code,
      name: name,
      selected: isSelected,
      valueDisplay: valueDisplay,
    };
    return value;
  }

  beforeEach(() => {
    const value1 = createValue('1', 'val1', true, '1.3');
    const value2 = createValue('2', 'val2', false, '1,275.445');
    const value3 = createValue('3', 'val3', true, '34');
    const value4 = createValue('4', 'val4', true, '3,475,500.555');
    const values: Configurator.Value[] = [value1, value2, value3, value4];

    fixture = TestBed.createComponent(ConfigAttributeDropDownComponent);
    component = fixture.componentInstance;
    component.attribute = {
      name: 'attributeName',
      attrCode: 444,
      uiType: Configurator.UiType.DROPDOWN,
      selectedSingleValue: 'selectedValue',
      quantity: 1,
      values: values,
      isNumeric: true,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set selectedSingleValue on init', () => {
    expect(component.attributeDropDownForm.value).toEqual('selectedValue');
  });

  function checkFormat(item, index) {
    switch (index) {
      case 0:
        expect(item.valueDisplay).toBe('1,3');
        break;
      case 1:
        expect(item.valueDisplay).toBe('1.275,445');
        break;
      case 2:
        expect(item.valueDisplay).toBe('34');
        break;
      case 3:
        expect(item.valueDisplay).toBe('3.475.500,555');
        break;

      default:
        break;
    }
  }

  it('should display values in correct format', () => {
    registerLocaleData(localeDe);
    component.ngOnInit();
    fixture.detectChanges();
    component.internalAttribute.values.forEach(checkFormat);
  });
});
