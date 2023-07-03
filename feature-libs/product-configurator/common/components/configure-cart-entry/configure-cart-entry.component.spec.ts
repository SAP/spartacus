import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { OrderEntry } from '@spartacus/cart/base/root';
import { I18nTestingModule } from '@spartacus/core';
import {
  CommonConfigurator,
  OrderEntryStatus,
} from '../../core/model/common-configurator.model';
import { CommonConfiguratorTestUtilsService } from '../../testing/common-configurator-test-utils.service';
import { ConfigureCartEntryComponent } from './configure-cart-entry.component';

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

describe('ConfigureCartEntryComponent', () => {
  let component: ConfigureCartEntryComponent;
  let fixture: ComponentFixture<ConfigureCartEntryComponent>;
  let htmlElem: HTMLElement;
  const configuratorType = 'type';
  const orderOrCartEntry: OrderEntry = {};

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, RouterTestingModule, RouterModule],
        declarations: [ConfigureCartEntryComponent, MockUrlPipe],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureCartEntryComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
    component.cartEntry = orderOrCartEntry;
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should find correct default owner type', () => {
    orderOrCartEntry.orderCode = undefined;
    expect(component.getOwnerType()).toBe(
      CommonConfigurator.OwnerType.CART_ENTRY
    );
  });

  it('should find correct owner type in case entry knows order', () => {
    component.readOnly = true;
    orderOrCartEntry.orderCode = '112';
    expect(component.getOwnerType()).toBe(
      CommonConfigurator.OwnerType.ORDER_ENTRY
    );
  });

  describe('getEntityKey', () => {
    it('should find correct entity key for cart entry', () => {
      component.cartEntry = { entryNumber: 0 };
      expect(component.getEntityKey()).toBe('0');
    });

    it('should throw error if entry number not present in entry', () => {
      component.cartEntry = {};
      expect(() => component.getEntityKey()).toThrowError();
    });

    it('should take order code into account in case entry is from order', () => {
      const orderCode = '01008765';
      component.cartEntry = { entryNumber: 0, orderCode: orderCode };
      expect(component.getEntityKey()).toBe(orderCode + '+0');
    });
  });

  it('should compile correct route for cart entry', () => {
    component.cartEntry = {
      entryNumber: 0,
      product: { configuratorType: configuratorType },
    };
    expect(component.getRoute()).toBe('configure' + configuratorType);
  });

  it('should compile correct route for order entry', () => {
    component.readOnly = true;
    component.cartEntry = {
      entryNumber: 0,
      product: { configuratorType: configuratorType },
    };
    expect(component.getRoute()).toBe('configureOverview' + configuratorType);
  });

  describe('getDisplayOnly', () => {
    it('should derive result from component if available', () => {
      component.readOnly = true;
      expect(component.getDisplayOnly()).toBe(true);
    });
  });

  it("should return 'false' for disabled when readOnly true", () => {
    component.readOnly = true;
    expect(component.isDisabled()).toBe(false);
  });

  it('should return disabled value when readOnly false', () => {
    component.readOnly = false;
    component.disabled = true;
    expect(component.isDisabled()).toBe(component.disabled);
  });

  describe('Link text', () => {
    it("should be 'Display Configuration' in case component is included in readOnly mode", () => {
      component.readOnly = true;
      component.cartEntry = {
        entryNumber: 0,
        product: { configuratorType: configuratorType },
      };
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'a',
        'configurator.header.displayConfiguration'
      );
    });

    it("should be 'Edit Configuration' in case component is included in edit mode", () => {
      component.readOnly = false;
      component.disabled = false;
      component.msgBanner = false;
      component.cartEntry = {
        entryNumber: 0,
        product: { configuratorType: configuratorType },
      };
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'a',
        'configurator.header.editConfiguration'
      );
    });

    it("should be 'Resolve Issues' in case component is used in banner", () => {
      component.readOnly = false;
      component.msgBanner = true;
      component.cartEntry = {
        entryNumber: 0,
        product: { configuratorType: configuratorType },
      };
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'a',
        'configurator.header.resolveIssues'
      );
    });
  });

  describe('a', () => {
    it('should be disabled in case corresponding component attribute is disabled', () => {
      component.disabled = true;
      component.cartEntry = {
        entryNumber: 0,
        product: { configuratorType: configuratorType },
      };
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'label.disabled-link'
      );

      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        'a.link'
      );
    });

    it('should be enabled in case corresponding component attribute is enabled', () => {
      component.disabled = false;
      component.cartEntry = {
        entryNumber: 0,
        product: { configuratorType: configuratorType },
      };
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'a.link'
      );

      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        'label.disabled-link'
      );
    });
  });

  describe('getResolveIssuesA11yDescription', () => {
    it("should return 'undefined' if the expected conditions are not met", () => {
      component.readOnly = true;
      component.msgBanner = true;
      component.cartEntry = {
        entryNumber: 0,
        product: { configuratorType: configuratorType },
      };
      fixture.detectChanges();
      expect(component.getResolveIssuesA11yDescription()).toBeUndefined();
    });

    it('should return ID for error message containing cart entry number for a HTML element if the expected conditions are met', () => {
      component.readOnly = false;
      component.msgBanner = true;
      component.cartEntry = {
        entryNumber: 0,
        product: { configuratorType: configuratorType },
      };
      fixture.detectChanges();
      expect(component.getResolveIssuesA11yDescription()).toEqual(
        'cx-error-msg-0'
      );
    });
  });

  describe('getQueryParams', () => {
    it('should set "forceReload" parameter', () => {
      expect(component.getQueryParams().forceReload).toBe(true);
    });
    it('should not set "resolveIssues" parameter in case no issues exist', () => {
      component.readOnly = false;
      component.msgBanner = false;
      component.cartEntry = {
        entryNumber: 0,
        product: { configuratorType: configuratorType },
        statusSummaryList: [],
      };
      expect(component.getQueryParams().resolveIssues).toBe(false);
    });
    it('should set "resolveIssues" parameter in case issues exist', () => {
      component.readOnly = false;
      component.msgBanner = true;
      component.cartEntry = {
        entryNumber: 0,
        product: { configuratorType: configuratorType },
        statusSummaryList: [
          { status: OrderEntryStatus.Error, numberOfIssues: 3 },
        ],
      };
      expect(component.getQueryParams().resolveIssues).toBe(true);
    });
    it('should not set "resolveIssues" parameter in case issues exist but component is not rendered in the context of the resolve issues banner', () => {
      component.readOnly = false;
      component.msgBanner = false;
      component.cartEntry = {
        entryNumber: 0,
        product: { configuratorType: configuratorType },
        statusSummaryList: [
          { status: OrderEntryStatus.Error, numberOfIssues: 3 },
        ],
      };
      expect(component.getQueryParams().resolveIssues).toBe(false);
    });
  });

  describe('Accessibility', () => {
    it('should contain link element with ID for error message containing cart entry number and aria-describedby attribute that refers to the corresponding resolve issue message', function () {
      component.readOnly = false;
      component.msgBanner = true;
      component.cartEntry = {
        entryNumber: 0,
        product: { configuratorType: configuratorType },
      };
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'a',
        'cx-action-link',
        undefined,
        'aria-describedby',
        'cx-error-msg-0'
      );
    });
  });
});
