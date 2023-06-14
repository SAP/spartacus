import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  Input,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  FeatureConfigService,
  FeaturesConfigModule,
  I18nTestingModule,
} from '@spartacus/core';

import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { CommonConfiguratorTestUtilsService } from '../../../../../common/testing/common-configurator-test-utils.service';
import { Configurator } from '../../../../core/model/configurator.model';
import { ConfiguratorAttributeCompositionContext } from '../../composition/configurator-attribute-composition.model';
import { ConfiguratorPriceComponentOptions } from '../../../price/configurator-price.component';
import { ConfiguratorShowMoreComponent } from '../../../show-more/configurator-show-more.component';
import {
  ConfiguratorAttributeProductCardComponent,
  ConfiguratorAttributeProductCardComponentOptions,
} from '../../product-card/configurator-attribute-product-card.component';
import { CONFIGURATOR_FEATURE } from '../../../../core/state/configurator-state';
import { getConfiguratorReducers } from '../../../../core/state/reducers';
import { ConfiguratorAttributeQuantityComponentOptions } from '../../quantity/configurator-attribute-quantity.component';
import { ConfiguratorAttributeQuantityService } from '../../quantity/configurator-attribute-quantity.service';
import { ConfiguratorAttributeSingleSelectionBundleDropdownComponent } from './configurator-attribute-single-selection-bundle-dropdown.component';
import { StoreModule } from '@ngrx/store';
import { ConfiguratorTestUtils } from '../../../../testing/configurator-test-utils';
import { Observable, of } from 'rxjs';
import { ConfiguratorStorefrontUtilsService } from '../../../service/configurator-storefront-utils.service';
import { MockFeatureLevelDirective } from 'projects/storefrontlib/shared/test/mock-feature-level-directive';

const VALUE_DISPLAY_NAME = 'Lorem Ipsum Dolor';
@Component({
  selector: 'cx-configurator-attribute-product-card',
  template: '',
})
class MockProductCardComponent {
  @Input() productCardOptions: ConfiguratorAttributeProductCardComponentOptions;
}

@Component({
  selector: 'cx-configurator-attribute-quantity',
  template: '',
})
class MockConfiguratorAttributeQuantityComponent {
  @Input() quantityOptions: ConfiguratorAttributeQuantityComponentOptions;
}

@Component({
  selector: 'cx-configurator-price',
  template: '',
})
class MockConfiguratorPriceComponent {
  @Input() formula: ConfiguratorPriceComponentOptions;
}

@Directive({
  selector: '[cxFocus]',
})
export class MockFocusDirective {
  @Input('cxFocus') protected config: any;
}

let showRequiredErrorMessage: boolean;
class MockConfigUtilsService {
  isCartEntryOrGroupVisited(): Observable<boolean> {
    return of(showRequiredErrorMessage);
  }
}

let testVersion: string;
class MockFeatureConfigService {
  isLevel(version: string): boolean {
    return version === testVersion;
  }
}

