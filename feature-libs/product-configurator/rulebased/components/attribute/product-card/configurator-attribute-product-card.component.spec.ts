import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import {
  CxDatePipe,
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
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import {
  FocusDirective,
  ItemCounterComponent,
  KeyboardFocusService,
  MediaModule,
} from '@spartacus/storefront';
import { MockUrlPipe } from 'core-libs/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe';
import { UrlTestingModule } from 'core-libs/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { BehaviorSubject, EMPTY, Observable, of, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { CommonConfiguratorTestUtilsService } from '../../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorCommonsService } from '../../../core/facade/configurator-commons.service';
import { ConfiguratorUtilsService } from '../../../core/facade/utils/configurator-utils.service';
import { Configurator } from '../../../core/model/configurator.model';
import { ConfiguratorTestUtils } from '../../../testing/configurator-test-utils';
import {
  ConfiguratorPriceComponent,
  ConfiguratorPriceComponentOptions,
} from '../../price/configurator-price.component';
import { ConfiguratorStorefrontUtilsService } from '../../service/configurator-storefront-utils.service';
import { ConfiguratorShowMoreComponent } from '../../show-more/configurator-show-more.component';
import {
  ConfiguratorAttributeQuantityComponent,
  ConfiguratorAttributeQuantityComponentOptions,
} from '../quantity/configurator-attribute-quantity.component';
import { ConfiguratorAttributeProductCardComponent } from './configurator-attribute-product-card.component';

const product: Product = {
  name: 'Product Name',
  code: 'PRODUCT_CODE',
  images: {
    PRIMARY: {
      thumbnail: {
        url: 'url',
        altText: 'alt',
      },
    },
  },
  price: {
    formattedValue: '$1.500',
  },
  priceRange: {
    maxPrice: {
      formattedValue: '$1.500',
    },
    minPrice: {
      formattedValue: '$1.000',
    },
  },
};

const productTransformed: Product = {
  code: '1111-2222',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  images: {},
  name: 'Lorem Ipsum Dolor',
};

class MockProductService {
  get(): Observable<Product> {
    return of(product);
  }
}

let configuration$: BehaviorSubject<Configurator.Configuration>;

class MockConfiguratorStorefrontUtilsService {
  isCartEntryOrGroupVisited(): Observable<boolean> {
    return of(true);
  }
}

class MockConfiguratorRouterExtractorService {
  extractRouterData(): Observable<ConfiguratorRouter.Data> {
    return of({} as ConfiguratorRouter.Data);
  }
}

class MockConfiguratorCommonsService {
  getConfiguration(): Observable<Configurator.Configuration> {
    return configuration$;
  }
}

let focusService: KeyboardFocusService;

@Component({
  selector: 'cx-configurator-price',
  template: '',
  imports: [
    I18nTestingModule,
    ReactiveFormsModule,
    UrlTestingModule,
    MediaModule,
  ],
})
class MockConfiguratorPriceComponent {
  @Input() formula: ConfiguratorPriceComponentOptions;
}

@Component({
  selector: 'cx-configurator-attribute-quantity',
  template: '',
  imports: [
    I18nTestingModule,
    ReactiveFormsModule,
    UrlTestingModule,
    MediaModule,
  ],
})
class MockConfiguratorAttributeQuantityComponent {
  @Input() quantityOptions: ConfiguratorAttributeQuantityComponentOptions;
  @Output() changeQuantity = new EventEmitter<number>();
}

@Directive({ selector: '[cxFocus]' })
export class MockFocusDirective {
  @Input('cxFocus') protected config: any;
}

function setProductBoundValueAttributes(
  component: ConfiguratorAttributeProductCardComponent,
  selected = true,
  quantity = 1
): Configurator.Value {
  const productBoundValue = component.productCardOptions?.productBoundValue;
  if (productBoundValue) {
    productBoundValue.selected = selected;
    productBoundValue.quantity = quantity;
    productBoundValue.valuePrice = undefined;
    productBoundValue.valuePriceTotal = undefined;
    return productBoundValue;
  }
  return { valueCode: 'A' };
}

function takeOneDisableQtyObs(
  component: ConfiguratorAttributeProductCardComponent
): Observable<boolean> {
  return (
    component
      .extractQuantityParameters()
      .disableQuantityActions$?.pipe(take(1)) ?? EMPTY
  );
}

