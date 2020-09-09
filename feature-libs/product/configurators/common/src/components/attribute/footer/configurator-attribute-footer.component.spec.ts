import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GenericConfigurator, I18nTestingModule } from '@spartacus/core';
import {
  IconLoaderService,
  IconModule,
  ICON_TYPE,
} from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { ConfiguratorComponentTestUtilsService } from '../../../shared/testing/configurator-component-test-utils.service';
import { ConfiguratorStorefrontUtilsService } from '../../service/configurator-storefront-utils.service';
import { Configurator } from './../../../core/model/configurator.model';
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

  const owner: GenericConfigurator.Owner = {
    id: 'PRODUCT_CODE',
    type: GenericConfigurator.OwnerType.CART_ENTRY,
  };

  beforeEach(async(() => {
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
  }));

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
    ConfiguratorComponentTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-config-attribute-footer-required-error-msg'
    );
  });

  it('should render a required message because the group has already been visited.', () => {
    classUnderTest.owner.type = GenericConfigurator.OwnerType.PRODUCT;
    fixture.detectChanges();
    ConfiguratorComponentTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-config-attribute-footer-required-error-msg'
    );
  });

  it('should render a required message because user input is an empty string.', () => {
    currentAttribute.userInput = '  ';
    classUnderTest.ngOnInit();
    fixture.detectChanges();
    ConfiguratorComponentTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-config-attribute-footer-required-error-msg'
    );
  });

  it("shouldn't render a required message if attribute is not required.", () => {
    currentAttribute.required = false;
    classUnderTest.ngOnInit();
    fixture.detectChanges();
    ConfiguratorComponentTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-config-attribute-footer-required-error-msg'
    );
  });

  it("shouldn't render a required message because user input is set.", () => {
    currentAttribute.userInput = 'test';
    classUnderTest.ngOnInit();
    fixture.detectChanges();
    ConfiguratorComponentTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-config-attribute-footer-required-error-msg'
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
});
