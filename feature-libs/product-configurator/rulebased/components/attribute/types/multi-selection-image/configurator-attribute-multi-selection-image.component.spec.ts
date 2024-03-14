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
import { Config, I18nTestingModule } from '@spartacus/core';
import { CommonConfiguratorTestUtilsService } from '../../../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorGroupsService } from '../../../../core/facade/configurator-groups.service';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorPriceComponentOptions } from '../../../price/configurator-price.component';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
import { ConfiguratorAttributeMultiSelectionImageComponent } from './configurator-attribute-multi-selection-image.component';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import { ConfiguratorTestUtils } from '../../../../testing/configurator-test-utils';
import { IconTestingModule, PopoverModule } from '@spartacus/storefront';

class MockGroupService {}

const VALUE_NAME_3 = 'val3';

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

class MockConfiguratorCommonsService {
  updateConfiguration(): void {}
}

class MockConfig {
  features = [{ attributeTypesV2: false }];
}

describe('ConfigAttributeMultiSelectionImageComponent', () => {
  let component: ConfiguratorAttributeMultiSelectionImageComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeMultiSelectionImageComponent>;
  let htmlElem: HTMLElement;
  let config: Config;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          ConfiguratorAttributeMultiSelectionImageComponent,
          MockFocusDirective,
          MockConfiguratorPriceComponent,
        ],
        imports: [
          ReactiveFormsModule,
          NgSelectModule,
          I18nTestingModule,
          IconTestingModule,
          PopoverModule,
        ],
        providers: [
          ConfiguratorStorefrontUtilsService,
          {
            provide: ConfiguratorGroupsService,
            useClass: MockGroupService,
          },
          {
            provide: ConfiguratorAttributeCompositionContext,
            useValue: ConfiguratorTestUtils.getAttributeContext(),
          },
          {
            provide: ConfiguratorCommonsService,
            useClass: MockConfiguratorCommonsService,
          },
          { provide: Config, useClass: MockConfig },
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
    images: Configurator.Image[],
    description?: string
  ): Configurator.Value {
    const value: Configurator.Value = {
      valueCode: code,
      valueDisplay: name,
      name: name,
      selected: isSelected,
      images: images,
      description: description,
    };
    return value;
  }

  let value1: Configurator.Value;

  beforeEach(() => {
    const image = createImage('url', 'altText');
    const images: Configurator.Image[] = [image, image, image];
    value1 = createValue('1', 'val1', false, images);
    const value2 = createValue(
      '2',
      'val2',
      true,
      images,
      'Here is a long description at value level'
    );
    const value3 = createValue('3', VALUE_NAME_3, true, images);
    const value4 = createValue(
      '4',
      'val4',
      false,
      images,
      'Here is a long description at value level'
    );
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
    config = TestBed.inject(Config);
    config.features.attributeTypesV2 = false;
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

  it('should render 2 info icons at value level when value has a description', () => {
    CommonConfiguratorTestUtilsService.expectNumberOfElements(
      expect,
      htmlElem,
      "cx-icon[ng-reflect-type='INFO']",
      2
    );
  });

  it('should render popover with description at value level after clicking on info icon', () => {
    const infoButton = fixture.debugElement.query(
      By.css('button[ng-reflect-cx-popover]')
    ).nativeElement;
    infoButton.click();
    const description = fixture.debugElement.query(
      By.css('cx-popover > .popover-body > span')
    );
    expect(description).toBeTruthy();
    expect(description.nativeElement.innerText).toBe(
      component.attribute.values[1].description
    );
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

  describe('select multi images', () => {
    it('should call service for update when attributeTypesV2 feature flag is disabled', () => {
      spyOn(
        component['configuratorCommonsService'],
        'updateConfiguration'
      ).and.callThrough();
      component.onSelect(0);
      expect(
        component['configuratorCommonsService'].updateConfiguration
      ).toHaveBeenCalled();
    });

    it('should not call service in case uiType READ_ONLY_MULTI_SELECTION_IMAGE and attributeTypesV2 feature flag is enabled', () => {
      config.features.attributeTypesV2 = true;
      spyOn(
        component['configuratorCommonsService'],
        'updateConfiguration'
      ).and.callThrough();
      component.attribute.uiType =
        Configurator.UiType.READ_ONLY_MULTI_SELECTION_IMAGE;
      value1.selected = true;
      fixture.detectChanges();

      const singleSelectionImageId =
        '#cx-configurator--' +
        Configurator.UiType.READ_ONLY_MULTI_SELECTION_IMAGE +
        '--' +
        component.attribute.name +
        '--' +
        value1.valueCode +
        '-input';
      const valueToSelect = fixture.debugElement.query(
        By.css(singleSelectionImageId)
      ).nativeElement;
      valueToSelect.click();
      expect(
        component['configuratorCommonsService'].updateConfiguration
      ).not.toHaveBeenCalled();
    });
  });

  describe('label styling', () => {
    it('should set cursor to default in case attributeTypesV2 feature flag is enabled', () => {
      config.features.attributeTypesV2 = true;
      component.attribute.uiType =
        Configurator.UiType.READ_ONLY_MULTI_SELECTION_IMAGE;
      value1.selected = true;

      fixture.detectChanges();

      const labelId =
        '#cx-configurator--label--attributeName--' + value1.valueCode;
      const styles = fixture.debugElement.query(By.css(labelId)).styles;
      expect(styles['cursor']).toEqual('default');
    });
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
          VALUE_NAME_3
      );
    });

    it("should contain input elements with class name 'form-input' and 'aria-describedby' attribute that indicates the ID of the element that describe the elements", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'input',
        'form-input',
        2,
        'aria-describedby',
        'cx-configurator--label--attributeName'
      );
    });

    it("should contain input elements with class name 'form-input' and 'checked' attribute that indicates the current 'checked' state of widget", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'input',
        'form-input',
        2,
        'checked',
        'checked'
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

    it("should contain button elements with 'aria-label' attribute that point out that there is a description for the current value", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'button',
        '',
        1,
        'aria-label',
        'configurator.a11y.description'
      );
    });
  });
});
