import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  GenericConfigurator,
  I18nTestingModule,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { PageLayoutModule } from '@spartacus/storefront';
import { cold } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { ConfiguratorTextfieldService } from '../../core/facade/configurator-textfield.service';
import { ConfiguratorTextfield } from '../../core/model/configurator-textfield.model';
import { ConfigTextfieldAddToCartButtonComponent } from '../config-textfield-add-to-cart-button/config-textfield-add-to-cart-button.component';
import { ConfigTextfieldInputFieldComponent } from '../config-textfield-input-field/config-textfield-input-field.component';
import { ConfigTextfieldFormComponent } from './config-textfield-form.component';

const PRODUCT_CODE = 'CONF_LAPTOP';
const CART_ENTRY_KEY = '3';
const ATTRIBUTE_NAME = 'AttributeName';
const ROUTE_CONFIGURATION = 'configureTEXTFIELD';
const mockRouterState: any = {
  state: {
    params: {
      ownerType: GenericConfigurator.OwnerType.PRODUCT,
      entityKey: PRODUCT_CODE,
    },
    semanticRoute: ROUTE_CONFIGURATION,
  },
};
const productConfig: ConfiguratorTextfield.Configuration = {
  configurationInfos: [{ configurationLabel: ATTRIBUTE_NAME }],
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
  readConfigurationForCartEntry(): Observable<
    ConfiguratorTextfield.Configuration
  > {
    return cold('-p', {
      p: productConfig,
    });
  }
}
describe('TextfieldFormComponent', () => {
  let component: ConfigTextfieldFormComponent;
  let fixture: ComponentFixture<ConfigTextfieldFormComponent>;
  let textfieldService: ConfiguratorTextfieldService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        ReactiveFormsModule,
        NgSelectModule,
        PageLayoutModule,
      ],
      declarations: [
        ConfigTextfieldFormComponent,
        ConfigTextfieldInputFieldComponent,
        ConfigTextfieldAddToCartButtonComponent,
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
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigTextfieldFormComponent);
    component = fixture.componentInstance;
    textfieldService = TestBed.inject(
      ConfiguratorTextfieldService as Type<ConfiguratorTextfieldService>
    );
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should know product configuration after init has been done', () => {
    expect(component.configuration$).toBeObservable(
      cold('--p', {
        p: productConfig,
      })
    );
  });

  it('should know product configuration after init when starting from cart', () => {
    mockRouterState.state = {
      params: {
        ownerType: GenericConfigurator.OwnerType.CART_ENTRY,
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

  it('should call update configuration on facade in case it was triggered on component', () => {
    spyOn(textfieldService, 'updateConfiguration').and.callThrough();
    component.updateConfiguration(productConfig.configurationInfos[0]);
    expect(textfieldService.updateConfiguration).toHaveBeenCalledTimes(1);
  });
});
