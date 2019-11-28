import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterState } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  Configurator,
  ConfiguratorCommonsService,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ConfigAttributeHeaderComponent } from '../config-attribute-header/config-attribute-header.component';
import { ConfigOverviewFormComponent } from './config-overview-form.component';

const routerStateObservable = null;
const configurationObservable = null;
const configurationCreateObservable = null;

const configCreate: Configurator.Configuration = {
  configId: '1234-56-7890',
  groups: [
    {
      configurable: true,
      description: 'Core components',
      groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
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
      groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
      id: '1-CPQ_LAPTOP.2',
      name: '2',
      attributes: [],
    },
    {
      configurable: true,
      description: 'Software',
      groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
      id: '1-CPQ_LAPTOP.3',
      name: '3',
      attributes: [],
    },
  ],
};

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return routerStateObservable;
  }
}

class MockConfiguratorCommonsService {
  createConfiguration(
    productCode: string
  ): Observable<Configurator.Configuration> {
    configCreate.productCode = productCode;
    return of(configCreate);
  }
  getConfiguration(): Observable<Configurator.Configuration> {
    return configurationObservable;
  }
  getOrCreateConfiguration(): Observable<Configurator.Configuration> {
    return configurationCreateObservable;
  }
  hasConfiguration(): Observable<boolean> {
    return of(false);
  }
}
describe('ConfigurationOverviewFormComponent', () => {
  let component: ConfigOverviewFormComponent;
  let fixture: ComponentFixture<ConfigOverviewFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, ReactiveFormsModule, NgSelectModule],
      declarations: [ConfigOverviewFormComponent],
      providers: [
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: ConfiguratorCommonsService,
          useClass: MockConfiguratorCommonsService,
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
    fixture = TestBed.createComponent(ConfigOverviewFormComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });
});
