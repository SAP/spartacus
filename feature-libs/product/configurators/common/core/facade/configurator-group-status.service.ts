import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { GenericConfigurator } from '@spartacus/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { StateWithConfigurator } from '../state/configurator-state';
import { Configurator } from './../model/configurator.model';
import { ConfiguratorActions } from './../state/actions/index';
import { ConfiguratorSelectors } from './../state/selectors/index';
import { ConfiguratorUtilsService } from './utils/configurator-utils.service';

/**
 * Service for handling group statuses
 */
@Injectable({ providedIn: 'root' })
export class ConfiguratorGroupStatusService {
  constructor(
    protected store: Store<StateWithConfigurator>,
    protected configuratorUtilsService: ConfiguratorUtilsService
  ) {}

  /**
   * Verifies whether the group has been visited.
   *
   * @param owner - Configuration owner
   * @param groupId - Group ID
   * @returns {Observable<boolean>} Has group been visited?
   */
  isGroupVisited(
    owner: GenericConfigurator.Owner,
    groupId: string
  ): Observable<boolean> {
    return this.store.select(
      ConfiguratorSelectors.isGroupVisited(owner.key, groupId)
    );
  }

  /**
   * Returns the group status for a group
   * spefified by its ID
   *
   * @param owner - Configuration owner
   * @param groupId - Group ID
   * @returns {Observable<Configurator.GroupStatus>} Group status
   */
  getGroupStatus(
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

  checkIsGroupComplete(group: Configurator.Group): Boolean {
    return group.attributes
      ? group.attributes.filter(
          (attribute) =>
            attribute.hasConflicts ||
            (attribute.required && attribute.incomplete)
        ).length === 0
      : true;
  }

  /**
   * Determines the group status by the group ID and the switcher that defines whether the group has been visited or not.
   *
   * @param configuration - Configuration
   * @param groupId - Group ID
   * @param setGroupVisited - Determines whether the group has to be set as visited or not
   */
  setGroupStatus(
    configuration: Configurator.Configuration,
    groupId: string,
    setGroupVisited: boolean
  ): void {
    const group = this.configuratorUtilsService.getGroupById(
      configuration.groups,
      groupId
    );
    const parentGroup = this.configuratorUtilsService.getParentGroup(
      configuration.groups,
      this.configuratorUtilsService.getGroupById(configuration.groups, groupId)
    );

    this.setGroupStatusCompletedOrError(configuration, group, parentGroup);

    if (setGroupVisited) {
      this.setGroupStatusVisited(configuration, group, parentGroup);
    }
  }

  protected setGroupStatusVisited(
    configuration: Configurator.Configuration,
    group: Configurator.Group,
    parentGroup: Configurator.Group
  ): void {
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

  protected areGroupsVisited(
    owner: GenericConfigurator.Owner,
    groupIds: string[]
  ): Observable<boolean> {
    return this.store.select(
      ConfiguratorSelectors.areGroupsVisited(owner.key, groupIds)
    );
  }

  protected getParentGroupStatusCompleted(
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
      this.configuratorUtilsService.getParentGroup(
        configuration.groups,
        this.configuratorUtilsService.getGroupById(
          configuration.groups,
          parentGroup.id
        )
      ),
      completedGroupIds,
      incompleteGroupdIds
    );
  }

  protected getParentGroupStatusVisited(
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
      //The current group is not set to visited yet, therefore we have to exclude it in the check
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
            this.configuratorUtilsService.getParentGroup(
              configuration.groups,
              this.configuratorUtilsService.getGroupById(
                configuration.groups,
                parentGroup.id
              )
            ),
            visitedGroupIds
          );
        }
      });
  }
  protected setGroupStatusCompletedOrError(
    configuration: Configurator.Configuration,
    group: Configurator.Group,
    parentGroup: Configurator.Group
  ): void {
    const completedGroupIds = [];
    const incompleteOrErrorGroupdIds = [];

    // Don't set status if group has no attributes (keeping the previous status for the group)
    if (group.attributes?.length === 0) {
      return;
    }

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
}
