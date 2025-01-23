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

import {
  Config,
  I18nTestingModule,
  FeatureConfigService,
} from '@spartacus/core';
import { IconTestingModule, PopoverModule } from '@spartacus/storefront';
import { CommonConfiguratorTestUtilsService } from '../../../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorCommonsService } from '../../../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../../../../core/facade/configurator-groups.service';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorTestUtils } from '../../../../testing/configurator-test-utils';
import { ConfiguratorPriceComponentOptions } from '../../../price/configurator-price.component';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfiguratorAttributeSingleSelectionImageComponent } from './configurator-attribute-single-selection-image.component';
import { ConfiguratorAttributePriceChangeService } from '../../price-change/configurator-attribute-price-change.service';
import { Observable, of } from 'rxjs';

const VALUE_DISPLAY_NAME = 'val2';
class MockGroupService {}

@Directive({
  selector: '[cxFocus]',
  standalone: false,
})
export class MockFocusDirective {
  @Input('cxFocus') protected config: string;
}

@Component({
  selector: 'cx-configurator-price',
  template: '',
  standalone: false,
})
class MockConfiguratorPriceComponent {
  @Input() formula: ConfiguratorPriceComponentOptions;
}

class MockConfiguratorCommonsService {
  updateConfiguration(): void {}
}

class MockConfiguratorAttributePriceChangeService {
  getChangedPrices(): Observable<Record<string, Configurator.PriceDetails>[]> {
    return of([]);
  }
}

class MockConfig {
  features = [{ productConfiguratorAttributeTypesV2: false }];
}

