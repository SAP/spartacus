import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterState } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { CommonConfiguratorUtilsService } from '@spartacus/product/configurators/common';
import { IconLoaderService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';
import * as ConfigurationTestData from '../../shared/testing/configurator-test-data';
import { ConfiguratorGroupTitleComponent } from './configurator-group-title.component';

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
  getFlipDirection(): void {}
}

describe('ConfigurationGroupTitleComponent', () => {
  let component: ConfiguratorGroupTitleComponent;
  let fixture: ComponentFixture<ConfiguratorGroupTitleComponent>;
  let configuratorGroupsService: ConfiguratorGroupsService;
  let configuratorUtils: CommonConfiguratorUtilsService;

  beforeEach(async(() => {
    routerStateObservable = of(ConfigurationTestData.mockRouterState);
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, ReactiveFormsModule, NgSelectModule],
      declarations: [ConfiguratorGroupTitleComponent],
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
    fixture = TestBed.createComponent(ConfiguratorGroupTitleComponent);
    component = fixture.componentInstance;

    configuratorGroupsService = TestBed.inject(ConfiguratorGroupsService);

    configuratorUtils = TestBed.inject(
      CommonConfiguratorUtilsService as Type<CommonConfiguratorUtilsService>
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
