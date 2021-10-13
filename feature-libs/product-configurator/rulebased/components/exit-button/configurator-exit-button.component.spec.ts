import { Type } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterState } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  I18nTestingModule,
  ProductService,
  RoutingService,
  WindowRef,
} from '@spartacus/core';
import {
  Configurator,
  ConfiguratorCommonsService,
  ConfiguratorExitButtonComponent,
} from '@spartacus/product-configurator/rulebased';
import {
  CommonConfigurator,
  ConfiguratorModelUtils,
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
  ConfiguratorType,
} from 'feature-libs/product-configurator/common';
import { EMPTY, Observable, of } from 'rxjs';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';

const PRODUCT_CODE = 'CONF_LAPTOP';
const Product = 'Laptop';

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

let configuration: Configurator.Configuration = ConfiguratorTestUtils.createConfiguration('a', ConfiguratorModelUtils.createOwner(
  CommonConfigurator.OwnerType.PRODUCT,
  PRODUCT_CODE
));

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
  go() { }
}

class MockProductService {
  getProduct(): Observable<typeof Product> {
    return of(Product);
  }
}
//we cannot spy go() therefore we check via property.
class MockWindowRef {
  nativeWindow: {
    history: {
      goMethodCalled: false,
      length: 0,
      go: () => { if(this) {
        this?.goMethodCalled = true;
       }
      }
    }
  }
}


describe('ConfiguratorExitButton', () => {
  let component: ConfiguratorExitButtonComponent;
  let fixture: ComponentFixture<ConfiguratorExitButtonComponent>;
  let htmlElem: HTMLElement;
  let routingService: RoutingService;
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
        ],
      });
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorExitButtonComponent);
    component = fixture.componentInstance;
    windowRef = TestBed.inject(
      WindowRef as Type<WindowRef>
    );
    routingService = TestBed.inject(
      RoutingService as Type<RoutingService>
    );

  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should navigate back to previous page ', () => {
    if (windowRef.nativeWindow?.history) {
       windowRef.nativeWindow?.history.length === 2;
       }
    component.goBack();
    expect(component.goBack()).toHaveBeenCalledWith(-1);
  });

  it('should navigate product detail page if going back to previous page does not work', () => {
    expect(component.).toBeCalledWith({ cxRoute: 'product', params: Product });
  });

});
