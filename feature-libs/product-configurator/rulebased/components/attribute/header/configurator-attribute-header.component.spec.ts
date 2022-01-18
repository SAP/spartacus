import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
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
import { ConfiguratorStorefrontUtilsService } from '../../service/configurator-storefront-utils.service';
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
}

describe('ConfigAttributeHeaderComponent', () => {
  let component: ConfiguratorAttributeHeaderComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeHeaderComponent>;

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
  };
  let htmlElem: HTMLElement;

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
    fixture = TestBed.createComponent(ConfiguratorAttributeHeaderComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
    component.attribute = currentAttribute;
    component.attribute.label = 'label of attribute';
    component.attribute.name = '123';
    component.owner = owner;
    component.groupId = 'testGroup';
    component.attribute.required = false;
    component.attribute.incomplete = true;
    component.attribute.uiType = Configurator.UiType.RADIOBUTTON;
    component.groupType = Configurator.GroupType.ATTRIBUTE_GROUP;
    fixture.detectChanges();
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

  describe('Get required message key', () => {
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

    it('should return a single-select message key for ddlb attribute type', () => {
      component.attribute.uiType = Configurator.UiType.DROPDOWN;
      expect(component.getRequiredMessageKey()).toContain(
        'singleSelectRequiredMessage'
      );
    });

    it('should return a single-select message key for ddlb-product attribute type', () => {
      component.attribute.uiType = Configurator.UiType.DROPDOWN_PRODUCT;
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

  describe('Conflict text at the attribute level', () => {
    it('should render conflict icon with corresponding message and corresponding aria-attributes if attribute has conflicts.', () => {
      component.attribute.hasConflicts = true;
      component.groupType = Configurator.GroupType.ATTRIBUTE_GROUP;
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-conflict-msg'
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
      expect(component.isAttributeGroup(component.groupType)).toBe(true);
    });

    it("should return 'false'", () => {
      component.groupType = Configurator.GroupType.CONFLICT_GROUP;
      fixture.detectChanges();
      expect(component.isAttributeGroup(component.groupType)).toBe(false);
    });
  });

  describe('Get conflict message key', () => {
    it("should return 'configurator.conflict.viewConflictDetails' conflict message key", () => {
      component.groupType = Configurator.GroupType.ATTRIBUTE_GROUP;
      fixture.detectChanges();
      expect(component.getConflictMessageKey(component.groupType)).toEqual(
        'configurator.conflict.viewConflictDetails'
      );
    });

    it("should return 'configurator.conflict.viewConfigurationDetails' conflict message key", () => {
      component.groupType = Configurator.GroupType.CONFLICT_GROUP;
      fixture.detectChanges();
      expect(component.getConflictMessageKey(component.groupType)).toEqual(
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
});
