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
import { ConfigOverviewAttributeComponent } from '../config-overview-attribute/config-overview-attribute.component';
import { ConfigOverviewFormComponent } from './config-overview-form.component';

const routerStateObservable = null;
const configurationObservable = null;
const configurationCreateObservable = null;

const configCreate: Configurator.Configuration = {
  configId: '1234-56-7890',
  overview: {
    groups: [
      {
        id: '1',
        groupDescription: 'Group 1',
        characteristicValues: [
          {
            characteristic: 'C1',
            value: 'V1',
          },
        ],
      },
      {
        id: '2',
        groupDescription: 'Group 2',
        characteristicValues: [
          {
            characteristic: 'C2',
            value: 'V2',
          },
          {
            characteristic: 'C3',
            value: 'V3',
          },
        ],
      },
    ],
  },
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
      declarations: [
        ConfigOverviewFormComponent,
        ConfigOverviewAttributeComponent,
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
