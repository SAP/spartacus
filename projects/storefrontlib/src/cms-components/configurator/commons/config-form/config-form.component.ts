import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  Configurator,
  ConfiguratorCommonsService,
  ConfiguratorGroupsService,
  RoutingService,
  GlobalMessageService,
  GlobalMessageType,
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
  currentGroup$: Observable<Configurator.Group>;

  public UiType = Configurator.UiType;

  constructor(
    private routingService: RoutingService,
    private configuratorCommonsService: ConfiguratorCommonsService,
    private configuratorGroupsService: ConfiguratorGroupsService,
    private configRouterExtractorService: ConfigRouterExtractorService,
    private messageService: GlobalMessageService
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
          this.configuratorGroupsService.getCurrentGroup(owner)
        )
      );

    this.messageService.add('TEST', GlobalMessageType.MSG_TYPE_ERROR);
  }

  updateConfiguration(event: ConfigFormUpdateEvent) {
    this.configuratorCommonsService.updateConfiguration(
      event.productCode,
      event.groupId,
      event.changedAttribute
    );
  }
}
