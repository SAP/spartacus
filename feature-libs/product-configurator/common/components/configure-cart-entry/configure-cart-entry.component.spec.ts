import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AbstractOrderContext } from '@spartacus/cart/base/components';
import { AbstractOrderType, OrderEntry } from '@spartacus/cart/base/root';
import {
  I18nTestingModule,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { delay, take } from 'rxjs/operators';
import {
  CommonConfigurator,
  ConfiguratorType,
  OrderEntryStatus,
  ReadOnlyPostfix,
} from '../../core/model/common-configurator.model';
import { CommonConfiguratorTestUtilsService } from '../../testing/common-configurator-test-utils.service';
import { ConfigureCartEntryComponent } from './configure-cart-entry.component';

const orderCode = '01008765';
const savedCartCode = '0108336';
const quoteCode = '01008764';
const productCode = 'PRODUCT_CODE';

class MockAbstractOrderContext {
  key$ = of({ id: quoteCode, type: AbstractOrderType.QUOTE });
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

const mockRouterState: any = {
  state: {
    semanticRoute: 'home',
  },
};

let routerState: RouterState;

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return of(routerState);
  }
}

describe('ConfigureCartEntryComponent', () => {
  let component: ConfigureCartEntryComponent;
  let fixture: ComponentFixture<ConfigureCartEntryComponent>;
  let htmlElem: HTMLElement;
  const configuratorType = 'type';
  const orderOrCartEntry: OrderEntry = {};

  function configureTestingModule(): TestBed {
    routerState = mockRouterState;

    return TestBed.configureTestingModule({
      imports: [I18nTestingModule, RouterTestingModule, RouterModule],
      declarations: [ConfigureCartEntryComponent, MockUrlPipe],
      providers: [
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
      ],
    });
  }

  function assignTestArtifacts(): void {
    fixture = TestBed.createComponent(ConfigureCartEntryComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
    component.cartEntry = orderOrCartEntry;
  }

  describe('Without abstract order context', () => {
    beforeEach(() => {
      configureTestingModule().compileComponents();
      assignTestArtifacts();
    });

    it('should create component', () => {
      expect(component).toBeDefined();
    });

    describe('initialization', () => {
      it('should default abstractOrderKey to active cart in case context not provided', () => {
        fixture = TestBed.createComponent(ConfigureCartEntryComponent);
        component = fixture.componentInstance;
        expect(component.abstractOrderKey$).toBeObservable(
          cold('(a|)', { a: { type: AbstractOrderType.CART } })
        );
      });
    });
  });

  describe('getRoute', () => {
    beforeEach(() => {
      configureTestingModule().compileComponents();
      assignTestArtifacts();
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

    it('should compile correct route for read-only configurator type', () => {
      const readOnlyConfiguratorType = configuratorType + ReadOnlyPostfix;
      component.readOnly = true;
      component.cartEntry = {
        entryNumber: 0,
        product: { configuratorType: readOnlyConfiguratorType },
      };
      expect(component.getRoute()).toBe('configure' + readOnlyConfiguratorType);
    });
  });

  describe('getDisplayOnly', () => {
    it('should return true in case readOnly is true', () => {
      component.readOnly = true;
      expect(component.getDisplayOnly()).toBe(true);
    });

    it('should return true in case readOnly is false and product is undefined', () => {
      component.readOnly = false;
      component.cartEntry.product = {};
      expect(component.getDisplayOnly()).toBe(true);
    });

    it('should return true in case readOnly is false and configurator type is undefined', () => {
      component.readOnly = false;
      component.cartEntry.product = {
        configuratorType: undefined,
      };
      expect(component.getDisplayOnly()).toBe(true);
    });

    it('should return true in case readOnly is false and configurator type contains readOnly postfix', () => {
      component.readOnly = false;
      component.cartEntry.product = {
        configuratorType: ConfiguratorType.VARIANT + ReadOnlyPostfix,
      };
      expect(component.getDisplayOnly()).toBe(true);
    });

    it('should return false in case readOnly is false and configurator type is CPQCONFIGURATOR', () => {
      component.readOnly = false;
      component.cartEntry.product = {
        configuratorType: ConfiguratorType.VARIANT,
      };
      expect(component.getDisplayOnly()).toBe(false);
    });
  });

  describe('isInCheckout', () => {
    it('should return false in case the url does not contain checkoutReviewOrder', (done) => {
      component['isInCheckout']()
        .pipe(take(1), delay(0))
        .subscribe((isInCheckout) => {
          expect(isInCheckout).toBe(false);
          done();
        });
    });

    it('should return true in case the url contains checkoutReviewOrder in case one comes from the checkout', (done) => {
      mockRouterState.state.semanticRoute = 'checkoutReviewOrder';
      component['isInCheckout']()
        .pipe(take(1), delay(0))
        .subscribe((isInCheckout) => {
          expect(isInCheckout).toBe(true);
          done();
        });
    });
  });

  describe('With abstract order context', () => {
    beforeEach(() => {
      configureTestingModule()
        .overrideProvider(AbstractOrderContext, {
          useValue: new MockAbstractOrderContext(),
        })
        .compileComponents();
      assignTestArtifacts();
    });

    it('should create component', () => {
      expect(component).toBeDefined();
    });

    describe('initialization', () => {
      it('should provide abstractOrderKey from context', () => {
        expect(component.abstractOrderKey$).toBeObservable(
          cold('(a|)', { a: { id: quoteCode, type: AbstractOrderType.QUOTE } })
        );
      });
    });

    describe('getOwnerType', () => {
      it('should find correct default owner type', () => {
        expect(component.getOwnerType()).toBe(
          CommonConfigurator.OwnerType.CART_ENTRY
        );
      });

      it('should find correct owner type for entry belonging to order', () => {
        component.cartEntry.orderCode = orderCode;
        expect(component.getOwnerType()).toBe(
          CommonConfigurator.OwnerType.ORDER_ENTRY
        );
      });
    });

    describe('retrieveOwnerTypeFromAbstractOrderType', () => {
      it('should find correct owner type in case entry knows order', () => {
        component.readOnly = true;
        expect(
          component.retrieveOwnerTypeFromAbstractOrderType({
            type: AbstractOrderType.ORDER,
            id: orderCode,
          })
        ).toBe(CommonConfigurator.OwnerType.ORDER_ENTRY);
      });

      it('should find owner type quoteEntry in case entry is from quote', () => {
        component.readOnly = true;
        expect(
          component.retrieveOwnerTypeFromAbstractOrderType({
            type: AbstractOrderType.QUOTE,
            id: quoteCode,
          })
        ).toBe(CommonConfigurator.OwnerType.QUOTE_ENTRY);
      });

      it('should find correct owner type cartEntry in case entry is from cart', () => {
        expect(
          component.retrieveOwnerTypeFromAbstractOrderType({
            type: AbstractOrderType.CART,
          })
        ).toBe(CommonConfigurator.OwnerType.CART_ENTRY);
      });

      it('should find correct owner type saved cart entry in case entry is from saved cart', () => {
        component.readOnly = true;
        expect(
          component.retrieveOwnerTypeFromAbstractOrderType({
            type: AbstractOrderType.SAVED_CART,
            id: savedCartCode,
          })
        ).toBe(CommonConfigurator.OwnerType.SAVED_CART_ENTRY);
      });
    });

    describe('retrieveEntityKey', () => {
      it('should take order code into account in case entry is owned by order', () => {
        component.cartEntry = { entryNumber: 0 };
        expect(
          component.retrieveEntityKey({
            type: AbstractOrderType.ORDER,
            id: orderCode,
          })
        ).toBe(orderCode + '+0');
      });

      it('should take quote code into account in case entry is from quote', () => {
        component.cartEntry = { entryNumber: 0 };
        expect(
          component.retrieveEntityKey({
            type: AbstractOrderType.QUOTE,
            id: quoteCode,
          })
        ).toBe(quoteCode + '+0');
      });

      it('should find correct entity key for saved cart entry', () => {
        component.cartEntry = { entryNumber: 0 };

        expect(
          component.retrieveEntityKey({
            type: AbstractOrderType.SAVED_CART,
            id: savedCartCode,
          })
        ).toBe(savedCartCode + '+0');
      });

      it('should find correct entity key for active cart entry', () => {
        component.cartEntry = { entryNumber: 0 };

        expect(
          component.retrieveEntityKey({
            type: AbstractOrderType.CART,
          })
        ).toBe('0');
      });

      it('should throw error if entry number not present in entry', () => {
        component.cartEntry = {};
        expect(() =>
          component.retrieveEntityKey({
            type: AbstractOrderType.CART,
          })
        ).toThrowError();
      });
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

      it('should find correct entity key for order entry', () => {
        component.cartEntry = { entryNumber: 0, orderCode: orderCode };

        component.readOnly = true;
        expect(component.getEntityKey()).toBe(orderCode + '+0');
      });
    });

    describe('getDisplayOnly', () => {
      it('should derive result from component if available', () => {
        component.readOnly = true;
        expect(component.getDisplayOnly()).toBe(true);
      });
    });

    describe('isDisabled', () => {
      it("should return 'false' for disabled when readOnly true", () => {
        component.readOnly = true;
        expect(component.isDisabled()).toBe(false);
      });

      it('should return disabled value when readOnly false', () => {
        component.readOnly = false;
        component.disabled = true;
        expect(component.isDisabled()).toBe(component.disabled);
      });
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

      it('should set "navigateToCheckout" parameter in case the navigation to the cart is relevant', (done) => {
        mockRouterState.state.semanticRoute = 'checkoutReviewOrder';
        component.queryParams$
          .pipe(take(1), delay(0))
          .subscribe((queryParams) => {
            expect(queryParams.navigateToCheckout).toBe(true);
            done();
          });
      });

      it('should set "productCode" parameter in case product code is relevant', (done) => {
        component.cartEntry = {
          entryNumber: 0,
          product: { configuratorType: configuratorType, code: productCode },
        };
        fixture.detectChanges();
        component.queryParams$
          .pipe(take(1), delay(0))
          .subscribe((queryParams) => {
            expect(queryParams.productCode).toBe(productCode);
            done();
          });
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
});
