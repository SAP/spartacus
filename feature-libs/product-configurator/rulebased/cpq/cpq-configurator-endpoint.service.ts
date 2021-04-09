import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HEADER_ATTR_CPQ_CONFIGURATOR } from '../root/interceptor/cpq-configurator-rest.interceptor';

@Injectable({ providedIn: 'root' })
export class CpqConfiguratorEndpointService {
  constructor() {}

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

  buildConfigurationInitUrl(): string {
    return this.getEndpointBase();
  }

  buildConfigurationDisplayUrl(configId: string, tabId?: string): string {
    const baseUrl = `${this.getEndpointBase()}/${configId}/display`;
    return tabId
      ? this.appendUrlParameters(baseUrl, [{ name: 'tabId', value: tabId }])
      : baseUrl;
  }

  buildAttributeUpdateUrl(configId: string, attributeCode: string): string {
    return `${this.getEndpointBase()}/${configId}/attributes/${attributeCode}`;
  }

  buildValueUpdateUrl(
    configId: string,
    attributeCode: string,
    valueCode: string
  ): string {
    return `${this.buildAttributeUpdateUrl(
      configId,
      attributeCode
    )}/attributeValues/${valueCode}`;
  }

  protected getEndpointBase(): string {
    return '/api/configuration/v1/configurations';
  }

  protected appendUrlParameters(
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
