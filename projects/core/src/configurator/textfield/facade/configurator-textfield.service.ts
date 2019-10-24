import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ConfiguratorTextfield } from '../../../model/configurator-textfield.model';
import * as ConfiguratorActions from '../store/actions/configurator-textfield.action';
import { StateWithConfigurationTextfield } from '../store/configuration-textfield-state';
import * as ConfiguratorSelectors from '../store/selectors/configurator-textfield.selector';

@Injectable()
export class ConfiguratorTextfieldService {
  constructor(protected store: Store<StateWithConfigurationTextfield>) {}

  createConfiguration(
    productCode: string
  ): Observable<ConfiguratorTextfield.Configuration> {
    this.store.dispatch(
      new ConfiguratorActions.CreateConfiguration({
        productCode: productCode,
      })
    );

    return this.store.select(ConfiguratorSelectors.getConfigurationContent);
  }
}
