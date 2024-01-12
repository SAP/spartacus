import { ChangeDetectionStrategy, Type } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FeaturesConfig, I18nTestingModule } from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorModelUtils,
} from '@spartacus/product-configurator/common';
import {
  ICON_TYPE,
  IconLoaderService,
  IconModule,
} from '@spartacus/storefront';
import { getTestScheduler } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { CommonConfiguratorTestUtilsService } from '../../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorCommonsService } from '../../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../../../core/facade/configurator-groups.service';
import { Configurator } from '../../../core/model/configurator.model';
import * as ConfigurationTestData from '../../../testing/configurator-test-data';
import { ConfiguratorTestUtils } from '../../../testing/configurator-test-utils';
import { ConfiguratorUISettingsConfig } from '../../config/configurator-ui-settings.config';
import { ConfiguratorStorefrontUtilsService } from '../../service/configurator-storefront-utils.service';
import { ConfiguratorAttributeCompositionContext } from '../composition/configurator-attribute-composition.model';
import { ConfiguratorAttributeHeaderComponent } from './configurator-attribute-header.component';

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

let isCartEntryOrGroupVisited = true;

class MockConfigUtilsService {
  isCartEntryOrGroupVisited(): Observable<boolean> {
    return of(isCartEntryOrGroupVisited);
  }

  focusValue(): void {}

  scrollToConfigurationElement(): void {}
}

const configWithoutConflicts: Configurator.Configuration =
  ConfigurationTestData.productConfiguration;

const configConflict: Configurator.Configuration =
  ConfigurationTestData.productConfigurationWithConflicts;

let config: Configurator.Configuration;

class MockConfiguratorCommonsService {
  getConfiguration(): Observable<Configurator.Configuration> {
    return of(config);
  }

  isConfigurationLoading(): Observable<boolean> {
    return of(true);
  }
}

class MockConfiguratorGroupsService {
  navigateToGroup(): void {}
}

