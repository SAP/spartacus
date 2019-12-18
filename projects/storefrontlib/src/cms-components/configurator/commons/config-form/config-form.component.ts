import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  Configurator,
  ConfiguratorCommonsService,
  ConfiguratorGroupsService,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { ConfigRouterExtractorService } from '../../generic/service/config-router-extractor.service';
import { ConfigFormUpdateEvent } from './config-form.event';

@Component({
  selector: 'cx-config-form',
  templateUrl: './config-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigFormComponent implements OnInit {
  configuration$: Observable<Configurator.Configuration>;
  currentGroupId$: Observable<String>;
  currentGroup: Configurator.Group;

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

    this.currentGroupId$ = this.configRouterExtractorService
      .extractConfigurationOwner(this.routingService)
      .pipe(
        switchMap(owner =>
          this.configuratorCommonsService.getConfiguration(owner)
        ),
        switchMap(configuration =>
          this.configuratorGroupsService.getCurrentGroup(configuration.owner)
        )
      );

    this.currentGroupId$.subscribe(currentGroupId => {
      this.configuration$.pipe(take(1)).subscribe(configuration => {
        this.currentGroup = this.findCurrentGroup(
          configuration.groups,
          currentGroupId
        );
      });
    });
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
