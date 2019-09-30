import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  Configurator,
  ConfiguratorCommonsService,
  RoutingService,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cx-config-form',
  templateUrl: './config-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigFormComponent implements OnInit, OnDestroy {
  configuration$: Observable<Configurator.Configuration>;
  subscription = new Subscription();
  public UiType = Configurator.UiType;

  constructor(
    private routingService: RoutingService,
    private configuratorCommonsService: ConfiguratorCommonsService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.routingService
        .getRouterState()
        .subscribe(state => this.createConfiguration(state))
    );
  }

  createConfiguration(routingData) {
    this.configuration$ = this.configuratorCommonsService.createConfiguration(
      routingData.state.params.rootProduct
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
