import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CART_MODIFICATION_NORMALIZER } from '../../../../cart/connectors/entry/converters';
import { ConfiguratorTextfieldAdapter } from '../../../../configurator/textfield/connectors/configurator-textfield.adapter';
import {
  CONFIGURATION_TEXTFIELD_ADD_TO_CART_SERIALIZER,
  CONFIGURATION_TEXTFIELD_NORMALIZER,
} from '../../../../configurator/textfield/connectors/converters';
import { CartModification } from '../../../../model/cart.model';
import { ConfiguratorTextfield } from '../../../../model/configurator-textfield.model';
import { GenericConfigurator } from '../../../../model/generic-configurator.model';
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
    productCode: string,
    owner: GenericConfigurator.Owner
  ): Observable<ConfiguratorTextfield.Configuration> {
    return this.http
      .get<OccConfiguratorTextfield.Configuration>(
        this.occEndpointsService.getUrl('createConfigurationTextfield', {
          productCode,
        })
      )
      .pipe(
        this.converterService.pipeable(CONFIGURATION_TEXTFIELD_NORMALIZER),
        tap(configuration => (configuration.owner = owner))
      );
  }

  addToCart(
    parameters: ConfiguratorTextfield.AddToCartParameters
  ): Observable<CartModification> {
    const url = this.occEndpointsService.getUrl(
      'addConfigurationTextfieldToCart',
      {
        userId: parameters.userId,
        cartId: parameters.cartId,
      }
    );

    const occAddToCartParameters = this.converterService.convert(
      parameters,
      CONFIGURATION_TEXTFIELD_ADD_TO_CART_SERIALIZER
    );

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http
      .post<CartModification>(url, occAddToCartParameters, { headers })
      .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
  }
}
