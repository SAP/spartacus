import { Component, Input, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterState } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  Configurator,
  ConfiguratorCommonsService,
  ConfiguratorGroupsService,
  GenericConfigurator,
  GenericConfigUtilsService,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { HamburgerMenuService } from '../../../../layout/header/hamburger-menu/hamburger-menu.service';
import { ICON_TYPE } from '../../../misc/icon/icon.model';
import { ConfigGroupMenuComponent } from './config-group-menu.component';

const PRODUCT_CODE = 'CONF_LAPTOP';
const CONFIG_ID = '12342';

const mockRouterState: any = {
  state: {
    params: {
      entityKey: PRODUCT_CODE,
      ownerType: GenericConfigurator.OwnerType.PRODUCT,
    },
  },
};

const config: Configurator.Configuration = {
  owner: {
    id: PRODUCT_CODE,
    type: GenericConfigurator.OwnerType.PRODUCT,
  },
  configId: CONFIG_ID,
  consistent: true,
  complete: true,
  productCode: PRODUCT_CODE,
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
    return of(mockRouterState);
  }
}

class MockRouter {
  public events = of('');
}

class MockConfiguratorGroupService {
  navigateToGroup() {}
  getCurrentGroup(): Observable<Configurator.Group> {
    return of(config.groups[0]);
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

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

describe('ConfigurationGroupMenuComponent', () => {
  let component: ConfigGroupMenuComponent;
  let fixture: ComponentFixture<ConfigGroupMenuComponent>;
  let configuratorGroupsService: MockConfiguratorGroupService;
  let hamburgerMenuService: HamburgerMenuService;
  let htmlElem: HTMLElement;
  let configuratorUtils: GenericConfigUtilsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, ReactiveFormsModule, NgSelectModule],
      declarations: [ConfigGroupMenuComponent, MockCxIconComponent],
      providers: [
        HamburgerMenuService,
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
      ],
    });
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigGroupMenuComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;

    configuratorGroupsService = TestBed.get(ConfiguratorGroupsService);

    hamburgerMenuService = TestBed.get(HamburgerMenuService as Type<
      HamburgerMenuService
    >);
    configuratorUtils = TestBed.get(GenericConfigUtilsService as Type<
      GenericConfigUtilsService
    >);
    configuratorUtils.setOwnerKey(config.owner);
    spyOn(configuratorGroupsService, 'navigateToGroup').and.stub();
    spyOn(hamburgerMenuService, 'toggle').and.stub();
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should get product code as part of product configuration', () => {
    component.ngOnInit();
    component.configuration$.subscribe((data: Configurator.Configuration) => {
      expect(data.productCode).toEqual(PRODUCT_CODE);
    });
  });

  it('should render 3 groups', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(htmlElem.querySelectorAll('.cx-config-menu-item').length).toBe(3);
  });

  it('should set current group in case of clicking on a group', () => {
    component.ngOnInit();
    fixture.detectChanges();

    component.click(config.groups[1]);
    expect(configuratorGroupsService.navigateToGroup).toHaveBeenCalled();
    expect(hamburgerMenuService.toggle).toHaveBeenCalled();
  });
});