describe('ConfiguratorAttributeSingleSelectionBundleDropdownComponent', () => {
  let component: ConfiguratorAttributeSingleSelectionBundleDropdownComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeSingleSelectionBundleDropdownComponent>;
  let htmlElem: HTMLElement;

  const nameFake = 'nameAttribute';
  const attrCode = 1234;
  const groupId = 'theGroupId';
  const selectedSingleValue = Configurator.RetractValueCode;
  let values: Configurator.Value[];

  const createImage = (url: string, altText: string): Configurator.Image => {
    const image: Configurator.Image = {
      url: url,
      altText: altText,
    };
    return image;
  };

  const createValue = (
    description: string,
    images: Configurator.Image[],
    name: string,
    quantity: number,
    selected: boolean,
    valueCode: string,
    valueDisplay: string
  ): Configurator.Value => {
    const value: Configurator.Value = {
      description,
      images,
      name,
      quantity,
      selected,
      valueCode,
      valueDisplay,
    };
    return value;
  };

  function createComponentWithData(
    releaseVersion: string,
    isCartEntryOrGroupVisited: boolean = true
  ): ConfiguratorAttributeSingleSelectionBundleDropdownComponent {
    testVersion = releaseVersion;
    showRequiredErrorMessage = isCartEntryOrGroupVisited;

    fixture = TestBed.createComponent(
      ConfiguratorAttributeSingleSelectionBundleDropdownComponent
    );

    values = [
      createValue(
        '',
        [],
        '',
        1,
        true,
        Configurator.RetractValueCode,
        'No Selected'
      ),
      createValue(
        'Hih',
        [createImage('url', 'alt')],
        'valueName',
        1,
        true,
        '1111',
        VALUE_DISPLAY_NAME
      ),
      createValue(
        'Huh',
        [createImage('url', 'alt')],
        'valueName',
        1,
        false,
        '2222',
        VALUE_DISPLAY_NAME
      ),
      createValue(
        'Hah',
        [createImage('url', 'alt')],
        'valueName',
        1,
        false,
        '3333',
        VALUE_DISPLAY_NAME
      ),
      createValue(
        'Heh',
        [createImage('url', 'alt')],
        'valueName',
        1,
        false,
        '4444',
        VALUE_DISPLAY_NAME
      ),
    ];

    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;

    component.selectionValue = values[0];

    component.attribute = {
      label: 'Label of attribute',
      uiType: Configurator.UiType.DROPDOWN_PRODUCT,
      attrCode,
      groupId,
      name: nameFake,
      required: true,
      incomplete: true,
      selectedSingleValue,
      values,
    };

    fixture.detectChanges();
    return component;
  }

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          ConfiguratorAttributeSingleSelectionBundleDropdownComponent,
          ConfiguratorShowMoreComponent,
          MockProductCardComponent,
          MockConfiguratorAttributeQuantityComponent,
          MockConfiguratorPriceComponent,
          MockFocusDirective,
          MockFeatureLevelDirective,
        ],
        imports: [
          ReactiveFormsModule,
          NgSelectModule,
          I18nTestingModule,
          RouterTestingModule,
          UrlTestingModule,
          FeaturesConfigModule,
          StoreModule.forRoot({}),
          StoreModule.forFeature(CONFIGURATOR_FEATURE, getConfiguratorReducers),
        ],

        providers: [
          {
            provide: ConfiguratorAttributeCompositionContext,
            useValue: ConfiguratorTestUtils.getAttributeContext(),
          },
          {
            provide: ConfiguratorStorefrontUtilsService,
            useClass: MockConfigUtilsService,
          },
          { provide: FeatureConfigService, useClass: MockFeatureConfigService },
        ],
      })
        .overrideComponent(
          ConfiguratorAttributeSingleSelectionBundleDropdownComponent,
          {
            set: {
              changeDetection: ChangeDetectionStrategy.Default,
              providers: [
                {
                  provide: ConfiguratorAttributeProductCardComponent,
                  useClass: MockProductCardComponent,
                },
                {
                  provide: ConfiguratorAttributeQuantityService,
                  useClass: ConfiguratorAttributeQuantityService,
                },
              ],
            },
          }
        )
        .compileComponents();
    })
  );

  afterEach(() => {
    document.body.removeChild(htmlElem);
  });

  it('should create', () => {
    createComponentWithData('6.2');
    expect(component).toBeTruthy();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      'select.cx-required-error-msg'
    );
  });

  it('should render an empty component in case showRequiredErrorMessage$ is `false`', () => {
    createComponentWithData('6.1', false).ngOnInit();
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      'select.cx-required-error-msg'
    );
  });

  it('should set selectedSingleValue on init', () => {
    createComponentWithData('6.2').ngOnInit();
    expect(component.attributeDropDownForm.value).toEqual(selectedSingleValue);
  });

  it('should show product card when product selected', () => {
    createComponentWithData('6.2');
    component.selectionValue = values[1];
    fixture.detectChanges();

    const card = htmlElem.querySelector(
      'cx-configurator-attribute-product-card'
    );

    expect(card).toBeTruthy();
  });

  describe('quantity at attribute level', () => {
    beforeEach(() => {
      createComponentWithData('6.2').ngOnInit();
    });

    it('should display attribute quantity when dataType is with attribute quantity', () => {
      component.attribute.dataType =
        Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL;
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'cx-configurator-attribute-quantity'
      );
    });

    it('should not display attribute quantity when dataType is no quantity', () => {
      component.attribute.dataType =
        Configurator.DataType.USER_SELECTION_NO_QTY;
      fixture.detectChanges();
      checkQuantityStepperNotDisplayed(htmlElem);
    });

    it('should not display attribute quantity when dataType is not filled', () => {
      component.attribute.dataType = undefined;
      fixture.detectChanges();
      checkQuantityStepperNotDisplayed(htmlElem);
    });

    it('should not display attribute quantity when uiType is not filled', () => {
      component.attribute.uiType = undefined;
      fixture.detectChanges();
      checkQuantityStepperNotDisplayed(htmlElem);
    });

    function checkQuantityStepperNotDisplayed(htmlEl: HTMLElement) {
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlEl,
        'cx-configurator-attribute-quantity'
      );
    }

    describe('Accessibility', () => {
      it("should contain label element with class name 'cx-visually-hidden' that hides label content on the UI", () => {
        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'label',
          'cx-visually-hidden',
          0,
          undefined,
          undefined,
          'configurator.a11y.listbox count:' +
            component.attribute.values?.length
        );
      });

      it("should contain select element with class name 'form-control' and 'aria-describedby' attribute that indicates the ID of the element that describe the elements", () => {
        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'select',
          'form-control',
          0,
          'aria-describedby',
          'cx-configurator--label--nameAttribute'
        );
      });

      it("should contain option elements with 'aria-label' attribute for value without price that defines an accessible name to label the current element", () => {
        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'option',
          undefined,
          1,
          'aria-label',
          'configurator.a11y.selectedValueOfAttributeFull attribute:' +
            component.attribute.label +
            ' value:' +
            VALUE_DISPLAY_NAME,
          VALUE_DISPLAY_NAME
        );
      });
    });
  });

  describe('isNotRetractValue', () => {
    beforeEach(() => {
      createComponentWithData('6.2').ngOnInit();
    });

    it('should return `true` in case value is `###RETRACT_VALUE_CODE###`', () => {
      expect(component.isNotRetractValue()).toBe(false);
    });

    it('should return `true` in case selectionValue is `undefined`', () => {
      component.selectionValue = undefined;
      fixture.detectChanges();
      expect(component.isNotRetractValue()).toBe(false);
    });

    it('should return `true` in case value is not `###RETRACT_VALUE_CODE###`', () => {
      component.selectionValue = values[1];
      fixture.detectChanges();
      expect(component.isNotRetractValue()).toBe(true);
    });
  });

  describe('isRetractValue', () => {
    beforeEach(() => {
      createComponentWithData('6.2').ngOnInit();
    });

    it('should return `true` in case valueCode is `###RETRACT_VALUE_CODE###`', () => {
      expect(component.isRetractValue(Configurator.RetractValueCode)).toBe(
        true
      );
    });

    it('should return `false` in case value is not `###RETRACT_VALUE_CODE###`', () => {
      expect(component.isRetractValue('8624')).toBe(false);
    });
  });
});
