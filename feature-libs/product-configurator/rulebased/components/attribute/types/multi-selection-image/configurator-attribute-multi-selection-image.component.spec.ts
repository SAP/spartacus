import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  Input,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nTestingModule } from '@spartacus/core';
import { CommonConfiguratorTestUtilsService } from '../../../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorGroupsService } from '../../../../core/facade/configurator-groups.service';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorPriceComponentOptions } from '../../../price/configurator-price.component';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
import { ConfiguratorAttributeMultiSelectionImageComponent } from './configurator-attribute-multi-selection-image.component';

class MockGroupService {}

@Directive({
  selector: '[cxFocus]',
})
export class MockFocusDirective {
  @Input('cxFocus') protected config: any;
}
@Component({
  selector: 'cx-configurator-price',
  template: '',
})
class MockConfiguratorPriceComponent {
  @Input() formula: ConfiguratorPriceComponentOptions;
}

describe('ConfigAttributeMultiSelectionImageComponent', () => {
  let component: ConfiguratorAttributeMultiSelectionImageComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeMultiSelectionImageComponent>;
  let htmlElem: HTMLElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          ConfiguratorAttributeMultiSelectionImageComponent,
          MockFocusDirective,
          MockConfiguratorPriceComponent,
        ],
        imports: [ReactiveFormsModule, NgSelectModule, I18nTestingModule],
        providers: [
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
    })
  );

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
      valueDisplay: name,
      name: name,
      selected: isSelected,
      images: images,
    };
    return value;
  }
  let value1: Configurator.Value;

  beforeEach(() => {
    const image = createImage('url', 'altText');
    const images: Configurator.Image[] = [image, image, image];
    value1 = createValue('1', 'val1', false, images);
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
      label: 'attributeName',
      name: 'attributeName',
      attrCode: 444,
      uiType: Configurator.UiType.MULTI_SELECTION_IMAGE,
      required: false,
      groupId: 'testGroup',
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

    expect(htmlElem.querySelectorAll('.cx-img').length).toBe(4);
  });

  it('should mark two values as selected', () => {
    expect(component.attributeCheckBoxForms[0].value).toEqual(false);
    expect(component.attributeCheckBoxForms[1].value).toEqual(true);
    expect(component.attributeCheckBoxForms[2].value).toEqual(true);
    expect(component.attributeCheckBoxForms[3].value).toEqual(false);
  });

  it('should select a new value and deselect it again', () => {
    const singleSelectionImageId =
      '#cx-configurator--multi_selection_image--' +
      component.attribute.name +
      '--' +
      value1.valueCode +
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

  describe('Accessibility', () => {
    it("should contain input elements with class name 'form-input' and 'aria-label' attribute that defines an accessible name to label the current element", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'input',
        'form-input',
        2,
        'aria-label',
        'configurator.a11y.valueOfAttributeFull attribute:' +
          component.attribute.label +
          ' value:' +
          component.attribute.values[2].valueDisplay
      );
    });

    it("should contain input elements with class name 'form-input' and 'aria-describedby' attribute that indicates the IDs of the elements that describe the elements", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'input',
        'form-input',
        2,
        'aria-describedby',
        'cx-configurator--label--attributeName cx-configurator--attribute-msg--attributeName'
      );
    });

    it("should contain input elements with class name 'form-input' and 'aria-checked' attribute that indicates the current 'checked' state of widget", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'input',
        'form-input',
        2,
        'aria-checked',
        'true'
      );
    });

    it("should contain label elements with class name 'form-check-label' and 'aria-hidden' attribute attribute that removes label from the accessibility tree", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'label',
        'form-check-label',
        2,
        'aria-hidden',
        'true'
      );
    });
  });
});
