import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { GenericConfigurator } from '@spartacus/core';
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
   * @param {GenericConfigurator.Owner} owner - Configuration owner
   * @param {string} groupId - Group ID
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
   * Returns the first non-conflict group of the configuration which is not completed
   * and undefined if all are completed.
   *
   * @param {Configurator.Configuration} configuration - Configuration
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
      .find((group) => !group.complete);
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
}
