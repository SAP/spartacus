import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  ConfiguratorTextfield,
  ConfiguratorTextfieldService,
  GenericConfigurator,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ConfigRouterExtractorService } from '../../generic/service/config-router-extractor.service';

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
      .extractConfigurationOwner(this.routingService)
      .pipe(
        switchMap((owner) => {
          switch (owner.type) {
            case GenericConfigurator.OwnerType.PRODUCT:
              return this.configuratorTextfieldService.createConfiguration(
                owner
              );
            case GenericConfigurator.OwnerType.CART_ENTRY:
              return null; //TODO:get configuration from cart for change confuration in cart
          }
        })
      );
  }

  updateConfiguration(attribute: ConfiguratorTextfield.ConfigurationInfo) {
    this.configuratorTextfieldService.updateConfiguration(attribute);
  }
}
