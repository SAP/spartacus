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

const configurationObservable = null;
const PRODUCT_CODE = 'CONF_LAPTOP';

const mockRouterState: any = {
  state: {
    params: {
      entityKey: PRODUCT_CODE,
      ownerType: Configurator.OwnerType.PRODUCT,
    },
  },
};

const owner: Configurator.Owner = {
  id: PRODUCT_CODE,
  type: Configurator.OwnerType.PRODUCT,
};

let configCreate: Configurator.Configuration = {
  configId: '1234-56-7890',
  owner: owner,
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
const configInitial: Configurator.Configuration = {
  configId: '1235-56-7890',
  owner: owner,
  overview: {
    groups: [],
  },
};

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return of(mockRouterState);
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
  getOrCreateConfiguration(
    productCode: string
  ): Observable<Configurator.Configuration> {
    configCreate.productCode = productCode;
    return of(configCreate);
  }
  getConfigurationOverview(
    configuration: Configurator.Configuration
  ): Observable<Configurator.Configuration> {
    return of(configuration);
  }
  hasConfiguration(): Observable<boolean> {
    return of(false);
  }
}
describe('ConfigurationOverviewFormComponent', () => {
  let component: ConfigOverviewFormComponent;
  let fixture: ComponentFixture<ConfigOverviewFormComponent>;
  let htmlElem: HTMLElement;

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
    htmlElem = fixture.nativeElement;
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should display configuration overview', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(htmlElem.querySelectorAll('.cx-config-overview-group').length).toBe(
      2
    );

    expect(
      htmlElem.querySelectorAll('cx-config-overview-attribute').length
    ).toBe(3);
  });

  it('should display no result text in case of empty configuration', () => {
    configCreate = configInitial;

    component.ngOnInit();
    fixture.detectChanges();

    expect(htmlElem.querySelectorAll('.cx-config-overview-group').length).toBe(
      0
    );

    expect(
      htmlElem.querySelectorAll('cx-config-overview-attribute').length
    ).toBe(0);
  });
});
