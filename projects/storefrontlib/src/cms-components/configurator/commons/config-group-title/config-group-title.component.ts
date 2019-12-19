import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  Configurator,
  ConfiguratorCommonsService,
  ConfiguratorGroupsService,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ICON_TYPE } from '../../../misc/icon/index';
import { ConfigRouterExtractorService } from '../../generic/service/config-router-extractor.service';

@Component({
  selector: 'cx-config-group-title',
  templateUrl: './config-group-title.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigGroupTitleComponent implements OnInit {
  configuration$: Observable<Configurator.Configuration>;
  displayedGroup$: Observable<Configurator.Group>;

  iconTypes = ICON_TYPE;

  constructor(
    private routingService: RoutingService,
    private configuratorCommonsService: ConfiguratorCommonsService,
    private configuratorGroupsService: ConfiguratorGroupsService,
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

    this.displayedGroup$ = this.configuration$.pipe(
      switchMap(configuration => this.getCurrentGroup(configuration.groups))
    );
  }

  getCurrentGroup(
    groups: Configurator.Group[]
  ): Observable<Configurator.Group> {
    return this.configuration$.pipe(
      switchMap(configuration =>
        this.configuratorGroupsService.getCurrentGroup(configuration.owner)
      ),
      map(currenGroupId => this.findCurrentGroup(groups, currenGroupId))
    );
  }

  // TODO: This is a duplicate method from the configuration form, should we create a central method?
  // maybe move this to group service
  findCurrentGroup(
    groups: Configurator.Group[],
    groupId: String
  ): Configurator.Group {
    if (groups.find(group => group.id === groupId)) {
      return groups.find(group => group.id === groupId);
    }

    //Call function recursive until group is returned
    for (let i = 0; i < groups.length; i++) {
      if (this.findCurrentGroup(groups[i].subGroups, groupId) !== null) {
        return this.findCurrentGroup(groups[i].subGroups, groupId);
      }
    }

    return null;
  }
}
