import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterState } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  Configurator,
  ConfiguratorCommonsService,
  ConfiguratorGroupsService,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { ConfigAttributeFooterComponent } from '../config-attribute-footer/config-attribute-footer.component';
import { ConfigAttributeHeaderComponent } from '../config-attribute-header/config-attribute-header.component';
import { ConfigAttributeDropDownComponent } from '../config-attribute-types/config-attribute-drop-down/config-attribute-drop-down.component';
import { ConfigAttributeInputFieldComponent } from '../config-attribute-types/config-attribute-input-field/config-attribute-input-field.component';
import { ConfigAttributeRadioButtonComponent } from '../config-attribute-types/config-attribute-radio-button/config-attribute-radio-button.component';
import { ConfigAttributeReadOnlyComponent } from '../config-attribute-types/config-attribute-read-only/config-attribute-read-only.component';
import { ConfigPreviousNextButtonsComponent } from '../config-previous-next-buttons/config-previous-next-buttons.component';
import { ConfigFormComponent } from './config-form.component';

const PRODUCT_CODE = 'CONF_LAPTOP';

const mockRouterState: any = {
  state: {
    params: {
      rootProduct: PRODUCT_CODE,
    },
  },
};

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return of(mockRouterState);
  }
}

class MockConfiguratorCommonsService {
  public config: Configurator.Configuration = {
    configId: '1234-56-7890',
    groups: [
      {
        configurable: true,
        description: 'Core components',
        groupType: Configurator.GroupType.CSTIC_GROUP,
        id: '1-CPQ_LAPTOP.1',
        name: '1',
        attributes: [
          {
            label: 'Expected Number',
            name: 'EXP_NUMBER',
            required: true,
            uiType: Configurator.UiType.NOT_IMPLEMENTED,
            values: [],
          },
          {
            label: 'Processor',
            name: 'CPQ_CPU',
            required: true,
            selectedSingleValue: 'INTELI5_35',
            uiType: Configurator.UiType.RADIOBUTTON,
            values: [],
          },
        ],
      },
      {
        configurable: true,
        description: 'Peripherals & Accessories',
        groupType: Configurator.GroupType.CSTIC_GROUP,
        id: '1-CPQ_LAPTOP.2',
        name: '2',
        attributes: [],
      },
      {
        configurable: true,
        description: 'Software',
        groupType: Configurator.GroupType.CSTIC_GROUP,
        id: '1-CPQ_LAPTOP.3',
        name: '3',
        attributes: [],
      },
    ],
  };
  createConfiguration(
    productCode: string
  ): Observable<Configurator.Configuration> {
    this.config.productCode = productCode;
    return of(this.config);
  }
  getConfiguration(
    productCode: string
  ): Observable<Configurator.Configuration> {
    const productConfig: Configurator.Configuration = {
      configId: 'a',
      consistent: true,
      complete: true,
      productCode: productCode,
    };
    return of(productConfig);
  }
  hasConfiguration(): Observable<boolean> {
    return of(false);
  }
}
class MockConfiguratorGroupsService {
  getCurrentGroup() {
    return of('');
  }
  getNextGroup() {
    return of('');
  }
  getPreviousGroup() {
    return of('');
  }
}

describe('ConfigurationFormComponent', () => {
  let component: ConfigFormComponent;
  let fixture: ComponentFixture<ConfigFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, ReactiveFormsModule, NgSelectModule],
      declarations: [
        ConfigFormComponent,
        ConfigAttributeHeaderComponent,
        ConfigAttributeFooterComponent,
        ConfigAttributeRadioButtonComponent,
        ConfigAttributeInputFieldComponent,
        ConfigAttributeDropDownComponent,
        ConfigAttributeReadOnlyComponent,
        ConfigPreviousNextButtonsComponent,
        MockCxIconComponent,
      ],
      providers: [
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },

        {
          provide: ConfiguratorCommonsService,
          useClass: MockConfiguratorCommonsService,
        },

        {
          provide: ConfiguratorGroupsService,
          useClass: MockConfiguratorGroupsService,
        },
      ],
    })
      .overrideComponent(ConfigAttributeHeaderComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigFormComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should get product code as part of product configuration', () => {
    component.ngOnInit();
    fixture.detectChanges();
    let productCode: string;
    component.configuration$.subscribe(
      (data: Configurator.Configuration) => (productCode = data.productCode)
    );

    expect(productCode).toEqual(PRODUCT_CODE);
  });

  it('should release subscription on destroy ', () => {
    component.ngOnInit();
    expect(component.subscription.closed).toBe(false);
    component.ngOnDestroy();
    expect(component.subscription.closed).toBe(true);
  });
});
