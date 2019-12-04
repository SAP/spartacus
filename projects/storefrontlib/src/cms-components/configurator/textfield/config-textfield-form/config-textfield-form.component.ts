import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  ConfiguratorTextfield,
  ConfiguratorTextfieldService,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-config-textfield-form',
  templateUrl: './config-textfield-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigTextfieldFormComponent implements OnInit {
  configuration$: Observable<ConfiguratorTextfield.Configuration>;

  constructor(
    private routingService: RoutingService,
    private configuratorTextfieldService: ConfiguratorTextfieldService
  ) {}

  ngOnInit(): void {
    this.configuration$ = this.routingService.getRouterState().pipe(
      map(routingData => routingData.state.params.rootProduct),
      switchMap(product =>
        this.configuratorTextfieldService.createConfiguration(product)
      )
    );
  }

  updateConfiguration(attribute: ConfiguratorTextfield.ConfigurationInfo) {
    this.configuratorTextfieldService.updateConfiguration(attribute);
  }
}
