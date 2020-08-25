import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Configurator,
  ConfiguratorActions,
  ConfiguratorSelectors,
  GenericConfigurator,
  StateWithConfiguration,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ConfiguratorGroupUtilsService } from './configurator-group-utils.service';

/**
 * Service for handling group status
 */
@Injectable()
export class ConfiguratorGroupStatusService {
  constructor(
    private store: Store<StateWithConfiguration>,
    private configuratorGroupUtilsService: ConfiguratorGroupUtilsService
  ) {}

  /**
   * Verifies whether the group has been visited.
   *
   * @param owner - Configuration owner
   * @param groupId - Group ID
   */
  public isGroupVisited(
    owner: GenericConfigurator.Owner,
    groupId: string
  ): Observable<Boolean> {
    return this.store.select(
      ConfiguratorSelectors.isGroupVisited(owner.key, groupId)
    );
  }

  /**
   * Returns the group status by the group ID.
   *
   * @param owner - Configuration owner
   * @param groupId - Group ID
   */
  public getGroupStatus(
    owner: GenericConfigurator.Owner,
    groupId: string
  ): Observable<Configurator.GroupStatus> {
    return this.store.select(
      ConfiguratorSelectors.getGroupStatus(owner.key, groupId)
    );
  }

  /**
   * Returns the first non-conflict group of the configuration which is not completed
   * and undefined if all are completed.
   *
   * @param configuration - Configuration
   *
   * @return {Configurator.Group} - First incomplete group or undefined
   */
  getFirstIncompleteGroup(
    configuration: Configurator.Configuration
  ): Configurator.Group {
    return configuration.flatGroups
      .filter(
        (group) => group.groupType !== Configurator.GroupType.CONFLICT_GROUP
      )
      .find((group) => !this.checkIsGroupComplete(group));
  }

  areGroupsVisited(
    owner: GenericConfigurator.Owner,
    groupIds: string[]
  ): Observable<Boolean> {
    return this.store.select(
      ConfiguratorSelectors.areGroupsVisited(owner.key, groupIds)
    );
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
    incompleteGroupdIds: string[]
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
      incompleteGroupdIds.push(parentGroup.id);
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
      incompleteGroupdIds
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

  /**
   * Determines the group status by the group ID and the switcher that defines whether the group has been visited or not.
   *
   * @param configuration - Configuration
   * @param groupId - Group ID
   * @param setGroupVisited - Determines whether the group has to be set as visited or not
   */
  public setGroupStatus(
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
    const incompleteOrErrorGroupdIds = [];

    //Currently only check for completness, no validation of input types
    if (this.checkIsGroupComplete(group)) {
      completedGroupIds.push(group.id);
    } else {
      incompleteOrErrorGroupdIds.push(group.id);
    }

    this.getParentGroupStatusCompleted(
      configuration,
      parentGroup,
      completedGroupIds,
      incompleteOrErrorGroupdIds
    );

    this.store.dispatch(
      new ConfiguratorActions.SetGroupsCompleted({
        entityKey: configuration.owner.key,
        completedGroups: completedGroupIds,
      })
    );

    this.store.dispatch(
      new ConfiguratorActions.SetGroupsError({
        entityKey: configuration.owner.key,
        errorGroups: incompleteOrErrorGroupdIds,
      })
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
      new ConfiguratorActions.SetGroupsVisited({
        entityKey: configuration.owner.key,
        visitedGroups: visitedGroupIds,
      })
    );
  }
}
