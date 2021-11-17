import { Type } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import {
  GROUP_ID_1,
  GROUP_ID_3,
  GROUP_ID_4,
  GROUP_ID_5,
  GROUP_ID_6,
  GROUP_ID_7,
  GROUP_ID_8,
  productConfiguration,
  productConfigurationWithConflicts,
} from '../../testing/configurator-test-data';
import { ConfiguratorActions } from '../state/actions/index';
import { StateWithConfigurator } from '../state/configurator-state';
import { ConfiguratorGroupStatusService } from './configurator-group-status.service';
import { ConfiguratorUtilsService } from './utils/configurator-utils.service';

describe('ConfiguratorGroupStatusService', () => {
  let classUnderTest: ConfiguratorGroupStatusService;
  let store: Store<StateWithConfigurator>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [StoreModule.forRoot({})],
        providers: [ConfiguratorUtilsService, ConfiguratorGroupStatusService],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    classUnderTest = TestBed.inject(
      ConfiguratorGroupStatusService as Type<ConfiguratorGroupStatusService>
    );
    store = TestBed.inject(Store as Type<Store<StateWithConfigurator>>);

    spyOn(store, 'dispatch').and.stub();
    spyOn(store, 'pipe').and.returnValue(of(productConfiguration));
  });

  it('should be created', () => {
    expect(classUnderTest).toBeTruthy();
  });

  describe('Group Status Tests', () => {
    it('should call setGroupVisisted action on setGroupStatus method call', () => {
      classUnderTest.setGroupStatusVisited(
        productConfiguration,
        productConfiguration.groups[0].id
      );

      const expectedAction = new ConfiguratorActions.SetGroupsVisited({
        entityKey: productConfiguration.owner.key,
        visitedGroups: [GROUP_ID_1],
      });

      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('should get parent group, when all subgroups are visited', () => {
      spyOn(store, 'select').and.returnValue(of(true));
      classUnderTest.setGroupStatusVisited(productConfiguration, GROUP_ID_4);

      const expectedAction = new ConfiguratorActions.SetGroupsVisited({
        entityKey: productConfiguration.owner.key,
        visitedGroups: [GROUP_ID_4, GROUP_ID_3],
      });

      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('should not get parent group, when not all subgroups are visited', () => {
      //Not all subgroups are visited
      spyOn(store, 'select').and.returnValue(of(false));

      classUnderTest.setGroupStatusVisited(productConfiguration, GROUP_ID_6);

      const expectedAction = new ConfiguratorActions.SetGroupsVisited({
        entityKey: productConfiguration.owner.key,
        visitedGroups: [GROUP_ID_6],
      });

      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('should get all parent groups, when lowest subgroup are visited', () => {
      spyOn(store, 'select').and.returnValue(of(true));

      classUnderTest.setGroupStatusVisited(productConfiguration, GROUP_ID_8);

      const expectedAction = new ConfiguratorActions.SetGroupsVisited({
        entityKey: productConfiguration.owner.key,
        visitedGroups: [GROUP_ID_8, GROUP_ID_7, GROUP_ID_5],
      });

      expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('should get first incomplete group', () => {
      expect(classUnderTest.getFirstIncompleteGroup(productConfiguration)).toBe(
        productConfiguration.flatGroups[0]
      );
    });

    it('should get first incomplete group - only consider non conflict groups', () => {
      expect(
        classUnderTest.getFirstIncompleteGroup(
          productConfigurationWithConflicts
        )
      ).toBe(productConfigurationWithConflicts.flatGroups[3]);
    });
  });
});
