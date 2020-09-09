import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { Configurator } from '@spartacus/core';
import { ConfiguratorGroupsService } from '../../../../core/facade/configurator-groups.service';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
import { ConfiguratorUIKeyGenerator } from '../../../service/configurator-ui-key-generator';
import { ConfiguratorAttributeMultiSelectionImageComponent } from './configurator-attribute-multi-selection-image.component';
class MockGroupService {}

describe('ConfigAttributeMultiSelectionImageComponent', () => {
  let component: ConfiguratorAttributeMultiSelectionImageComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeMultiSelectionImageComponent>;
  let htmlElem: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfiguratorAttributeMultiSelectionImageComponent],
      imports: [ReactiveFormsModule, NgSelectModule],
      providers: [
        ConfiguratorUIKeyGenerator,
        ConfiguratorStorefrontUtilsService,
        {
          provide: ConfiguratorGroupsService,
          useClass: MockGroupService,
        },
      ],
    })
      .overrideComponent(ConfiguratorAttributeMultiSelectionImageComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  function createImage(url: string, altText: string): Configurator.Image {
    const image: Configurator.Image = {
      url: url,
      altText: altText,
    };
    return image;
  }

  function createValue(
    code: string,
    name: string,
    isSelected: boolean,
    images: Configurator.Image[]
  ): Configurator.Value {
    const value: Configurator.Value = {
      valueCode: code,
      name: name,
      selected: isSelected,
      images: images,
    };
    return value;
  }

  beforeEach(() => {
    const image = createImage('url', 'altText');
    const images: Configurator.Image[] = [image, image, image];
    const value1 = createValue('1', 'val1', false, images);
    const value2 = createValue('2', 'val2', true, images);
    const value3 = createValue('3', 'val3', true, images);
    const value4 = createValue('4', 'val4', false, images);
    const values: Configurator.Value[] = [value1, value2, value3, value4];

    fixture = TestBed.createComponent(
      ConfiguratorAttributeMultiSelectionImageComponent
    );
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;

    component.attribute = {
      name: 'attributeName',
      attrCode: 444,
      uiType: Configurator.UiType.MULTI_SELECTION_IMAGE,
      required: false,
      values: values,
    };
    fixture.detectChanges();
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('should render 4 multi selection images after init', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(
      htmlElem.querySelectorAll('.cx-config-attribute-value-img').length
    ).toBe(4);
  });

  it('should mark two values as selected', () => {
    expect(component.attributeCheckBoxForms[0].value).toEqual(false);
    expect(component.attributeCheckBoxForms[1].value).toEqual(true);
    expect(component.attributeCheckBoxForms[2].value).toEqual(true);
    expect(component.attributeCheckBoxForms[3].value).toEqual(false);
  });

  it('should select a new value and deselect it again', () => {
    const singleSelectionImageId =
      '#cx-config--multi_selection_image--' +
      component.attribute.name +
      '--' +
      component.attribute.values[0].valueCode +
      '-input';
    const valueToSelect = fixture.debugElement.query(
      By.css(singleSelectionImageId)
    ).nativeElement;
    expect(valueToSelect.checked).toBe(false);
    valueToSelect.click();
    fixture.detectChanges();
    expect(valueToSelect.checked).toBe(true);
    expect(component.attributeCheckBoxForms[0].value).toEqual(true);
    valueToSelect.click();
    fixture.detectChanges();
    expect(valueToSelect.checked).toBe(false);
    expect(component.attributeCheckBoxForms[0].value).toEqual(false);
  });
});
