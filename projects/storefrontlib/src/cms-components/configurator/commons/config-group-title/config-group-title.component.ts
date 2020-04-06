import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  Configurator,
  ConfiguratorCommonsService,
  ConfiguratorGroupsService,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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
        switchMap((owner) =>
          this.configuratorCommonsService.getConfiguration(owner)
        )
      );

    this.displayedGroup$ = this.configRouterExtractorService
      .extractConfigurationOwner(this.routingService)
      .pipe(
        switchMap((owner) =>
          this.configuratorGroupsService.getCurrentGroup(owner)
        )
      );
  }
}
