import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  Configurator,
  ConfiguratorCommonsService,
  ConfiguratorGroupsService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { delay, map, switchMap, take } from 'rxjs/operators';
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
    private configCommonsService: ConfiguratorCommonsService,
    public configuratorGroupsService: ConfiguratorGroupsService,
    private hamburgerMenuService: HamburgerMenuService,
    private configRouterExtractorService: ConfigRouterExtractorService
  ) {}

  GROUPSTATUS = Configurator.GroupStatus;

  ngOnInit(): void {
    this.configuration$ = this.configRouterExtractorService
      .extractRouterData()
      .pipe(
        switchMap((routerData) =>
          this.configCommonsService.getConfiguration(routerData.owner)
        )
      );

    this.currentGroup$ = this.configRouterExtractorService
      .extractRouterData()
      .pipe(
        switchMap((routerData) =>
          this.configuratorGroupsService.getCurrentGroup(routerData.owner)
        )
      );

    this.displayedParentGroup$ = this.configuration$.pipe(
      switchMap((configuration) =>
        this.configuratorGroupsService.getMenuParentGroup(configuration.owner)
      ),
      switchMap((parentGroup) => this.getCondensedParentGroup(parentGroup))
    );

    this.displayedGroups$ = this.displayedParentGroup$.pipe(
      switchMap((parentGroup) => {
        return this.configuration$.pipe(
          map((configuration) => {
            if (parentGroup) {
              return this.condenseGroups(parentGroup.subGroups);
            } else {
              return this.condenseGroups(configuration.groups);
            }
          }),
          delay(0)
        );
      })
    );
  }

  clickOnEnter(event, group: Configurator.Group) {
    if (event.which === 13) {
      this.click(group);
    }
  }

  click(group: Configurator.Group) {
    this.configuration$.pipe(take(1)).subscribe((configuration) => {
      if (!this.configuratorGroupsService.hasSubGroups(group)) {
        this.scrollToVariantConfigurationHeader();
        this.configuratorGroupsService.navigateToGroup(configuration, group.id);
        this.hamburgerMenuService.toggle(true);
      } else {
        this.configuratorGroupsService.setMenuParentGroup(
          configuration.owner,
          group.id
        );
      }
    });
  }

  navigateUpOnEnter(event) {
    if (event.which === 13) {
      this.navigateUp();
    }
  }

  navigateUp() {
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

  getParentGroup(group: Configurator.Group): Observable<Configurator.Group> {
    return this.configuration$.pipe(
      map((configuration) =>
        this.configuratorGroupsService.getParentGroup(
          configuration.groups,
          group,
          null
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
      parentGroup.subGroups.length === 1
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
      if (group.subGroups.length === 1) {
        return this.condenseGroups(group.subGroups);
      } else {
        return group;
      }
    });
  }

  getGroupStatus(
    groupId: string,
    configuration: Configurator.Configuration
  ): Observable<string> {
    return this.configuratorGroupsService
      .isGroupVisited(configuration.owner, groupId)
      .pipe(
        switchMap((isVisited) => {
          if (isVisited) {
            return this.configuratorGroupsService.getGroupStatus(
              configuration.owner,
              groupId
            );
          } else {
            return of(null);
          }
        })
      );
  }

  scrollToVariantConfigurationHeader() {
    const theElement = document.querySelector('.VariantConfigurationTemplate');
    let topOffset = 0;
    if (theElement instanceof HTMLElement) {
      topOffset = theElement.offsetTop;
    }
    window.scroll(0, topOffset);
  }
}
