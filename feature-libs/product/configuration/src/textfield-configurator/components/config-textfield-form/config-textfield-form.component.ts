import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GenericConfigurator, RoutingService } from '@spartacus/core';
import { ConfigRouterExtractorService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ConfiguratorTextfieldService } from '../../facade/configurator-textfield.service';
import { ConfiguratorTextfield } from '../../model/configurator-textfield.model';

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
  /**
   * Updates a configuration attribute
   * @param attribute Configuration attribute, always containing a string typed value
   */
  updateConfiguration(attribute: ConfiguratorTextfield.ConfigurationInfo) {
    this.configuratorTextfieldService.updateConfiguration(attribute);
  }
}
