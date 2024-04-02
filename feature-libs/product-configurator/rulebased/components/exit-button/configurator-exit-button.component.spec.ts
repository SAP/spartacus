import { Type } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BreakpointService } from '@spartacus/storefront';
import {
  I18nTestingModule,
  Product,
  ProductService,
  RoutingService,
} from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorModelUtils,
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorExitButtonComponent } from './configurator-exit-button.component';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { Observable, of } from 'rxjs';

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

class MockConfiguratorRouterExtractorService {
  extractRouterData(): Observable<ConfiguratorRouter.Data> {
    return of(mockRouterData);
  }
}

class MockConfiguratorCommonsService {
  getConfiguration(): Observable<Configurator.Configuration> {
    return of(configuration);
  }
}

class MockRoutingService {
  go() {}
}

class MockProductService {
  get(): Observable<Product> {
    return of(PRODUCT);
  }
}

class MockBreakpointService {
  isUp() {}
  isDown() {}
}

let component: ConfiguratorExitButtonComponent;
let fixture: ComponentFixture<ConfiguratorExitButtonComponent>;
let htmlElem: HTMLElement;

function initialize() {
  fixture = TestBed.createComponent(ConfiguratorExitButtonComponent);
  component = fixture.componentInstance;
  htmlElem = fixture.nativeElement;
  fixture.detectChanges();
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
  let routingService: RoutingService;
  let breakpointService: BreakpointService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, ReactiveFormsModule, NgSelectModule],
        declarations: [ConfiguratorExitButtonComponent],
        providers: [
          {
            provide: ConfiguratorRouterExtractorService,
            useClass: MockConfiguratorRouterExtractorService,
          },
          {
            provide: ConfiguratorCommonsService,
            useClass: MockConfiguratorCommonsService,
          },
          {
            provide: ProductService,
            useClass: MockProductService,
          },
          {
            provide: RoutingService,
            useClass: MockRoutingService,
          },
          {
            provide: BreakpointService,
            useClass: MockBreakpointService,
          },
        ],
      });
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorExitButtonComponent);
    component = fixture.componentInstance;
    routingService = TestBed.inject(RoutingService as Type<RoutingService>);
    breakpointService = TestBed.inject(
      BreakpointService as Type<BreakpointService>
    );
    htmlElem = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  describe('exit a configuration', () => {
    it('should navigate to product detail page', () => {
      spyOn(routingService, 'go').and.callThrough();
      setRouterTestDataProduct();
      initialize();
      component.exitConfiguration();
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'product',
        params: PRODUCT,
      });
    });

    it('should navigate back to cart', () => {
      spyOn(routingService, 'go').and.callThrough();
      setRouterTestDataCartEntry();
      initialize();
      component.exitConfiguration();
      expect(routingService.go).toHaveBeenCalledWith('cart');
    });
  });

  describe('rendering tests', () => {
    it('should render short text in mobile mode', () => {
      spyOn(breakpointService, 'isDown').and.returnValue(of(true));
      spyOn(breakpointService, 'isUp').and.returnValue(of(false));
      setRouterTestDataProduct();
      initialize();
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'button',
        'configurator.button.exitMobile'
      );
    });

    it('should render long text tooltip in mobile mode', () => {
      spyOn(breakpointService, 'isDown').and.returnValue(of(true));
      spyOn(breakpointService, 'isUp').and.returnValue(of(false));
      setRouterTestDataProduct();
      initialize();
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
      spyOn(breakpointService, 'isUp').and.returnValue(of(true));
      spyOn(breakpointService, 'isDown').and.returnValue(of(false));
      setRouterTestDataProduct();
      initialize();
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'button',
        'configurator.button.exit'
      );
    });

    it('should render long text tooltip in desktop mode', () => {
      spyOn(breakpointService, 'isUp').and.returnValue(of(true));
      spyOn(breakpointService, 'isDown').and.returnValue(of(false));
      setRouterTestDataProduct();
      initialize();
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'button',
        'configurator.button.exit'
      );
    });

    it('should render short text  when navigate from cart', () => {
      spyOn(breakpointService, 'isDown').and.returnValue(of(true));
      spyOn(breakpointService, 'isUp').and.returnValue(of(false));
      setRouterTestDataCartEntry();
      initialize();
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'button',
        'configurator.button.cancelConfigurationMobile'
      );
    });

    it('should render long text tooltip when navigate from cart in mobile mode', () => {
      spyOn(breakpointService, 'isDown').and.returnValue(of(true));
      spyOn(breakpointService, 'isUp').and.returnValue(of(false));
      setRouterTestDataCartEntry();
      initialize();
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
      spyOn(breakpointService, 'isDown').and.returnValue(of(false));
      spyOn(breakpointService, 'isUp').and.returnValue(of(true));
      setRouterTestDataCartEntry();
      initialize();
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        'button',
        'configurator.button.cancelConfiguration'
      );
    });

    it('should render long text tooltip when navigate from cart in desktop mode', () => {
      spyOn(breakpointService, 'isDown').and.returnValue(of(false));
      spyOn(breakpointService, 'isUp').and.returnValue(of(true));
      setRouterTestDataCartEntry();
      initialize();
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
