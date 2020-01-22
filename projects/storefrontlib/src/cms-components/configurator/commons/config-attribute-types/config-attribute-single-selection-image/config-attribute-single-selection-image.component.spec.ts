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
    const image: Configurator.Image = {
      url: 'url',
      altText: 'altText',
    };

    let localimages: Configurator.Image[];
    localimages = [];

    localimages.push(image, image, image);

    const value1: Configurator.Value = {
      valueCode: '1',
      name: 'val1',
      selected: false,
      images: localimages,
    };
    const value2: Configurator.Value = {
      valueCode: '2',
      name: 'val2',
      selected: false,
      images: localimages,
    };
    const value3: Configurator.Value = {
      valueCode: '3',
      name: 'val3',
      selected: false,
      images: localimages,
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
      required: false,
      values: localvalues,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change selected value with click', () => {
    expect(component.attributeRadioButtonForm.value).toBe(null);
    component.onSelect(1);
    fixture.detectChanges();
    expect(component.attributeRadioButtonForm.value).toEqual('2');
  });

  it('should change selected value with keypress enter', () => {
    expect(component.attributeRadioButtonForm.value).toBe(null);
    component.onEnter(13, 1);
    fixture.detectChanges();
    expect(component.attributeRadioButtonForm.value).toEqual('2');
  });
});
