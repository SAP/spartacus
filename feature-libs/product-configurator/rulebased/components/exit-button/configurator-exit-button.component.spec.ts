import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  I18nTestingModule,
  Product,
  ProductService,
  RoutingService,
} from '@spartacus/core';
import { ConfiguratorRouter } from '../../../common/components/service/configurator-router-data';
import {
  CommonConfigurator,
  ConfiguratorType,
} from '../../../common/core/model/common-configurator.model';
import { ConfiguratorModelUtils } from '../../../common/shared/utils/configurator-model-utils';
import { BreakpointService } from '@spartacus/storefront';
import { of } from 'rxjs';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { MockConfiguratorProductService } from '../../../common/testing/services/mock-configurator-product.service';
import { MockConfiguratorRoutingService } from '../../../common/testing/services/mock-configurator-routing.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { ConfiguratorExitButtonComponent } from './configurator-exit-button.component';
import {
  MockConfiguratorProviderService,
  provideConfiguratorMockCommonsService,
  provideConfiguratorMockRouterExtractorService,
} from '../../testing';

const PRODUCT_CODE = 'CONF_LAPTOP';
const CART_ENTRY_KEY = '001+1';
const PRODUCT_KEY = '001+1';
const PRODUCT: Product = {
  code: PRODUCT_CODE,
};

const mockRouterData: any = {
  pageType: ConfiguratorRouter.PageType.CONFIGURATION,
  isOwnerCartEntry: false,
  owner: {
    type: CommonConfigurator.OwnerType.PRODUCT,
    id: PRODUCT_CODE,
    configuratorType: ConfiguratorType.CPQ,
  },
  displayOnly: false,
  forceReload: false,
  resolveIssues: false,
};

let configuration: Configurator.Configuration =
  ConfiguratorTestUtils.createConfiguration(
    'a',
    ConfiguratorModelUtils.createOwner(
      CommonConfigurator.OwnerType.PRODUCT,
      PRODUCT_CODE
    )
  );

let component: ConfiguratorExitButtonComponent;
let fixture: ComponentFixture<ConfiguratorExitButtonComponent>;
let htmlElem: HTMLElement;

function initialize() {
  fixture = TestBed.createComponent(ConfiguratorExitButtonComponent);
  component = fixture.componentInstance;
  htmlElem = fixture.nativeElement;
}

function setRouterTestDataCartEntry() {
  mockRouterData.isOwnerCartEntry = true;
  mockRouterData.owner.type = CommonConfigurator.OwnerType.CART_ENTRY;
  mockRouterData.owner.id = CART_ENTRY_KEY;
  mockRouterData.pageType = ConfiguratorRouter.PageType.CONFIGURATION;
}

function setRouterTestDataProduct() {
  mockRouterData.isOwnerCartEntry = false;
  mockRouterData.owner.type = CommonConfigurator.OwnerType.PRODUCT;
  mockRouterData.owner.id = PRODUCT_KEY;
  mockRouterData.pageType = ConfiguratorRouter.PageType.CONFIGURATION;
}