describe('ConfiguratorAttributeSingleSelectionImageComponent', () => {
  let component: ConfiguratorAttributeSingleSelectionImageComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeSingleSelectionImageComponent>;
  let htmlElem: HTMLElement;
  const ownerKey = 'theOwnerKey';
  const groupId = 'testGroup';
  const attributeName = 'attributeName';
  let config: Config;
  let featureConfigService: FeatureConfigService;

  beforeEach(waitForAsync(() => {
    TestBed.overrideComponent(
      ConfiguratorAttributeSingleSelectionImageComponent,
      {
        set: {
          providers: [
            {
              provide: ConfiguratorAttributePriceChangeService,
              useClass: MockConfiguratorAttributePriceChangeService,
            },
          ],
        },
      }
    );
    TestBed.configureTestingModule({
      declarations: [
        ConfiguratorAttributeSingleSelectionImageComponent,
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
        {
          provide: ConfiguratorStorefrontUtilsService,
          useValue: {},
        },
      ],
    })
      .overrideComponent(ConfiguratorAttributeSingleSelectionImageComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  function createImage(url: string, altText: string): Configurator.Image {
    const configImage: Configurator.Image = {
      url: url,
      altText: altText,
    };
    return configImage;
  }

  function createValue(
    code: string,
    name: string,
    isSelected: boolean,
    configImages: Configurator.Image[],
    description?: string
  ): Configurator.Value {
    const value: Configurator.Value = {
      valueCode: code,
      valueDisplay: name,
      name: name,
      selected: isSelected,
      images: configImages,
      description: description,
    };
    return value;
  }
  const image = createImage('url', 'altText');
  const images: Configurator.Image[] = [image, image, image];
  const value1 = createValue('1', 'val1', false, images);
  const value2 = createValue(
    '2',
    VALUE_DISPLAY_NAME,
    false,
    images,
    'Here is a long description at value level'
  );
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
    config = TestBed.inject(Config);
    (config.features ?? {}).productConfiguratorAttributeTypesV2 = false;
    featureConfigService = TestBed.inject(FeatureConfigService);
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

  it('should render info icon at value level if value has a description', () => {
    (config.features ?? {}).productConfiguratorAttributeTypesV2 = true;
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      "cx-icon[ng-reflect-type='INFO']"
    );
  });

  it('should render popover with description at value level after clicking on info icon', () => {
    (config.features ?? {}).productConfiguratorAttributeTypesV2 = true;
    fixture.detectChanges();
    const infoButton = fixture.debugElement.query(
      By.css('button[ng-reflect-cx-popover]')
    ).nativeElement;
    infoButton.click();
    const description = fixture.debugElement.query(
      By.css('cx-popover > .popover-body > span')
    );
    expect(description).toBeTruthy();
    expect(description.nativeElement.innerText).toBe(
      (component.attribute.values ?? [{}])[1].description
    );
    infoButton.click(); // hide popover after test again
  });

  it('should init with val3', () => {
    fixture.detectChanges();
    expect(component.attributeRadioButtonForm.value).toEqual(value3.valueCode);
  });

  describe('extractValuePriceFormulaParameters', () => {
    it('should take over attributes from value if present', () => {
      const parameters = component.extractValuePriceFormulaParameters(value1);
      expect(parameters.price).toBe(value1.valuePrice);
      expect(parameters.isLightedUp).toBe(value1.selected);
    });

    it('should create empty parameters if value is not present', () => {
      const parameters =
        component.extractValuePriceFormulaParameters(undefined);
      expect(parameters.price).toBeUndefined();
      expect(parameters.isLightedUp).toBe(false);
    });
  });

  describe('select single image', () => {
    it('should call service for update when productConfiguratorAttributeTypesV2 feature flag is disabled', () => {
      spyOn(
        component['configuratorCommonsService'],
        'updateConfiguration'
      ).and.callThrough();
      component.onClick(value2.valueCode);
      expect(
        component['configuratorCommonsService'].updateConfiguration
      ).toHaveBeenCalledWith(
        ownerKey,
        { ...component.attribute, selectedSingleValue: value2.valueCode },
        Configurator.UpdateType.ATTRIBUTE
      );
    });

    it('should not call service for update and in case attribute is read-only and productConfiguratorAttributeTypesV2 feature flag is enabled', () => {
      (config.features ?? {}).productConfiguratorAttributeTypesV2 = true;
      spyOn(
        component['configuratorCommonsService'],
        'updateConfiguration'
      ).and.callThrough();
      component.attribute.uiType =
        Configurator.UiType.READ_ONLY_SINGLE_SELECTION_IMAGE;
      value2.selected = true;
      fixture.detectChanges();
      const singleSelectionImageId =
        '#cx-configurator--' +
        Configurator.UiType.READ_ONLY_SINGLE_SELECTION_IMAGE +
        '--' +
        component.attribute.name +
        '--' +
        value2.valueCode +
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
    it('should set cursor to default in case productConfiguratorAttributeTypesV2 feature flag is enabled', () => {
      (config.features ?? {}).productConfiguratorAttributeTypesV2 = true;
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

  describe('value description styling', () => {
    it('should return default style class if a11yImproveContrast feature flag is disabled', () => {
      spyOn(featureConfigService, 'isEnabled').and.returnValue(false);
      expect(component.getValueDescriptionStyleClasses()).toEqual(
        'cx-value-description'
      );
    });
    it('should return additional style class if a11yImproveContrast feature flag is enabled', () => {
      spyOn(featureConfigService, 'isEnabled').and.returnValue(true);
      expect(component.getValueDescriptionStyleClasses()).toEqual(
        'cx-value-description santorini-updated'
      );
    });
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
          VALUE_DISPLAY_NAME
      );
    });

    it("should contain input element with class name 'form-input' and 'aria-describedby' attribute that indicates the ID of the element that describe the elements", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'input',
        'form-input',
        1,
        'aria-describedby',
        'cx-configurator--label--attributeName'
      );
    });

    it("should contain input elements with class name 'form-input' and 'checked' attribute that indicates the current 'checked' state of widgete", () => {
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

    it("should contain button elements with 'aria-label' attribute that point out that there is a description for the current value", () => {
      (config.features ?? {}).productConfiguratorAttributeTypesV2 = true;
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'button',
        '',
        0,
        'aria-label',
        'configurator.a11y.description value:val2'
      );
    });

    it('should create input element for selected value with aria-live', () => {
      component.listenForPriceChanges = true;
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'input',
        'form-input',
        2,
        'aria-live',
        'polite'
      );
    });

    it('should create input element for not selected value without aria-live', () => {
      component.listenForPriceChanges = true;
      fixture.detectChanges();
      const item = CommonConfiguratorTestUtilsService.getHTMLElement(
        htmlElem,
        'input',
        'form-input',
        0
      );
      const attributes = item?.attributes;
      expect(attributes?.hasOwnProperty('aria-live')).toBe(false);
    });
  });
});
