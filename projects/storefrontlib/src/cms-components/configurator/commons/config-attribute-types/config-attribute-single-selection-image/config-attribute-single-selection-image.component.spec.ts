import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Configurator } from '@spartacus/core';
import { ConfigUIKeyGeneratorService } from '../../service/config-ui-key-generator.service';
import { ConfigAttributeSingleSelectionImageComponent } from './config-attribute-single-selection-image.component';

describe('ConfigAttributeSingleSelectionImageComponent', () => {
  let component: ConfigAttributeSingleSelectionImageComponent;
  let fixture: ComponentFixture<ConfigAttributeSingleSelectionImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigAttributeSingleSelectionImageComponent],
      imports: [ReactiveFormsModule],
      providers: [ConfigUIKeyGeneratorService],
    })
      .overrideComponent(ConfigAttributeSingleSelectionImageComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ConfigAttributeSingleSelectionImageComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ConfigAttributeSingleSelectionImageComponent
    );
    component = fixture.componentInstance;
    component.attribute = {
      name: 'valueName',
      label: 'valueLabel',
      attrCode: 444,
      uiType: Configurator.UiType.SINGLE_SELECTION_IMAGE,
      selectedSingleValue: null,
      quantity: 1,
      required: false,
      values: [
        {
          selected: false,
          valueCode: 'value_0',
        },
        {
          selected: false,
          valueCode: 'value_1',
        },
      ],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not set selectedSingleValue on init', () => {
    expect(component.attributeRadioButtonForm.value).toEqual(null);
  });

  it('should set selectedSingleValue on init', () => {
    this.onSelect(1);
    fixture.detectChanges();
    expect(component.attributeRadioButtonForm.value).toEqual('value_1');
  });
});