describe('ConfiguratorExitButton', () => {
  let routingService: MockConfiguratorRoutingService;
  let breakpointService: BreakpointService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        ReactiveFormsModule,
        NgSelectModule,
        ConfiguratorExitButtonComponent,
      ],
      providers: [
        provideConfiguratorMockRouterExtractorService({
          routerDataSource: () => of(mockRouterData),
        }),
        provideConfiguratorMockCommonsService({
          configurationSource: () => of(configuration),
        }),
        {
          provide: ProductService,
          useClass: MockConfiguratorProviderService.MockProductService,
        },
        {
          provide: RoutingService,
          useClass: MockConfiguratorProviderService.MockRoutingService,
        },
        {
          provide: BreakpointService,
          useClass: MockConfiguratorProviderService.MockBreakpointService,
        },
      ],
    });
  });

  beforeEach(() => {
    const productService = TestBed.inject(
      ProductService
    ) as unknown as MockConfiguratorProductService;
    productService.product = PRODUCT;

    routingService = TestBed.inject(
      RoutingService
    ) as unknown as MockConfiguratorRoutingService;
    routingService.getRouterState.mockReturnValue(of({ state: {} } as any));

    breakpointService = TestBed.inject(BreakpointService);
  });

  it('should create component', () => {
    initialize();
    fixture.detectChanges();
    expect(component).toBeDefined();
  });

  describe('exit a configuration', () => {
    it('should navigate to product detail page', () => {
      vi.spyOn(routingService, 'go');
      setRouterTestDataProduct();
      initialize();
      fixture.detectChanges();
      component.exitConfiguration();
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'product',
        params: PRODUCT,
      });
    });

    it('should navigate back to cart', () => {
      vi.spyOn(routingService, 'go');
      setRouterTestDataCartEntry();
      initialize();
      fixture.detectChanges();
      component.exitConfiguration();
      expect(routingService.go).toHaveBeenCalledWith('cart');
    });
  });

  describe('rendering tests', () => {
    it('should render short text in mobile mode', () => {
      vi.spyOn(breakpointService, 'isDown').mockReturnValue(of(true));
      vi.spyOn(breakpointService, 'isUp').mockReturnValue(of(false));
      setRouterTestDataProduct();
      initialize();
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'button',
        'configurator.button.exitMobile'
      );
    });

    it('should render long text tooltip in mobile mode', () => {
      vi.spyOn(breakpointService, 'isDown').mockReturnValue(of(true));
      vi.spyOn(breakpointService, 'isUp').mockReturnValue(of(false));
      setRouterTestDataProduct();
      initialize();
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'button',
        'btn-tertiary',
        0,
        'title',
        'configurator.button.exit'
      );
    });

    it('should render long text in desktop mode', () => {
      vi.spyOn(breakpointService, 'isUp').mockReturnValue(of(true));
      vi.spyOn(breakpointService, 'isDown').mockReturnValue(of(false));
      setRouterTestDataProduct();
      initialize();
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'button',
        'configurator.button.exit'
      );
    });

    it('should render long text tooltip in desktop mode', () => {
      vi.spyOn(breakpointService, 'isUp').mockReturnValue(of(true));
      vi.spyOn(breakpointService, 'isDown').mockReturnValue(of(false));
      setRouterTestDataProduct();
      initialize();
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'button',
        'configurator.button.exit'
      );
    });

    it('should render short text  when navigate from cart', () => {
      vi.spyOn(breakpointService, 'isDown').mockReturnValue(of(true));
      vi.spyOn(breakpointService, 'isUp').mockReturnValue(of(false));
      setRouterTestDataCartEntry();
      initialize();
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'button',
        'configurator.button.cancelConfigurationMobile'
      );
    });

    it('should render long text tooltip when navigate from cart in mobile mode', () => {
      vi.spyOn(breakpointService, 'isDown').mockReturnValue(of(true));
      vi.spyOn(breakpointService, 'isUp').mockReturnValue(of(false));
      setRouterTestDataCartEntry();
      initialize();
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'button',
        'btn-tertiary',
        0,
        'title',
        'configurator.button.cancelConfiguration'
      );
    });

    it('should render long text  when navigate from cart', () => {
      vi.spyOn(breakpointService, 'isDown').mockReturnValue(of(false));
      vi.spyOn(breakpointService, 'isUp').mockReturnValue(of(true));
      setRouterTestDataCartEntry();
      initialize();
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'button',
        'configurator.button.cancelConfiguration'
      );
    });

    it('should render long text tooltip when navigate from cart in desktop mode', () => {
      vi.spyOn(breakpointService, 'isDown').mockReturnValue(of(false));
      vi.spyOn(breakpointService, 'isUp').mockReturnValue(of(true));
      setRouterTestDataCartEntry();
      initialize();
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'button',
        'btn-tertiary',
        0,
        'title',
        'configurator.button.cancelConfiguration'
      );
    });
  });
});
