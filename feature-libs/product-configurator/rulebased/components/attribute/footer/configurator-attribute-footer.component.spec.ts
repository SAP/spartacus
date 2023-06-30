import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  FeatureConfigService,
  FeaturesConfigModule,
  I18nTestingModule,
} from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorModelUtils,
} from '@spartacus/product-configurator/common';
import {
  IconLoaderService,
  IconModule,
  ICON_TYPE,
} from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { CommonConfiguratorTestUtilsService } from '../../../../common/testing/common-configurator-test-utils.service';
import { Configurator } from '../../../core/model/configurator.model';
import { ConfiguratorAttributeCompositionContext } from '../composition/configurator-attribute-composition.model';
import { ConfiguratorStorefrontUtilsService } from '../../service/configurator-storefront-utils.service';
import { ConfiguratorAttributeFooterComponent } from './configurator-attribute-footer.component';
import { ConfiguratorTestUtils } from '../../../testing/configurator-test-utils';
import { MockFeatureLevelDirective } from 'projects/storefrontlib/shared/test/mock-feature-level-directive';

export class MockIconFontLoaderService {
  useSvg(_iconType: ICON_TYPE) {
    return false;
  }

  getStyleClasses(_iconType: ICON_TYPE): string {
    return 'fas fa-exclamation-circle';
  }

  addLinkResource() {}
  getHtml(_iconType: ICON_TYPE) {}
  getFlipDirection(): void {}
}

let showRequiredMessageForUserInput: boolean;
class MockConfigUtilsService {
  isCartEntryOrGroupVisited(): Observable<boolean> {
    return of(showRequiredMessageForUserInput);
  }
}

let testVersion: string;
class MockFeatureConfigService {
  isLevel(version: string): boolean {
    return version === testVersion;
  }
}

function createComponentWithData(
  releaseVersion: string,
  isCartEntryOrGroupVisited: boolean = true
): ConfiguratorAttributeFooterComponent {
  testVersion = releaseVersion;
  showRequiredMessageForUserInput = isCartEntryOrGroupVisited;

  fixture = TestBed.createComponent(ConfiguratorAttributeFooterComponent);
  component = fixture.componentInstance;
  htmlElem = fixture.nativeElement;
  component.attribute = currentAttribute;

  component.owner = owner;
  component.groupId = 'testGroup';
  component.attribute.required = true;
  component.attribute.incomplete = true;
  component.attribute.uiType = Configurator.UiType.STRING;
  component.attribute.userInput = '';

  fixture.detectChanges();
  return component;
}

let component: ConfiguratorAttributeFooterComponent;
let fixture: ComponentFixture<ConfiguratorAttributeFooterComponent>;
let htmlElem: HTMLElement;
const attributeName = '123';
const attrLabel = 'attLabel';

const currentAttribute: Configurator.Attribute = {
  name: attributeName,
  label: attrLabel,
  uiType: Configurator.UiType.RADIOBUTTON,
};

const owner = ConfiguratorModelUtils.createOwner(
  CommonConfigurator.OwnerType.CART_ENTRY,
  'PRODUCT_CODE'
);

