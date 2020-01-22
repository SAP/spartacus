import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Configurator } from '@spartacus/core';
import { ConfigUIKeyGeneratorService } from '../../service/config-ui-key-generator.service';
import { ConfigAttributeSingleSelectionImageComponent } from './config-attribute-single-selection-image.component';
import { NgSelectModule } from '@ng-select/ng-select';

describe('ConfigAttributeSingleSelectionImageComponent', () => {
  let component: ConfigAttributeSingleSelectionImageComponent;
  let fixture: ComponentFixture<ConfigAttributeSingleSelectionImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigAttributeSingleSelectionImageComponent],
      imports: [ReactiveFormsModule, NgSelectModule],
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
    const image: Value.Image = {
      url: 'url',
      alt: 'alt',
    };
    const value1: Configurator.Value = {
      valueCode: '1',
      name: 'val1',
      selected: false,
      required: false,
      images: image,
    };
    const value2: Configurator.Value = {
      valueCode: '2',
      name: 'val2',
      selected: false,
      required: false,
      images: image,
    };
    const value3: Configurator.Value = {
      valueCode: '3',
      name: 'val3',
      selected: false,
      required: false,
      images: image,
    };

    let localvalues: Configurator.Value[];
    localvalues = [];

    localvalues.push(value1, value2, value3);

    fixture = TestBed.createComponent(
      ConfigAttributeSingleSelectionImageComponent
    );
    component = fixture.componentInstance;

    component.attribute = {
      name: 'attributeName',
      attrCode: 444,
      uiType: Configurator.UiType.SINGLE_SELECTION_IMAGE,
      values: localvalues,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set selectedSingleValue on init', () => {
    this.onSelect(1);
    fixture.detectChanges();
    expect(component.attributeRadioButtonForm.value).toEqual('2');
  });
});
