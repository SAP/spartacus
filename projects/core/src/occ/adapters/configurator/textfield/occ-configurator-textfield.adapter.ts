import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfiguratorTextfieldAdapter } from '../../../../configurator/textfield/connectors/configurator-textfield.adapter';
import { CONFIGURATION_TEXTFIELD_NORMALIZER } from '../../../../configurator/textfield/connectors/converters';
import { ConfiguratorTextfield } from '../../../../model/configurator-textfield.model';
import { ConverterService } from '../../../../util/converter.service';
import { OccEndpointsService } from '../../../services/occ-endpoints.service';
import { OccConfiguratorTextfield } from './occ-configurator-textfield.models';

@Injectable()
export class OccConfiguratorTextfieldAdapter
  implements ConfiguratorTextfieldAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService,
    protected converterService: ConverterService
  ) {}

  createConfiguration(
    productCode: string
  ): Observable<ConfiguratorTextfield.Configuration> {
    return this.http
      .get<OccConfiguratorTextfield.Configuration>(
        this.occEndpointsService.getUrl('createConfiguration', { productCode })
      )
      .pipe(this.converterService.pipeable(CONFIGURATION_TEXTFIELD_NORMALIZER));
  }
}
