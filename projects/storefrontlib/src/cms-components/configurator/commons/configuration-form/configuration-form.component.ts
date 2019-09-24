import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Configurator,
  ConfiguratorCommonsService,
  RoutingService,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cx-config-form',
  templateUrl: './configuration-form.component.html',
})
export class ConfigurationFormComponent implements OnInit, OnDestroy {
  configuration$: Observable<Configurator.Configuration>;
  subscription = new Subscription();

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
  public isRadioButton(attribute: Configurator.Attribute): boolean {
    return attribute.uiType === Configurator.UiType.RADIOBUTTON;
  }
  public isNotSupported(attribute: Configurator.Attribute): boolean {
    return attribute.uiType === Configurator.UiType.NOT_IMPLEMENTED;
  }
}
