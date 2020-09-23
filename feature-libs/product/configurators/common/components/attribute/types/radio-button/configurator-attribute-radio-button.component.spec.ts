import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfiguratorAttributeBaseComponent } from '../base/configurator-attribute-base.component';
import { Configurator } from './../../../../core/model/configurator.model';
import { ConfiguratorAttributeRadioButtonComponent } from './configurator-attribute-radio-button.component';

describe('ConfigAttributeRadioButtonComponent', () => {
  let component: ConfiguratorAttributeRadioButtonComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeRadioButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfiguratorAttributeRadioButtonComponent],
      imports: [ReactiveFormsModule],
      providers: [ConfiguratorAttributeBaseComponent],
    })
      .overrideComponent(ConfiguratorAttributeRadioButtonComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ConfiguratorAttributeRadioButtonComponent
    );
    component = fixture.componentInstance;
    component.attribute = {
      name: 'valueName',
      attrCode: 444,
      uiType: Configurator.UiType.RADIOBUTTON,
      selectedSingleValue: 'selectedValue',
      quantity: 1,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getAttributeId should extract the attribute id', () => {
    const attributeId = component.getAttributeId(
      'cx-config--radioGroup--CAMERA_COLOR--BLACK'
    );
    expect(attributeId).toEqual('cx-config--radioGroup--CAMERA_COLOR');
  });

  it('getAttributeId should return undefined if radio button id is undefined', () => {
    const attributeId = component.getAttributeId(undefined);
    expect(attributeId).toBeUndefined();
  });

  it('attributeLostFocus should return true if attributeId of relatedTarget and target is different', () => {
    const he: HTMLElement = document.createElement('input');
    he.id = 'cx-config--radioGroup--CAMERA_COLOR--BLACK';
    const et: EventTarget = he;
    const he2: HTMLElement = document.createElement('input');
    he2.id = 'cx-config--radioGroup--CAMERA_SENSOR--G124';
    const et2: EventTarget = he2;
    const ev: FocusEvent = { relatedTarget: et, target: et2 } as FocusEvent;
    expect(component.attributeLostFocus(ev)).toBeTrue();
  });

  it('attributeLostFocus should return true if attributeId of relatedTarget and target is different with target being undefined', () => {
    const he: HTMLElement = document.createElement('input');
    he.id = 'cx-config--radioGroup--CAMERA_COLOR--BLACK';
    const et: EventTarget = he;
    const ev: FocusEvent = {
      relatedTarget: et,
      target: undefined,
    } as FocusEvent;
    expect(component.attributeLostFocus(ev)).toBeTrue();
  });

  it('attributeLostFocus should return true if attributeId of relatedTarget and target is different with relatedTarget being undefined', () => {
    const he: HTMLElement = document.createElement('input');
    he.id = 'cx-config--radioGroup--CAMERA_COLOR--BLACK';
    const et: EventTarget = he;
    const ev: FocusEvent = {
      relatedTarget: undefined,
      target: et,
    } as FocusEvent;
    expect(component.attributeLostFocus(ev)).toBeTrue();
  });

  it('should return false if attributeId of relatedTarget and target are the same', () => {
    const he: HTMLElement = document.createElement('input');
    he.id = 'cx-config--radioGroup--CAMERA_COLOR--BLACK';
    const et: EventTarget = he;
    const he2: HTMLElement = document.createElement('input');
    he2.id = 'cx-config--radioGroup--CAMERA_COLOR--BROWN';
    const et2: EventTarget = he2;
    const ev: FocusEvent = { relatedTarget: et, target: et2 } as FocusEvent;
    expect(component.attributeLostFocus(ev)).toBeFalse();
  });

  it('should set selectedSingleValue on init', () => {
    expect(component.attributeRadioButtonForm.value).toEqual('selectedValue');
  });
});
