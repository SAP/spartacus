import { Injectable, Injector, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  ContextParamPersistence,
  SiteContextConfig
} from '../config/site-context-config';
import { SiteContext } from '../facade/site-context.interface';
import { ContextServiceMap } from '../context-service-map';

@Injectable({
  providedIn: 'root'
})
export class SiteContextParamsService implements OnDestroy {
  private currentValues: { [context: string]: string } = {};
  private subscription = new Subscription();

  constructor(
    private config: SiteContextConfig,
    private injector: Injector,
    private serviceMap: ContextServiceMap
  ) {
    this.subscribeValues();
  }

  private subscribeValues() {
    Object.keys(this.serviceMap).forEach(param => {
      this.subscription.add(
        this.injector
          .get<SiteContext<any>>(this.serviceMap[param])
          .getActive()
          .subscribe(value => {
            this.currentValues[param] = value;
          })
      );
    });
  }

  getContextParameters(persistence?: ContextParamPersistence): string[] {
    const contextConfig = this.config.siteContext;
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

  getParamValues(param: string) {
    return this.config.siteContext[param]
      ? this.config.siteContext[param].values
      : undefined;
  }

  getParamDefaultValue(param: string) {
    return this.config.siteContext[param]
      ? this.config.siteContext[param].defaultValue
      : undefined;
  }

  getValue(key: string) {
    if (this.currentValues[key]) {
      return this.currentValues[key];
    } else {
      return this.getParamDefaultValue(key);
    }
  }

  // private setValue(key: string, value: string) {
  //   if (this.serviceMap[key]) {
  //     this.injector.get<SiteContext<any>>(this.serviceMap[key]).setActive(value);
  //   }
  // }
  //
  // getContextValues(): string[] {
  //   const contextConfig = this.config.siteContext;
  //
  //   if (contextConfig) {
  //     return Object.keys(contextConfig)
  //       .filter(key => contextConfig[key].persistence === 'route')
  //       .map(key => this.getValue(key));
  //   }
  //
  //   return [];
  // }
  //
  // setContextParamsFromRoute(url: string) {
  //   const segments = url.split('/');
  //   if (segments[0] === '') {
  //     segments.shift();
  //   }
  //   const routerContextParams = this.getContextParameters('route');
  //   for (
  //     let i = 0;
  //     i < routerContextParams.length && i < segments.length;
  //     i++
  //   ) {
  //     const paramName = routerContextParams[i];
  //     const paramValues = this.getParamValues(paramName);
  //     if (paramValues.indexOf(segments[i]) > -1) {
  //       this.setValue(paramName, segments[i]);
  //     } else {
  //       break;
  //     }
  //   }
  // }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
