import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterState } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  Configurator,
  ConfiguratorCommonsService,
  ConfiguratorGroupsService,
  GenericConfigUtilsService,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import * as ConfigurationTestData from 'projects/storefrontlib/src/cms-components/configurator/commons/configuration-test-data';
import { Observable, of } from 'rxjs';
import { ConfigGroupTitleComponent } from './config-group-title.component';
import { IconLoaderService } from '@spartacus/storefront';

const config: Configurator.Configuration =
  ConfigurationTestData.productConfiguration;

let routerStateObservable = null;
class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return routerStateObservable;
  }
}

class MockRouter {
  public events = of('');
}

class MockConfiguratorGroupService {
  navigateToGroup() {}
  getCurrentGroup(): Observable<String> {
    return of('1-CPQ_LAPTOP.1');
  }
}

class MockConfiguratorCommonsService {
  getConfiguration(): Observable<Configurator.Configuration> {
    return of(config);
  }
  hasConfiguration(): Observable<boolean> {
    return of(false);
  }
  readConfiguration(): Observable<Configurator.Configuration> {
    return of(config);
  }
}

export class MockIconFontLoaderService {
  getFlipDirection(): void{}
}

describe('ConfigurationGroupTitleComponent', () => {
  let component: ConfigGroupTitleComponent;
  let fixture: ComponentFixture<ConfigGroupTitleComponent>;
  let configuratorGroupsService: ConfiguratorGroupsService;
  let configuratorUtils: GenericConfigUtilsService;

  beforeEach(async(() => {
    routerStateObservable = of(ConfigurationTestData.mockRouterState);
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, ReactiveFormsModule, NgSelectModule],
      declarations: [ConfigGroupTitleComponent],
      providers: [
        {
          provide: Router,
          useClass: MockRouter,
        },
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
          useClass: MockConfiguratorGroupService,
        },
        { provide: IconLoaderService, useClass: MockIconFontLoaderService },
      ],
    });
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigGroupTitleComponent);
    component = fixture.componentInstance;

    configuratorGroupsService = TestBed.inject(ConfiguratorGroupsService);

    configuratorUtils = TestBed.inject(
      GenericConfigUtilsService as Type<GenericConfigUtilsService>
    );
    configuratorUtils.setOwnerKey(config.owner);
    spyOn(configuratorGroupsService, 'navigateToGroup').and.stub();
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should get product code as part of product configuration', () => {
    component.configuration$.subscribe((data: Configurator.Configuration) => {
      expect(data.productCode).toEqual(config.productCode);
    });
  });
});
