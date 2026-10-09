import {
  ChangeDetectorRef,
  Component,
  Input,
  Pipe,
  PipeTransform,
  Type,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, UntypedFormControl } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import {
  CartItemContext,
  OrderEntry,
  PromotionLocation,
} from '@spartacus/cart/base/root';
import {
  CxDatePipe,
  CxNumericPipe,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  Product,
  ProductService,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import {
  MockFeatureTogglesController,
  provideMockFeatureToggles,
} from 'core-libs/core/src/features-config/feature-toggles/testing';
import {
  CommonConfiguratorUtilsService,
  ConfigurationInfo,
  ConfiguratorCartEntryBundleInfoService,
  ConfiguratorProductScope,
  ConfiguratorType,
  ConfigureCartEntryComponent,
  LineItem,
} from '@spartacus/product-configurator/common';
import { BreakpointService } from '@spartacus/storefront';
import {
  BehaviorSubject,
  EMPTY,
  firstValueFrom,
  Observable,
  of,
  ReplaySubject,
  throwError,
} from 'rxjs';
import { take, toArray } from 'rxjs/operators';
import { CommonConfiguratorTestUtilsService } from '../../testing/common-configurator-test-utils.service';
import { CommonConfiguratorUISettingsConfig } from '../config/common-configurator-ui-settings.config';
import { ConfiguratorCartEntryBundleInfoComponent } from './configurator-cart-entry-bundle-info.component';

@Pipe({ name: 'cxNumeric' })
class MockNumericPipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

@Pipe({ name: 'cxUrl' })
class MockUrlPipe implements PipeTransform {
  transform(): string {
    return '';
  }
}

class MockProductService implements Partial<ProductService> {
  get(): Observable<Product | undefined> {
    return of(undefined);
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
  @Input() isBundleOverviewLink = false;
  @Input() rowId?: string;
  @Input() a11yDescriptionId?: string;
  @Input() productName?: string;
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

describe('ConfiguratorCartEntryBundleInfoComponent', () => {
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
      imports: [
        ConfiguratorCartEntryBundleInfoComponent,
        I18nTestingModule,
        RouterModule.forRoot([]),
        MockUrlPipe,
      ],
      providers: [
        { provide: CartItemContext, useClass: MockCartItemContext },
        {
          provide: ControlContainer,
        },
        { provide: ProductService, useClass: MockProductService },
        ...provideMockFeatureToggles({
          productConfiguratorCPQContainer: false,
        }),
      ],
    })
      .overrideComponent(ConfiguratorCartEntryBundleInfoComponent, {
        remove: {
          imports: [
            TranslatePipe,
            CxDatePipe,
            CxNumericPipe,
            ConfigureCartEntryComponent,
            UrlPipe,
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockNumericPipe,
            MockConfigureCartEntryComponent,
            MockUrlPipe,
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    commonConfigUtilsService = TestBed.inject(
      CommonConfiguratorUtilsService as Type<CommonConfiguratorUtilsService>
    );
    configCartEntryBundleInfoService = TestBed.inject(
      ConfiguratorCartEntryBundleInfoService as Type<ConfiguratorCartEntryBundleInfoService>
    );

    vi.spyOn(commonConfigUtilsService, 'isBundleBasedConfigurator');
    vi.spyOn(configCartEntryBundleInfoService, 'retrieveLineItems');

    breakpointService = TestBed.inject(
      BreakpointService as Type<BreakpointService>
    );

    fixture = TestBed.createComponent(ConfiguratorCartEntryBundleInfoComponent);
    changeDetectorRef = fixture.componentRef.injector.get(ChangeDetectorRef);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
    mockCartItemContext = TestBed.inject(CartItemContext) as any;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should expose orderEntry$', async () => {
    fixture.detectChanges();
    const orderEntry: OrderEntry = { orderCode: '123' };
    component.orderEntry$.pipe(take(1)).subscribe((value) => {
      expect(value).toBe(orderEntry);
    });

    mockCartItemContext.item$.next(orderEntry);
  });

  it('should expose quantityControl$', async () => {
    fixture.detectChanges();
    const quantityControl = new UntypedFormControl();
    component.quantityControl$.pipe(take(1)).subscribe((value) => {
      expect(value).toBe(quantityControl);
    });

    mockCartItemContext.quantityControl$.next(quantityControl);
  });

  it('should expose readonly$', async () => {
    fixture.detectChanges();
    component.readonly$.pipe(take(2), toArray()).subscribe((values) => {
      expect(values).toEqual([true, false]);
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
      fixture.detectChanges();
      expect(component.hideItems).toBe(true);
      component.toggleItems();
      expect(component.hideItems).toBe(false);
      component.toggleItems();
      expect(component.hideItems).toBe(true);
    });

    it('should retain focus on the toggle button after expanding and collapsing', async () => {
      const button = document.createElement('button');
      document.body.appendChild(button);
      button.focus();
      component['toggleItemsButton'] = { nativeElement: button };

      component.toggleItems();
      await Promise.resolve();
      expect(document.activeElement).toBe(button);

      component.toggleItems();
      await Promise.resolve();
      expect(document.activeElement).toBe(button);

      document.body.removeChild(button);
    });
  });

  describe('isBundleBasedConfigurator', () => {
    it('should return false because the configurator type is not bundle based one', () => {
      let clonedEntry = structuredClone(entry);
      setConfiguratorTypeIntoFirstConfigInfo(
        clonedEntry,
        'notBundleBasedConfiguratorType'
      );

      fixture.detectChanges();
      expect(component.isBundleBasedConfigurator(clonedEntry)).toBe(false);
    });

    it('should return true because the configurator type is a bundle based one', () => {
      let clonedEntry = structuredClone(entry);
      setConfiguratorTypeIntoFirstConfigInfo(clonedEntry, ConfiguratorType.CPQ);

      fixture.detectChanges();
      expect(component.isBundleBasedConfigurator(clonedEntry)).toBe(true);
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

      it('should not display number of bundle items', () => {
        let numberOfItems: number = 0;
        component.numberOfLineItems$.subscribe(
          (value) => (numberOfItems = value)
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

      it('should display number of bundle items', async () => {
        component.numberOfLineItems$.subscribe((numberOfItems) => {
          expect(numberOfItems).toBe(3);
        });
        CommonConfiguratorTestUtilsService.expectElementPresent(
          expect,
          htmlElem,
          '.cx-number-items'
        );

        const expectedText = 'configurator.header.items count:3';

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

      it('should mark line items as inert and aria-hidden while collapsed', () => {
        const itemInfos = htmlElem.querySelector('.cx-item-infos');

        expect(itemInfos?.getAttribute('inert')).not.toBeNull();
        expect(itemInfos?.getAttribute('aria-hidden')).toBe('true');
      });

      it('should expose line items to keyboard focus when expanded', () => {
        component.toggleItems();
        changeDetectorRef.detectChanges();

        const itemInfos = htmlElem.querySelector('.cx-item-infos');

        expect(itemInfos?.hasAttribute('inert')).toBe(false);
        expect(itemInfos?.hasAttribute('aria-hidden')).toBe(false);
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
        vi.spyOn(breakpointService, 'isUp').mockReturnValue(of(false));
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
        vi.spyOn(breakpointService, 'isUp').mockReturnValue(of(false));
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
          (
            mockCartItemContext.readonly$ as ReplaySubject<
              boolean | null | undefined
            >
          ).next(undefined);
          fixture.detectChanges();
          const component = fixture.debugElement.query(
            By.css('cx-configure-cart-entry')
          ).componentInstance;

          expect(component.readOnly).toBe(false);
        });

        it('should expose readonly$ as false in case readonly$ is null', () => {
          (
            mockCartItemContext.readonly$ as ReplaySubject<
              boolean | null | undefined
            >
          ).next(null);
          fixture.detectChanges();
          const component = fixture.debugElement.query(
            By.css('cx-configure-cart-entry')
          ).componentInstance;

          expect(component.readOnly).toBe(false);
        });

        it('should expose readonly$ as false in case readonly$ is false', () => {
          mockCartItemContext.readonly$?.next(false);
          fixture.detectChanges();
          const component = fixture.debugElement.query(
            By.css('cx-configure-cart-entry')
          ).componentInstance;

          expect(component.readOnly).toBe(false);
        });

        it('should expose readonly$ as true in case readonly$ is true', () => {
          mockCartItemContext.readonly$?.next(true);
          fixture.detectChanges();
          const component = fixture.debugElement.query(
            By.css('cx-configure-cart-entry')
          ).componentInstance;

          expect(component.readOnly).toBe(true);
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
        fixture.detectChanges();
        let numberOfItems: number = 1;
        expect(
          component
            .getItemsMsg(numberOfItems)
            .indexOf('configurator.a11y.cartEntryBundleInfo count:1 items:1')
        ).toBe(0);
      });

      it("should return 'configurator.a11y.cartEntryBundleInfo_other' if there are more than one line item", () => {
        fixture.detectChanges();
        let numberOfItems: number = 4;
        expect(
          component
            .getItemsMsg(numberOfItems)
            .indexOf('configurator.a11y.cartEntryBundleInfo count:4 items:4')
        ).toBe(0);
      });
    });

    describe('getHiddenItemInfo', () => {
      it("should return 'configurator.a11y.cartEntryBundlePriceAndQuantity' if the item price and quantity are defined", () => {
        fixture.detectChanges();
        let lineItem: LineItem = {
          name: 'Canon ABC',
          formattedPrice: '$1,000.00',
          formattedQuantity: '5',
        };
        expect(
          component
            .getHiddenItemInfo(lineItem)
            .indexOf('configurator.a11y.cartEntryBundlePriceAndQuantity')
        ).toBe(0);
      });

      it("should return 'configurator.a11y.cartEntryBundlePrice' if only the item price is defined", () => {
        fixture.detectChanges();
        let lineItem: LineItem = {
          name: 'Canon ABC',
          formattedPrice: '$1,000.00',
        };
        expect(
          component
            .getHiddenItemInfo(lineItem)
            .indexOf('configurator.a11y.cartEntryBundlePrice')
        ).toBe(0);
      });

      it("should return 'configurator.a11y.cartEntryBundleQuantity' if only the item quantity is defined", () => {
        fixture.detectChanges();
        let lineItem: LineItem = {
          name: 'Canon ABC',
          formattedQuantity: '5',
        };
        expect(
          component
            .getHiddenItemInfo(lineItem)
            .indexOf('configurator.a11y.cartEntryBundleQuantity')
        ).toBe(0);
      });

      it('should not repeat the item name, which is rendered as visible text', () => {
        fixture.detectChanges();
        let lineItem: LineItem = {
          name: 'Canon ABC',
          formattedPrice: '$1,000.00',
          formattedQuantity: '5',
        };
        expect(component.getHiddenItemInfo(lineItem)).not.toContain(
          'Canon ABC'
        );
      });

      it('should return an empty text if neither price nor quantity is defined', () => {
        fixture.detectChanges();
        let lineItem: LineItem = {
          name: 'Canon ABC',
        };
        expect(component.getHiddenItemInfo(lineItem)).toBe('');
      });
    });

    describe('Accessibility', () => {
      beforeEach(() => {
        mockCartItemContext.item$.next({
          entryNumber: 1,
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
        vi.spyOn(breakpointService, 'isUp').mockReturnValue(of(true));
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
          'configurator.a11y.cartEntryBundleInfo count:1 items:1configurator.header.hide'
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
          'configurator.a11y.cartEntryBundlePriceAndQuantity'
        );
      });

      it("should contain div element with class name 'cx-item-name' that displays an item name when no product is available", () => {
        CommonConfiguratorTestUtilsService.expectElementPresent(
          expect,
          htmlElem,
          '.cx-item-name'
        );
        CommonConfiguratorTestUtilsService.expectElementNotPresent(
          expect,
          htmlElem,
          '.cx-item-name a'
        );
        CommonConfiguratorTestUtilsService.expectElementToContainText(
          expect,
          htmlElem,
          '.cx-item-name',
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

    describe('navigation to the configuration overview', () => {
      const TOGGLE_LINK = '.cx-toggle-hide-items cx-configure-cart-entry';

      let featureToggles: MockFeatureTogglesController;

      function emitCartEntry(location: PromotionLocation) {
        mockCartItemContext.item$.next({
          entryNumber: 3,
          statusSummaryList: undefined,
          configurationInfos: configurationInfos,
          product: {
            configurable: true,
          },
        });
        mockCartItemContext.location$.next(location);
        mockCartItemContext.readonly$.next(false);
        mockCartItemContext.quantityControl$.next(new UntypedFormControl());
        fixture.detectChanges();
      }

      beforeEach(() => {
        featureToggles = TestBed.inject(MockFeatureTogglesController);
        featureToggles.set('productConfiguratorCPQContainer', true);
        vi.spyOn(
          component as any,
          'getCartEntryBundleLineItemsThreshold'
        ).mockReturnValue(2);
      });

      it('should render a link to the overview instead of the toggle button if the threshold is exceeded', () => {
        emitCartEntry(PromotionLocation.ActiveCart);

        CommonConfiguratorTestUtilsService.expectElementPresent(
          expect,
          htmlElem,
          TOGGLE_LINK
        );
        CommonConfiguratorTestUtilsService.expectElementNotPresent(
          expect,
          htmlElem,
          'button'
        );
        CommonConfiguratorTestUtilsService.expectElementNotPresent(
          expect,
          htmlElem,
          '.cx-item-infos'
        );
      });

      it('should render the link in read only mode with the show text', () => {
        emitCartEntry(PromotionLocation.ActiveCart);

        const linkComponent = fixture.debugElement.query(
          By.css(TOGGLE_LINK)
        ).componentInstance;

        expect(linkComponent.readOnly).toBe(true);
        expect(linkComponent.msgBanner).toBe(false);
        expect(linkComponent.disabled).toBe(false);
        expect(linkComponent.isBundleOverviewLink).toBe(true);
        expect(linkComponent.a11yDescriptionId).toBe('cx-item-list-info-3');
      });

      it('should render the toggle button if the threshold is not exceeded', () => {
        vi.mocked(
          component['getCartEntryBundleLineItemsThreshold']
        ).mockReturnValue(3);
        emitCartEntry(PromotionLocation.ActiveCart);

        CommonConfiguratorTestUtilsService.expectElementNotPresent(
          expect,
          htmlElem,
          TOGGLE_LINK
        );
        CommonConfiguratorTestUtilsService.expectElementPresent(
          expect,
          htmlElem,
          'button'
        );
        CommonConfiguratorTestUtilsService.expectElementPresent(
          expect,
          htmlElem,
          '.cx-item-infos'
        );
      });

      it('should render the toggle button if the feature toggle is not active', () => {
        featureToggles.set('productConfiguratorCPQContainer', false);
        emitCartEntry(PromotionLocation.ActiveCart);

        CommonConfiguratorTestUtilsService.expectElementNotPresent(
          expect,
          htmlElem,
          TOGGLE_LINK
        );
        CommonConfiguratorTestUtilsService.expectElementPresent(
          expect,
          htmlElem,
          'button'
        );
      });

      it('should render the toggle button for a saved cart, as no navigation to the overview is possible there', () => {
        emitCartEntry(PromotionLocation.SavedCart);

        CommonConfiguratorTestUtilsService.expectElementNotPresent(
          expect,
          htmlElem,
          TOGGLE_LINK
        );
        CommonConfiguratorTestUtilsService.expectElementPresent(
          expect,
          htmlElem,
          'button'
        );
      });

      it('should render the toggle button for save for later, as no navigation to the overview is possible there', () => {
        emitCartEntry(PromotionLocation.SaveForLater);

        CommonConfiguratorTestUtilsService.expectElementNotPresent(
          expect,
          htmlElem,
          TOGGLE_LINK
        );
        CommonConfiguratorTestUtilsService.expectElementPresent(
          expect,
          htmlElem,
          'button'
        );
      });
    });

    describe('getCartEntryBundleLineItemsThreshold', () => {
      it('should return the default threshold if nothing is configured', () => {
        expect(component['getCartEntryBundleLineItemsThreshold']()).toBe(10);
      });

      it('should return the configured threshold', () => {
        TestBed.inject(CommonConfiguratorUISettingsConfig).productConfigurator =
          {
            cartEntryBundleLineItemsThreshold: 25,
          };
        expect(component['getCartEntryBundleLineItemsThreshold']()).toBe(25);
      });
    });

    describe('getItemsLinkMsg', () => {
      it("should return 'configurator.a11y.cartEntryBundleInfo' with the number of items", () => {
        expect(component.getItemsLinkMsg(4)).toBe(
          'configurator.a11y.cartEntryBundleInfo count:4 items:4'
        );
      });
    });

    describe('getItemsLinkMsgId', () => {
      it('should return an ID that is unique per cart entry', () => {
        expect(component.getItemsLinkMsgId({ entryNumber: 4 })).toBe(
          'cx-item-list-info-4'
        );
      });
    });

    describe('getHiddenItemInfoId', () => {
      it('should return a stable ID per cart entry and line item', () => {
        fixture.detectChanges();
        expect(component.getHiddenItemInfoId(4, { rowId: 'row-abc' }, 0)).toBe(
          'cx-item-hidden-info-4-row-abc'
        );
      });
    });
  });

  describe('bundle line items', () => {
    const product: Product = { code: 'PRODUCT_1', name: 'Product 1' };
    const configurableLineItem: LineItem = {
      name: 'Configurable item',
      productCode: 'PRODUCT_1',
      rowId: 'row-1',
      configurable: true,
    };
    const plainLineItem: LineItem = { name: 'Plain item' };
    let productService: ProductService;

    function emitCartEntry(
      lineItems: LineItem[],
      location = PromotionLocation.ActiveCart
    ) {
      vi.mocked(
        configCartEntryBundleInfoService.retrieveLineItems
      ).mockReturnValue(lineItems);
      mockCartItemContext.item$.next({
        entryNumber: 1,
        configurationInfos: configurationInfos,
      });
      mockCartItemContext.location$.next(location);
      mockCartItemContext.readonly$.next(false);
      mockCartItemContext.quantityControl$.next(new UntypedFormControl());
      fixture.detectChanges();
    }

    function getNestedConfigureLinks() {
      return fixture.debugElement.queryAll(
        By.css('.cx-item-link cx-configure-cart-entry')
      );
    }

    beforeEach(() => {
      productService = TestBed.inject(ProductService);
      vi.spyOn(productService, 'get').mockReturnValue(of(product));
      TestBed.inject(MockFeatureTogglesController).set(
        'productConfiguratorCPQContainer',
        true
      );
    });

    describe('lineItems$', () => {
      it('should emit the line items without loading products', async () => {
        emitCartEntry([configurableLineItem, plainLineItem]);
        const lineItems = await firstValueFrom(component.lineItems$);
        expect(lineItems).toEqual([configurableLineItem, plainLineItem]);
        expect(productService.get).not.toHaveBeenCalled();
      });
    });

    describe('lineItemsWithProducts$', () => {
      it('should not load products while the list is collapsed', async () => {
        emitCartEntry([configurableLineItem, plainLineItem]);
        const lineItems = await firstValueFrom(
          component.lineItemsWithProducts$
        );
        expect(lineItems).toEqual([configurableLineItem, plainLineItem]);
        expect(productService.get).not.toHaveBeenCalled();
      });

      it('should enrich line items with their products once the list is expanded', async () => {
        emitCartEntry([configurableLineItem, plainLineItem]);
        component.toggleItems();
        const lineItems = await firstValueFrom(
          component.lineItemsWithProducts$
        );
        expect(lineItems).toEqual([
          { ...configurableLineItem, product },
          plainLineItem,
        ]);
      });

      it('should keep the loaded products when the list is collapsed again', async () => {
        emitCartEntry([configurableLineItem, plainLineItem]);
        component.toggleItems();
        component.toggleItems();
        const lineItems = await firstValueFrom(
          component.lineItemsWithProducts$
        );
        expect(lineItems).toEqual([
          { ...configurableLineItem, product },
          plainLineItem,
        ]);
      });

      it('should emit an empty array without loading products if there are no line items', async () => {
        emitCartEntry([]);
        component.toggleItems();
        const lineItems = await firstValueFrom(
          component.lineItemsWithProducts$
        );
        expect(lineItems).toEqual([]);
        expect(productService.get).not.toHaveBeenCalled();
      });

      it('should not load products if no line item has a product code', async () => {
        emitCartEntry([plainLineItem]);
        component.toggleItems();
        const lineItems = await firstValueFrom(
          component.lineItemsWithProducts$
        );
        expect(lineItems).toEqual([plainLineItem]);
        expect(productService.get).not.toHaveBeenCalled();
      });
    });

    describe('enrichWithProduct', () => {
      it('should return the line item unchanged if it has no product code', async () => {
        const lineItem = await firstValueFrom(
          component['enrichWithProduct'](plainLineItem)
        );
        expect(lineItem).toBe(plainLineItem);
        expect(productService.get).not.toHaveBeenCalled();
      });

      it('should load the product with configurator product card scope', async () => {
        const lineItem = await firstValueFrom(
          component['enrichWithProduct'](configurableLineItem)
        );
        expect(productService.get).toHaveBeenCalledWith(
          'PRODUCT_1',
          ConfiguratorProductScope.CONFIGURATOR_PRODUCT_CARD
        );
        expect(lineItem).toEqual({ ...configurableLineItem, product });
      });

      it('should leave the product undefined if loading fails', async () => {
        vi.mocked(productService.get).mockReturnValue(
          throwError(() => new Error('not found'))
        );
        const lineItem = await firstValueFrom(
          component['enrichWithProduct'](configurableLineItem)
        );
        expect(lineItem).toEqual({
          ...configurableLineItem,
          product: undefined,
        });
      });
    });

    describe('rendering', () => {
      beforeEach(() => {
        // the list must be expanded, otherwise the products are not loaded
        component.hideItems = false;
      });

      it('should render the name as link to the product details page if product data is available', () => {
        emitCartEntry([configurableLineItem]);

        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'a',
          'cx-link',
          undefined,
          undefined,
          undefined,
          'Configurable item'
        );
      });

      it('should render the name as plain text if no product data is available', () => {
        emitCartEntry([plainLineItem]);

        CommonConfiguratorTestUtilsService.expectElementNotPresent(
          expect,
          htmlElem,
          '.cx-item-name a'
        );
        CommonConfiguratorTestUtilsService.expectElementToContainText(
          expect,
          htmlElem,
          '.cx-item-name',
          'Plain item'
        );
      });

      it('should not render the name container if the line item has no name', () => {
        emitCartEntry([{ formattedPrice: '$1.00' }]);

        CommonConfiguratorTestUtilsService.expectElementNotPresent(
          expect,
          htmlElem,
          '.cx-item-name'
        );
      });

      it('should render the edit link for a configurable line item with a row id', () => {
        const quantityControl = new UntypedFormControl();
        quantityControl.disable();
        emitCartEntry([configurableLineItem]);
        mockCartItemContext.quantityControl$.next(quantityControl);
        fixture.detectChanges();

        const links = getNestedConfigureLinks();
        expect(links.length).toBe(1);
        const linkComponent = links[0].componentInstance;
        expect(linkComponent.cartEntry.entryNumber).toBe(1);
        expect(linkComponent.readOnly).toBe(false);
        expect(linkComponent.msgBanner).toBe(false);
        expect(linkComponent.disabled).toBe(true);
        expect(linkComponent.rowId).toBe('row-1');
        expect(linkComponent.productName).toBe('Configurable item');
      });

      it('should not render the edit link for a non-configurable line item', () => {
        emitCartEntry([{ ...configurableLineItem, configurable: false }]);

        expect(getNestedConfigureLinks().length).toBe(0);
      });

      it('should not render the edit link for a line item without row id', () => {
        emitCartEntry([{ ...configurableLineItem, rowId: undefined }]);

        expect(getNestedConfigureLinks().length).toBe(0);
      });

      it('should not render the edit link outside of the active cart', () => {
        emitCartEntry([configurableLineItem], PromotionLocation.SavedCart);

        expect(getNestedConfigureLinks().length).toBe(0);
      });
    });
  });
});

describe('ConfiguratorCartEntryBundleInfoComponent without cart item context', () => {
  let component: ConfiguratorCartEntryBundleInfoComponent;
  let fixture: ComponentFixture<ConfiguratorCartEntryBundleInfoComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, ConfiguratorCartEntryBundleInfoComponent],
      providers: [{ provide: ProductService, useClass: MockProductService }],
    }).compileComponents();
  });

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