describe('ConfiguratorAttributeProductCardComponent', () => {
  let component: ConfiguratorAttributeProductCardComponent;
  let fixture: ComponentFixture<ConfiguratorAttributeProductCardComponent>;
  let htmlElem: HTMLElement;
  let value: Configurator.Value;
  let featureToggles: MockFeatureTogglesController;

  const createImage = (url: string, altText: string): Configurator.Image => {
    const image: Configurator.Image = {
      url: url,
      altText: altText,
    };
    return image;
  };

  const createValue = (
    valueCode: string,
    description: string,
    images: Configurator.Image[],
    quantity: number,
    selected: boolean,
    productSystemId: string,
    valueDisplay: string
  ): Configurator.Value => {
    const configValue: Configurator.Value = {
      valueCode,
      description,
      images,
      quantity,
      selected,
      productSystemId,
      valueDisplay,
    };
    return configValue;
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MediaModule,
        ConfiguratorAttributeProductCardComponent,
        ConfiguratorShowMoreComponent,
        ItemCounterComponent,
      ],
      providers: [
        {
          provide: ProductService,
          useClass: MockProductService,
        },
        {
          provide: ConfiguratorStorefrontUtilsService,
          useClass: MockConfiguratorStorefrontUtilsService,
        },
        {
          provide: ConfiguratorRouterExtractorService,
          useClass: MockConfiguratorRouterExtractorService,
        },
        {
          provide: ConfiguratorCommonsService,
          useClass: MockConfiguratorCommonsService,
        },
        ConfiguratorUtilsService,
        provideMockFeatureToggles({
          productConfiguratorConsolidatedButtonDisabling: true,
          productConfiguratorCPQContainer: true,
        }),
      ],
    })
      .overrideComponent(ConfiguratorAttributeProductCardComponent, {
        remove: {
          imports: [
            TranslatePipe,
            CxDatePipe,
            UrlPipe,
            ConfiguratorPriceComponent,
            FocusDirective,
            ConfiguratorAttributeQuantityComponent,
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockUrlPipe,
            MockConfiguratorPriceComponent,
            MockFocusDirective,
            MockConfiguratorAttributeQuantityComponent,
          ],
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    configuration$ = new BehaviorSubject(
      ConfiguratorTestUtils.createConfiguration('config-id')
    );
    featureToggles = TestBed.inject(MockFeatureTogglesController);
    fixture = TestBed.createComponent(
      ConfiguratorAttributeProductCardComponent
    );
    focusService = TestBed.inject(KeyboardFocusService);
    htmlElem = fixture.nativeElement;
    component = fixture.componentInstance;

    value = createValue(
      '888',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      [createImage('url', 'alt')],
      1,
      false,
      '1111-2222',
      'Lorem Ipsum Dolor'
    );

    component.productCardOptions = {
      hideRemoveButton: false,
      multiSelect: false,
      productBoundValue: value,
      attribute: {
        attrCode: 123,
        label: 'Attribute Label',
        name: 'Attribute Name',
        container: { rows: [] },
      },
      singleDropdown: false,
      withQuantity: true,
      attributeId: 123,
      attributeLabel: 'Attribute Label',
      attributeName: 'Attribute Name',
      itemCount: 3,
      itemIndex: 1,
    };

    spyOn(component, 'onHandleDeselect').and.callThrough();
    spyOn(component as any, 'onHandleQuantity').and.callThrough();
    spyOn(component, 'onHandleSelect').and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('create a focus config with key', () => {
    expect(component.focusConfig.key).toContain(
      component.productCardOptions.attributeId.toString()
    );
    const valueCode =
      component.productCardOptions.productBoundValue?.valueCode ?? 'noCode';
    expect(component.focusConfig.key).toContain(valueCode);
  });

  it('should indicate loading state when fetching product data', () => {
    const loadingState: boolean[] = [];
    let subscription = component.loading$.subscribe((loading) => {
      loadingState.push(loading);
    });
    component.ngOnInit();
    component.product$.subscribe().unsubscribe(); // fetch product
    subscription.unsubscribe();
    expect(loadingState.length).toBe(3);
    expect(loadingState[0]).toBe(false); // state from before each
    expect(loadingState[1]).toBe(true); // loading
    expect(loadingState[2]).toBe(false); // loading done
  });

  describe('Buttons constellation', () => {
    it('should button be enabled when card actions are disabled and card is no selected', () => {
      const button = fixture.debugElement.query(
        By.css('button.btn')
      ).nativeElement;
      expect(button.disabled).toBe(false);
    });

    it('should button be enabled when card actions are disabled and card is selected', () => {
      setProductBoundValueAttributes(component);

      fixture.detectChanges();

      const button = fixture.debugElement.query(
        By.css('button.btn')
      ).nativeElement;
      expect(button.disabled).toBe(false);
    });

    it('should button be called with proper select method', () => {
      const button = fixture.debugElement.query(
        By.css('button.btn')
      ).nativeElement;
      button.click();

      fixture.detectChanges();

      expect(component.onHandleSelect).toHaveBeenCalled();
    });

    it('should button be called with proper deselect action', () => {
      setProductBoundValueAttributes(component);

      fixture.detectChanges();

      const button = fixture.debugElement.query(
        By.css('button.btn')
      ).nativeElement;

      button.click();

      fixture.detectChanges();

      expect(component.onHandleDeselect).toHaveBeenCalled();
    });

    it('should button have select text when card type is no multi select and card is no selected', () => {
      const button = fixture.debugElement.query(
        By.css('button.btn')
      ).nativeElement;

      expect(button.innerText).toContain('configurator.button.select');
    });

    it('should button have deselect text when card type is no multi select and card is selected', () => {
      setProductBoundValueAttributes(component);

      fixture.detectChanges();

      const button = fixture.debugElement.query(
        By.css('button.btn')
      ).nativeElement;

      expect(button.innerText).toContain('configurator.button.deselect');
    });

    it('should button have add text when card type is multi select and card is no selected', () => {
      component.productCardOptions.multiSelect = true;
      setProductBoundValueAttributes(component, false);

      fixture.detectChanges();

      const button = fixture.debugElement.query(
        By.css('button.btn')
      ).nativeElement;

      expect(button.innerText).toContain('configurator.button.add');
    });

    it('should button have remove text when card type is multi select and card is selected', () => {
      component.productCardOptions.multiSelect = true;
      setProductBoundValueAttributes(component);

      fixture.detectChanges();

      const button = fixture.debugElement.query(
        By.css('button.btn')
      ).nativeElement;

      expect(button.innerText).toContain('configurator.button.remove');
    });

    it('should show deselection error message when removing required attribute', () => {
      component.productCardOptions.multiSelect = true;
      component.productCardOptions.hideRemoveButton = true;
      setProductBoundValueAttributes(component);

      fixture.detectChanges();

      const button = fixture.debugElement.query(
        By.css('button.btn')
      ).nativeElement;

      button.click();

      expect(component.onHandleDeselect).toHaveBeenCalled();
      expect(component.showDeselectionNotPossible).toBe(true);
    });
  });

  describe('action buttons loading state', () => {
    it('should disable the action button while the parent signals a loading round trip', () => {
      component.productCardOptions.loading$ = new BehaviorSubject<boolean>(
        true
      );
      component.ngOnInit();
      fixture.detectChanges();

      const button = fixture.debugElement.query(
        By.css('button.btn')
      ).nativeElement;
      expect(button.disabled).toBe(true);
    });

    it('should re-enable the action button once the parent stops loading, even without attribute recreation', () => {
      const parentLoading$ = new BehaviorSubject<boolean>(true);
      component.productCardOptions.loading$ = parentLoading$;
      component.ngOnInit();
      fixture.detectChanges();

      parentLoading$.next(false);
      fixture.detectChanges();

      const button = fixture.debugElement.query(
        By.css('button.btn')
      ).nativeElement;
      expect(button.disabled).toBe(false);
    });

    it('should not set the local loading state when triggering a select action', () => {
      component.loading$.next(false);
      component.onHandleSelect();
      expect(component.loading$.value).toBe(false);
    });

    it('should not set the local loading state when triggering a deselect action', () => {
      component.loading$.next(false);
      component.onHandleDeselect();
      expect(component.loading$.value).toBe(false);
    });

    it('should not set the local loading state when triggering a quantity action', () => {
      component.loading$.next(false);
      component['onHandleQuantity'](2);
      expect(component.loading$.value).toBe(false);
    });
  });

  describe('multi-select remove button disabling (feature toggle)', () => {
    function initSelectedMultiSelectRemoveButton(parentLoading: boolean): void {
      component.productCardOptions.multiSelect = true;
      component.productCardOptions.loading$ = new BehaviorSubject<boolean>(
        parentLoading
      );
      setProductBoundValueAttributes(component);
      component.ngOnInit();
      fixture.detectChanges();
    }

    it('should disable the remove button during a loading round trip when the toggle is enabled', () => {
      initSelectedMultiSelectRemoveButton(true);

      const button = fixture.debugElement.query(
        By.css('button.btn-tertiary')
      ).nativeElement;
      expect(button.innerText).toContain('configurator.button.remove');
      expect(button.disabled).toBe(true);
    });

    it('should keep the remove button enabled during a loading round trip when the toggle is disabled', () => {
      featureToggles.set(
        'productConfiguratorConsolidatedButtonDisabling',
        false
      );
      initSelectedMultiSelectRemoveButton(true);

      const button = fixture.debugElement.query(
        By.css('button.btn-tertiary')
      ).nativeElement;
      expect(button.innerText).toContain('configurator.button.remove');
      expect(button.disabled).toBe(false);
    });
  });

  describe('primary button disabling with disableAllButtons (feature toggle)', () => {
    // A fresh fixture is required because `*cxFeature` resolves its (static)
    // expression only once, when the embedded view is created. The toggle
    // state therefore has to be set before the first change detection.
    function initUnselectedPrimaryButton(
      multiSelect: boolean,
      toggleEnabled: boolean
    ): void {
      featureToggles.set(
        'productConfiguratorConsolidatedButtonDisabling',
        toggleEnabled
      );
      fixture = TestBed.createComponent(
        ConfiguratorAttributeProductCardComponent
      );
      htmlElem = fixture.nativeElement;
      component = fixture.componentInstance;
      component.productCardOptions = {
        hideRemoveButton: false,
        multiSelect,
        productBoundValue: createValue(
          '888',
          'description',
          [createImage('url', 'alt')],
          1,
          false,
          '1111-2222',
          'Lorem Ipsum Dolor'
        ),
        attribute: {
          attrCode: 123,
          label: 'Attribute Label',
          name: 'Attribute Name',
        },
        singleDropdown: false,
        withQuantity: true,
        disableAllButtons: true,
        attributeId: 123,
        attributeLabel: 'Attribute Label',
        attributeName: 'Attribute Name',
        itemCount: 3,
        itemIndex: 1,
      };
      fixture.detectChanges();
    }

    it('should ignore disableAllButtons for the single-select "Select" button when the toggle is enabled', () => {
      initUnselectedPrimaryButton(false, true);

      const button = fixture.debugElement.query(
        By.css('button.btn-secondary')
      ).nativeElement;
      expect(button.innerText).toContain('configurator.button.select');
      expect(button.disabled).toBe(false);
    });

    it('should honor disableAllButtons for the single-select "Select" button when the toggle is disabled', () => {
      initUnselectedPrimaryButton(false, false);

      const button = fixture.debugElement.query(
        By.css('button.btn-secondary')
      ).nativeElement;
      expect(button.innerText).toContain('configurator.button.select');
      expect(button.disabled).toBe(true);
    });

    it('should ignore disableAllButtons for the multi-select "Add" button when the toggle is enabled', () => {
      initUnselectedPrimaryButton(true, true);

      const button = fixture.debugElement.query(
        By.css('button.btn-secondary')
      ).nativeElement;
      expect(button.innerText).toContain('configurator.button.add');
      expect(button.disabled).toBe(false);
    });

    it('should honor disableAllButtons for the multi-select "Add" button when the toggle is disabled', () => {
      initUnselectedPrimaryButton(true, false);

      const button = fixture.debugElement.query(
        By.css('button.btn-secondary')
      ).nativeElement;
      expect(button.innerText).toContain('configurator.button.add');
      expect(button.disabled).toBe(true);
    });
  });

  describe('productConfiguratorCPQContainer feature toggle', () => {
    function initWithCpqContainerToggle(
      toggleEnabled: boolean,
      options: { multiSelect: boolean; selected: boolean }
    ): void {
      // `*cxFeature` resolves its (static) expression only once, when the
      // embedded view is created. The toggle state has to be set before the
      // first change detection.
      featureToggles.set('productConfiguratorCPQContainer', toggleEnabled);
      fixture = TestBed.createComponent(
        ConfiguratorAttributeProductCardComponent
      );
      htmlElem = fixture.nativeElement;
      component = fixture.componentInstance;
      component.productCardOptions = {
        hideRemoveButton: false,
        multiSelect: options.multiSelect,
        productBoundValue: createValue(
          '888',
          'description',
          [createImage('url', 'alt')],
          1,
          options.selected,
          '1111-2222',
          'Lorem Ipsum Dolor'
        ),
        attribute: {
          attrCode: 123,
          label: 'Attribute Label',
          name: 'Attribute Name',
        },
        singleDropdown: false,
        withQuantity: true,
        attributeId: 123,
        attributeLabel: 'Attribute Label',
        attributeName: 'Attribute Name',
        itemCount: 3,
        itemIndex: 1,
      };
      fixture.detectChanges();
    }

    it('should use tertiary class for the multi-select remove button when the toggle is enabled', () => {
      initWithCpqContainerToggle(true, { multiSelect: true, selected: true });

      const button = fixture.debugElement.query(
        By.css('button.btn-tertiary')
      ).nativeElement;
      expect(button.innerText).toContain('configurator.button.remove');
    });

    it('should use secondary class for the multi-select remove button when the toggle is disabled', () => {
      initWithCpqContainerToggle(false, { multiSelect: true, selected: true });

      const button = fixture.debugElement.query(
        By.css('button.btn-secondary')
      ).nativeElement;
      expect(button.innerText).toContain('configurator.button.remove');
      expect(htmlElem.querySelector('button.btn-tertiary')).toBeFalsy();
    });

    it('should use secondary class for the single-select button when the toggle is enabled', () => {
      initWithCpqContainerToggle(true, { multiSelect: false, selected: false });

      const button = fixture.debugElement.query(
        By.css('button.btn-secondary')
      ).nativeElement;
      expect(button.innerText).toContain('configurator.button.select');
    });

    it('should use primary class for the single-select button when the toggle is disabled', () => {
      initWithCpqContainerToggle(false, {
        multiSelect: false,
        selected: false,
      });

      const button = fixture.debugElement.query(
        By.css('button.btn-primary')
      ).nativeElement;
      expect(button.innerText).toContain('configurator.button.select');
      expect(htmlElem.querySelector('button.btn-secondary')).toBeFalsy();
    });
  });

  describe('quantity', () => {
    it('should quantity be hidden when card type is no multi select', () => {
      component.productCardOptions.multiSelect = false;

      fixture.detectChanges();

      const quantityContainer = fixture.debugElement.query(
        By.css('.cx-configurator-attribute-product-card-quantity')
      );

      expect(quantityContainer).toBeNull();
    });

    it('should quantity be visible when card type is multi select', () => {
      component.productCardOptions.multiSelect = true;

      fixture.detectChanges();

      const quantityContainer = fixture.debugElement.query(
        By.css('.cx-configurator-attribute-product-card-quantity')
      );

      expect(quantityContainer).toBeDefined();
    });

    it('should call handleQuantity on event onHandleQuantity', () => {
      spyOn(component.handleQuantity, 'emit').and.callThrough();

      component['onHandleQuantity'](1);

      expect(component.handleQuantity.emit).toHaveBeenCalledWith(
        jasmine.objectContaining({
          quantity: 1,
          valueCode: component.productCardOptions?.productBoundValue?.valueCode,
        })
      );
    });

    it('should call onHandleDeselect of event onChangeQuantity', () => {
      component.onChangeQuantity(0);
      expect(component.onHandleDeselect).toHaveBeenCalled();
    });

    it('should call onHandleQuantity of event onChangeQuantity', () => {
      component.onChangeQuantity(2);
      expect(component['onHandleQuantity']).toHaveBeenCalled();
    });

    it('should show deselection message and send no request when reducing quantity to zero is not possible', () => {
      spyOn(component.handleDeselect, 'emit').and.callThrough();
      spyOn(component.handleQuantity, 'emit').and.callThrough();
      component.productCardOptions.multiSelect = true;
      component.productCardOptions.hideRemoveButton = true;
      setProductBoundValueAttributes(component);

      component.onChangeQuantity(0);

      expect(component.onHandleDeselect).toHaveBeenCalled();
      expect(component.showDeselectionNotPossible).toBe(true);
      expect(component.handleDeselect.emit).not.toHaveBeenCalled();
      expect(component.handleQuantity.emit).not.toHaveBeenCalled();
    });

    it('should transformToProductType return Product', () => {
      expect(
        component['transformToProductType'](
          component.productCardOptions.productBoundValue
        )
      ).toEqual(productTransformed);
    });

    it('should fall back to configuration value when catalog product is missing', (done) => {
      const productService = TestBed.inject(ProductService);
      spyOn(productService, 'get').and.returnValue(of(undefined));

      component.ngOnInit();
      component.product$.subscribe((catalogProduct) => {
        expect(catalogProduct).toEqual(productTransformed);
        done();
      });
    });

    it('should fall back to configuration value when catalog lookup errors', (done) => {
      const productService = TestBed.inject(ProductService);
      spyOn(productService, 'get').and.returnValue(
        throwError(() => new Error("Product with code '1111-2222' not found!"))
      );

      component.ngOnInit();
      component.product$.subscribe((catalogProduct) => {
        expect(catalogProduct).toEqual(productTransformed);
        done();
      });
    });

    it('should display quantity when props withQuantity is true', () => {
      component.productCardOptions.withQuantity = true;
      setProductBoundValueAttributes(component);
      component.productCardOptions.multiSelect = true;

      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'cx-configurator-attribute-quantity'
      );
    });

    it('should not display quantity when props withQuantity is false', () => {
      component.productCardOptions.withQuantity = false;
      setProductBoundValueAttributes(component);
      component.productCardOptions.multiSelect = true;

      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        'cx-configurator-attribute-quantity'
      );
    });

    it('should not display quantity when props multiSelect is false', () => {
      component.productCardOptions.withQuantity = true;
      setProductBoundValueAttributes(component);
      component.productCardOptions.multiSelect = false;

      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        'cx-configurator-attribute-quantity'
      );
    });

    it('should not display quantity when value is no selected', () => {
      component.productCardOptions.withQuantity = true;
      setProductBoundValueAttributes(component, false);
      component.productCardOptions.multiSelect = true;

      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        'cx-configurator-attribute-quantity'
      );
    });
  });

  describe('product price at value level', () => {
    it('should return price details with quantity and display content of cx-configurator-price ', () => {
      const productBoundValue = setProductBoundValueAttributes(
        component,
        true,
        2
      );

      productBoundValue.valuePrice = undefined;
      productBoundValue.valuePriceTotal = undefined;
      fixture.detectChanges();

      expect(component.hasPriceDisplay()).toBe(true);

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'cx-configurator-price'
      );
    });

    it('should return price details with value price and display content of cx-configurator-price ', () => {
      const productBoundValue = setProductBoundValueAttributes(
        component,
        true,
        undefined
      );

      productBoundValue.valuePrice = {
        currencyIso: '$',
        formattedValue: '$20',
        value: 20,
      };
      productBoundValue.valuePriceTotal = undefined;
      fixture.detectChanges();

      expect(component.hasPriceDisplay()).toBe(true);

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'cx-configurator-price'
      );
    });

    it('should return price details with value price total and display content of cx-configurator-price ', () => {
      const productBoundValue = setProductBoundValueAttributes(
        component,
        true,
        0
      );

      productBoundValue.valuePrice = undefined;
      productBoundValue.valuePriceTotal = {
        currencyIso: '$',
        formattedValue: '$100',
        value: 100,
      };
      fixture.detectChanges();

      expect(component.hasPriceDisplay()).toBe(true);

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'cx-configurator-price'
      );
    });

    it('should state that no price display is needed if no price related fields are available', () => {
      const productBoundValue = setProductBoundValueAttributes(
        component,
        true,
        0
      );

      productBoundValue.valuePrice = undefined;
      productBoundValue.valuePriceTotal = undefined;
      fixture.detectChanges();

      expect(component.hasPriceDisplay()).toBe(false);
    });

    it('should extract quantity parameters', () => {
      component.productCardOptions.hideRemoveButton = false;
      setProductBoundValueAttributes(component, true, 5);
      const qtyParams = component.extractQuantityParameters();
      expect(qtyParams.allowZero).toBe(true);
      expect(qtyParams.initialQuantity).toBe(5);
      expect(qtyParams.disableQuantityActions$).toBeDefined();
      expect(qtyParams.resetToInitialQuantityOnZero).toBe(false);
    });

    it('should extract quantity parameters with reset flag when removal is not possible', () => {
      component.productCardOptions.hideRemoveButton = true;
      setProductBoundValueAttributes(component, true, 5);
      const qtyParams = component.extractQuantityParameters();
      expect(qtyParams.allowZero).toBe(true);
      expect(qtyParams.resetToInitialQuantityOnZero).toBe(true);
    });

    it('should disable stepper when loading', () => {
      component.loading$.next(true);
      takeOneDisableQtyObs(component).subscribe((disable) => {
        expect(disable).toBe(true);
      });
    });
    it('should enable stepper when loading is finished', () => {
      component.loading$.next(false);
      takeOneDisableQtyObs(component).subscribe((disable) => {
        expect(disable).toBe(false);
      });
    });

    it('should disable stepper when loading state is indicated by parent', () => {
      component.productCardOptions.loading$ = new BehaviorSubject<boolean>(
        true
      );
      component.ngOnInit();
      component.loading$.next(false);
      takeOneDisableQtyObs(component).subscribe((disable) => {
        expect(disable).toBe(true);
      });
    });

    it('should disable stepper when loading is finsihed including parent', () => {
      component.productCardOptions.loading$ = new BehaviorSubject<boolean>(
        false
      );
      component.ngOnInit();
      component.loading$.next(false);
      takeOneDisableQtyObs(component).subscribe((disable) => {
        expect(disable).toBe(false);
      });
    });

    it('should display content of cx-configurator-price ', () => {
      const productBoundValue = setProductBoundValueAttributes(
        component,
        true,
        undefined
      );

      productBoundValue.valuePrice = {
        currencyIso: '$',
        formattedValue: '$10',
        value: 10,
      };
      productBoundValue.valuePriceTotal = {
        currencyIso: '$',
        formattedValue: '$20',
        value: 20,
      };
      fixture.detectChanges();

      expect(component.hasPriceDisplay()).not.toBeUndefined();

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'cx-configurator-price'
      );
    });
  });

  describe('isValueCodeDefined', () => {
    it('should return `false` when value code equals `###RETRACT_VALUE_CODE##`', () => {
      expect(component.isValueCodeDefined(Configurator.RetractValueCode)).toBe(
        false
      );
    });

    it('should return `false` when value code is `null`', () => {
      expect(component.isValueCodeDefined(null)).toBe(false);
    });

    it('should return `false` when value code is `undefined`', () => {
      expect(component.isValueCodeDefined(undefined)).toBe(false);
    });

    it('should return `true` when value code is defined', () => {
      expect(component.isValueCodeDefined('888')).toBe(true);
    });
  });

  describe('if "No Option Selected" is selected / not selected for not required single-selection-bundle', () => {
    it('should not show "Deselect" button', () => {
      value.valueCode = Configurator.RetractValueCode;
      setProductBoundValueAttributes(component);
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        'button.btn'
      );
    });

    it('should show "Select" button', () => {
      value.valueCode = Configurator.RetractValueCode;
      setProductBoundValueAttributes(component, false);
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        'button.btn'
      );

      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'button.btn',
        'configurator.button.select'
      );
    });
  });
  describe('onHandleSelect', () => {
    it('should not focus on fallback element if remove button is not hidden', () => {
      focusService.set('123');
      component.productCardOptions.hideRemoveButton = false;
      component.onHandleSelect();
      expect(focusService.get()).toBe('123');
    });

    it('should not focus on fallback element if no fallback id is provided', () => {
      focusService.set('123');
      component.productCardOptions.hideRemoveButton = true;
      component.onHandleSelect();
      expect(focusService.get()).toBe('123');
    });

    it('should focus on fallback element if id is provided and remove button is hidden', () => {
      focusService.set('123');
      component.productCardOptions.hideRemoveButton = true;
      component.productCardOptions.fallbackFocusId = 'fallbackId';
      component.onHandleSelect();
      expect(focusService.get()).toBe('fallbackId');
    });
  });

  describe('getAriaLabelSingleSelectedNoButton', () => {
    it("should return 'configurator.a11y.itemOfAttributeSelectedWithPrice' if there is a price", () => {
      const productBoundValue = setProductBoundValueAttributes(
        component,
        true,
        undefined
      );

      productBoundValue.valuePrice = {
        currencyIso: '$',
        formattedValue: '$20',
        value: 20,
      };
      productBoundValue.valuePriceTotal = {
        currencyIso: '$',
        formattedValue: '$20',
        value: 20,
      };
      const itemIndex = component.productCardOptions.itemIndex + 1;

      expect(component.getAriaLabelSingleSelectedNoButton(product)).toBe(
        'configurator.a11y.itemOfAttributeSelectedWithPrice attribute:' +
          component.productCardOptions.attributeLabel +
          ' item:' +
          product.code +
          ' itemCount:' +
          component.productCardOptions.itemCount +
          ' itemIndex:' +
          itemIndex +
          ' price:' +
          component.productCardOptions.productBoundValue?.valuePriceTotal
            ?.formattedValue
      );
    });

    it("should return 'configurator.a11y.itemOfAttributeSelected' if there is no price", () => {
      const productBoundValue = setProductBoundValueAttributes(
        component,
        true,
        undefined
      );
      productBoundValue.valuePrice = {
        currencyIso: '$',
        formattedValue: undefined,
        value: 0,
      };
      const itemIndex = component.productCardOptions.itemIndex + 1;

      expect(component.getAriaLabelSingleSelectedNoButton(product)).toBe(
        'configurator.a11y.itemOfAttributeSelected attribute:' +
          component.productCardOptions.attributeLabel +
          ' item:' +
          product.code +
          ' itemCount:' +
          component.productCardOptions.itemCount +
          ' itemIndex:' +
          itemIndex
      );
    });
  });

  describe('getAriaLabelSingleSelected', () => {
    it("should return 'configurator.a11y.itemOfAttributeSelectedPressToUnselectWithPrice' if there is a price", () => {
      const productBoundValue = setProductBoundValueAttributes(
        component,
        true,
        undefined
      );

      productBoundValue.valuePrice = {
        currencyIso: '$',
        formattedValue: '$30',
        value: 30,
      };
      productBoundValue.valuePriceTotal = {
        currencyIso: '$',
        formattedValue: '$30',
        value: 30,
      };
      const itemIndex = component.productCardOptions.itemIndex + 1;

      expect(component.getAriaLabelSingleSelected(product)).toBe(
        'configurator.a11y.itemOfAttributeSelectedPressToUnselectWithPrice attribute:' +
          component.productCardOptions.attributeLabel +
          ' item:' +
          product.code +
          ' itemCount:' +
          component.productCardOptions.itemCount +
          ' itemIndex:' +
          itemIndex +
          ' price:' +
          component.productCardOptions.productBoundValue?.valuePriceTotal
            ?.formattedValue
      );
    });

    it("should return 'configurator.a11y.itemOfAttributeSelectedPressToUnselect' if there is no price", () => {
      const productBoundValue = setProductBoundValueAttributes(
        component,
        true,
        undefined
      );
      productBoundValue.valuePrice = {
        currencyIso: '$',
        formattedValue: undefined,
        value: 0,
      };
      const itemIndex = component.productCardOptions.itemIndex + 1;

      expect(component.getAriaLabelSingleSelected(product)).toBe(
        'configurator.a11y.itemOfAttributeSelectedPressToUnselect attribute:' +
          component.productCardOptions.attributeLabel +
          ' item:' +
          product.code +
          ' itemCount:' +
          component.productCardOptions.itemCount +
          ' itemIndex:' +
          itemIndex
      );
    });
  });

  describe('getAriaLabelMultiSelected', () => {
    it("should return 'configurator.a11y.itemOfAttributeSelectedPressToUnselectWithPrice' if there is a price", () => {
      const productBoundValue = setProductBoundValueAttributes(
        component,
        true,
        undefined
      );

      productBoundValue.valuePrice = {
        currencyIso: '$',
        formattedValue: '$20',
        value: 20,
      };
      productBoundValue.valuePriceTotal = {
        currencyIso: '$',
        formattedValue: '$20',
        value: 20,
      };
      const itemIndex = component.productCardOptions.itemIndex + 1;

      expect(component.getAriaLabelMultiSelected(product)).toBe(
        'configurator.a11y.itemOfAttributeSelectedPressToUnselectWithPrice attribute:' +
          component.productCardOptions.attributeLabel +
          ' item:' +
          product.code +
          ' itemCount:' +
          component.productCardOptions.itemCount +
          ' itemIndex:' +
          itemIndex +
          ' price:' +
          component.productCardOptions.productBoundValue?.valuePriceTotal
            ?.formattedValue
      );
    });

    it("should return 'configurator.a11y.itemOfAttributeSelectedPressToUnselect' if there is no price", () => {
      const productBoundValue = setProductBoundValueAttributes(
        component,
        true,
        undefined
      );
      productBoundValue.valuePrice = {
        currencyIso: '$',
        formattedValue: undefined,
        value: 0,
      };
      const itemIndex = component.productCardOptions.itemIndex + 1;

      expect(component.getAriaLabelMultiSelected(product)).toBe(
        'configurator.a11y.itemOfAttributeSelectedPressToUnselect attribute:' +
          component.productCardOptions.attributeLabel +
          ' item:' +
          product.code +
          ' itemCount:' +
          component.productCardOptions.itemCount +
          ' itemIndex:' +
          itemIndex
      );
    });
  });

  describe('getAriaLabelMultiUnselected', () => {
    it("should return 'configurator.a11y.itemOfAttributeUnselectedWithPrice' if there is a price", () => {
      const productBoundValue = setProductBoundValueAttributes(
        component,
        true,
        undefined
      );

      productBoundValue.valuePrice = {
        currencyIso: '$',
        formattedValue: '$20',
        value: 20,
      };
      productBoundValue.valuePriceTotal = {
        currencyIso: '$',
        formattedValue: '$20',
        value: 20,
      };
      const itemIndex = component.productCardOptions.itemIndex + 1;

      expect(component.getAriaLabelMultiUnselected(product)).toBe(
        'configurator.a11y.itemOfAttributeUnselectedWithPrice attribute:' +
          component.productCardOptions.attributeLabel +
          ' item:' +
          product.code +
          ' itemCount:' +
          component.productCardOptions.itemCount +
          ' itemIndex:' +
          itemIndex +
          ' price:' +
          component.productCardOptions.productBoundValue?.valuePriceTotal
            ?.formattedValue
      );
    });

    it("should return 'configurator.a11y.itemOfAttributeUnselected' if there is no price", () => {
      const productBoundValue = setProductBoundValueAttributes(
        component,
        true,
        undefined
      );
      productBoundValue.valuePrice = {
        currencyIso: '$',
        formattedValue: undefined,
        value: 0,
      };
      const itemIndex = component.productCardOptions.itemIndex + 1;

      expect(component.getAriaLabelMultiUnselected(product)).toBe(
        'configurator.a11y.itemOfAttributeUnselected attribute:' +
          component.productCardOptions.attributeLabel +
          ' item:' +
          product.code +
          ' itemCount:' +
          component.productCardOptions.itemCount +
          ' itemIndex:' +
          itemIndex
      );
    });
  });

  describe('getAriaLabelSingleUnselected', () => {
    it("should return 'configurator.a11y.itemOfAttributeUnselected' if there is a price", () => {
      const productBoundValue = setProductBoundValueAttributes(
        component,
        true,
        undefined
      );

      productBoundValue.valuePrice = {
        currencyIso: '$',
        formattedValue: '$20',
        value: 20,
      };
      productBoundValue.valuePriceTotal = {
        currencyIso: '$',
        formattedValue: '$20',
        value: 20,
      };
      const itemIndex = component.productCardOptions.itemIndex + 1;

      expect(component.getAriaLabelSingleUnselected(product)).toBe(
        'configurator.a11y.itemOfAttributeUnselectedWithPrice attribute:' +
          component.productCardOptions.attributeLabel +
          ' item:' +
          product.code +
          ' itemCount:' +
          component.productCardOptions.itemCount +
          ' itemIndex:' +
          itemIndex +
          ' price:' +
          component.productCardOptions.productBoundValue?.valuePriceTotal
            ?.formattedValue
      );
    });

    it("should return 'configurator.a11y.itemOfAttributeUnselected' if there is no price", () => {
      const productBoundValue = setProductBoundValueAttributes(
        component,
        true,
        undefined
      );
      productBoundValue.valuePrice = {
        currencyIso: '$',
        formattedValue: undefined,
        value: 0,
      };
      const itemIndex = component.productCardOptions.itemIndex + 1;

      expect(component.getAriaLabelSingleUnselected(product)).toBe(
        'configurator.a11y.itemOfAttributeUnselected attribute:' +
          component.productCardOptions.attributeLabel +
          ' item:' +
          product.code +
          ' itemCount:' +
          component.productCardOptions.itemCount +
          ' itemIndex:' +
          itemIndex
      );
    });

    it("should return 'configurator.a11y.selectNoItemOfAttribute' if there is valueCode=`###RETRACT_VALUE_CODE###` for the productBoundValue", () => {
      component.productCardOptions.productBoundValue.valueCode =
        Configurator.RetractValueCode;
      const itemIndex = component.productCardOptions.itemIndex + 1;
      expect(component.getAriaLabelSingleUnselected(product)).toBe(
        'configurator.a11y.selectNoItemOfAttribute attribute:' +
          component.productCardOptions.attributeLabel +
          ' itemCount:' +
          component.productCardOptions.itemCount +
          ' itemIndex:' +
          itemIndex
      );
    });
  });

  describe('Accessibility', () => {
    it("should contain div element with class name 'cx-product-card-container' and 'aria-label' attribute that defines an accessible name to label the current element", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'div',
        'cx-product-card-container',
        0,
        'aria-label',
        'configurator.a11y.itemOfAttribute attribute:' +
          component.productCardOptions.attributeLabel
      );
    });

    it("should contain cx-media element with 'aria-hidden' attribute that removes cx-media from the accessibility tree", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'cx-media',
        undefined,
        0,
        'aria-hidden',
        'true'
      );
    });

    it("should contain button element with class name 'btn-secondary' and 'aria-label' attribute that defines an accessible name to label the current element", () => {
      const itemIndex = component.productCardOptions.itemIndex + 1;
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'button',
        'btn-secondary',
        0,
        'aria-label',
        'configurator.a11y.itemOfAttributeUnselectedWithPrice attribute:' +
          component.productCardOptions.attributeLabel +
          ' item:' +
          product.code +
          ' itemCount:' +
          component.productCardOptions.itemCount +
          ' itemIndex:' +
          itemIndex +
          ' price:' +
          component.productCardOptions.productBoundValue?.valuePrice,
        'configurator.button.select'
      );
    });

    it("should contain button element with class name 'btn-secondary' and 'aria-describedby' that indicates the ID of the element that describe the elements", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'button',
        'btn-secondary',
        0,
        'aria-describedby',
        'cx-configurator--label--' +
          component.productCardOptions.attribute.name,
        'configurator.button.select'
      );
    });
  });

  describe('container row actions menu', () => {
    function setContainerRowActions(
      actions: Configurator.ContainerRowAction[]
    ): void {
      component.productCardOptions.containerRow = {
        id: 'row-1',
        productSystemId: 'PRODUCT_CODE',
        selected: true,
        actions,
      };
    }

    it('should show overflow menu toggle instead of add/remove when selected row actions are defined', () => {
      component.productCardOptions.multiSelect = true;
      setProductBoundValueAttributes(component);
      setContainerRowActions([
        Configurator.ContainerRowAction.DELETE,
        Configurator.ContainerRowAction.EDIT,
      ]);
      fixture.detectChanges();

      expect(
        htmlElem.querySelector('.cx-product-card-actions-menu-toggle')
      ).toBeTruthy();
      expect(htmlElem.querySelector('button.btn')).toBeFalsy();
    });

    it('should show `ADD` button for available products even when row actions are defined', () => {
      component.productCardOptions.multiSelect = true;
      setProductBoundValueAttributes(component, false);
      setContainerRowActions([
        Configurator.ContainerRowAction.ADD,
        Configurator.ContainerRowAction.EDIT,
      ]);
      fixture.detectChanges();

      expect(
        htmlElem.querySelector('.cx-product-card-actions-menu-toggle')
      ).toBeFalsy();
      expect(htmlElem.querySelector('button.btn-secondary')).toBeTruthy();
    });

    it('should render `ELLIPSIS` icon on overflow menu toggle', () => {
      component.productCardOptions.multiSelect = true;
      setProductBoundValueAttributes(component);
      setContainerRowActions([Configurator.ContainerRowAction.DELETE]);
      fixture.detectChanges();

      expect(
        htmlElem.querySelector('.cx-product-card-actions-menu-toggle cx-icon')
      ).toBeTruthy();
    });

    it('should open menu with one item per action', () => {
      component.productCardOptions.multiSelect = true;
      setProductBoundValueAttributes(component);
      setContainerRowActions([
        Configurator.ContainerRowAction.DELETE,
        Configurator.ContainerRowAction.EDIT,
        Configurator.ContainerRowAction.COPY,
      ]);
      fixture.detectChanges();

      const toggle = htmlElem.querySelector(
        '.cx-product-card-actions-menu-toggle'
      ) as HTMLButtonElement;
      toggle.click();
      fixture.detectChanges();

      expect(
        htmlElem.querySelectorAll('.cx-product-card-actions-menu-item').length
      ).toBe(3);
    });

    it('should emit handleRowAction when menu item is clicked', () => {
      spyOn(component.handleRowAction, 'emit');
      component.productCardOptions.multiSelect = true;
      setProductBoundValueAttributes(component);
      setContainerRowActions([
        Configurator.ContainerRowAction.DELETE,
        Configurator.ContainerRowAction.EDIT,
      ]);
      fixture.detectChanges();

      const toggle = htmlElem.querySelector(
        '.cx-product-card-actions-menu-toggle'
      ) as HTMLButtonElement;
      toggle.click();
      fixture.detectChanges();

      const menuItem = htmlElem.querySelector(
        '.cx-product-card-actions-menu-item button'
      ) as HTMLButtonElement;
      menuItem.click();

      expect(component.handleRowAction.emit).toHaveBeenCalledWith(
        Configurator.ContainerRowAction.DELETE
      );
      expect(component.isActionsMenuOpen).toBe(false);
    });

    it('should resolve translation keys for row actions', () => {
      expect(
        component.getContainerRowActionLabel(
          Configurator.ContainerRowAction.DELETE
        )
      ).toBe('configurator.button.remove');
      expect(
        component.getContainerRowActionLabel(
          Configurator.ContainerRowAction.EDIT
        )
      ).toBe('configurator.button.edit');
      expect(
        component.getContainerRowActionLabel(
          Configurator.ContainerRowAction.COPY
        )
      ).toBe('configurator.button.duplicate');
      expect(
        component.getContainerRowActionLabel(
          Configurator.ContainerRowAction.ADD
        )
      ).toBe('configurator.button.add');
      expect(
        component.getContainerRowActionLabel(
          'UNKNOWN' as Configurator.ContainerRowAction
        )
      ).toBe('UNKNOWN');
    });

    it('should toggle overflow menu and stop click propagation', () => {
      const event = jasmine.createSpyObj('event', ['stopPropagation']);

      component.toggleActionsMenu(event);
      expect(event.stopPropagation).toHaveBeenCalled();
      expect(component.isActionsMenuOpen).toBe(true);

      component.toggleActionsMenu(event);
      expect(component.isActionsMenuOpen).toBe(false);
    });

    it('should close the overflow menu on document click', () => {
      component.isActionsMenuOpen = true;
      fixture.detectChanges();

      htmlElem.ownerDocument.dispatchEvent(
        new MouseEvent('click', { bubbles: true })
      );

      expect(component.isActionsMenuOpen).toBe(false);
    });

    it('should close the overflow menu on escape key', () => {
      component.isActionsMenuOpen = true;
      fixture.detectChanges();

      htmlElem.ownerDocument.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
      );

      expect(component.isActionsMenuOpen).toBe(false);
    });

    it('should keep `ADD / REMOVE` buttons when the card is not in container context', () => {
      component.productCardOptions.multiSelect = true;
      setProductBoundValueAttributes(component);
      fixture.detectChanges();

      expect(
        htmlElem.querySelector('.cx-product-card-actions-menu-toggle')
      ).toBeFalsy();
      expect(htmlElem.querySelector('button.btn')).toBeTruthy();
    });

    it('should not render overflow menu or add/remove buttons when selected container row has no actions', () => {
      component.productCardOptions.multiSelect = true;
      setProductBoundValueAttributes(component);
      setContainerRowActions([]);
      fixture.detectChanges();

      expect(
        htmlElem.querySelector('.cx-product-card-actions-menu-toggle')
      ).toBeFalsy();
      expect(htmlElem.querySelector('button.btn')).toBeFalsy();
    });

    it('should not render overflow menu or add/remove buttons when selected container row has undefined actions', () => {
      component.productCardOptions.multiSelect = true;
      setProductBoundValueAttributes(component);
      component.productCardOptions.containerRow = {
        id: 'row-1',
        productSystemId: 'PRODUCT_CODE',
        selected: true,
      };
      fixture.detectChanges();

      expect(component.hasContainerRowActions).toBe(false);
      expect(component.showDefaultActions).toBe(false);
      expect(
        htmlElem.querySelector('.cx-product-card-actions-menu-toggle')
      ).toBeFalsy();
      expect(htmlElem.querySelector('button.btn')).toBeFalsy();
    });
  });

  describe('container row messages', () => {
    const rowGroupId = 'CONTAINER_ROW@123@row-1';

    function takeMessages(): {
      errorMessages: string[];
      warningMessages: string[];
      infoMessages: string[];
    } {
      let result!: {
        errorMessages: string[];
        warningMessages: string[];
        infoMessages: string[];
      };
      component.messages$
        .pipe(take(1))
        .subscribe((messages) => (result = messages));
      return result;
    }

    function setConfigurationGroups(groups: Configurator.Group[]): void {
      configuration$.next({
        ...ConfiguratorTestUtils.createConfiguration('config-id'),
        groups,
      });
    }

    function setContainerRowMessages(
      messages?: Configurator.Message[],
      options?: { groupId?: string; omitGroupId?: boolean }
    ): void {
      const groupId = options?.omitGroupId
        ? undefined
        : (options?.groupId ?? rowGroupId);
      component.productCardOptions.containerRow = {
        id: 'row-1',
        productSystemId: 'PRODUCT_CODE',
        selected: true,
        groupId,
      };
      setConfigurationGroups(
        groupId
          ? [
              {
                ...ConfiguratorTestUtils.createGroup(groupId),
                messages,
              },
            ]
          : []
      );
    }

    it('should not render messages if container row has none', () => {
      component.productCardOptions.multiSelect = true;
      setProductBoundValueAttributes(component);
      setContainerRowMessages();
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.container-error-msg'
      );
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.container-warning-msg'
      );
    });

    it('should not render the message container when there are no messages and no deselection error', () => {
      component.productCardOptions.multiSelect = true;
      setProductBoundValueAttributes(component);
      setContainerRowMessages();
      fixture.detectChanges();

      expect(htmlElem.querySelector('.cx-product-card.message')).toBeFalsy();
    });

    it('should render the message container when there are messages', () => {
      component.productCardOptions.multiSelect = true;
      setProductBoundValueAttributes(component);
      setContainerRowMessages([
        {
          message: 'Too many units',
          severity: Configurator.MessageSeverity.ERROR,
        },
      ]);
      fixture.detectChanges();

      expect(htmlElem.querySelector('.cx-product-card.message')).toBeTruthy();
    });

    it('should render the message container when a deselection error is shown', () => {
      component.productCardOptions.multiSelect = true;
      setProductBoundValueAttributes(component);
      setContainerRowMessages();
      component.showDeselectionNotPossible = true;
      fixture.detectChanges();

      expect(htmlElem.querySelector('.cx-product-card.message')).toBeTruthy();
    });

    it('should render warning messages for warning severity of the row group', () => {
      component.productCardOptions.multiSelect = true;
      setProductBoundValueAttributes(component);
      setContainerRowMessages([
        {
          message: 'Too many units',
          severity: Configurator.MessageSeverity.ERROR,
        },
        {
          message: 'Invalid selection',
          severity: Configurator.MessageSeverity.ERROR,
        },
      ]);
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-error-msg',
        2
      );
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-error-msg',
        'Too many units'
      );
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-error-msg',
        'Invalid selection',
        1
      );
      CommonConfiguratorTestUtilsService.expectElementPresent(
        expect,
        htmlElem,
        '.cx-error-msg cx-icon'
      );
    });

    it('should render info messages for info severity of unselected row group', () => {
      component.productCardOptions.multiSelect = true;
      setProductBoundValueAttributes(component, false);
      setContainerRowMessages([
        {
          message: 'Check quantity',
          severity: Configurator.MessageSeverity.INFO,
        },
        {
          message: 'Review selection',
          severity: Configurator.MessageSeverity.INFO,
        },
      ]);
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectNumberOfElementsPresent(
        expect,
        htmlElem,
        '.cx-info-msg',
        2
      );
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-info-msg',
        'Check quantity'
      );
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-info-msg',
        'Review selection',
        1
      );
      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-container-info-symbol'
      );
    });

    it('should treat messages without severity as info', () => {
      component.productCardOptions.multiSelect = true;
      setProductBoundValueAttributes(component);
      setContainerRowMessages([{ message: 'Unspecified message' }]);

      expect(takeMessages()).toEqual({
        errorMessages: [],
        warningMessages: [],
        infoMessages: ['Unspecified message'],
      });
    });

    it('should return empty arrays if no container row is bound', () => {
      expect(takeMessages()).toEqual({
        errorMessages: [],
        warningMessages: [],
        infoMessages: [],
      });
    });

    it('should return empty arrays if messages are undefined', () => {
      component.productCardOptions.multiSelect = true;
      setProductBoundValueAttributes(component);
      setContainerRowMessages();

      expect(takeMessages()).toEqual({
        errorMessages: [],
        warningMessages: [],
        infoMessages: [],
      });
    });

    it('should return empty arrays if the container row has no groupId', () => {
      component.productCardOptions.multiSelect = true;
      setProductBoundValueAttributes(component);
      setContainerRowMessages(
        [
          {
            message: 'Too many units',
            severity: Configurator.MessageSeverity.WARNING,
          },
        ],
        { omitGroupId: true }
      );

      expect(takeMessages()).toEqual({
        errorMessages: [],
        warningMessages: [],
        infoMessages: [],
      });
    });

    it('should return empty arrays if the configuration has no groups', () => {
      component.productCardOptions.multiSelect = true;
      setProductBoundValueAttributes(component);
      component.productCardOptions.containerRow = {
        id: 'row-1',
        productSystemId: 'PRODUCT_CODE',
        selected: true,
        groupId: rowGroupId,
      };

      expect(takeMessages()).toEqual({
        errorMessages: [],
        warningMessages: [],
        infoMessages: [],
      });
    });

    it('should return empty arrays if no matching row group exists', () => {
      component.productCardOptions.multiSelect = true;
      setProductBoundValueAttributes(component);
      component.productCardOptions.containerRow = {
        id: 'row-1',
        productSystemId: 'PRODUCT_CODE',
        selected: true,
        groupId: rowGroupId,
      };
      setConfigurationGroups([
        ConfiguratorTestUtils.createGroup('other-group'),
      ]);

      expect(takeMessages()).toEqual({
        errorMessages: [],
        warningMessages: [],
        infoMessages: [],
      });
    });

    it('should not fall back to root configuration messages', () => {
      component.productCardOptions.multiSelect = true;
      setProductBoundValueAttributes(component);
      component.productCardOptions.containerRow = {
        id: 'row-1',
        productSystemId: 'PRODUCT_CODE',
        selected: true,
        groupId: rowGroupId,
      };
      configuration$.next({
        ...ConfiguratorTestUtils.createConfiguration('config-id'),
        errorMessages: ['Root error'],
        warningMessages: ['Root warning'],
        groups: [ConfiguratorTestUtils.createGroup('other-group')],
      });

      expect(takeMessages()).toEqual({
        errorMessages: [],
        warningMessages: [],
        infoMessages: [],
      });
    });

    it('should look up messages from a nested subgroup by groupId', () => {
      component.productCardOptions.multiSelect = true;
      setProductBoundValueAttributes(component);
      component.productCardOptions.containerRow = {
        id: 'row-1',
        productSystemId: 'PRODUCT_CODE',
        selected: true,
        groupId: rowGroupId,
      };
      const nestedGroup = {
        ...ConfiguratorTestUtils.createGroup(rowGroupId),
        messages: [
          {
            message: 'Nested warning',
            severity: Configurator.MessageSeverity.WARNING,
          },
        ],
      };
      setConfigurationGroups([
        {
          ...ConfiguratorTestUtils.createGroup('parent-group'),
          subGroups: [nestedGroup],
        },
      ]);

      expect(takeMessages().warningMessages).toEqual(['Nested warning']);
    });

    it('should not render info messages on selected products', () => {
      component.productCardOptions.multiSelect = true;
      setProductBoundValueAttributes(component, true);
      setContainerRowMessages([
        {
          message: 'Check quantity',
          severity: Configurator.MessageSeverity.INFO,
        },
      ]);
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.cx-container-info-msg'
      );
    });

    it('should not render warning messages on unselected products', () => {
      component.productCardOptions.multiSelect = true;
      setProductBoundValueAttributes(component, false);
      setContainerRowMessages([
        {
          message: 'Too many units',
          severity: Configurator.MessageSeverity.WARNING,
        },
      ]);
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementNotPresent(
        expect,
        htmlElem,
        '.container-warning-msg'
      );
    });

    it('should prepend container context messages before row messages', () => {
      component.productCardOptions.multiSelect = true;
      component.productCardOptions.includeContainerContextMessages = true;
      component.productCardOptions.attribute.container = {
        rows: [{ id: '1', selected: true }],
      };
      component.productCardOptions.attribute.required = true;
      component.productCardOptions.attribute.incomplete = true;
      component.productCardOptions.groupId = 'group-id';
      setProductBoundValueAttributes(component, false);
      setContainerRowMessages([
        {
          message: 'Too many units',
          severity: Configurator.MessageSeverity.WARNING,
        },
      ]);
      // setContainerRowMessages resets containerRow, so apply the min/max rows afterward.
      // Cast to `any` to avoid strict typing issues in the test helper.
      component.productCardOptions.containerRow = {
        ...(component.productCardOptions.containerRow as any),
        minRows: 2,
        maxRows: 4,
      } as any as Configurator.ContainerRow;

      const groups = component.getMessageGroups(takeMessages());

      expect(groups.map((group) => group.uiKeyPrefix)).toEqual([
        'row-container-info-msg',
        'row-required-msg',
        'warning-msg',
      ]);
    });

    it('should pass warning data to selected product cards', () => {
      component.productCardOptions.multiSelect = true;
      setProductBoundValueAttributes(component, true);
      setContainerRowMessages([
        {
          message: 'Too many units',
          severity: Configurator.MessageSeverity.ERROR,
        },
        {
          message: 'Check quantity',
          severity: Configurator.MessageSeverity.INFO,
        },
      ]);

      const groups = component.getMessageGroups(takeMessages());
      const errors = groups.find((group) => group.uiKeyPrefix === 'error-msg');

      expect(errors?.messages).toEqual(['Too many units']);
      expect(errors?.messageClass).toBe('cx-error-msg');
      expect(errors?.iconClass).toBeUndefined();
      expect(errors?.showIcon).toBe(true);
      expect(errors?.uiKeyPrefix).toBe('error-msg');
      expect(
        groups.find((group) => group.uiKeyPrefix === 'info-msg')
      ).toBeUndefined();
    });

    it('should pass info data to unselected product cards', () => {
      component.productCardOptions.multiSelect = true;
      setProductBoundValueAttributes(component, false);
      setContainerRowMessages([
        {
          message: 'Too many units',
          severity: Configurator.MessageSeverity.ERROR,
        },
        {
          message: 'Check quantity',
          severity: Configurator.MessageSeverity.INFO,
        },
      ]);

      const groups = component.getMessageGroups(takeMessages());
      const info = groups.find((group) => group.uiKeyPrefix === 'info-msg');
      const error = groups.find((group) => group.uiKeyPrefix === 'error-msg');

      expect(info?.messages).toEqual(['Check quantity']);
      expect(info?.messageClass).toBe('cx-info-msg');
      expect(info?.showIcon).toBe(false);
      expect(info?.uiKeyPrefix).toBe('info-msg');
      expect(error).toBeUndefined();
    });
  });

  describe('additional utility methods', () => {
    it('should extract price formula parameters for single-select', () => {
      // single select
      component.productCardOptions.multiSelect = false;
      const productBoundValue = setProductBoundValueAttributes(
        component,
        true,
        undefined
      );
      productBoundValue.valuePrice = {
        currencyIso: '$',
        formattedValue: '$5',
        value: 5,
      } as any;

      const params = component.extractPriceFormulaParameters();
      expect(params.price).toBe(productBoundValue.valuePrice);
      expect(params.isLightedUp).toBe(true);
      expect((params as any).quantity).toBeUndefined();
    });

    it('should extract price formula parameters for multi-select', () => {
      component.productCardOptions.multiSelect = true;
      const productBoundValue = setProductBoundValueAttributes(
        component,
        true,
        3
      );
      productBoundValue.valuePrice = {
        currencyIso: '$',
        formattedValue: '$5',
        value: 5,
      } as any;
      productBoundValue.valuePriceTotal = {
        currencyIso: '$',
        formattedValue: '$15',
        value: 15,
      } as any;

      const params = component.extractPriceFormulaParameters();
      expect((params as any).quantity).toBe(3);
      expect(params.price).toBe(productBoundValue.valuePrice);
      expect((params as any).priceTotal).toBe(
        productBoundValue.valuePriceTotal
      );
      expect(params.isLightedUp).toBe(true);
    });

    it('should determine product card selection correctly', () => {
      // selected and not single dropdown => true
      setProductBoundValueAttributes(component, true);
      component.productCardOptions.singleDropdown = false;
      expect(component.isProductCardSelected()).toBe(true);

      // singleDropdown true => false
      component.productCardOptions.singleDropdown = true;
      expect(component.isProductCardSelected()).toBe(false);

      // not selected => false
      setProductBoundValueAttributes(component, false);
      component.productCardOptions.singleDropdown = false;
      expect(component.isProductCardSelected()).toBe(false);
    });

    it('should emit row action and close menu onHandleRowAction', () => {
      spyOn(component.handleRowAction, 'emit');
      component.isActionsMenuOpen = true;
      component.onHandleRowAction(Configurator.ContainerRowAction.DELETE);
      expect(component.handleRowAction.emit).toHaveBeenCalledWith(
        Configurator.ContainerRowAction.DELETE
      );
      expect(component.isActionsMenuOpen).toBe(false);
    });
  });
});
