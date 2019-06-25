import { Injectable, Injector } from '@angular/core';
import {
  ContextParameter,
  ContextPersistence,
  SiteContextConfig,
} from '../config/site-context-config';
import { SiteContext } from '../facade/site-context.interface';
import { ContextServiceMap } from '../providers/context-service-map';
import {
  getContextParameter,
  getContextParameterDefault,
} from '../config/context-config-utils';

@Injectable()
export class SiteContextParamsService {
  constructor(
    private config: SiteContextConfig,
    private injector: Injector,
    private serviceMap: ContextServiceMap
  ) {}

  getContextParameters(persistence?: ContextPersistence | string): string[] {
    const contextConfig = this.config.context && this.config.context.parameters;
    if (contextConfig) {
      const params = Object.keys(contextConfig);
      if (persistence) {
        return params.filter(
          key => contextConfig[key].persistence === persistence
        );
      } else {
        return params;
      }
    }
    return [];
  }

  getParameter(param: string): ContextParameter {
    return getContextParameter(this.config, param);
  }

  getParamValues(param: string): string[] {
    return this.getParameter(param).values || [];
  }

  getParamDefaultValue(param: string): string {
    return getContextParameterDefault(this.config, param);
  }

  getSiteContextService(param: string): SiteContext<any> {
    if (this.serviceMap[param]) {
      return this.injector.get<SiteContext<any>>(this.serviceMap[param], null);
    }
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
