/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, Injector, inject, isDevMode } from '@angular/core';
import { Observable, combineLatest, of } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { LoggerService } from '../../logger';
import {
  getContextParameterDefault,
  getContextParameterValues,
} from '../config/context-config-utils';
import { SiteContextConfig } from '../config/site-context-config';
import { SiteContext } from '../facade/site-context.interface';
import { ContextServiceMap } from '../providers/context-service-map';

@Injectable()
export class SiteContextParamsService {
  protected logger = inject(LoggerService);

  constructor(
    private config: SiteContextConfig,
    private injector: Injector,
    private serviceMap: ContextServiceMap
  ) {}

  getContextParameters(): string[] {
    if (this.config.context) {
      return Object.keys(this.config.context).filter(
        (param) => param !== 'urlParameters'
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

  getParamDefaultValue(param: string): string | undefined {
    return getContextParameterDefault(this.config, param);
  }

  getSiteContextService(param: string): SiteContext<any> | undefined {
    if (this.serviceMap[param]) {
      try {
        return this.injector.get<SiteContext<any>>(this.serviceMap[param]);
      } catch {
        if (isDevMode()) {
          this.logger.warn(
            `Couldn't find site context service for '${param}'.`
          );
        }
        return undefined;
      }
    }
  }

  getValue(param: string): string | undefined {
    let value: string | undefined;

    const service = this.getSiteContextService(param);
    if (service) {
      service
        .getActive()
        .subscribe((val) => (value = val))
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

  /**
   * Get active values for all provided context parameters
   *
   * @param params Context parameters
   *
   * @returns Observable emitting array of all passed active context values
   */
  getValues(params: string[]): Observable<Array<string>> {
    if (params.length === 0) {
      return of([]);
    }

    return combineLatest(
      params.map((param) => {
        const service = this.getSiteContextService(param);
        if (service) {
          return service.getActive().pipe(distinctUntilChanged());
        }
        return of('');
      })
    ).pipe(filter((value) => value.every((param) => !!param)));
  }
}
