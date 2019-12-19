import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  Configurator,
  ConfiguratorCommonsService,
  ConfiguratorGroupsService,
  GenericConfigurator,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { ConfigRouterExtractorService } from '../../generic/service/config-router-extractor.service';
import { ConfigFormUpdateEvent } from './config-form.event';

@Component({
  selector: 'cx-config-form',
  templateUrl: './config-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigFormComponent implements OnInit {
  configuration$: Observable<Configurator.Configuration>;
  currentGroup$: Observable<Configurator.Group>;

  public UiType = Configurator.UiType;

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
          this.configuratorCommonsService.getOrCreateConfiguration(owner)
        )
      );

    this.configRouterExtractorService
      .extractConfigurationOwner(this.routingService)
      .pipe(
        switchMap(owner =>
          this.configuratorCommonsService.getOrCreateUiState(owner)
        ),
        take(1)
      )
      .subscribe();

    this.currentGroup$ = this.configRouterExtractorService
      .extractConfigurationOwner(this.routingService)
      .pipe(
        switchMap(owner =>
          this.configuratorCommonsService.getConfiguration(owner)
        ),
        switchMap(configuration =>
          this.getCurrentGroup(configuration.groups, configuration.owner)
        )
      );
  }

  getCurrentGroup(
    groups: Configurator.Group[],
    owner: GenericConfigurator.Owner
  ): Observable<Configurator.Group> {
    return this.configuratorGroupsService
      .getCurrentGroup(owner)
      .pipe(map(currenGroupId => this.findCurrentGroup(groups, currenGroupId)));
  }

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

  updateConfiguration(event: ConfigFormUpdateEvent) {
    this.configuratorCommonsService.updateConfiguration(
      event.productCode,
      event.groupId,
      event.changedAttribute
    );
  }
}
