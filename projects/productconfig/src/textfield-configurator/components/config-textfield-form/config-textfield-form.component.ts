import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  ConfiguratorTextfield,
  ConfiguratorTextfieldService,
  GenericConfigurator,
  RoutingService,
} from '@spartacus/core';
import { ConfigRouterExtractorService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'cx-config-textfield-form',
  templateUrl: './config-textfield-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigTextfieldFormComponent implements OnInit {
  configuration$: Observable<ConfiguratorTextfield.Configuration>;

  constructor(
    private routingService: RoutingService,
    private configuratorTextfieldService: ConfiguratorTextfieldService,
    private configRouterExtractorService: ConfigRouterExtractorService
  ) {}

  ngOnInit(): void {
    this.configuration$ = this.configRouterExtractorService
      .extractRouterData(this.routingService)
      .pipe(
        switchMap((routerData) => {
          switch (routerData.owner.type) {
            case GenericConfigurator.OwnerType.PRODUCT:
              return this.configuratorTextfieldService.createConfiguration(
                routerData.owner
              );
            case GenericConfigurator.OwnerType.CART_ENTRY:
              return this.configuratorTextfieldService.readConfigurationForCartEntry(
                routerData.owner
              );
          }
        })
      );
  }

  updateConfiguration(attribute: ConfiguratorTextfield.ConfigurationInfo) {
    this.configuratorTextfieldService.updateConfiguration(attribute);
  }
}
