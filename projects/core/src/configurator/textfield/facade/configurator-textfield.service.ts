import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ConfiguratorTextfield } from '../../../model/configurator-textfield.model';
import * as ConfiguratorActions from '../store/actions/configurator-textfield.action';
import { StateWithConfigurationTextfield } from '../store/configuration-textfield-state';
import * as ConfiguratorSelectors from '../store/selectors/configurator-textfield.selector';

const SUCCESS_STATUS = 'SUCCESS';

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

  updateConfiguration(
    changedAttribute: ConfiguratorTextfield.ConfigurationInfo
  ): void {
    this.store
      .pipe(
        select(ConfiguratorSelectors.getConfigurationContent),
        take(1)
      )
      .subscribe(oldConfiguration => {
        this.store.dispatch(
          new ConfiguratorActions.UpdateConfiguration(
            this.createNewConfigurationWithChange(
              changedAttribute,
              oldConfiguration
            )
          )
        );
      });
  }

  createNewConfigurationWithChange(
    changedAttribute: ConfiguratorTextfield.ConfigurationInfo,
    oldConfiguration: ConfiguratorTextfield.Configuration
  ): ConfiguratorTextfield.Configuration {
    const newConfiguration: ConfiguratorTextfield.Configuration = {
      configurationInfos: [],
    };
    oldConfiguration.configurationInfos.forEach(info => {
      if (info.configurationLabel === changedAttribute.configurationLabel) {
        changedAttribute.status = SUCCESS_STATUS;
        newConfiguration.configurationInfos.push(changedAttribute);
      } else {
        newConfiguration.configurationInfos.push(info);
      }
    });
    return newConfiguration;
  }
}
