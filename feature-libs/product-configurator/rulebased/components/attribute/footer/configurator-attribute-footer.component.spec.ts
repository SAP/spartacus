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
import { ConfiguratorAttributeFooterComponent } from './configurator-attribute-footer.component';

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

const isCartEntryOrGroupVisited = true;
class MockConfigUtilsService {
  isCartEntryOrGroupVisited(): Observable<boolean> {
    return of(isCartEntryOrGroupVisited);
  }
}

const attributeName = '123';
const attrLabel = 'attLabel';
describe('ConfigAttributeFooterComponent', () => {
  let classUnderTest: ConfiguratorAttributeFooterComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeFooterComponent>;

  const currentAttribute: Configurator.Attribute = {
    name: attributeName,
    label: attrLabel,
    uiType: Configurator.UiType.RADIOBUTTON,
  };
  let htmlElem: HTMLElement;

  const owner = ConfiguratorModelUtils.createOwner(
    CommonConfigurator.OwnerType.CART_ENTRY,
    'PRODUCT_CODE'
  );

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, IconModule],
        declarations: [ConfiguratorAttributeFooterComponent],
        providers: [
          { provide: IconLoaderService, useClass: MockIconFontLoaderService },
          {
            provide: ConfiguratorStorefrontUtilsService,
            useClass: MockConfigUtilsService,
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

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorAttributeFooterComponent);
    classUnderTest = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
    classUnderTest.attribute = currentAttribute;

    classUnderTest.owner = owner;
    classUnderTest.groupId = 'testGroup';
    classUnderTest.attribute.required = true;
    classUnderTest.attribute.incomplete = true;
    classUnderTest.attribute.uiType = Configurator.UiType.STRING;
    classUnderTest.attribute.userInput = '';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(classUnderTest).toBeTruthy();
  });

  it('should render a required message if attribute has no value, yet.', () => {
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-required-error-msg'
    );
  });

  it('should render a required message because the group has already been visited.', () => {
    classUnderTest.owner.type = CommonConfigurator.OwnerType.PRODUCT;
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-required-error-msg'
    );
  });

  it('should render a required message because user input is an empty string.', () => {
    currentAttribute.userInput = '  ';
    classUnderTest.ngOnInit();
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-required-error-msg'
    );
  });

  it("shouldn't render a required message if attribute is not required.", () => {
    currentAttribute.required = false;
    classUnderTest.ngOnInit();
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      'cx-required-error-msg'
    );
  });

  it("shouldn't render a required message if attribute is complete.", () => {
    currentAttribute.incomplete = false;
    classUnderTest.ngOnInit();
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      'cx-required-error-msg'
    );
  });

  it("shouldn't render a required message if UI type is another.", () => {
    currentAttribute.uiType = Configurator.UiType.CHECKBOX;
    classUnderTest.ngOnInit();
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      'cx-required-error-msg'
    );
  });

  it("shouldn't render a required message because user input is set.", () => {
    currentAttribute.userInput = 'test';
    classUnderTest.ngOnInit();
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      'cx-required-error-msg'
    );
  });

  describe('isUserInputEmpty()', () => {
    it('should return false because user input is undefined', () => {
      currentAttribute.userInput = undefined;
      expect(
        classUnderTest.isUserInputEmpty(classUnderTest.attribute.userInput)
      ).toBe(false);
    });

    it('should return true because user input contains a number of whitespaces', () => {
      currentAttribute.userInput = '   ';
      expect(
        classUnderTest.isUserInputEmpty(classUnderTest.attribute.userInput)
      ).toBe(true);
    });

    it('should return true because user input contains an empty string', () => {
      currentAttribute.userInput = '';
      expect(
        classUnderTest.isUserInputEmpty(classUnderTest.attribute.userInput)
      ).toBe(true);
    });

    it('should return false because user input is defined and contains a string', () => {
      currentAttribute.userInput = 'user input string';
      expect(
        classUnderTest.isUserInputEmpty(classUnderTest.attribute.userInput)
      ).toBe(false);
    });
  });

  describe('needsUserInputMessage()', () => {
    it('should not display user input message because attribute is not required', () => {
      classUnderTest.attribute.required = false;
      fixture.detectChanges();
      expect(classUnderTest['needsUserInputMessage']()).toBe(false);
    });

    it('should not display user input message because attribute is complete', () => {
      classUnderTest.attribute.incomplete = false;
      fixture.detectChanges();
      expect(classUnderTest['needsUserInputMessage']()).toBe(false);
    });

    it('should not display user input message because attribute user input is not empty', () => {
      classUnderTest.attribute.userInput = ' test ';
      fixture.detectChanges();
      expect(classUnderTest['needsUserInputMessage']()).toBe(false);
    });

    it('should not display user input message for another UI type', () => {
      classUnderTest.attribute.uiType = Configurator.UiType.CHECKBOX;
      fixture.detectChanges();
      expect(classUnderTest['needsUserInputMessage']()).toBe(false);
    });

    it('should display user input message for UI type `STRING`', () => {
      expect(classUnderTest['needsUserInputMessage']()).toBe(true);
    });

    it('should display user input message for UI type `NUMERIC`', () => {
      classUnderTest.attribute.uiType = Configurator.UiType.NUMERIC;
      fixture.detectChanges();
      expect(classUnderTest['needsUserInputMessage']()).toBe(true);
    });
  });

  describe('Accessibility', () => {
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
