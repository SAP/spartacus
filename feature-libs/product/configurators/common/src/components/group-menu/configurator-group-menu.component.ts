import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Configurator } from '@spartacus/core';
import {
  ConfigurationRouter,
  ConfiguratorRouterExtractorService,
  HamburgerMenuService,
  ICON_TYPE,
} from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';

@Component({
  selector: 'cx-config-group-menu',
  templateUrl: './configurator-group-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorGroupMenuComponent {
  routerData$: Observable<
    ConfigurationRouter.Data
  > = this.configRouterExtractorService.extractRouterData();

  configuration$: Observable<
    Configurator.Configuration
  > = this.routerData$.pipe(
    switchMap((routerData) =>
      this.configCommonsService.getConfiguration(routerData.owner)
    ),
    //We need to ensure that the navigation to conflict groups or
    //groups with mandatory attributes already has taken place, as this happens
    //in an onInit of another component.
    //otherwise we risk that this component is completely initialized too early,
    //in dev mode resulting in ExpressionChangedAfterItHasBeenCheckedError
    filter(
      (configuration) =>
        (configuration.complete && configuration.consistent) ||
        configuration.interactionState.issueNavigationDone
    )
  );

  currentGroup$: Observable<Configurator.Group> = this.routerData$.pipe(
    switchMap((routerData) =>
      this.configuratorGroupsService.getCurrentGroup(routerData.owner)
    )
  );

  displayedParentGroup$: Observable<
    Configurator.Group
  > = this.configuration$.pipe(
    switchMap((configuration) =>
      this.configuratorGroupsService.getMenuParentGroup(configuration.owner)
    ),
    switchMap((parentGroup) => this.getCondensedParentGroup(parentGroup))
  );

  displayedGroups$: Observable<
    Configurator.Group[]
  > = this.displayedParentGroup$.pipe(
    switchMap((parentGroup) => {
      return this.configuration$.pipe(
        map((configuration) => {
          if (parentGroup) {
            return this.condenseGroups(parentGroup.subGroups);
          } else {
            return this.condenseGroups(configuration.groups);
          }
        })
      );
    })
  );

  iconTypes = ICON_TYPE;
  groupStatus = Configurator.GroupStatus;

  constructor(
    protected configCommonsService: ConfiguratorCommonsService,
    protected configuratorGroupsService: ConfiguratorGroupsService,
    protected hamburgerMenuService: HamburgerMenuService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected configUtils: ConfiguratorStorefrontUtilsService
  ) {}

  /**
   * Fired on key board events, checks for 'enter' and delegates to click.
   *
   * @param {KeyboardEvent} event - Keyboard event
   * @param {Configurator.Group} group - Entered group
   */
  clickOnEnter(event: KeyboardEvent, group: Configurator.Group): void {
    if (event.code === 'Enter') {
      this.click(group);
    }
  }

  click(group: Configurator.Group): void {
    this.configuration$.pipe(take(1)).subscribe((configuration) => {
      if (!this.configuratorGroupsService.hasSubGroups(group)) {
        this.configuratorGroupsService.navigateToGroup(configuration, group.id);
        this.hamburgerMenuService.toggle(true);
        this.configUtils.scrollToConfigurationElement(
          '.VariantConfigurationTemplate'
        );
      } else {
        this.configuratorGroupsService.setMenuParentGroup(
          configuration.owner,
          group.id
        );
      }
    });
  }

  /**
   * Fired on key board events, checks for 'enter' and delegates to navigateUp.
   *
   * @param {KeyboardEvent} event - Keyboard event
   */
  navigateUpOnEnter(event: KeyboardEvent): void {
    if (event.code === 'Enter') {
      this.navigateUp();
    }
  }

  navigateUp(): void {
    this.displayedParentGroup$
      .pipe(take(1))
      .subscribe((displayedParentGroup) => {
        const parentGroup$ = this.getParentGroup(displayedParentGroup);
        this.configuration$.pipe(take(1)).subscribe((configuration) => {
          parentGroup$
            .pipe(take(1))
            .subscribe((parentGroup) =>
              this.configuratorGroupsService.setMenuParentGroup(
                configuration.owner,
                parentGroup ? parentGroup.id : null
              )
            );
        });
      });
  }

  /**
   * Retrieves the number of conflicts for the current group.
   *
   * @param {Configurator.Group} group - Current group
   * @return {string} - number of conflicts
   */
  getConflictNumber(group: Configurator.Group): string {
    if (group.groupType === Configurator.GroupType.CONFLICT_HEADER_GROUP) {
      return '(' + group.subGroups.length + ')';
    }
    return '';
  }

  /**
   * Verifies whether the current group has a subgroups.
   *
   * @param {Configurator.Group} group - Current group
   * @return {boolean} - Returns 'true' if the current group has a subgroups, otherwise 'false'.
   */
  hasSubGroups(group: Configurator.Group): boolean {
    return this.configuratorGroupsService.hasSubGroups(group);
  }

  protected getParentGroup(
    group: Configurator.Group
  ): Observable<Configurator.Group> {
    return this.configuration$.pipe(
      map((configuration) =>
        this.configuratorGroupsService.getParentGroup(
          configuration.groups,
          group
        )
      )
    );
  }

  getCondensedParentGroup(
    parentGroup: Configurator.Group
  ): Observable<Configurator.Group> {
    if (
      parentGroup &&
      parentGroup.subGroups &&
      parentGroup.subGroups.length === 1 &&
      parentGroup.groupType !== Configurator.GroupType.CONFLICT_HEADER_GROUP
    ) {
      return this.getParentGroup(parentGroup).pipe(
        switchMap((group) => this.getCondensedParentGroup(group))
      );
    } else {
      return of(parentGroup);
    }
  }

  condenseGroups(groups: Configurator.Group[]): Configurator.Group[] {
    return groups.flatMap((group) => {
      if (
        group.subGroups.length === 1 &&
        group.groupType !== Configurator.GroupType.CONFLICT_HEADER_GROUP
      ) {
        return this.condenseGroups(group.subGroups);
      } else {
        return group;
      }
    });
  }

  /**
   * Retrieves the status of the current group.
   *
   * @param {Configurator.Group} group - Current group
   * @param {Configurator.Configuration} configuration - Configuration
   * @return {Observable<string>} - Group status
   */
  getGroupStatus(
    group: Configurator.Group,
    configuration: Configurator.Configuration
  ): Observable<string> {
    return this.configuratorGroupsService
      .isGroupVisited(configuration.owner, group.id)
      .pipe(
        switchMap((isVisited) => {
          if (isVisited && !this.isConflictGroupType(group.groupType)) {
            return this.configuratorGroupsService.getGroupStatus(
              configuration.owner,
              group.id
            );
          } else {
            return of(null);
          }
        }),
        take(1)
      );
  }

  /**
   * Verifies whether the current group is conflict one.
   *
   * @param {Configurator.GroupType} groupType - Group type
   * @return {boolean} - 'True' if the current group is conflict one, otherwise 'false'.
   */
  isConflictGroupType(groupType: Configurator.GroupType): boolean {
    if (
      groupType === Configurator.GroupType.CONFLICT_HEADER_GROUP ||
      groupType === Configurator.GroupType.CONFLICT_GROUP
    ) {
      return true;
    }
    return false;
  }
}
