import { Type } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  I18nTestingModule,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorModelUtils,
} from '@spartacus/product-configurator/common';
import { PageLayoutModule } from '@spartacus/storefront';
import { cold } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { ConfiguratorTextfieldService } from '../../core/facade/configurator-textfield.service';
import { ConfiguratorTextfield } from '../../core/model/configurator-textfield.model';
import { ConfiguratorTextfieldAddToCartButtonComponent } from '../add-to-cart-button/configurator-textfield-add-to-cart-button.component';
import { ConfiguratorTextfieldInputFieldComponent } from '../input-field/configurator-textfield-input-field.component';
import { ConfiguratorTextfieldFormComponent } from './configurator-textfield-form.component';

const PRODUCT_CODE = 'CONF_LAPTOP';
const CART_ENTRY_KEY = '3';
const ORDER_ENTRY_KEY = '00100/3';
const ATTRIBUTE_NAME = 'AttributeName';
const ROUTE_CONFIGURATION = 'configureTEXTFIELD';
const ROUTE_CONFIGURATION_OVERVIEW = 'configureOverviewTEXTFIELD';
const mockRouterState: any = {
  state: {
    params: {
      ownerType: CommonConfigurator.OwnerType.PRODUCT,
      entityKey: PRODUCT_CODE,
    },
    semanticRoute: ROUTE_CONFIGURATION,
  },
};
const productConfig: ConfiguratorTextfield.Configuration = {
  configurationInfos: [{ configurationLabel: ATTRIBUTE_NAME }],
  owner: ConfiguratorModelUtils.createInitialOwner(),
};
class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return cold('-r', {
      r: mockRouterState,
    });
  }
}

class MockConfiguratorTextfieldService {
  createConfiguration(): Observable<ConfiguratorTextfield.Configuration> {
    return cold('-p', {
      p: productConfig,
    });
  }
  updateConfiguration(): void {}
  readConfigurationForCartEntry(): Observable<ConfiguratorTextfield.Configuration> {
    return cold('-p', {
      p: productConfig,
    });
  }
  readConfigurationForOrderEntry(): Observable<ConfiguratorTextfield.Configuration> {
    return cold('-p', {
      p: productConfig,
    });
  }
}
describe('TextfieldFormComponent', () => {
  let component: ConfiguratorTextfieldFormComponent;
  let fixture: ComponentFixture<ConfiguratorTextfieldFormComponent>;
  let textfieldService: ConfiguratorTextfieldService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          I18nTestingModule,
          ReactiveFormsModule,
          NgSelectModule,
          PageLayoutModule,
        ],
        declarations: [
          ConfiguratorTextfieldFormComponent,
          ConfiguratorTextfieldInputFieldComponent,
          ConfiguratorTextfieldAddToCartButtonComponent,
        ],
        providers: [
          {
            provide: RoutingService,
            useClass: MockRoutingService,
          },
          {
            provide: ConfiguratorTextfieldService,
            useClass: MockConfiguratorTextfieldService,
          },
        ],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorTextfieldFormComponent);
    component = fixture.componentInstance;
    textfieldService = TestBed.inject(
      ConfiguratorTextfieldService as Type<ConfiguratorTextfieldService>
    );
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should know product configuration after init has been done', () => {
    mockRouterState.state = {
      params: {
        ownerType: CommonConfigurator.OwnerType.PRODUCT,
        entityKey: PRODUCT_CODE,
      },
      semanticRoute: ROUTE_CONFIGURATION,
    };
    expect(component.configuration$).toBeObservable(
      cold('--p', {
        p: productConfig,
      })
    );
  });

  it('should know product configuration after init when starting from cart', () => {
    mockRouterState.state = {
      params: {
        ownerType: CommonConfigurator.OwnerType.CART_ENTRY,
        entityKey: CART_ENTRY_KEY,
      },
      semanticRoute: ROUTE_CONFIGURATION,
    };

    expect(component.configuration$).toBeObservable(
      cold('--p', {
        p: productConfig,
      })
    );
  });

  it('should know textfield configuration after init when starting from order entry', () => {
    mockRouterState.state = {
      params: {
        ownerType: CommonConfigurator.OwnerType.ORDER_ENTRY,
        entityKey: ORDER_ENTRY_KEY,
      },
      semanticRoute: ROUTE_CONFIGURATION,
    };

    expect(component.configuration$).toBeObservable(
      cold('--p', {
        p: productConfig,
      })
    );
  });

  it('should call update configuration on facade in case it was triggered on component', () => {
    spyOn(textfieldService, 'updateConfiguration').and.callThrough();
    component.updateConfiguration(productConfig.configurationInfos[0]);
    expect(textfieldService.updateConfiguration).toHaveBeenCalledTimes(1);
  });

  it('should detect that content is editable in case route refers to configuration', () => {
    mockRouterState.state = {
      params: {
        ownerType: CommonConfigurator.OwnerType.PRODUCT,
        entityKey: PRODUCT_CODE,
      },
      semanticRoute: ROUTE_CONFIGURATION,
    };
    expect(component.isEditable$).toBeObservable(
      cold('-b', {
        b: true,
      })
    );
  });

  it('should detect that content is read-only in case route refers to configuration overview', () => {
    mockRouterState.state = {
      params: {
        ownerType: CommonConfigurator.OwnerType.PRODUCT,
        entityKey: PRODUCT_CODE,
      },
      semanticRoute: ROUTE_CONFIGURATION_OVERVIEW,
    };
    expect(component.isEditable$).toBeObservable(
      cold('-b', {
        b: false,
      })
    );
  });
});
