import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as UiSelectors from '../store/selectors/configurator-ui.selector';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ConfiguratorGroupUtilsService } from './configurator-group-utils.service';
import { ConfiguratorUiActions, StateWithConfiguration } from '../store';
import { Configurator, GenericConfigurator } from '../../../model';

/**
 * Service for handling group status
 */
@Injectable()
export class ConfiguratorGroupStatusService {
  constructor(
    private store: Store<StateWithConfiguration>,
    private configuratorGroupUtilsService: ConfiguratorGroupUtilsService
  ) {}

  isGroupVisited(
    owner: GenericConfigurator.Owner,
    groupId: string
  ): Observable<Boolean> {
    return this.store.select(UiSelectors.isGroupVisited(owner.key, groupId));
  }

  getGroupStatus(
    owner: GenericConfigurator.Owner,
    groupId: string
  ): Observable<Configurator.GroupStatus> {
    return this.store.select(UiSelectors.getGroupStatus(owner.key, groupId));
  }

  areGroupsVisited(
    owner: GenericConfigurator.Owner,
    groupIds: string[]
  ): Observable<Boolean> {
    return this.store.select(UiSelectors.areGroupsVisited(owner.key, groupIds));
  }

  checkIsGroupComplete(group: Configurator.Group): Boolean {
    let isGroupComplete = true;

    //Only required attributes need to be checked
    group.attributes.forEach((attribute) => {
      if (attribute.required && isGroupComplete && attribute.incomplete) {
        isGroupComplete = false;
      }
    });

    return isGroupComplete;
  }

  getParentGroupStatusCompleted(
    configuration: Configurator.Configuration,
    parentGroup: Configurator.Group,
    completedGroupIds: string[],
    uncompletedGroupdIds: string[]
  ) {
    if (parentGroup === null) {
      return;
    }

    let allSubGroupsComplete = true;
    parentGroup.subGroups.forEach((subGroup) => {
      if (!this.checkIsGroupComplete(subGroup)) {
        allSubGroupsComplete = false;
      }
    });

    if (allSubGroupsComplete) {
      completedGroupIds.push(parentGroup.id);
    } else {
      uncompletedGroupdIds.push(parentGroup.id);
    }

    this.getParentGroupStatusCompleted(
      configuration,
      this.configuratorGroupUtilsService.getParentGroup(
        configuration.groups,
        this.configuratorGroupUtilsService.getGroupById(
          configuration.groups,
          parentGroup.id
        ),
        null
      ),
      completedGroupIds,
      uncompletedGroupdIds
    );
  }

  getParentGroupStatusVisited(
    configuration: Configurator.Configuration,
    groupId: string,
    parentGroup: Configurator.Group,
    visitedGroupIds: string[]
  ) {
    if (parentGroup === null) {
      return;
    }

    const subGroups = [];
    parentGroup.subGroups.forEach((subGroup) => {
      //The current group is not set to visited yet, therefor we have to exclude it in the check
      if (subGroup.id === groupId) {
        return;
      }
      subGroups.push(subGroup.id);
    });

    this.areGroupsVisited(configuration.owner, subGroups)
      .pipe(take(1))
      .subscribe((isVisited) => {
        if (isVisited) {
          visitedGroupIds.push(parentGroup.id);

          this.getParentGroupStatusVisited(
            configuration,
            parentGroup.id,
            this.configuratorGroupUtilsService.getParentGroup(
              configuration.groups,
              this.configuratorGroupUtilsService.getGroupById(
                configuration.groups,
                parentGroup.id
              ),
              null
            ),
            visitedGroupIds
          );
        }
      });
  }

  setGroupStatus(
    configuration: Configurator.Configuration,
    groupId: string,
    setGroupVisited: Boolean
  ) {
    const group = this.configuratorGroupUtilsService.getGroupById(
      configuration.groups,
      groupId
    );
    const parentGroup = this.configuratorGroupUtilsService.getParentGroup(
      configuration.groups,
      this.configuratorGroupUtilsService.getGroupById(
        configuration.groups,
        groupId
      ),
      null
    );

    this.setGroupStatusCompletedOrError(configuration, group, parentGroup);

    if (setGroupVisited) {
      this.setGroupStatusVisited(configuration, group, parentGroup);
    }
  }

  setGroupStatusCompletedOrError(
    configuration: Configurator.Configuration,
    group: Configurator.Group,
    parentGroup: Configurator.Group
  ) {
    const completedGroupIds = [];
    const uncompletedOrErrorGroupdIds = [];

    //Currently only check for completness, no validation of input types
    if (this.checkIsGroupComplete(group)) {
      completedGroupIds.push(group.id);
    } else {
      uncompletedOrErrorGroupdIds.push(group.id);
    }

    this.getParentGroupStatusCompleted(
      configuration,
      parentGroup,
      completedGroupIds,
      uncompletedOrErrorGroupdIds
    );

    this.store.dispatch(
      new ConfiguratorUiActions.SetGroupsCompleted(
        configuration.owner.key,
        completedGroupIds
      )
    );

    this.store.dispatch(
      new ConfiguratorUiActions.SetGroupsError(
        configuration.owner.key,
        uncompletedOrErrorGroupdIds
      )
    );
  }

  setGroupStatusVisited(
    configuration: Configurator.Configuration,
    group: Configurator.Group,
    parentGroup: Configurator.Group
  ) {
    const visitedGroupIds = [];
    visitedGroupIds.push(group.id);
    this.getParentGroupStatusVisited(
      configuration,
      group.id,
      parentGroup,
      visitedGroupIds
    );

    this.store.dispatch(
      new ConfiguratorUiActions.SetGroupsVisited(
        configuration.owner.key,
        visitedGroupIds
      )
    );
  }
}
