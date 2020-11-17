import { Injectable } from '@angular/core';
import { CartModification } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product/configurators/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RulebasedConfiguratorAdapter } from '../core/connectors/rulebased-configurator.adapter';
import { Configurator } from '../core/model/configurator.model';
import { CpqAccessStorageService } from '../occ/cpq/cpq-access-storage.service';
import { CpqConfiguratorRestService } from './cpq-configurator-rest.service';

@Injectable()
export class CpqConfiguratorRestAdapter
  implements RulebasedConfiguratorAdapter {
  constructor(
    protected cpqAccessStorageService: CpqAccessStorageService,
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
          const config: Configurator.Configuration = {
            configId: configResonse.configId,
            owner: owner,
          };
          return config;
        })
      );
  }

  readConfiguration(): Observable<Configurator.Configuration> {
    return undefined;
  }

  updateConfiguration(): Observable<Configurator.Configuration> {
    return undefined;
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
    return of(configuration);
  }

  getConfigurationOverview(): Observable<Configurator.Overview> {
    return undefined;
  }
}
