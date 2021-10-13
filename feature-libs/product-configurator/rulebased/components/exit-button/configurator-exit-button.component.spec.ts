import { Type } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  I18nTestingModule,
  Product,
  ProductService,
  RoutingService,
  WindowRef,
} from '@spartacus/core';
import {
  Configurator,
  ConfiguratorCommonsService,
  ConfiguratorExitButtonComponent,
} from '@spartacus/product-configurator/rulebased';
import { BreakpointService } from '@spartacus/storefront';
import {
  CommonConfigurator,
  ConfiguratorModelUtils,
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';
import { Observable, of } from 'rxjs';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';

const PRODUCT_CODE = 'CONF_LAPTOP';
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

let configuration: Configurator.Configuration = ConfiguratorTestUtils.createConfiguration(
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
}

class MockWindowRef {
  nativeWindow: {
    history: {
      length: 1;
      go: () => {};
    };
  };
}

describe('ConfiguratorExitButton', () => {
  let component: ConfiguratorExitButtonComponent;
  let fixture: ComponentFixture<ConfiguratorExitButtonComponent>;
  let htmlElem: HTMLElement;
  let routingService: RoutingService;
  let breakpointService: BreakpointService;
  let windowRef: WindowRef;

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
            provide: WindowRef,
            useClass: MockWindowRef,
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
    windowRef = TestBed.inject(WindowRef as Type<WindowRef>);
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

  describe('navigation tests', () => {
    it('should navigate back to previous page ', () => {
      if (windowRef.nativeWindow?.history) {
        spyOn(windowRef.nativeWindow?.history, 'go').and.callThrough();
        windowRef.nativeWindow?.history.length === 2;
        component.goBack();
        expect(windowRef.nativeWindow?.history.go).toHaveBeenCalledWith(-1);
      }
    });

    it('should navigate to product detail page if going back to previous page does not work', () => {
      spyOn(routingService, 'go').and.callThrough();
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'product',
        params: PRODUCT,
      });
    });
  });

  describe('rendering tests', () => {
    it('should render short text in mobile mode', () => {
      spyOn(breakpointService, 'isUp').and.returnValue(of(false));
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-config-exit-button-text',
        'configurator.button.exit'
      );
    });

    it('should render long text in desktop mode', () => {
      spyOn(breakpointService, 'isUp').and.returnValue(of(true));
      fixture.detectChanges();
      CommonConfiguratorTestUtilsService.expectElementToContainText(
        expect,
        htmlElem,
        '.cx-config-exit-button-text',
        'configurator.button.exitshort'
      );
    });
  });
});
