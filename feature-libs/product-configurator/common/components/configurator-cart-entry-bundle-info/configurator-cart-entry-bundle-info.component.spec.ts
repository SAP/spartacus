import {
  ChangeDetectorRef,
  Component,
  Input,
  Pipe,
  PipeTransform,
  Type,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ControlContainer, UntypedFormControl } from '@angular/forms';
import {
  CartItemContext,
  OrderEntry,
  PromotionLocation,
} from '@spartacus/cart/base/root';
import { I18nTestingModule } from '@spartacus/core';
import {
  CommonConfiguratorUtilsService,
  ConfigurationInfo,
  ConfiguratorCartEntryBundleInfoService,
  ConfiguratorType,
  LineItem,
} from '@spartacus/product-configurator/common';
import { BreakpointService } from '@spartacus/storefront';
import { BehaviorSubject, EMPTY, of, ReplaySubject } from 'rxjs';
import { take, toArray } from 'rxjs/operators';
import { CommonConfiguratorTestUtilsService } from '../../testing/common-configurator-test-utils.service';
import { ConfiguratorCartEntryBundleInfoComponent } from './configurator-cart-entry-bundle-info.component';

@Pipe({
  name: 'cxNumeric',
})
class MockNumericPipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

@Component({
  selector: 'cx-configure-cart-entry',
  template: '',
})
class MockConfigureCartEntryComponent {
  @Input() cartEntry: OrderEntry;
  @Input() readOnly: boolean;
  @Input() msgBanner: boolean;
  @Input() disabled: boolean;
}

class MockCartItemContext implements Partial<CartItemContext> {
  item$ = new ReplaySubject<OrderEntry>(1);
  readonly$ = new ReplaySubject<boolean>(1);
  quantityControl$ = new ReplaySubject<UntypedFormControl>(1);
  location$ = new BehaviorSubject<PromotionLocation>(
    PromotionLocation.SaveForLater
  );
}

const configurationInfos: ConfigurationInfo[] = [
  {
    configurationLabel: 'Canon ABC',
    configurationValue: '5 x $1,000.00',
    configuratorType: ConfiguratorType.CPQ,
    status: 'SUCCESS',
  },
  {
    configurationLabel: 'Canon DEF',
    configurationValue: '10',
    configuratorType: ConfiguratorType.CPQ,
    status: 'SUCCESS',
  },
  {
    configurationLabel: 'Canon HJZ',
    configurationValue: '$1,000.00',
    configuratorType: ConfiguratorType.CPQ,
    status: 'SUCCESS',
  },
];

const entry: OrderEntry = {
  configurationInfos: configurationInfos,
};

function setConfiguratorTypeIntoFirstConfigInfo(
  orderEntry: OrderEntry,
  configuratorType: string
) {
  const configInfos = orderEntry.configurationInfos;
  if (configInfos && configInfos[0]) {
    configInfos[0].configuratorType = configuratorType;
  }
}

