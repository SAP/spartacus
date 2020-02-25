import { Injectable, Injector } from '@angular/core';
import {
  getContextParameterDefault,
  getContextParameterValues,
} from '../config/context-config-utils';
import { SiteContextConfig } from '../config/site-context-config';
import { SiteContext } from '../facade/site-context.interface';
import { ContextServiceMap } from '../providers/context-service-map';

@Injectable()
export class SiteContextParamsService {
  constructor(
    private config: SiteContextConfig,
    private injector: Injector,
    private serviceMap: ContextServiceMap
  ) {}

  getContextParameters(): string[] {
    if (this.config.context) {
      return Object.keys(this.config.context).filter(
        param => param !== 'urlParameters'
      );
    }
    return [];
  }

  getUrlEncodingParameters(): string[] {
    return (this.config.context && this.config.context.urlParameters) || [];
  }

  getParamValues(param: string): string[] {
    return getContextParameterValues(this.config, param);
  }

  getParamDefaultValue(param: string): string {
    return getContextParameterDefault(this.config, param);
  }

  getSiteContextService(param: string): SiteContext<any> {
    if (this.serviceMap[param]) {
      return this.injector.get<SiteContext<any>>(this.serviceMap[param], null);
    }
  }

  getSiteContextServiceMap(): ContextServiceMap {
    return this.serviceMap;
  }

  getValue(param: string): string {
    let value: string;

    const service = this.getSiteContextService(param);
    if (service) {
      service
        .getActive()
        .subscribe(val => (value = val))
        .unsubscribe();
    }

    return value !== undefined ? value : this.getParamDefaultValue(param);
  }

  setValue(param: string, value: string) {
    const service = this.getSiteContextService(param);
    if (service) {
      service.setActive(value);
    }
  }
}
