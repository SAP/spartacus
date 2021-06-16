import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Configurator } from '../model/configurator.model';
import { ConfiguratorActions } from '../state/actions/index';
import { StateWithConfigurator } from '../state/configurator-state';
import { ConfiguratorSelectors } from '../state/selectors/index';
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
   * @param {CommonConfigurator.Owner} owner - Configuration owner
   * @param {string} groupId - Group ID
   * @returns {Observable<boolean>} Has group been visited?
   */
  isGroupVisited(
    owner: CommonConfigurator.Owner,
    groupId: string
  ): Observable<boolean> {
    return this.store.select(
      ConfiguratorSelectors.isGroupVisited(owner.key, groupId)
    );
  }

  /**
   * Returns the first non-conflict group of the configuration which is not completed
   * and undefined if all are completed.
   *
   * @param {Configurator.Configuration} configuration - Configuration
   *
   * @return {Configurator.Group} - First incomplete group or undefined
   */
  getFirstIncompleteGroup(
    configuration: Configurator.Configuration
  ): Configurator.Group | undefined {
    return configuration.flatGroups
      ? configuration.flatGroups
          .filter(
            (group) => group.groupType !== Configurator.GroupType.CONFLICT_GROUP
          )
          .find((group) => !group.complete)
      : undefined;
  }

  /**
   * Determines whether the group has been visited or not.
   *
   * @param {Configurator.Configuration} configuration - Configuration
   * @param {string} groupId - Group ID
   */
  setGroupStatusVisited(
    configuration: Configurator.Configuration,
    groupId: string
  ): void {
    const group = this.configuratorUtilsService.getGroupById(
      configuration.groups,
      groupId
    );
    const parentGroup = this.configuratorUtilsService.getParentGroup(
      configuration.groups,
      this.configuratorUtilsService.getGroupById(configuration.groups, groupId)
    );

    const visitedGroupIds = [];
    visitedGroupIds.push(group.id);
    if (parentGroup) {
      this.getParentGroupStatusVisited(
        configuration,
        group.id,
        parentGroup,
        visitedGroupIds
      );
    }

    this.store.dispatch(
      new ConfiguratorActions.SetGroupsVisited({
        entityKey: configuration.owner.key,
        visitedGroups: visitedGroupIds,
      })
    );
  }

  protected areGroupsVisited(
    owner: CommonConfigurator.Owner,
    groupIds: string[]
  ): Observable<boolean> {
    return this.store.select(
      ConfiguratorSelectors.areGroupsVisited(owner.key, groupIds)
    );
  }

  protected getParentGroupStatusVisited(
    configuration: Configurator.Configuration,
    groupId: string,
    parentGroup: Configurator.Group,
    visitedGroupIds: string[]
  ) {
    const subGroups: string[] = [];
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
          const grandParentGroup = this.configuratorUtilsService.getParentGroup(
            configuration.groups,
            this.configuratorUtilsService.getGroupById(
              configuration.groups,
              parentGroup.id
            )
          );
          if (grandParentGroup) {
            this.getParentGroupStatusVisited(
              configuration,
              parentGroup.id,
              grandParentGroup,
              visitedGroupIds
            );
          }
        }
      });
  }
}
