import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { ConfiguratorCommonsService } from 'projects/core/src/configurator/commons/facade/configurator-commons.service';
import { Configuration } from 'projects/core/src/model/configurator.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-config-form',
  templateUrl: './configuration-form.component.html',
})
export class ConfigurationFormComponent implements OnInit, OnDestroy {
  configuration$: Observable<Configuration>;

  constructor(
    private routingService: RoutingService,
    private configuratorCommonsService: ConfiguratorCommonsService
  ) {}

  ngOnInit(): void {
    this.routingService
      .getRouterState()
      .forEach(state => this.createConfiguration(state));
  }

  createConfiguration(routingData) {
    this.configuration$ = this.configuratorCommonsService.createConfiguration(
      routingData.state.params.pcCode
    );
  }

  ngOnDestroy(): void {}
}
