import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Configurator,
  GenericConfigurator,
  I18nTestingModule,
} from '@spartacus/core';
import { ConfigAttributeFooterComponent } from './config-attribute-footer.component';
import {
  ICON_TYPE,
  IconLoaderService,
  IconModule,
} from '@spartacus/storefront';
import { ConfigComponentTestUtilsService } from '../../generic/service/config-component-test-utils.service';
import { ConfigUtilsService } from '../service/config-utils.service';
import { Observable, of } from 'rxjs';

export class MockIconFontLoaderService {
  useSvg(_iconType: ICON_TYPE) {
    return false;
  }

  getStyleClasses(_iconType: ICON_TYPE): string {
    return 'fas fa-exclamation-circle';
  }

  addLinkResource() {}

  getHtml(_iconType: ICON_TYPE) {}
}

const isCartEntryOrGroupVisited = true;
class MockConfigUtilsService {
  isCartEntryOrGroupVisited(): Observable<boolean> {
    return of(isCartEntryOrGroupVisited);
  }
}

describe('ConfigAttributeFooterComponent', () => {
  let classUnderTest: ConfigAttributeFooterComponent;
  let fixture: ComponentFixture<ConfigAttributeFooterComponent>;

  const currentAttribute: Configurator.Attribute = {
    name: 'attributeId',
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
      declarations: [ConfigAttributeFooterComponent],
      providers: [
        { provide: IconLoaderService, useClass: MockIconFontLoaderService },
        { provide: ConfigUtilsService, useClass: MockConfigUtilsService },
      ],
    })
      .overrideComponent(ConfigAttributeFooterComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigAttributeFooterComponent);
    classUnderTest = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
    classUnderTest.attribute = currentAttribute;
    classUnderTest.attribute.label = 'label of attribute';
    classUnderTest.attribute.name = '123';
    classUnderTest.owner = owner;
    classUnderTest.groupId = 'testGroup';
    classUnderTest.attribute.required = true;
    classUnderTest.attribute.incomplete = true;
    classUnderTest.attribute.uiType = Configurator.UiType.STRING;
    classUnderTest.attribute.userInput = undefined;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(classUnderTest).toBeTruthy();
  });

  it('should render a required message if attribute has no value, yet.', () => {
    fixture.detectChanges();
    ConfigComponentTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-config-attribute-footer-required-error-msg'
    );
  });

  it('should render a required message because the group has already been visited.', () => {
    classUnderTest.owner.type = GenericConfigurator.OwnerType.PRODUCT;
    fixture.detectChanges();
    ConfigComponentTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-config-attribute-footer-required-error-msg'
    );
  });

  it("shouldn't render a required message if attribute is not required.", () => {
    classUnderTest.attribute.required = false;
    fixture.detectChanges();
    ConfigComponentTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-config-attribute-footer-required-error-msg'
    );
  });

  it("shouldn't render a required message because user input is set.", () => {
    classUnderTest.attribute.userInput = 'test';
    fixture.detectChanges();
    ConfigComponentTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-config-attribute-footer-required-error-msg'
    );
  });

  it('should return default message key for input string attributes', () => {
    expect(classUnderTest.getRequiredMessageKey()).toContain(
      'defaultRequiredMessage'
    );
  });
});
