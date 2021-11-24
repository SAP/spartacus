import { Type, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  I18nTestingModule,
  RouterState,
  RoutingService,
  LanguageService,
} from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorModelUtils,
  ConfiguratorRouterExtractorService,
  ConfiguratorRouter,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';
import { cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorTextfieldService } from '../../core/facade/configurator-textfield.service';
import { ConfiguratorTextfield } from '../../core/model/configurator-textfield.model';
import { ConfiguratorTextfieldAddToCartButtonComponent } from '../add-to-cart-button/configurator-textfield-add-to-cart-button.component';
import { ConfiguratorTextfieldInputFieldComponent } from '../input-field/configurator-textfield-input-field.component';
import { ConfiguratorTextfieldInputFieldReadonlyComponent } from '../input-field-readonly/configurator-textfield-input-field-readonly.component';
import { ConfiguratorTextfieldFormComponent } from './configurator-textfield-form.component';

const PRODUCT_CODE = 'CONF_LAPTOP';
const CART_ENTRY_KEY = '3';
const ORDER_ENTRY_KEY = '00100/3';
const ATTRIBUTE_NAME = 'AttributeName';
const ROUTE_CONFIGURATION = 'configureTEXTFIELD';
const ROUTE_CONFIGURATION_OVERVIEW = 'configureOverviewTEXTFIELD';

const mockRouterData: any = {
  pageType: ConfiguratorRouter.PageType.CONFIGURATION,
  isOwnerCartEntry: false,
  owner: {
    type: CommonConfigurator.OwnerType.PRODUCT,
    id: PRODUCT_CODE,
    configuratorType: ConfiguratorType.TEXTFIELD,
  },
  semanticRoute: ROUTE_CONFIGURATION,
};

const mockRouterState: any = {
  state: {
    params: {
      ownerType: CommonConfigurator.OwnerType.PRODUCT,
      entityKey: PRODUCT_CODE,
      configuratorType: ConfiguratorType.TEXTFIELD,
      pageType: ConfiguratorRouter.PageType.CONFIGURATION,
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

@Pipe({
  name: 'cxTranslate',
})
class MockTranslatePipe implements PipeTransform {
  transform(): any {}
}

class MockConfiguratorRouterExtractorService {
  extractRouterData(): Observable<ConfiguratorRouter.Data> {
    return of(mockRouterData);
  }
}

describe('TextfieldFormComponent', () => {
  let component: ConfiguratorTextfieldFormComponent;
  let fixture: ComponentFixture<ConfiguratorTextfieldFormComponent>;
  let textfieldService: ConfiguratorTextfieldService;
  let htmlElem: HTMLElement;
  let mockLanguageService;

  beforeEach(
    waitForAsync(() => {
      mockLanguageService = {
        getAll: () => of([]),
        getActive: jasmine.createSpy().and.returnValue(of('en')),
      };

      TestBed.configureTestingModule({
        imports: [I18nTestingModule, ReactiveFormsModule, NgSelectModule],
        declarations: [
          ConfiguratorTextfieldFormComponent,
          ConfiguratorTextfieldInputFieldComponent,
          ConfiguratorTextfieldAddToCartButtonComponent,
          ConfiguratorTextfieldInputFieldReadonlyComponent,
          MockTranslatePipe,
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
          {
            provide: ConfiguratorRouterExtractorService,
            useClass: MockConfiguratorRouterExtractorService,
          },
          { provide: LanguageService, useValue: mockLanguageService },
        ],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorTextfieldFormComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
    textfieldService = TestBed.inject(
      ConfiguratorTextfieldService as Type<ConfiguratorTextfieldService>
    );

    spyOn(textfieldService, 'createConfiguration').and.callThrough();

    spyOn(textfieldService, 'readConfigurationForCartEntry').and.callThrough();

    spyOn(textfieldService, 'readConfigurationForOrderEntry').and.callThrough();

    spyOn(textfieldService, 'updateConfiguration').and.callThrough();
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

  describe('Accessibility', () => {
    beforeEach(() => {
      mockRouterState.state = {
        params: {
          ownerType: CommonConfigurator.OwnerType.PRODUCT,
          entityKey: PRODUCT_CODE,
        },
        semanticRoute: ROUTE_CONFIGURATION,
      };
    });

    it("should contain span element with class name 'cx-visually-hidden' and a hidden introduction text", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'span',
        'cx-visually-hidden',
        0,
        undefined,
        undefined,
        'configurator.a11y.editAttributesAndValues'
      );
    });

    it("should contain span element with class name 'cx-visually-hidden' and a hidden list of attributes and values text", () => {
      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'span',
        'cx-visually-hidden',
        1,
        undefined,
        undefined,
        'configurator.a11y.listOfAttributesAndValues'
      );
    });
  });
});