fdescribe('ConfiguratorCartEntryBundleInfoComponent', () => {
  let component: ConfiguratorCartEntryBundleInfoComponent;
  let fixture: ComponentFixture<ConfiguratorCartEntryBundleInfoComponent>;
  let changeDetectorRef: ChangeDetectorRef;
  let htmlElem: HTMLElement;
  let mockCartItemContext: MockCartItemContext;
  let commonConfigUtilsService: CommonConfiguratorUtilsService;
  let configCartEntryBundleInfoService: ConfiguratorCartEntryBundleInfoService;
  let breakpointService: BreakpointService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        ConfiguratorCartEntryBundleInfoComponent,
        MockNumericPipe,
        MockConfigureCartEntryComponent,
      ],
      providers: [
        { provide: CartItemContext, useClass: MockCartItemContext },
        {
          provide: ControlContainer,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    commonConfigUtilsService = TestBed.inject(
      CommonConfiguratorUtilsService as Type<CommonConfiguratorUtilsService>
    );
    configCartEntryBundleInfoService = TestBed.inject(
      ConfiguratorCartEntryBundleInfoService as Type<ConfiguratorCartEntryBundleInfoService>
    );

    spyOn(
      commonConfigUtilsService,
      'isBundleBasedConfigurator'
    ).and.callThrough();
    spyOn(
      configCartEntryBundleInfoService,
      'retrieveLineItems'
    ).and.callThrough();

    breakpointService = TestBed.inject(
      BreakpointService as Type<BreakpointService>
    );

    fixture = TestBed.createComponent(ConfiguratorCartEntryBundleInfoComponent);
    changeDetectorRef = fixture.componentRef.injector.get(ChangeDetectorRef);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
    mockCartItemContext = TestBed.inject(CartItemContext) as any;

    fixture.detectChanges();
  });

  afterEach(() => {
    // Reset the fixture
    if(fixture) {
      fixture.destroy();
      fixture = null as any as ComponentFixture<ConfiguratorCartEntryBundleInfoComponent>;
    }

    // Reset the component instance
    component = null as any as ConfiguratorCartEntryBundleInfoComponent;
    changeDetectorRef = null as any as ChangeDetectorRef;
    htmlElem = null as any as HTMLElement;

    // Reset any services or mocks
    mockCartItemContext = null as any as MockCartItemContext;
    commonConfigUtilsService = null  as any as CommonConfiguratorUtilsService;
    configCartEntryBundleInfoService = null as any as ConfiguratorCartEntryBundleInfoService;
    breakpointService = null as any as BreakpointService;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose orderEntry$', (done) => {
    const orderEntry: OrderEntry = { orderCode: '123' };
    component.orderEntry$.pipe(take(1)).subscribe((value) => {
      expect(value).toBe(orderEntry);
      done();
    });

    mockCartItemContext.item$.next(orderEntry);
  });

  it('should expose quantityControl$', (done) => {
    const quantityControl = new UntypedFormControl();
    component.quantityControl$.pipe(take(1)).subscribe((value) => {
      expect(value).toBe(quantityControl);
      done();
    });

    mockCartItemContext.quantityControl$.next(quantityControl);
  });

  it('should expose readonly$', (done) => {
    component.readonly$.pipe(take(2), toArray()).subscribe((values) => {
      expect(values).toEqual([true, false]);
      done();
    });

    mockCartItemContext.readonly$.next(true);
    mockCartItemContext.readonly$.next(false);
  });

  describe('bundle info for cart entry', () => {
    it('should not be displayed if model provides empty array', () => {
      mockCartItemContext.item$.next({
        statusSummaryList: undefined,
        configurationInfos: [
          {
            configuratorType: 'ANOTHERCPQCONFIGURATOR',
          },
        ],
      });
      mockCartItemContext.readonly$.next(false);
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-item-infos'
      );
    });

    it('should be displayed if model provides a success entry', () => {
      mockCartItemContext.item$.next({
        statusSummaryList: undefined,
        configurationInfos: [
          {
            configurationLabel: 'Color',
            configurationValue: 'Blue',
            configuratorType: ConfiguratorType.CPQ,
            status: 'SUCCESS',
          },
        ],
      });
      mockCartItemContext.readonly$.next(false);
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-item-infos'
      );
    });

    it('should be displayed if model provides a warning entry', () => {
      mockCartItemContext.item$.next({
        statusSummaryList: undefined,
        configurationInfos: [
          {
            configurationLabel: 'Pricing',
            configurationValue: 'could not be carried out',
            configuratorType: ConfiguratorType.CPQ,
            status: 'WARNING',
          },
        ],
      });
      mockCartItemContext.readonly$.next(false);

      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-item-infos'
      );
    });
  });

  describe('toggleItems', () => {
    it('should return corresponding state after toggling the link show / hide items', () => {
      expect(component.hideItems).toBe(true);
      component.toggleItems();
      changeDetectorRef.detectChanges();
      expect(component.hideItems).toBe(false);
      component.toggleItems();
      changeDetectorRef.detectChanges();
      expect(component.hideItems).toBe(true);
    });
  });

  describe('isBundleBasedConfigurator', () => {
    it('should return false because the configurator type is not bundle based one', () => {
      setConfiguratorTypeIntoFirstConfigInfo(
        entry,
        'notBundleBasedConfiguratorType'
      );

      fixture.detectChanges();
      expect(component.isBundleBasedConfigurator(entry)).toBe(false);
    });

    it('should return true because the configurator type is a bundle based one', () => {
      setConfiguratorTypeIntoFirstConfigInfo(entry, ConfiguratorType.CPQ);

      fixture.detectChanges();
      expect(component.isBundleBasedConfigurator(entry)).toBe(true);
    });

    it('should return false in case no configuration infos are available', () => {
      const entryWoConfigInfo: OrderEntry = {};
      fixture.detectChanges();
      expect(component.isBundleBasedConfigurator(entryWoConfigInfo)).toBe(
        false
      );
    });
  });

  describe('check component structure', () => {
    describe('without any line item information', () => {
      beforeEach(() => {
        mockCartItemContext.item$.next({
          statusSummaryList: undefined,
          configurationInfos: [],
          product: {
            configurable: true,
          },
        });
        mockCartItemContext.location$.next(PromotionLocation.ActiveCart);
        mockCartItemContext.readonly$.next(false);
        mockCartItemContext.quantityControl$.next(new UntypedFormControl());
        fixture.detectChanges();
      });

      it('should not display number of bundle items', (done) => {
        let numberOfItems: number = 0;
        component.numberOfLineItems$.subscribe(
          (value) => {
            (numberOfItems = value);
            done();
          }
        );
        expect(numberOfItems).toBe(0);

        CommonConfiguratorTestUtilsService.expectElementNotPresent(
          expect,
          htmlElem,
          '#cx-number-items'
        );
      });

      it('should not display toggle link', () => {
        CommonConfiguratorTestUtilsService.expectElementNotPresent(
          expect,
          htmlElem,
          '.cx-toggle-hide-items'
        );
      });

      it('should not display Edit Configuration link', () => {
        CommonConfiguratorTestUtilsService.expectElementNotPresent(
          expect,
          htmlElem,
          'cx-configure-cart-entry'
        );
      });
    });

    describe('with line item information', () => {
      beforeEach(() => {
        mockCartItemContext.item$.next({
          statusSummaryList: undefined,
          configurationInfos: configurationInfos,
          product: {
            configurable: true,
          },
        });
        mockCartItemContext.location$.next(PromotionLocation.ActiveCart);
        mockCartItemContext.readonly$.next(false);
        mockCartItemContext.quantityControl$.next(new UntypedFormControl());
        fixture.detectChanges();
      });

      it('should display number of bundle items', (done) => {
        let numberOfItems: number = 0;
        component.numberOfLineItems$.subscribe(
          (value) => {
            (numberOfItems = value);
            done();
          }
        );
        expect(numberOfItems).toBe(configurationInfos?.length);
        fixture.detectChanges();

        CommonConfiguratorTestUtilsService.expectElementPresent(
          expect,
          htmlElem,
          '.cx-number-items'
        );

        const expectedText = 'configurator.header.items count:' + numberOfItems;

        CommonConfiguratorTestUtilsService.expectElementToContainText(
          expect,
          htmlElem,
          '.cx-number-items',
          expectedText
        );
      });

      it('should display toggle link', () => {
        CommonConfiguratorTestUtilsService.expectElementPresent(
          expect,
          htmlElem,
          '.cx-toggle-hide-items'
        );

        CommonConfiguratorTestUtilsService.expectElementToContainText(
          expect,
          htmlElem,
          '.cx-toggle-hide-items',
          'configurator.header.show'
        );

        expect(component.hideItems).toBe(true);
        component.toggleItems();
        changeDetectorRef.detectChanges();
        expect(component.hideItems).toBe(false);

        CommonConfiguratorTestUtilsService.expectElementToContainText(
          expect,
          htmlElem,
          '.cx-toggle-hide-items',
          'configurator.header.hide'
        );
      });

      it('should display Edit Configuration link', () => {
        CommonConfiguratorTestUtilsService.expectElementPresent(
          expect,
          htmlElem,
          'cx-configure-cart-entry'
        );
      });
    });

    describe('cart entry bundle info with price and quantity', () => {
      beforeEach(() => {
        mockCartItemContext.item$.next({
          statusSummaryList: undefined,
          configurationInfos: [
            {
              configurationLabel: 'Canon ABC',
              configurationValue: '5 x $1,000.00',
              configuratorType: ConfiguratorType.CPQ,
              status: 'SUCCESS',
            },
          ],
          product: {
            configurable: true,
          },
        });
        mockCartItemContext.readonly$.next(false);
        mockCartItemContext.quantityControl$.next(new UntypedFormControl());
        component.hideItems = false;
        fixture.detectChanges();
      });

      it('should display', () => {
        spyOn(breakpointService, 'isUp').and.returnValue(of(false));
        fixture.detectChanges();
        CommonConfiguratorTestUtilsService.expectElementPresent(
          expect,
          htmlElem,
          '.cx-item-infos.open'
        );

        CommonConfiguratorTestUtilsService.expectNumberOfElements(
          expect,
          htmlElem,
          '.cx-item-info',
          1
        );

        CommonConfiguratorTestUtilsService.expectNumberOfElements(
          expect,
          htmlElem,
          '.cx-item-quantity span.cx-identifier',
          1
        );

        CommonConfiguratorTestUtilsService.expectElementToContainText(
          expect,
          htmlElem,
          '.cx-item-quantity span.cx-identifier',
          'configurator.attribute.quantity'
        );

        CommonConfiguratorTestUtilsService.expectNumberOfElements(
          expect,
          htmlElem,
          '.cx-item-quantity span.cx-item',
          1
        );

        CommonConfiguratorTestUtilsService.expectElementToContainText(
          expect,
          htmlElem,
          '.cx-item-quantity span.cx-item',
          '5'
        );

        CommonConfiguratorTestUtilsService.expectNumberOfElements(
          expect,
          htmlElem,
          '.cx-item-price span.cx-identifier',
          1
        );

        CommonConfiguratorTestUtilsService.expectElementToContainText(
          expect,
          htmlElem,
          '.cx-item-price span.cx-identifier',
          'configurator.overviewForm.itemPrice'
        );

        CommonConfiguratorTestUtilsService.expectNumberOfElements(
          expect,
          htmlElem,
          '.cx-item-price span.cx-item',
          1
        );

        CommonConfiguratorTestUtilsService.expectElementToContainText(
          expect,
          htmlElem,
          '.cx-item-price span.cx-item',
          '$1,000.00'
        );
      });
    });

    describe('cart entry bundle info with only quantity', () => {
      beforeEach(() => {
        mockCartItemContext.item$.next({
          statusSummaryList: undefined,
          configurationInfos: [
            {
              configurationLabel: 'Canon ABC',
              configurationValue: '10',
              configuratorType: ConfiguratorType.CPQ,
              status: 'SUCCESS',
            },
          ],
          product: {
            configurable: true,
          },
        });
        mockCartItemContext.readonly$.next(false);
        mockCartItemContext.quantityControl$.next(new UntypedFormControl());
        component.hideItems = false;
        fixture.detectChanges();
      });

      it('should display', () => {
        spyOn(breakpointService, 'isUp').and.returnValue(of(false));
        CommonConfiguratorTestUtilsService.expectElementPresent(
          expect,
          htmlElem,
          '.cx-item-infos.open'
        );

        CommonConfiguratorTestUtilsService.expectNumberOfElements(
          expect,
          htmlElem,
          '.cx-item-info',
          1
        );

        CommonConfiguratorTestUtilsService.expectNumberOfElements(
          expect,
          htmlElem,
          '.cx-item-price span.cx-identifier',
          0
        );

        CommonConfiguratorTestUtilsService.expectNumberOfElements(
          expect,
          htmlElem,
          '.cx-item-price span.cx-item',
          0
        );

        CommonConfiguratorTestUtilsService.expectNumberOfElements(
          expect,
          htmlElem,
          '.cx-item-quantity span.cx-identifier',
          1
        );

        CommonConfiguratorTestUtilsService.expectElementToContainText(
          expect,
          htmlElem,
          '.cx-item-quantity span.cx-identifier',
          'configurator.attribute.quantity'
        );

        CommonConfiguratorTestUtilsService.expectNumberOfElements(
          expect,
          htmlElem,
          '.cx-item-quantity span.cx-item',
          1
        );

        CommonConfiguratorTestUtilsService.expectElementToContainText(
          expect,
          htmlElem,
          '.cx-item-quantity span.cx-item',
          '10'
        );
      });
    });

    describe('shouldShowButton', () => {
      beforeEach(() => {
        const quantityControl = new UntypedFormControl();
        mockCartItemContext.quantityControl$?.next(quantityControl);
        mockCartItemContext.item$?.next({
          product: { configurable: true },
          configurationInfos: [
            {
              configurationLabel: 'Canon ABC',
              configurationValue: '10',
              configuratorType: ConfiguratorType.CPQ,
              status: 'SUCCESS',
            },
          ],
        });
      });

      describe('readonly$', () => {
        beforeEach(() => {
          mockCartItemContext.location$.next(PromotionLocation.ActiveCart);
        });

        it('should expose readonly$ as false in case readonly$ is undefined', () => {
          mockCartItemContext.readonly$?.next(undefined);
          fixture.detectChanges();
          const element = CommonConfiguratorTestUtilsService.getHTMLElement(
            htmlElem,
            'cx-configure-cart-entry'
          );

          expect(element?.hasAttribute('ng-reflect-read-only')).toBe(true);
          expect(element?.getAttribute('ng-reflect-read-only')).toBe('false');
        });

        it('should expose readonly$ as false in case readonly$ is null', () => {
          mockCartItemContext.readonly$?.next(null);
          fixture.detectChanges();
          const element = CommonConfiguratorTestUtilsService.getHTMLElement(
            htmlElem,
            'cx-configure-cart-entry'
          );

          expect(element?.hasAttribute('ng-reflect-read-only')).toBe(true);
          expect(element?.getAttribute('ng-reflect-read-only')).toBe('false');
        });

        it('should expose readonly$ as false in case readonly$ is false', () => {
          mockCartItemContext.readonly$?.next(false);
          fixture.detectChanges();
          const element = CommonConfiguratorTestUtilsService.getHTMLElement(
            htmlElem,
            'cx-configure-cart-entry'
          );

          expect(element?.hasAttribute('ng-reflect-read-only')).toBe(true);
          expect(element?.getAttribute('ng-reflect-read-only')).toBe('false');
        });

        it('should expose readonly$ as true in case readonly$ is true', () => {
          mockCartItemContext.readonly$?.next(true);
          fixture.detectChanges();
          const element = CommonConfiguratorTestUtilsService.getHTMLElement(
            htmlElem,
            'cx-configure-cart-entry'
          );

          expect(element?.hasAttribute('ng-reflect-read-only')).toBe(true);
          expect(element?.getAttribute('ng-reflect-read-only')).toBe('true');
        });
      });

      it('should prevent the rendering of "edit configuration" if context is SaveForLater', () => {
        mockCartItemContext.location$?.next(PromotionLocation.SaveForLater);
        fixture.detectChanges();

        const htmlElementAfterChanges = fixture.nativeElement;
        expect(
          htmlElementAfterChanges.querySelectorAll('.cx-configure-cart-entry')
            .length
        ).toBe(0);
      });

      it('should allow the rendering of "edit configuration" if context is active cart', () => {
        mockCartItemContext.location$?.next(PromotionLocation.ActiveCart);

        fixture.detectChanges();

        const htmlElementAfterChanges = fixture.nativeElement;
        expect(
          htmlElementAfterChanges.querySelectorAll('cx-configure-cart-entry')
            .length
        ).toBe(1);
      });
    });

    describe('getButtonText', () => {
      it("should return 'configurator.header.show' in case items are hidden", () => {
        component.hideItems = true;
        fixture.detectChanges();
        expect(
          component.getButtonText().indexOf('configurator.header.show')
        ).toBe(0);
      });

      it("should return 'configurator.header.hide' in case items are shown", () => {
        component.hideItems = false;
        fixture.detectChanges();
        expect(
          component.getButtonText().indexOf('configurator.header.hide')
        ).toBe(0);
      });
    });

    describe('getItemsMsg', () => {
      it("should return 'configurator.a11y.cartEntryBundleInfo' if there is only one line item", () => {
        let numberOfItems: number = 1;
        expect(
          component
            .getItemsMsg(numberOfItems)
            .indexOf('configurator.a11y.cartEntryBundleInfo items:1')
        ).toBe(0);
      });

      it("should return 'configurator.a11y.cartEntryBundleInfo_other' if there are more than one line item", () => {
        let numberOfItems: number = 4;
        expect(
          component
            .getItemsMsg(numberOfItems)
            .indexOf('configurator.a11y.cartEntryBundleInfo items:4')
        ).toBe(0);
      });
    });

    describe('getHiddenItemInfo', () => {
      it("should return 'configurator.a11y.cartEntryBundleInfo' if the item name, price and quantity are defined", () => {
        let lineItem: LineItem = {
          name: 'Canon ABC',
          formattedPrice: '$1,000.00',
          formattedQuantity: '5',
        };
        expect(
          component
            .getHiddenItemInfo(lineItem)
            .indexOf('configurator.a11y.cartEntryBundle')
        ).toBe(0);
      });

      it("should return 'configurator.a11y.cartEntryBundleNameWithPrice' if the item name and price are defined", () => {
        let lineItem: LineItem = {
          name: 'Canon ABC',
          formattedPrice: '$1,000.00',
        };
        expect(
          component
            .getHiddenItemInfo(lineItem)
            .indexOf('configurator.a11y.cartEntryBundleNameWithPrice')
        ).toBe(0);
      });

      it("should return 'configurator.a11y.cartEntryBundleNameWithQuantity' if the item name and quantity are defined", () => {
        let lineItem: LineItem = {
          name: 'Canon ABC',
          formattedQuantity: '5',
        };
        expect(
          component
            .getHiddenItemInfo(lineItem)
            .indexOf('configurator.a11y.cartEntryBundleNameWithQuantity')
        ).toBe(0);
      });

      it("should return 'configurator.a11y.cartEntryBundleName' if only item name is defined", () => {
        let lineItem: LineItem = {
          name: 'Canon ABC',
        };
        expect(
          component
            .getHiddenItemInfo(lineItem)
            .indexOf('configurator.a11y.cartEntryBundleName')
        ).toBe(0);
      });
    });

    describe('Accessibility', () => {
      beforeEach(() => {
        mockCartItemContext.item$.next({
          statusSummaryList: undefined,
          configurationInfos: [
            {
              configurationLabel: 'Canon ABC',
              configurationValue: '5 x $1,000.00',
              configuratorType: ConfiguratorType.CPQ,
              status: 'SUCCESS',
            },
          ],
          product: {
            configurable: true,
          },
        });
        mockCartItemContext.readonly$.next(false);
        mockCartItemContext.quantityControl$.next(new UntypedFormControl());
        component.hideItems = false;
        spyOn(breakpointService, 'isUp').and.returnValue(of(true));
        fixture.detectChanges();
      });

      it("should contain div element with class name 'cx-number-items' that displays the number of line items", () => {
        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'div',
          'cx-number-items',
          undefined,
          undefined,
          undefined,
          'configurator.header.items'
        );
      });

      it("should contain 'hide' button with class name 'aria-label' that overwrites the button content", () => {
        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'button',
          undefined,
          undefined,
          'aria-label',
          'configurator.a11y.cartEntryBundleInfo items:1configurator.header.hide'
        );

        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'div',
          'cx-toggle-hide-items',
          undefined,
          undefined,
          undefined,
          'configurator.header.hide'
        );
      });

      it("should contain div element with class name 'cx-item-info' and aria-describedby attribute", () => {
        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'div',
          'cx-item-info',
          undefined,
          'aria-describedby',
          'cx-item-hidden-info-0'
        );
      });

      it("should contain span element with class name 'cx-visually-hidden' and a hidden line item information", () => {
        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'span',
          'cx-visually-hidden',
          undefined,
          undefined,
          undefined,
          'configurator.a11y.cartEntryBundle'
        );
      });

      it("should contain div element with class name 'cx-item-name' and aria-hidden attribute that displays an item name", () => {
        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'div',
          'cx-item-name',
          undefined,
          'aria-hidden',
          'true',
          'Canon ABC'
        );
      });

      it("should contain div element with class name 'cx-item-price' and aria-hidden attribute that displays an item price", () => {
        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'div',
          'cx-item-price',
          undefined,
          'aria-hidden',
          'true'
        );
      });

      it("should contain span element with class name 'cx-item' and price content", () => {
        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'span',
          'cx-item',
          1,
          undefined,
          undefined,
          '$1,000.00'
        );
      });

      it("should contain div element with class name 'cx-item-quantity' and aria-hidden attribute that displays an item quantity", () => {
        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'div',
          'cx-item-quantity',
          undefined,
          'aria-hidden',
          'true'
        );
      });

      it("should contain span element with class name 'cx-item' and quantity content", () => {
        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'span',
          'cx-item',
          0,
          undefined,
          undefined,
          '5'
        );
      });
    });

    describe('getHiddenItemInfoId', () => {
      it("should return 'cx-item-hidden-info-4' ID for a corresponding line item", () => {
        expect(
          component.getHiddenItemInfoId(4).indexOf('cx-item-hidden-info-4')
        ).toBe(0);
      });
    });
  });
});

describe('ConfiguratorCartEntryBundleInfoComponent without cart item context', () => {
  let component: ConfiguratorCartEntryBundleInfoComponent;
  let fixture: ComponentFixture<ConfiguratorCartEntryBundleInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [ConfiguratorCartEntryBundleInfoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorCartEntryBundleInfoComponent);
    component = fixture.componentInstance;
  });

  it('should contain empty observables for orderEntry, quantityControl and readOnly', () => {
    expect(component).toBeTruthy();
    expect(component.orderEntry$).toBe(EMPTY);
    expect(component.quantityControl$).toBe(EMPTY);
    expect(component.readonly$).toBe(EMPTY);
  });
});
