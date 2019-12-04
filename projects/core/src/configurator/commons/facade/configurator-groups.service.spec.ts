import { Type } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { CartService } from '../../../cart/facade/cart.service';
import * as UiActions from '../store/actions/configurator-ui.action';
import { StateWithConfiguration, UiState } from '../store/configuration-state';
import { Configurator } from './../../../model/configurator.model';
import { ConfiguratorCommonsService } from './configurator-commons.service';
import { ConfiguratorGroupsService } from './configurator-groups.service';

const PRODUCT_CODE = 'CONF_LAPTOP';
const GROUP_ID_1 = '1234-56-7891';
const GROUP_ID_2 = '1234-56-7892';
const GROUP_ID_3 = '1234-56-7893';
const uiState: UiState = {
  currentGroup: GROUP_ID_2,
};
const CONFIG_ID = '1234-56-7890';
const productConfiguration: Configurator.Configuration = {
  configId: CONFIG_ID,
  productCode: PRODUCT_CODE,
  groups: [{ id: GROUP_ID_1 }, { id: GROUP_ID_2 }, { id: GROUP_ID_3 }],
  owner: {
    id: PRODUCT_CODE,
    type: Configurator.OwnerType.PRODUCT,
  },
};

class MockCartService {}

describe('ConfiguratorGroupsService', () => {
  let serviceUnderTest: ConfiguratorGroupsService;
  let store: Store<StateWithConfiguration>;
  let configuratorCommonsService: ConfiguratorCommonsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        ConfiguratorGroupsService,
        ConfiguratorCommonsService,
        {
          provide: CartService,
          useClass: MockCartService,
        },
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    serviceUnderTest = TestBed.get(ConfiguratorGroupsService as Type<
      ConfiguratorGroupsService
    >);
    store = TestBed.get(Store as Type<Store<StateWithConfiguration>>);
    configuratorCommonsService = TestBed.get(ConfiguratorCommonsService as Type<
      ConfiguratorCommonsService
    >);

    spyOn(store, 'dispatch').and.stub();
    spyOn(store, 'pipe').and.returnValue(of(uiState));

    spyOn(configuratorCommonsService, 'setUiState').and.stub();
    spyOn(configuratorCommonsService, 'getConfiguration').and.returnValue(
      of(productConfiguration)
    );
  });

  it('should create service', () => {
    expect(serviceUnderTest).toBeDefined();
  });

  it('should get the currentGroup from uiState', () => {
    spyOn(configuratorCommonsService, 'getUiState').and.returnValue(
      of(uiState)
    );
    const currentGroup = serviceUnderTest.getCurrentGroup(
      productConfiguration.owner
    );

    expect(currentGroup).toBeDefined();
    currentGroup.subscribe(groupId => {
      expect(groupId).toBe(GROUP_ID_2);
    });
  });

  it('should get the currentGroup from configuration', () => {
    spyOn(configuratorCommonsService, 'getUiState').and.returnValue(of(null));
    const currentGroup = serviceUnderTest.getCurrentGroup(
      productConfiguration.owner
    );

    expect(currentGroup).toBeDefined();
    currentGroup.subscribe(groupId => {
      expect(groupId).toBe(GROUP_ID_1);
    });
  });

  it('should get the next group', () => {
    spyOn(configuratorCommonsService, 'getUiState').and.returnValue(
      of(uiState)
    );
    const currentGroup = serviceUnderTest.getNextGroup(
      productConfiguration.owner
    );

    expect(currentGroup).toBeDefined();
    currentGroup.subscribe(groupId => {
      expect(groupId).toBe(GROUP_ID_3);
    });
  });

  it('should get the previous group', () => {
    spyOn(configuratorCommonsService, 'getUiState').and.returnValue(
      of(uiState)
    );
    const currentGroup = serviceUnderTest.getPreviousGroup(
      productConfiguration.owner
    );

    expect(currentGroup).toBeDefined();
    currentGroup.subscribe(groupId => {
      expect(groupId).toBe(GROUP_ID_1);
    });
  });

  it('should delegate setting the current group to the store', () => {
    serviceUnderTest.setCurrentGroup(productConfiguration.owner, GROUP_ID_1);
    const expectedAction = new UiActions.SetCurrentGroup(
      productConfiguration.owner.key,
      GROUP_ID_1
    );
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
