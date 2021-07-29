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
  let classUnderTest: ConfiguratorAttributeHeaderComponent;
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
    classUnderTest = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
    classUnderTest.attribute = currentAttribute;
    classUnderTest.attribute.label = 'label of attribute';
    classUnderTest.attribute.name = '123';
    classUnderTest.owner = owner;
    classUnderTest.groupId = 'testGroup';
    classUnderTest.attribute.required = false;
    classUnderTest.attribute.incomplete = true;
    classUnderTest.attribute.uiType = Configurator.UiType.RADIOBUTTON;
    classUnderTest.groupType = Configurator.GroupType.ATTRIBUTE_GROUP;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(classUnderTest).toBeTruthy();
  });

  describe('getImage', () => {
    it('should return first image', () => {
      expect(classUnderTest.image).toBe(image);
    });

    it('should return undefined if images are undefined', () => {
      currentAttribute.images = undefined;
      expect(classUnderTest.image).toBeUndefined();
      currentAttribute.images = images;
    });

    it('should return undefined if no images are available', () => {
      currentAttribute.images = [];
      expect(classUnderTest.image).toBeUndefined();
      currentAttribute.images = images;
    });
  });

  describe('hasImage', () => {
    it('should return true if image available', () => {
      expect(classUnderTest.hasImage).toBe(true);
    });

    it('should return false if images are undefined', () => {
      currentAttribute.images = undefined;
      expect(classUnderTest.hasImage).toBe(false);
      currentAttribute.images = images;
    });

    it('should return undefined if no images are available', () => {
      currentAttribute.images = [];
      expect(classUnderTest.hasImage).toBe(false);
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
        'label',
        'label of attribute'
      );
      const id = htmlElem.querySelector('label')?.getAttribute('id');
      expect((id ? id : '').indexOf('123')).toBeGreaterThan(0);
      expect(
        htmlElem.querySelector('label')?.getAttribute('aria-label')
      ).toEqual(classUnderTest.attribute.label);
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-required-icon'
      );
    });

    it('should render a label as required', () => {
      classUnderTest.attribute.required = true;
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
      expect(classUnderTest.getRequiredMessageKey()).toContain(
        'singleSelectRequiredMessage'
      );
    });

    it('should return a single-select message key for simple radio buttons attribute type', () => {
      classUnderTest.attribute.uiType = Configurator.UiType.RADIOBUTTON;
      expect(classUnderTest.getRequiredMessageKey()).toContain(
        'singleSelectRequiredMessage'
      );
    });

    it('should return a single-select message key for simple radio buttons - product attribute type', () => {
      classUnderTest.attribute.uiType = Configurator.UiType.RADIOBUTTON_PRODUCT;
      expect(classUnderTest.getRequiredMessageKey()).toContain(
        'singleSelectRequiredMessage'
      );
    });

    it('should return a single-select message key for simple checkbox attribute type', () => {
      classUnderTest.attribute.uiType = Configurator.UiType.CHECKBOX;
      expect(classUnderTest.getRequiredMessageKey()).toContain(
        'singleSelectRequiredMessage'
      );
    });

    it('should return a single-select message key for ddlb attribute type', () => {
      classUnderTest.attribute.uiType = Configurator.UiType.DROPDOWN;
      expect(classUnderTest.getRequiredMessageKey()).toContain(
        'singleSelectRequiredMessage'
      );
    });

    it('should return a single-select message key for ddlb-product attribute type', () => {
      classUnderTest.attribute.uiType = Configurator.UiType.DROPDOWN_PRODUCT;
      expect(classUnderTest.getRequiredMessageKey()).toContain(
        'singleSelectRequiredMessage'
      );
    });

    it('should return a single-select message key for single-selection-image attribute type', () => {
      classUnderTest.attribute.uiType =
        Configurator.UiType.SINGLE_SELECTION_IMAGE;
      expect(classUnderTest.getRequiredMessageKey()).toContain(
        'singleSelectRequiredMessage'
      );
    });

    it('should return a multi-select message key for checkbox list attribute type', () => {
      classUnderTest.attribute.uiType = Configurator.UiType.CHECKBOXLIST;
      expect(classUnderTest.getRequiredMessageKey()).toContain(
        'multiSelectRequiredMessage'
      );
    });

    it('should return a multi-select message key for checkbox-product list attribute type', () => {
      classUnderTest.attribute.uiType =
        Configurator.UiType.CHECKBOXLIST_PRODUCT;
      expect(classUnderTest.getRequiredMessageKey()).toContain(
        'multiSelectRequiredMessage'
      );
    });

    it('should return a multi-select message key for multi-selection-image list attribute type', () => {
      classUnderTest.attribute.uiType =
        Configurator.UiType.MULTI_SELECTION_IMAGE;
      expect(classUnderTest.getRequiredMessageKey()).toContain(
        'multiSelectRequiredMessage'
      );
    });

    it('should return no key for not implemented attribute type', () => {
      classUnderTest.attribute.uiType = Configurator.UiType.NOT_IMPLEMENTED;
      expect(classUnderTest.getRequiredMessageKey()).toContain(
        'singleSelectRequiredMessage'
      );
    });

    it('should return no key for read only attribute type', () => {
      classUnderTest.attribute.uiType = Configurator.UiType.READ_ONLY;
      expect(classUnderTest.getRequiredMessageKey()).toContain(
        'singleSelectRequiredMessage'
      );
    });
  });

  describe('Required message at the attribute level', () => {
    it('should render a required message if attribute has been set, yet.', () => {
      classUnderTest.attribute.required = true;
      classUnderTest.attribute.uiType = Configurator.UiType.RADIOBUTTON;
      classUnderTest.ngOnInit();
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-required-error-msg'
      );
    });

    it('should render a required message if the group has already been visited.', () => {
      classUnderTest.owner.type = CommonConfigurator.OwnerType.PRODUCT;
      isCartEntryOrGroupVisited = true;
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-required-error-msg'
      );
    });

    it("shouldn't render a required message if attribute has not been added to the cart yet.", () => {
      classUnderTest.owner.type = CommonConfigurator.OwnerType.PRODUCT;
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-required-error-msg'
      );
    });

    it("shouldn't render a required message if attribute is not required.", () => {
      classUnderTest.attribute.required = false;
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-required-error-msg'
      );
    });

    it("shouldn't render a required message if attribute is complete.", () => {
      classUnderTest.attribute.incomplete = true;
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-required-error-msg'
      );
    });

    it("shouldn't render a required message if ui type is string.", () => {
      classUnderTest.attribute.uiType = Configurator.UiType.STRING;
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-required-error-msg'
      );
    });
  });

  describe('Conflict text at the attribute level', () => {
    it('should render conflict icon with corresponding message if attribute has conflicts.', () => {
      classUnderTest.attribute.hasConflicts = true;
      classUnderTest.groupType = Configurator.GroupType.ATTRIBUTE_GROUP;
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
    });

    it('should render conflict message without icon container if conflict message is not displayed in the configuration.', () => {
      classUnderTest.attribute.hasConflicts = true;
      classUnderTest.groupType = Configurator.GroupType.CONFLICT_GROUP;
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
    });

    it("shouldn't render conflict message if attribute has no conflicts.", () => {
      classUnderTest.attribute.hasConflicts = false;
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
      classUnderTest.groupType = Configurator.GroupType.ATTRIBUTE_GROUP;
      fixture.detectChanges();
      expect(classUnderTest.isAttributeGroup(classUnderTest.groupType)).toBe(
        true
      );
    });

    it("should return 'false'", () => {
      classUnderTest.groupType = Configurator.GroupType.CONFLICT_GROUP;
      fixture.detectChanges();
      expect(classUnderTest.isAttributeGroup(classUnderTest.groupType)).toBe(
        false
      );
    });
  });

  describe('Get conflict message key', () => {
    it("should return 'configurator.conflict.viewConflictDetails' conflict message key", () => {
      classUnderTest.groupType = Configurator.GroupType.ATTRIBUTE_GROUP;
      fixture.detectChanges();
      expect(
        classUnderTest.getConflictMessageKey(classUnderTest.groupType)
      ).toEqual('configurator.conflict.viewConflictDetails');
    });

    it("should return 'configurator.conflict.viewConfigurationDetails' conflict message key", () => {
      classUnderTest.groupType = Configurator.GroupType.CONFLICT_GROUP;
      fixture.detectChanges();
      expect(
        classUnderTest.getConflictMessageKey(classUnderTest.groupType)
      ).toEqual('configurator.conflict.viewConfigurationDetails');
    });
  });
});