describe('ConfigAttributeFooterComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [FeaturesConfigModule, I18nTestingModule, IconModule],
        declarations: [
          ConfiguratorAttributeFooterComponent,
          MockFeatureLevelDirective,
        ],
        providers: [
          { provide: IconLoaderService, useClass: MockIconFontLoaderService },
          {
            provide: ConfiguratorStorefrontUtilsService,
            useClass: MockConfigUtilsService,
          },
          { provide: FeatureConfigService, useClass: MockFeatureConfigService },
          {
            provide: ConfiguratorAttributeCompositionContext,
            useValue: ConfiguratorTestUtils.getAttributeContext(),
          },
        ],
      })
        .overrideComponent(ConfiguratorAttributeFooterComponent, {
          set: {
            changeDetection: ChangeDetectionStrategy.Default,
          },
        })
        .compileComponents();
    })
  );

  it('should render an empty component because showRequiredMessageForUserInput$ is `false`', () => {
    createComponentWithData('6.2', false).ngOnInit();
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-required-error-msg'
    );
  });

  it('should render a required message for release version less than 6.2', () => {
    createComponentWithData('6.1').ngOnInit();
    expect(component).toBeTruthy();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-required-error-msg'
    );
  });

  it('should render a required message if attribute has no value, yet.', () => {
    createComponentWithData('6.2');
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-required-error-msg'
    );
  });

  it('should render a required message because the group has already been visited.', () => {
    createComponentWithData('6.2');
    component.owner.type = CommonConfigurator.OwnerType.PRODUCT;
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-required-error-msg'
    );
  });

  it('should render a required message because user input is an empty string.', () => {
    createComponentWithData('6.2');
    currentAttribute.userInput = '  ';
    component.ngOnInit();
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-required-error-msg'
    );
  });

  it("shouldn't render a required message if attribute is not required.", () => {
    createComponentWithData('6.2');
    currentAttribute.required = false;
    component.ngOnInit();
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      'cx-required-error-msg'
    );
  });

  it("shouldn't render a required message if attribute is complete.", () => {
    createComponentWithData('6.2');
    currentAttribute.incomplete = false;
    component.ngOnInit();
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      'cx-required-error-msg'
    );
  });

  it("shouldn't render a required message if UI type is another.", () => {
    createComponentWithData('6.2');
    currentAttribute.uiType = Configurator.UiType.CHECKBOX;
    component.ngOnInit();
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      'cx-required-error-msg'
    );
  });

  it("shouldn't render a required message because user input is set.", () => {
    createComponentWithData('6.2');
    currentAttribute.userInput = 'test';
    component.ngOnInit();
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      'cx-required-error-msg'
    );
  });

  describe('needsDropDownMsg', () => {
    beforeEach(() => {
      createComponentWithData('6.2');
    });

    it('should not display drop-down message because attribute is not required', () => {
      component.attribute.required = false;
      fixture.detectChanges();
      expect(component['needsDropDownMsg']()).toBe(false);
    });

    it('should not display drop-down message because attribute is complete', () => {
      component.attribute.incomplete = false;
      fixture.detectChanges();
      expect(component['needsDropDownMsg']()).toBe(false);
    });

    it('should not display drop-down message for another UI type', () => {
      component.attribute.uiType = Configurator.UiType.CHECKBOX;
      fixture.detectChanges();
      expect(component['needsDropDownMsg']()).toBe(false);
    });

    it('should not display drop-down message because the list of values is undefined', () => {
      component.attribute.values = undefined;
      fixture.detectChanges();
      expect(component['needsDropDownMsg']()).toBe(false);
    });

    it('should not display drop-down message for UI type `DROPDOWN` because there is a selected value', () => {
      component.attribute.uiType = Configurator.UiType.DROPDOWN;
      component.attribute.values = [
        ConfiguratorTestUtils.createValue(
          Configurator.RetractValueCode,
          undefined
        ),
        ConfiguratorTestUtils.createValue('123', 10, true),
        ConfiguratorTestUtils.createValue('456', 15),
        ConfiguratorTestUtils.createValue('789', 20),
      ];
      fixture.detectChanges();
      expect(component['needsDropDownMsg']()).toBe(false);
      component.attribute.values = undefined;
      fixture.detectChanges();
    });

    it('should display drop-down message for UI type `DROPDOWN`', () => {
      component.attribute.uiType = Configurator.UiType.DROPDOWN;
      fixture.detectChanges();
      expect(component['needsDropDownMsg']()).toBe(true);
    });

    it('should display drop-down message for UI type `DROPDOWN_PRODUCT`', () => {
      component.attribute.uiType = Configurator.UiType.DROPDOWN_PRODUCT;
      fixture.detectChanges();
      expect(component['needsDropDownMsg']()).toBe(true);
    });

    it('should display drop-down message for UI type `DROPDOWN` because the selected value has a code `###RETRACT_VALUE_CODE###`', () => {
      component.attribute.uiType = Configurator.UiType.DROPDOWN;
      component.attribute.values = [
        ConfiguratorTestUtils.createValue(
          Configurator.RetractValueCode,
          undefined,
          true
        ),
        ConfiguratorTestUtils.createValue('123', 10),
        ConfiguratorTestUtils.createValue('456', 15),
        ConfiguratorTestUtils.createValue('789', 20),
      ];
      fixture.detectChanges();
      expect(component['needsDropDownMsg']()).toBe(true);
      component.attribute.values = undefined;
      fixture.detectChanges();
    });
  });

  describe('isUserInputEmpty', () => {
    beforeEach(() => {
      createComponentWithData('6.2');
    });

    it('should return false because user input is undefined', () => {
      currentAttribute.userInput = undefined;
      expect(component.isUserInputEmpty(component.attribute.userInput)).toBe(
        false
      );
    });

    it('should return true because user input contains a number of whitespaces', () => {
      currentAttribute.userInput = '   ';
      expect(component.isUserInputEmpty(component.attribute.userInput)).toBe(
        true
      );
    });

    it('should return true because user input contains an empty string', () => {
      currentAttribute.userInput = '';
      expect(component.isUserInputEmpty(component.attribute.userInput)).toBe(
        true
      );
    });

    it('should return false because user input is defined and contains a string', () => {
      currentAttribute.userInput = 'user input string';
      expect(component.isUserInputEmpty(component.attribute.userInput)).toBe(
        false
      );
    });
  });

  describe('needsUserInputMsg', () => {
    beforeEach(() => {
      createComponentWithData('6.2');
    });

    it('should not display user input message because attribute is not required', () => {
      component.attribute.required = false;
      fixture.detectChanges();
      expect(component['needsUserInputMsg']()).toBe(false);
    });

    it('should not display user input message because attribute is complete', () => {
      component.attribute.incomplete = false;
      fixture.detectChanges();
      expect(component['needsUserInputMsg']()).toBe(false);
    });

    it('should not display user input message because attribute user input is not empty', () => {
      component.attribute.userInput = ' test ';
      fixture.detectChanges();
      expect(component['needsUserInputMsg']()).toBe(false);
    });

    it('should not display user input message for another UI type', () => {
      component.attribute.uiType = Configurator.UiType.CHECKBOX;
      fixture.detectChanges();
      expect(component['needsUserInputMsg']()).toBe(false);
    });

    it('should display user input message for UI type `STRING`', () => {
      expect(component['needsUserInputMsg']()).toBe(true);
    });

    it('should display user input message for UI type `NUMERIC`', () => {
      component.attribute.uiType = Configurator.UiType.NUMERIC;
      fixture.detectChanges();
      expect(component['needsUserInputMsg']()).toBe(true);
    });
  });

  describe('needsUserInputMessage', () => {
    beforeEach(() => {
      createComponentWithData('6.2');
    });

    it('should not display user input message because attribute is not required', () => {
      component.attribute.required = false;
      fixture.detectChanges();
      expect(component['needsUserInputMessage']()).toBe(false);
    });

    it('should not display user input message because attribute is complete', () => {
      component.attribute.incomplete = false;
      fixture.detectChanges();
      expect(component['needsUserInputMessage']()).toBe(false);
    });

    it('should not display user input message because attribute user input is not empty', () => {
      component.attribute.userInput = ' test ';
      fixture.detectChanges();
      expect(component['needsUserInputMessage']()).toBe(false);
    });

    it('should not display user input message for another UI type', () => {
      component.attribute.uiType = Configurator.UiType.CHECKBOX;
      fixture.detectChanges();
      expect(component['needsUserInputMessage']()).toBe(false);
    });

    it('should display user input message for UI type `STRING`', () => {
      expect(component['needsUserInputMessage']()).toBe(true);
    });

    it('should display user input message for UI type `NUMERIC`', () => {
      component.attribute.uiType = Configurator.UiType.NUMERIC;
      fixture.detectChanges();
      expect(component['needsUserInputMessage']()).toBe(true);
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      createComponentWithData('6.2', true);
    });

    it("should contain div element with class name 'cx-required-error-msg' and 'aria-label' attribute that defines an accessible name to label the current element", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'cx-required-error-msg',
        0,
        'aria-label',
        'configurator.attribute.defaultRequiredMessage'
      );
    });

    it("should contain div element with class name 'cx-required-error-msg' and 'aria-live' attribute that indicates that an element will be updated, and describes the types of updates a user can expect from the live region", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'cx-required-error-msg',
        0,
        'aria-live',
        'assertive'
      );
    });

    it("should contain div element with class name 'cx-required-error-msg' and 'aria-atomic' attribute that indicates whether a screen reader will present a changed region based on the change notifications defined by the aria-relevant attribute", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'cx-required-error-msg',
        0,
        'aria-atomic',
        'true'
      );
    });
  });
});
