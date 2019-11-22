import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  Configurator,
  ConfiguratorCommonsService,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-config-price-summary',
  templateUrl: './config-price-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigPriceSummaryComponent implements OnInit {
  configuration$: Observable<Configurator.Configuration>;

  constructor(
    private routingService: RoutingService,
    private configuratorCommonsService: ConfiguratorCommonsService
  ) {}

  ngOnInit(): void {
    this.configuration$ = this.routingService.getRouterState().pipe(
      map(routingData => routingData.state.params.rootProduct),
      switchMap(product =>
        this.configuratorCommonsService.getConfiguration(product)
      )
    );
  }
}
