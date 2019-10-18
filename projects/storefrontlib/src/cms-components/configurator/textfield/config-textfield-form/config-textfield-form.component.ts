import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  ConfiguratorTextfield,
  ConfiguratorTextfieldService,
  RoutingService,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cx-config-textfield-form',
  templateUrl: './config-textfield-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigTextfieldFormComponent implements OnInit, OnDestroy {
  productCode: string;
  configuration$: Observable<ConfiguratorTextfield.Configuration>;
  subscription = new Subscription();
  constructor(
    private routingService: RoutingService,
    private configuratorTextfieldService: ConfiguratorTextfieldService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.routingService
        .getRouterState()
        .subscribe(state => this.createConfiguration(state))
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  createConfiguration(routingData) {
    this.productCode = routingData.state.params.rootProduct;
    this.configuration$ = this.configuratorTextfieldService.createConfiguration(
      routingData.state.params.rootProduct
    );
  }
}
