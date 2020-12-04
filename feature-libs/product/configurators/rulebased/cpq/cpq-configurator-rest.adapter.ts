import { Injectable } from '@angular/core';
import { CartModification } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product/configurators/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RulebasedConfiguratorAdapter } from '../core/connectors/rulebased-configurator.adapter';
import { Configurator } from '../core/model/configurator.model';
import { CpqConfiguratorRestService } from './cpq-configurator-rest.service';

@Injectable()
export class CpqConfiguratorRestAdapter
  implements RulebasedConfiguratorAdapter {
  constructor(
    protected cpqAcpqConfiguratorRestService: CpqConfiguratorRestService,
    protected cpqService: CpqConfiguratorRestService
  ) {}

  getConfiguratorType(): string {
    return 'CLOUDCPQCONFIGURATOR';
  }

  createConfiguration(
    owner: CommonConfigurator.Owner
  ): Observable<Configurator.Configuration> {
    return this.cpqAcpqConfiguratorRestService
      .createConfiguration(owner.id)
      .pipe(
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
    return this.cpqAcpqConfiguratorRestService
      .readConfiguration(configId, groupId)
      .pipe(
        map((configResponse) => {
          configResponse.owner = owner;
          return configResponse;
        })
      );
  }

  updateConfiguration(
    configuration: Configurator.Configuration
  ): Observable<Configurator.Configuration> {
    return this.cpqAcpqConfiguratorRestService
      .updateConfiguration(configuration)
      .pipe(
        map((configResonse) => {
          configResonse.owner = configuration.owner;
          return configResonse;
        })
      );
  }

  addToCart(): Observable<CartModification> {
    return undefined;
  }

  readConfigurationForCartEntry(): Observable<Configurator.Configuration> {
    return undefined;
  }

  updateConfigurationForCartEntry(): Observable<CartModification> {
    return undefined;
  }

  readConfigurationForOrderEntry(): Observable<Configurator.Configuration> {
    return undefined;
  }

  readPriceSummary(
    configuration: Configurator.Configuration
  ): Observable<Configurator.Configuration> {
    return of(configuration); // so that UI does not run into exception
  }

  getConfigurationOverview(): Observable<Configurator.Overview> {
    return undefined;
  }
}
