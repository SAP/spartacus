import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActiveCartService } from '@spartacus/core';
import {
  CommonConfigurator,
  CommonConfiguratorUtilsService,
} from '@spartacus/product-configurator/common';
import {
  ConfiguratorCartService,
  ConfiguratorCommonsService,
  ConfiguratorUtilsService,
  StateWithConfigurator,
} from '@spartacus/product-configurator/rulebased';

@Injectable({ providedIn: 'root' })
export class CustomCommonsService extends ConfiguratorCommonsService {
  constructor(
    protected store: Store<StateWithConfigurator>,
    protected commonConfigUtilsService: CommonConfiguratorUtilsService,
    protected configuratorCartService: ConfiguratorCartService,
    protected activeCartService: ActiveCartService,
    protected configuratorUtils: ConfiguratorUtilsService
  ) {
    super(
      store,
      commonConfigUtilsService,
      configuratorCartService,
      activeCartService,
      configuratorUtils
    );
  }

  removeObsoleteProductBoundConfiguration(owner: CommonConfigurator.Owner) {
    super.removeObsoleteProductBoundConfiguration(owner);
  }
}