describe('ConfigAttributeHeaderComponent', () => {
  let component: ConfiguratorAttributeHeaderComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeHeaderComponent>;
  let configurationGroupsService: ConfiguratorGroupsService;
  let configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService;
  let configuratorCommonsService: ConfiguratorCommonsService;
  let uiConfig: ConfiguratorUISettingsConfig;

  const owner = ConfiguratorModelUtils.createOwner(
    CommonConfigurator.OwnerType.CART_ENTRY,
    'PRODUCT_CODE'
  );

  const image = {
    url: 'someImageURL',
  };

  const image2 = {
    url: 'someOtherImageURL',
  };

  const images = [image, image2];

  const currentAttribute: Configurator.Attribute = {
    name: 'attributeId',
    uiType: Configurator.UiType.RADIOBUTTON,
    images: images,
    key: 'ATTRIBUTE_1',
  };

  let htmlElem: HTMLElement;

  const TestConfiguratorUISettings: ConfiguratorUISettingsConfig = {
    productConfigurator: {
      enableNavigationToConflict: false,
    },
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, IconModule],
        declarations: [ConfiguratorAttributeHeaderComponent],
        providers: [
          { provide: IconLoaderService, useClass: MockIconFontLoaderService },
          {
            provide: ConfiguratorStorefrontUtilsService,
            useClass: MockConfigUtilsService,
          },
          {
            provide: ConfiguratorCommonsService,
            useClass: MockConfiguratorCommonsService,
          },
          {
            provide: ConfiguratorGroupsService,
            useClass: MockConfiguratorGroupsService,
          },
          {
            provide: ConfiguratorUISettingsConfig,
            useValue: TestConfiguratorUISettings,
          },

          {
            provide: ConfiguratorAttributeCompositionContext,
            useValue: ConfiguratorTestUtils.getAttributeContext(),
          },
          {
            provide: FeaturesConfig,
            useValue: {
              features: { level: '*' },
            },
          },
        ],
      })
        .overrideComponent(ConfiguratorAttributeHeaderComponent, {
          set: {
            changeDetection: ChangeDetectionStrategy.Default,
          },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    config = configWithoutConflicts;
    fixture = TestBed.createComponent(ConfiguratorAttributeHeaderComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
    component.attribute = currentAttribute;
    component.attribute.label = 'label of attribute';
    component.attribute.name = '123';
    component.attribute.visible = true;
    component.owner = owner;
    component.groupId = 'testGroup';
    component.attribute.required = false;
    component.attribute.incomplete = true;
    component.attribute.uiType = Configurator.UiType.RADIOBUTTON;
    component.groupType = Configurator.GroupType.ATTRIBUTE_GROUP;
    component.isNavigationToGroupEnabled = true;
    component['logError'] = () => {};
    fixture.detectChanges();

    configurationGroupsService = TestBed.inject(
      ConfiguratorGroupsService as Type<ConfiguratorGroupsService>
    );
    configuratorStorefrontUtilsService = TestBed.inject(
      ConfiguratorStorefrontUtilsService as Type<ConfiguratorStorefrontUtilsService>
    );
    configuratorCommonsService = TestBed.inject(
      ConfiguratorCommonsService as Type<ConfiguratorCommonsService>
    );
    uiConfig = TestBed.inject(
      ConfiguratorUISettingsConfig as Type<ConfiguratorUISettingsConfig>
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getImage', () => {
    it('should return first image', () => {
      expect(component.image).toBe(image);
    });

    it('should return undefined if images are undefined', () => {
      currentAttribute.images = undefined;
      expect(component.image).toBeUndefined();
      currentAttribute.images = images;
    });

    it('should return undefined if no images are available', () => {
      currentAttribute.images = [];
      expect(component.image).toBeUndefined();
      currentAttribute.images = images;
    });
  });

  describe('isSingleSelection', () => {
    it('should know that DROPDOWN_ADDITIONAL_INPUT is a single selection attributes', () => {
      component.attribute.uiType =
        Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT;
      expect(component['isSingleSelection']()).toBe(true);
    });

    it('should know that RADIOBUTTON_ADDITIONAL_INPUT is a single selection attributes', () => {
      component.attribute.uiType =
        Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT;
      expect(component['isSingleSelection']()).toBe(true);
    });

    it('should know that CHECKBOX is a single selection attributes from the users point of view', () => {
      component.attribute.uiType = Configurator.UiType.CHECKBOX;
      expect(component['isSingleSelection']()).toBe(true);
    });

    it('should know that MULTI_SELECTION_IMAGE is not a single selection attributes', () => {
      component.attribute.uiType = Configurator.UiType.MULTI_SELECTION_IMAGE;
      expect(component['isSingleSelection']()).toBe(false);
    });
  });

  describe('hasImage', () => {
    it('should return true if image available', () => {
      expect(component.hasImage).toBe(true);
    });

    it('should return false if images are undefined', () => {
      currentAttribute.images = undefined;
      expect(component.hasImage).toBe(false);
      currentAttribute.images = images;
    });

    it('should return undefined if no images are available', () => {
      currentAttribute.images = [];
      expect(component.hasImage).toBe(false);
      currentAttribute.images = images;
    });
  });

  describe('Render corresponding part of the component', () => {
    it('should not render message for not visible attribute', () => {
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        'div.cx-hidden-msg'
      );
    });

    it('should render message for not visible attribute', () => {
      component.attribute.visible = false;
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'div.cx-hidden-msg'
      );

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'div.cx-hidden-msg',
        'configurator.attribute.notVisibleAttributeMsg'
      );
    });

    it('should render a label', () => {
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'label'
      );
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'span',
        'label of attribute'
      );
      const id = htmlElem.querySelector('label')?.getAttribute('id');
      expect((id ? id : '').indexOf('123')).toBeGreaterThan(0);
      expect(
        htmlElem.querySelector('label')?.getAttribute('aria-label')
      ).toEqual(
        'configurator.a11y.attribute attribute:' + component.attribute.label
      );
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-required-icon'
      );
    });

    it('should render a label as required', () => {
      component.attribute.required = true;
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-required-icon'
      );
    });

    it('should render an image', () => {
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-attribute-img'
      );
    });
  });

  describe('getRequiredMessageKey', () => {
    it('should return a single-select message key for radio button attribute type', () => {
      expect(component.getRequiredMessageKey()).toContain(
        'singleSelectRequiredMessage'
      );
    });

    it('should return a single-select message key for simple radio buttons attribute type', () => {
      component.attribute.uiType = Configurator.UiType.RADIOBUTTON;
      expect(component.getRequiredMessageKey()).toContain(
        'singleSelectRequiredMessage'
      );
    });

    it('should return a single-select message key for simple radio buttons - product attribute type', () => {
      component.attribute.uiType = Configurator.UiType.RADIOBUTTON_PRODUCT;
      expect(component.getRequiredMessageKey()).toContain(
        'singleSelectRequiredMessage'
      );
    });

    it('should return a single-select message key for simple checkbox attribute type', () => {
      component.attribute.uiType = Configurator.UiType.CHECKBOX;
      expect(component.getRequiredMessageKey()).toContain(
        'singleSelectRequiredMessage'
      );
    });

    it('should return a single-select message key for single-selection-image attribute type', () => {
      component.attribute.uiType = Configurator.UiType.SINGLE_SELECTION_IMAGE;
      expect(component.getRequiredMessageKey()).toContain(
        'singleSelectRequiredMessage'
      );
    });

    it('should return a multi-select message key for checkbox list attribute type', () => {
      component.attribute.uiType = Configurator.UiType.CHECKBOXLIST;
      expect(component.getRequiredMessageKey()).toContain(
        'multiSelectRequiredMessage'
      );
    });

    it('should return a multi-select message key for checkbox-product list attribute type', () => {
      component.attribute.uiType = Configurator.UiType.CHECKBOXLIST_PRODUCT;
      expect(component.getRequiredMessageKey()).toContain(
        'multiSelectRequiredMessage'
      );
    });

    it('should return a multi-select message key for multi-selection-image list attribute type', () => {
      component.attribute.uiType = Configurator.UiType.MULTI_SELECTION_IMAGE;
      expect(component.getRequiredMessageKey()).toContain(
        'multiSelectRequiredMessage'
      );
    });

    it('should return no key for not implemented attribute type', () => {
      component.attribute.uiType = Configurator.UiType.NOT_IMPLEMENTED;
      expect(component.getRequiredMessageKey()).toContain(
        'singleSelectRequiredMessage'
      );
    });

    it('should return no key for read only attribute type', () => {
      component.attribute.uiType = Configurator.UiType.READ_ONLY;
      expect(component.getRequiredMessageKey()).toContain(
        'singleSelectRequiredMessage'
      );
    });

    it('should return proper key for attribute types with additional values', () => {
      component.attribute.uiType =
        Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT;
      expect(component.getRequiredMessageKey()).toContain(
        'singleSelectAdditionalRequiredMessage'
      );
    });
  });

  describe('Required message at the attribute level', () => {
    it('should render a required message if attribute has been set, yet.', () => {
      component.attribute.required = true;
      component.attribute.uiType = Configurator.UiType.RADIOBUTTON;
      component.ngOnInit();
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-required-error-msg'
      );
    });

    it('should render a required message if the group has already been visited.', () => {
      component.owner.type = CommonConfigurator.OwnerType.PRODUCT;
      isCartEntryOrGroupVisited = true;
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-required-error-msg'
      );
    });

    it("shouldn't render a required message if attribute has not been added to the cart yet.", () => {
      component.owner.type = CommonConfigurator.OwnerType.PRODUCT;
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-required-error-msg'
      );
    });

    it("shouldn't render a required message if attribute is not required.", () => {
      component.attribute.required = false;
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-required-error-msg'
      );
    });

    it("shouldn't render a required message if attribute is complete.", () => {
      component.attribute.incomplete = true;
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-required-error-msg'
      );
    });

    it("shouldn't render a required message if ui type is string.", () => {
      component.attribute.uiType = Configurator.UiType.STRING;
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-required-error-msg'
      );
    });
  });

  describe('Conflict text in a conflict group and in configuration', () => {
    it('should display a conflict text as a link to a configuration group that contains an attribute involved in conflict', () => {
      component.attribute.hasConflicts = true;
      component.groupType = Configurator.GroupType.CONFLICT_GROUP;
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'div.cx-conflict-msg a.link.cx-action-link'
      );
    });

    it('should not display a conflict text as a link to a configuration group if this is disabled', () => {
      component.attribute.hasConflicts = true;
      component.groupType = Configurator.GroupType.CONFLICT_GROUP;
      component.isNavigationToGroupEnabled = false;
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        'div.cx-conflict-msg a.link.cx-action-link'
      );
    });

    it('should display a simple conflict text without link to conflict group', () => {
      component.attribute.hasConflicts = true;
      component.groupType = Configurator.GroupType.ATTRIBUTE_GROUP;
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'div.cx-conflict-msg'
      );
    });
  });

  describe('Conflict text at the attribute level', () => {
    it('should render conflict icon with corresponding message and corresponding aria-attributes if attribute has conflicts.', () => {
      component.attribute.hasConflicts = true;
      component.groupType = Configurator.GroupType.ATTRIBUTE_GROUP;
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'div.cx-conflict-msg'
      );

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'cx-icon'
      );

      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'cx-conflict-msg',
        0,
        'aria-live',
        'assertive'
      );

      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'cx-conflict-msg',
        0,
        'aria-atomic',
        'true'
      );

      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'cx-conflict-msg',
        0,
        'aria-label',
        'configurator.a11y.conflictDetected'
      );
    });

    it('should render conflict message without icon container if conflict message is not displayed in the configuration.', () => {
      component.attribute.hasConflicts = true;
      component.groupType = Configurator.GroupType.CONFLICT_GROUP;
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-conflict-msg'
      );

      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        'cx-icon'
      );

      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'cx-conflict-msg',
        0,
        'aria-live',
        'off'
      );

      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'cx-conflict-msg',
        0,
        'aria-atomic',
        'false'
      );

      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'cx-conflict-msg',
        0,
        'aria-label',
        ''
      );
    });

    it("shouldn't render conflict message if attribute has no conflicts.", () => {
      component.attribute.hasConflicts = false;
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-conflict-container'
      );
    });
  });

  describe('Verify attribute type', () => {
    it("should return 'true'", () => {
      component.groupType = Configurator.GroupType.ATTRIBUTE_GROUP;
      fixture.detectChanges();
      expect(component.isAttributeGroup()).toBe(true);
    });

    it("should return 'false'", () => {
      component.groupType = Configurator.GroupType.CONFLICT_GROUP;
      fixture.detectChanges();
      expect(component.isAttributeGroup()).toBe(false);
    });
  });

  describe('isConflictResolutionActive', () => {
    it("should return 'false' because the navigation to the group is not enabled", () => {
      component.groupType = Configurator.GroupType.ATTRIBUTE_GROUP;
      component.isNavigationToGroupEnabled = false;
      fixture.detectChanges();
      expect(component.isConflictResolutionActive()).toBe(false);
    });

    it("should return 'false' because the group type is a conflict group", () => {
      component.groupType = Configurator.GroupType.CONFLICT_GROUP;
      component.isNavigationToGroupEnabled = false;
      fixture.detectChanges();
      expect(component.isConflictResolutionActive()).toBe(false);
    });

    it("should return 'true'", () => {
      component.groupType = Configurator.GroupType.ATTRIBUTE_GROUP;
      component.isNavigationToGroupEnabled = true;
      fixture.detectChanges();
      expect(component.isConflictResolutionActive()).toBe(true);
    });
  });

  describe('Get conflict message key', () => {
    it("should return 'configurator.conflict.conflictDetected' conflict message key", () => {
      component.groupType = Configurator.GroupType.ATTRIBUTE_GROUP;
      (uiConfig.productConfigurator ??= {}).enableNavigationToConflict = false;
      fixture.detectChanges();
      expect(component.getConflictMessageKey()).toEqual(
        'configurator.conflict.conflictDetected'
      );
    });

    it("should return 'configurator.conflict.viewConflictDetails' conflict message key", () => {
      component.groupType = Configurator.GroupType.ATTRIBUTE_GROUP;
      (uiConfig.productConfigurator ??= {}).enableNavigationToConflict = true;
      fixture.detectChanges();
      expect(component.getConflictMessageKey()).toEqual(
        'configurator.conflict.viewConflictDetails'
      );
    });

    it("should return 'configurator.conflict.viewConfigurationDetails' conflict message key", () => {
      component.groupType = Configurator.GroupType.CONFLICT_GROUP;
      fixture.detectChanges();
      expect(component.getConflictMessageKey()).toEqual(
        'configurator.conflict.viewConfigurationDetails'
      );
    });
  });

  describe('Accessibility', () => {
    it("should contain label element with 'aria-label' attribute that defines an accessible name to label the current element", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'label',
        undefined,
        0,
        'aria-label',
        'configurator.a11y.attribute attribute:label of attribute'
      );
    });

    it("should contain label element with 'aria-label' attribute for required attribute type that defines an accessible name to label the current element", () => {
      component.attribute.required = true;
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'label',
        undefined,
        0,
        'aria-label',
        'configurator.a11y.requiredAttribute param:label of attribute'
      );
    });

    it("should contain span element with 'aria-describedby' attribute for required attribute type that indicates the IDs of the elements that describe the elements", () => {
      component.attribute.required = true;
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'span',
        'cx-required-icon',
        0,
        'aria-describedby',
        'cx-configurator--label--123',
        'label of attribute'
      );
    });

    describe('Conflict message', () => {
      beforeEach(() => {
        component.attribute.hasConflicts = true;
        fixture.detectChanges();
      });

      it("should contain label element for not required attribute with 'aria-label' attribute that defines an accessible name to label the current element", () => {
        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'label',
          undefined,
          0,
          'aria-label',
          'configurator.a11y.attribute attribute:' + component.attribute.label
        );
      });

      it("should contain label element for required attribute with 'aria-label' attribute that defines an accessible name to label the current element", () => {
        component.attribute.required = true;
        fixture.detectChanges();
        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'label',
          undefined,
          0,
          'aria-label',
          'configurator.a11y.requiredAttribute param:' +
            component.attribute.label
        );
      });

      it("should contain span element for required attribute with 'aria-describedby' attribute that indicates the IDs of the elements that describe the elements", () => {
        component.attribute.required = true;
        fixture.detectChanges();
        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'span',
          'cx-required-icon',
          0,
          'aria-describedby',
          'cx-configurator--label--123',
          component.attribute.label
        );
      });

      describe('Conflict resolution', () => {
        describe('Enabled', () => {
          beforeEach(() => {
            component.groupType = Configurator.GroupType.ATTRIBUTE_GROUP;
            component.isNavigationToGroupEnabled = true;
            fixture.detectChanges();
          });

          it("should contain div element with 'role' attribute that is set to notify as soon as a conflict message occurs", () => {
            CommonConfiguratorTestUtilsService.expectElementContainsA11y(
              expect,
              htmlElem,
              'div',
              'cx-conflict-msg',
              0,
              'role',
              'alert'
            );
          });

          it("should contain div element with class name 'cx-conflict-msg' and 'aria-live' attribute that enables the screen reader to read out a conflict message as soon as it occurs", () => {
            CommonConfiguratorTestUtilsService.expectElementContainsA11y(
              expect,
              htmlElem,
              'div',
              'cx-conflict-msg',
              0,
              'aria-live',
              'assertive'
            );
          });

          it("should contain div element with class name 'cx-conflict-msg' and 'aria-atomic' attribute that indicates whether a screen reader will present a changed region based on the change notifications defined by the aria-relevant attribute", () => {
            CommonConfiguratorTestUtilsService.expectElementContainsA11y(
              expect,
              htmlElem,
              'div',
              'cx-conflict-msg',
              0,
              'aria-atomic',
              'true'
            );
          });

          it("should contain div element with class name 'cx-conflict-msg' and 'aria-label' attribute for a conflicted attribute type that defines an accessible name to label the current element", () => {
            CommonConfiguratorTestUtilsService.expectElementContainsA11y(
              expect,
              htmlElem,
              'div',
              'cx-conflict-msg',
              0,
              'aria-label',
              'configurator.a11y.conflictDetected'
            );
          });
        });

        describe('Disabled', () => {
          beforeEach(() => {
            component.groupType = Configurator.GroupType.ATTRIBUTE_GROUP;
            component.isNavigationToGroupEnabled = false;
            fixture.detectChanges();
          });

          it("should contain div element with class name 'cx-conflict-msg' and 'aria-live' attribute that is set to off", () => {
            CommonConfiguratorTestUtilsService.expectElementContainsA11y(
              expect,
              htmlElem,
              'div',
              'cx-conflict-msg',
              0,
              'aria-live',
              'off'
            );
          });

          it("should contain div element with class name 'cx-conflict-msg' and 'aria-atomic' attribute that is set to false", () => {
            CommonConfiguratorTestUtilsService.expectElementContainsA11y(
              expect,
              htmlElem,
              'div',
              'cx-conflict-msg',
              0,
              'aria-atomic',
              'false'
            );
          });

          it("should contain div element with class name 'cx-conflict-msg' and 'aria-label' attribute for a conflicted attribute type that is not defined", () => {
            CommonConfiguratorTestUtilsService.expectElementContainsA11y(
              expect,
              htmlElem,
              'div',
              'cx-conflict-msg',
              0,
              'aria-label'
            );
          });
        });
      });

      it("should contain cx-icon element with 'aria-hidden' attribute that removes an element from the accessibility tree", () => {
        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'cx-icon',
          undefined,
          0,
          'aria-hidden',
          'true'
        );
      });
    });

    it("should contain div element with 'aria-label' attribute for required error message that defines an accessible name to label the current element", () => {
      component.showRequiredMessageForDomainAttribute$ = of(true);
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'cx-required-error-msg',
        undefined,
        'aria-label',
        'configurator.attribute.singleSelectRequiredMessage'
      );
    });
  });

  describe('Navigate to corresponding group', () => {
    it('should navigate nowhere because conflict group is not found/available', () => {
      config = configWithoutConflicts;
      component.groupType = Configurator.GroupType.ATTRIBUTE_GROUP;
      component.attribute.groupId = ConfigurationTestData.GROUP_ID_1;

      spyOn(configurationGroupsService, 'navigateToGroup');
      fixture.detectChanges();

      component.navigateToGroup();
      expect(configurationGroupsService.navigateToGroup).toHaveBeenCalledTimes(
        0
      );
    });

    it("should navigate to conflict group because group type is 'ATTRIBUTE_GROUP'", () => {
      config = configConflict;
      component.groupType = Configurator.GroupType.ATTRIBUTE_GROUP;
      component.attribute.groupId = ConfigurationTestData.GROUP_ID_1;

      spyOn(configurationGroupsService, 'navigateToGroup');
      fixture.detectChanges();

      component.navigateToGroup();
      expect(configurationGroupsService.navigateToGroup).toHaveBeenCalledTimes(
        1
      );
    });

    it('should navigate from conflict group to regular group that contains attribute which is involved in conflict', () => {
      component.groupType = Configurator.GroupType.CONFLICT_GROUP;
      component.attribute.groupId = ConfigurationTestData.GROUP_ID_2;

      spyOn(configurationGroupsService, 'navigateToGroup');
      fixture.detectChanges();

      component.navigateToGroup();
      expect(configurationGroupsService.navigateToGroup).toHaveBeenCalledTimes(
        1
      );
    });

    it('should not navigate from conflict group to regular group because no group ID is defined', () => {
      component.groupType = Configurator.GroupType.CONFLICT_GROUP;
      component.attribute.groupId = undefined;

      spyOn(configurationGroupsService, 'navigateToGroup');
      spyOn<any>(component, 'logError');
      fixture.detectChanges();

      component.navigateToGroup();
      expect(configurationGroupsService.navigateToGroup).toHaveBeenCalledTimes(
        0
      );
      expect(component['logError']).toHaveBeenCalled();
    });
  });

  describe('Focus selected value', () => {
    it('should call focusValue with attribute', () => {
      //we need to run the test in a test scheduler
      //because of the delay() in method focusAttribute
      getTestScheduler().run(({ cold, flush }) => {
        component.groupType = Configurator.GroupType.CONFLICT_GROUP;
        component.attribute.groupId = ConfigurationTestData.GROUP_ID_2;
        const configurationLoading = cold('-a-b', {
          a: true,
          b: false,
        });
        spyOn(
          configuratorCommonsService,
          'isConfigurationLoading'
        ).and.returnValue(configurationLoading);

        spyOn(configuratorStorefrontUtilsService, 'focusValue');

        fixture.detectChanges();
        component['focusValue'](component.attribute);

        flush();

        expect(
          configuratorStorefrontUtilsService.focusValue
        ).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Scroll to configuration element', () => {
    it('should call scrollToConfigurationElement', () => {
      //we need to run the test in a test scheduler
      //because of the delay() in method focusAttribute
      getTestScheduler().run(({ cold, flush }) => {
        component.groupType = Configurator.GroupType.CONFLICT_GROUP;
        component.attribute.groupId = ConfigurationTestData.GROUP_ID_2;

        const configurationLoading = cold('-a-b', {
          a: true,
          b: false,
        });
        spyOn(
          configuratorCommonsService,
          'isConfigurationLoading'
        ).and.returnValue(configurationLoading);

        spyOn(
          configuratorStorefrontUtilsService,
          'scrollToConfigurationElement'
        );

        fixture.detectChanges();

        component['scrollToAttribute'](ConfigurationTestData.GROUP_ID_2);

        flush();

        expect(
          configuratorStorefrontUtilsService.scrollToConfigurationElement
        ).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Find conflict group ID', () => {
    it('should not find the conflicting group key when there is no conflict', () => {
      expect(
        component.findConflictGroupId(configWithoutConflicts, currentAttribute)
      ).toBe(undefined);
    });

    it('should find the conflicting group key', () => {
      expect(
        component.findConflictGroupId(configConflict, currentAttribute)
      ).toBe(ConfigurationTestData.GROUP_ID_CONFLICT_1);
    });
  });

  describe('isNavigationToConflictEnabled', () => {
    it('should return false if productConfigurator setting is not provided', () => {
      uiConfig.productConfigurator = undefined;
      expect(component.isNavigationToConflictEnabled()).toBeFalsy();
    });

    it('should return false if enableNavigationToConflict setting is not provided', () => {
      (uiConfig.productConfigurator ??= {}).enableNavigationToConflict =
        undefined;
      expect(component.isNavigationToConflictEnabled()).toBeFalsy();
    });

    it('should return true if enableNavigationToConflict setting is true', () => {
      (uiConfig.productConfigurator ??= {}).enableNavigationToConflict = true;
      expect(component.isNavigationToConflictEnabled()).toBe(true);
    });

    it('should return false if enableNavigationToConflict setting is false', () => {
      (uiConfig.productConfigurator ??= {}).enableNavigationToConflict = false;
      expect(component.isNavigationToConflictEnabled()).toBe(false);
    });

    it('should return false if enableNavigationToConflict setting is true and isNavigationToGroupEnabled is false', () => {
      (uiConfig.productConfigurator ??= {}).enableNavigationToConflict = true;
      component.isNavigationToGroupEnabled = false;
      fixture.detectChanges();
      expect(component.isNavigationToConflictEnabled()).toBe(false);
    });
  });

  describe('isAttributeWithoutErrorMsg', () => {
    it('should return `false` because attribute UI type is `Configurator.UiType.NOT_IMPLEMENTED`', () => {
      component.attribute.uiType = Configurator.UiType.NOT_IMPLEMENTED;
      fixture.detectChanges();
      expect(
        component['isAttributeWithoutErrorMsg'](component.attribute.uiType)
      ).toBe(false);
    });

    it('should return `false` because attribute UI type is `Configurator.UiType.STRING`', () => {
      component.attribute.uiType = Configurator.UiType.STRING;
      fixture.detectChanges();
      expect(
        component['isAttributeWithoutErrorMsg'](component.attribute.uiType)
      ).toBe(false);
    });

    it('should return `false` because attribute UI type is `Configurator.UiType.NUMERIC`', () => {
      component.attribute.uiType = Configurator.UiType.NUMERIC;
      fixture.detectChanges();
      expect(
        component['isAttributeWithoutErrorMsg'](component.attribute.uiType)
      ).toBe(false);
    });

    it('should return `false` because attribute UI type is `Configurator.UiType.DROPDOWN`', () => {
      component.attribute.uiType = Configurator.UiType.DROPDOWN;
      fixture.detectChanges();
      expect(
        component['isAttributeWithoutErrorMsg'](component.attribute.uiType)
      ).toBe(false);
    });

    it('should return `false` because attribute UI type is `Configurator.UiType.DROPDOWN_PRODUCT`', () => {
      component.attribute.uiType = Configurator.UiType.DROPDOWN_PRODUCT;
      fixture.detectChanges();
      expect(
        component['isAttributeWithoutErrorMsg'](component.attribute.uiType)
      ).toBe(false);
    });

    it('should return `true` because attribute UI type is `RADIOBUTTON`', () => {
      expect(
        component['isAttributeWithoutErrorMsg'](component.attribute.uiType)
      ).toBe(true);
    });
  });

  describe('isRequiredAttributeWithoutErrorMsg', () => {
    it('should return `false` because because required attribute is `undefined`', () => {
      component.attribute.required = undefined;
      fixture.detectChanges();
      expect(component['isRequiredAttributeWithoutErrorMsg']()).toBe(false);
    });

    it('should return `false` because definition of attribute incompleteness is `undefined`', () => {
      component.attribute.incomplete = undefined;
      fixture.detectChanges();
      expect(component['isRequiredAttributeWithoutErrorMsg']()).toBe(false);
    });

    it('should return `false` because attribute attribute UI type is `Configurator.UiType.DROPDOWN`', () => {
      component.attribute.required = true;
      component.attribute.uiType = Configurator.UiType.DROPDOWN;
      fixture.detectChanges();
      expect(component['isRequiredAttributeWithoutErrorMsg']()).toBe(false);
    });

    it('should return `true` because attribute attribute UI type is `Configurator.UiType.RADIOBUTTON`', () => {
      component.attribute.required = true;
      component.attribute.uiType = Configurator.UiType.RADIOBUTTON;
      fixture.detectChanges();
      expect(component['isRequiredAttributeWithoutErrorMsg']()).toBe(true);
    });
  });

  describe('needsRequiredAttributeErrorMsg', () => {
    it('should return `true` because the newest release is active', () => {
      component.attribute.required = true;
      component.attribute.uiType = Configurator.UiType.RADIOBUTTON;
      fixture.detectChanges();
      expect(component['needsRequiredAttributeErrorMsg']()).toBe(true);
    });
  });
});
