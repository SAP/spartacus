import { Injectable } from '@angular/core';
import { CartModification } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import {
  Configurator,
  CpqConfiguratorOccService,
  RulebasedConfiguratorAdapter,
} from '@spartacus/product-configurator/rulebased';
import { Observable, of, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CpqConfiguratorRestService } from './cpq-configurator-rest.service';

@Injectable()
export class CpqConfiguratorRestAdapter
  implements RulebasedConfiguratorAdapter {
  constructor(
    protected cpqRestService: CpqConfiguratorRestService,
    protected cpqOccService: CpqConfiguratorOccService
  ) {}

  getConfiguratorType(): string {
    return 'CLOUDCPQCONFIGURATOR';
  }

  createConfiguration(
    owner: CommonConfigurator.Owner
  ): Observable<Configurator.Configuration> {
    if (!owner.id) {
      return throwError('No product code provided');
    }
    return this.cpqRestService.createConfiguration(owner.id).pipe(
      map((configResonse) => {
        configResonse.owner = owner;
        return configResonse;
      })
    );
  }

  readConfiguration(
    configId: string,
    groupId: string,
    owner: CommonConfigurator.Owner
  ): Observable<Configurator.Configuration> {
    return this.cpqRestService.readConfiguration(configId, groupId).pipe(
      map((configResponse) => {
        configResponse.owner = owner;
        return configResponse;
      })
    );
  }

  updateConfiguration(
    configuration: Configurator.Configuration
  ): Observable<Configurator.Configuration> {
    const updateMethod =
      configuration.updateType === Configurator.UpdateType.VALUE_QUANTITY
        ? this.cpqRestService.updateValueQuantity
        : this.cpqRestService.updateAttribute;
    return updateMethod.call(this.cpqRestService, configuration).pipe(
      map((configResonse: Configurator.Configuration) => {
        configResonse.owner = configuration.owner;
        return configResonse;
      })
    );
  }

  addToCart(
    parameters: Configurator.AddToCartParameters
  ): Observable<CartModification> {
    return this.cpqOccService.addToCart(parameters);
  }

  readConfigurationForCartEntry(
    parameters: CommonConfigurator.ReadConfigurationFromCartEntryParameters
  ): Observable<Configurator.Configuration> {
    return this.cpqOccService.getConfigIdForCartEntry(parameters).pipe(
      switchMap((configId) => {
        return this.cpqRestService.readConfiguration(configId).pipe(
          map((configResponse) => {
            configResponse.owner = parameters.owner;
            return configResponse;
          })
        );
      })
    );
  }

  updateConfigurationForCartEntry(
    parameters: Configurator.UpdateConfigurationForCartEntryParameters
  ): Observable<CartModification> {
    return this.cpqOccService.updateCartEntry(parameters);
  }

  readConfigurationForOrderEntry(
    parameters: CommonConfigurator.ReadConfigurationFromOrderEntryParameters
  ): Observable<Configurator.Configuration> {
    return this.cpqOccService.getConfigIdForOrderEntry(parameters).pipe(
      switchMap((configId) => {
        return this.cpqRestService.readConfiguration(configId).pipe(
          map((configResponse) => {
            configResponse.owner = parameters.owner;
            return configResponse;
          })
        );
      })
    );
  }

  readPriceSummary(
    configuration: Configurator.Configuration
  ): Observable<Configurator.Configuration> {
    return of(configuration); // so that UI does not run into exception
  }

  getConfigurationOverview(
    configId: string
  ): Observable<Configurator.Overview> {
    return this.cpqRestService.readConfigurationOverview(configId);
  }
}
