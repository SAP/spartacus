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
import { ConfiguratorAttributeSingleSelectionImageComponent } from './configurator-attribute-single-selection-image.component';

class MockGroupService {}

@Directive({
  selector: '[cxFocus]',
})
export class MockFocusDirective {
  @Input('cxFocus') protected config: string;
}

@Component({
  selector: 'cx-configurator-price',
  template: '',
})
class MockConfiguratorPriceComponent {
  @Input() formula: ConfiguratorPriceComponentOptions;
}

describe('ConfigAttributeSingleSelectionImageComponent', () => {
  let component: ConfiguratorAttributeSingleSelectionImageComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeSingleSelectionImageComponent>;
  let htmlElem: HTMLElement;
  const ownerKey = 'theOwnerKey';
  const groupId = 'testGroup';
  const attributeName = 'attributeName';

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          ConfiguratorAttributeSingleSelectionImageComponent,
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
        .overrideComponent(ConfiguratorAttributeSingleSelectionImageComponent, {
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
  const image = createImage('url', 'altText');
  const images: Configurator.Image[] = [image, image, image];
  const value1 = createValue('1', 'val1', false, images);
  const value2 = createValue('2', 'val2', false, images);
  const value3 = createValue('3', 'val3', false, images);
  const values: Configurator.Value[] = [value1, value2, value3];

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ConfiguratorAttributeSingleSelectionImageComponent
    );
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;

    component.attribute = {
      name: attributeName,
      label: attributeName,
      attrCode: 444,
      uiType: Configurator.UiType.SINGLE_SELECTION_IMAGE,
      required: false,
      selectedSingleValue: values[2].valueCode,
      groupId: groupId,
      values: values,
    };
    component.ownerKey = ownerKey;
    fixture.detectChanges();
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('should render 3 images', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(htmlElem.querySelectorAll('.cx-img').length).toBe(3);
  });

  it('should init with val3', () => {
    fixture.detectChanges();
    expect(component.attributeRadioButtonForm.value).toEqual(value3.valueCode);
  });

  it('should select another single selection image value', () => {
    const singleSelectionImageId =
      '#cx-configurator--single_selection_image--' +
      component.attribute.name +
      '--' +
      value2.valueCode +
      '-input';
    const valueToSelect = fixture.debugElement.query(
      By.css(singleSelectionImageId)
    ).nativeElement;
    expect(valueToSelect.checked).toBe(false);
    spyOn(component.selectionChange, 'emit').and.callThrough();
    component.onClick(value2.valueCode);
    fixture.detectChanges();
    expect(component.selectionChange.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({
        ownerKey: ownerKey,
        changedAttribute: jasmine.objectContaining({
          name: attributeName,
          selectedSingleValue: value2.valueCode,
          uiType: Configurator.UiType.SINGLE_SELECTION_IMAGE,
          groupId: groupId,
        }),
      })
    );
  });

  describe('Accessibility', () => {
    it("should contain input element with class name 'form-input' and 'aria-label' attribute that defines an accessible name to label the current element", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'input',
        'form-input',
        1,
        'aria-label',
        'configurator.a11y.valueOfAttributeFull attribute:' +
          component.attribute.label +
          ' value:' +
          component.attribute.values[1].valueDisplay
      );
    });

    it("should contain input element with class name 'form-input' and 'aria-describedby' attribute that indicates the IDs of the elements that describe the elements", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'input',
        'form-input',
        1,
        'aria-describedby',
        'cx-configurator--label--attributeName cx-configurator--attribute-msg--attributeName'
      );
    });

    it("should contain input elements with class name 'form-input' and 'aria-checked' attribute that indicates the current 'checked' state of widgete", () => {
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

    it("should contain label element with class name 'form-check-label' and 'aria-hidden' attribute that removes an element from the accessibility tree", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'label',
        'form-check-label',
        1,
        'aria-hidden',
        'true'
      );
    });
  });
});
