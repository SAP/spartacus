import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  Configurator,
  ConfiguratorCommonsService,
  ConfiguratorGroupsService,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { ICON_TYPE } from '../../../../cms-components/misc/icon/index';
import { HamburgerMenuService } from '../../../../layout/header/hamburger-menu/hamburger-menu.service';
import { ConfigRouterExtractorService } from '../../generic/service/config-router-extractor.service';

@Component({
  selector: 'cx-config-group-menu',
  templateUrl: './config-group-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigGroupMenuComponent implements OnInit {
  configuration$: Observable<Configurator.Configuration>;
  currentGroup$: Observable<Configurator.Group>;

  displayedParentGroup$: Observable<Configurator.Group>;
  displayedGroups$: Observable<Configurator.Group[]>;

  iconTypes = ICON_TYPE;

  constructor(
    private routingService: RoutingService,
    private configuratorCommonsService: ConfiguratorCommonsService,
    private configuratorGroupsService: ConfiguratorGroupsService,
    private hamburgerMenuService: HamburgerMenuService,
    private configRouterExtractorService: ConfigRouterExtractorService
  ) {}

  ngOnInit(): void {
    this.configuration$ = this.configRouterExtractorService
      .extractConfigurationOwner(this.routingService)
      .pipe(
        switchMap(owner =>
          this.configuratorCommonsService.getConfiguration(owner)
        )
      );

    this.currentGroup$ = this.configRouterExtractorService
      .extractConfigurationOwner(this.routingService)
      .pipe(
        switchMap(owner =>
          this.configuratorGroupsService.getCurrentGroup(owner)
        )
      );

    this.displayedGroups$ = this.configRouterExtractorService
      .extractConfigurationOwner(this.routingService)
      .pipe(
        switchMap(owner =>
          this.configuratorGroupsService.getCurrentGroup(owner)
        ),
        switchMap(currentGroup =>
          this.configuration$.pipe(
            map(configuration => {
              const parentGroup = this.findParentGroup(
                configuration.groups,
                currentGroup,
                null
              );

              return parentGroup !== null
                ? parentGroup.subGroups
                : configuration.groups;
            })
          )
        )
      );

    this.displayedParentGroup$ = this.displayedGroups$.pipe(
      switchMap(group => this.getParentGroup(group[0]))
    );
  }

  click(group: Configurator.Group) {
    if (!this.hasSubGroups(group)) {
      this.configuration$.pipe(take(1)).subscribe(configuration => {
        this.configuratorGroupsService.navigateToGroup(configuration, group.id);
        this.hamburgerMenuService.toggle(true);
      });
    } else {
      this.displayedGroups$ = of(group.subGroups);
      this.displayedParentGroup$ = of(group);
    }
  }

  navigateUp() {
    this.displayedParentGroup$ = this.displayedParentGroup$.pipe(
      switchMap(displayedParentGroup =>
        this.getParentGroup(displayedParentGroup)
      )
    );

    this.displayedGroups$ = this.displayedParentGroup$.pipe(
      switchMap(displayedParentGroup => {
        if (displayedParentGroup !== null) {
          return of(displayedParentGroup.subGroups);
        }
        return this.configuration$.pipe(
          map(configuration => configuration.groups)
        );
      })
    );
  }

  getParentGroup(group: Configurator.Group): Observable<Configurator.Group> {
    return this.configuration$.pipe(
      map(configuration =>
        this.findParentGroup(configuration.groups, group, null)
      )
    );
  }

  findParentGroup(
    groups: Configurator.Group[],
    group: Configurator.Group,
    parentGroup: Configurator.Group
  ): Configurator.Group {
    if (groups.includes(group)) {
      return parentGroup;
    }

    //Call function recursive until parent group is returned
    for (let i = 0; i < groups.length; i++) {
      if (this.findParentGroup(groups[i].subGroups, group, groups[i])) {
        return groups[i];
      }
    }

    return null;
  }

  hasSubGroups(group: Configurator.Group): boolean {
    return group.subGroups ? group.subGroups.length > 0 : false;
  }
}
