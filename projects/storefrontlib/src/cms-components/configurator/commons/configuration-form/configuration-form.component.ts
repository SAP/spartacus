import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Attribute,
  Configuration,
  ConfiguratorCommonsService,
  RoutingService,
  UiType,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cx-config-form',
  templateUrl: './configuration-form.component.html',
})
export class ConfigurationFormComponent implements OnInit, OnDestroy {
  configuration$: Observable<Configuration>;
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
  public isRadioButton(attribute: Attribute): boolean {
    return attribute.uiType === UiType.RADIOBUTTON;
  }
  public isNotSupported(attribute: Attribute): boolean {
    return attribute.uiType === UiType.NOT_IMPLEMENTED;
  }
}
