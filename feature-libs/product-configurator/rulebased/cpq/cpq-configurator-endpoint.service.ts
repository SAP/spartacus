import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DynamicTemplate } from 'projects/core/src/config/utils/dynamic-template';
import { HEADER_ATTR_CPQ_CONFIGURATOR } from '../root/interceptor/cpq-configurator-rest.interceptor';
import { CpqConfiguratorEndpointConfig } from './cpq-configurator-endpoint.config';

@Injectable({ providedIn: 'root' })
export class CpqConfiguratorEndpointService {
  constructor(protected config: CpqConfiguratorEndpointConfig) {
    this.endpoints = config.backend.cpq.endpoints;
    this.prefix = config.backend.cpq.prefix;
  }
  protected endpoints;
  protected prefix;

  /**
   * header attribute to a mark cpq related requests, so that they can be picked up by the {@link CpqConfiguratorRestInterceptor}
   */
  protected readonly CPQ_MARKER_HEADER = {
    headers: new HttpHeaders({
      [HEADER_ATTR_CPQ_CONFIGURATOR]: 'x',
    }),
  };

  /**
   * returns required cpq headers
   */
  get cpqHeaders(): { headers: HttpHeaders } {
    return this.CPQ_MARKER_HEADER;
  }

  buildUrl(
    endpointName: string,
    urlParams?: Object,
    queryParams?: [{ name: string; value: string }]
  ): string {
    const endpoint = this.endpoints[endpointName];
    if (!endpoint) {
      console.warn(
        `${endpointName} endpoint configuration missing for cpq backend, please provide it via key: "backend.cpq.endpoints.${endpointName}"`
      );
    }
    let url = this.prefix + endpoint;
    url = urlParams ? DynamicTemplate.resolve(url, urlParams) : url;
    url = queryParams ? this.appendQueryParameters(url, queryParams) : url;
    return url;
  }

  protected appendQueryParameters(
    url: string,
    parameters: [{ name: string; value: string }]
  ): string {
    let urlWithParameters = url + '?';
    parameters.forEach((param, idx: number) => {
      urlWithParameters = idx > 0 ? urlWithParameters + '&' : urlWithParameters;
      urlWithParameters = `${urlWithParameters}${param.name}=${param.value}`;
    });
    return urlWithParameters;
  }
}
