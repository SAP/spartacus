import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfiguratorCommonsAdapter } from '../../../../configurator/commons/connectors/configurator-commons.adapter';
import { CONFIGURATION_NORMALIZER } from '../../../../configurator/commons/connectors/converters';
import { FeatureConfigService } from '../../../../features-config/services/feature-config.service';
import { ConverterService } from '../../../../util/converter.service';
import { OccEndpointsService } from '../../../services/occ-endpoints.service';
import { Configurator } from './../../../../model/configurator.model';
import { OccConfigurator } from './occ-configurator.models';

@Injectable()
export class OccConfiguratorVariantAdapter
  implements ConfiguratorCommonsAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService,
    protected converterService: ConverterService,
    protected featureConfigService?: FeatureConfigService
  ) {}

  createConfiguration(
    productCode: string
  ): Observable<Configurator.Configuration> {
    return this.http
      .get<OccConfigurator.Configuration>(
        this.occEndpointsService.getUrl('createConfiguration', { productCode })
      )
      .pipe(this.converterService.pipeable(CONFIGURATION_NORMALIZER));
  }
}
