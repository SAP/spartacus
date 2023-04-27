/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, Injector, Optional } from '@angular/core';
import {
  CmsSiteContextSelectorComponent,
  ContextServiceMap,
  CURRENCY_CONTEXT_ID,
  isNotUndefined,
  LANGUAGE_CONTEXT_ID,
  SiteContext,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { SiteContextType } from './site-context.model';

const LABELS: { [key: string]: string } = {
  [LANGUAGE_CONTEXT_ID]: 'Language',
  [CURRENCY_CONTEXT_ID]: 'Currency',
};

@Injectable()
export class SiteContextComponentService {
  constructor(
    @Optional()
    protected componentData: CmsComponentData<CmsSiteContextSelectorComponent>,
    private contextServiceMap: ContextServiceMap,
    protected injector: Injector
  ) {}

  getItems(context?: SiteContextType): Observable<any> {
    return this.getService(context).pipe(
      switchMap((service: SiteContext<any>) => service.getAll()),
      switchMap((items) =>
        this.getContext(context).pipe(
          switchMap((ctx) => {
            const itemsCopy = [];
            for (const item of items) {
              itemsCopy.push({
                ...item,
                label: this.getOptionLabel(item, ctx),
              });
            }
            return of(itemsCopy);
          })
        )
      )
    );
  }

  getActiveItem(context?: SiteContextType): Observable<string> {
    return this.getService(context).pipe(
      switchMap((service: SiteContext<any>) => service.getActive())
    );
  }

  getLabel(context?: SiteContextType): Observable<any> {
    return this.getContext(context).pipe(
      map((ctx) => {
        if (ctx) {
          return LABELS[ctx];
        }
      })
    );
  }

  setActive(value: string, context?: SiteContextType): void {
    this.getService(context)
      .pipe(take(1))
      .subscribe((service) => {
        service.setActive(value);
      });
  }

  protected getService(
    context?: SiteContextType
  ): Observable<SiteContext<any>> {
    return this.getContext(context).pipe(
      map((ctx: string | undefined) =>
        ctx ? this.getInjectedService(ctx) : undefined
      ),
      filter(isNotUndefined)
    );
  }

  protected getContext(
    context?: SiteContextType
  ): Observable<string | undefined> {
    if (context) {
      if (context === SiteContextType.CURRENCY) {
        return of(CURRENCY_CONTEXT_ID);
      } else if (context === SiteContextType.LANGUAGE) {
        return of(LANGUAGE_CONTEXT_ID);
      } else {
        return of(context as SiteContextType);
      }
    } else if (this.componentData) {
      return this.componentData.data$.pipe(
        map((data) => data.context),
        map((ctx) => {
          switch (ctx) {
            case 'LANGUAGE':
              return LANGUAGE_CONTEXT_ID;
            case 'CURRENCY':
              return CURRENCY_CONTEXT_ID;
            default:
              return ctx;
          }
        })
      );
    }
    return of(undefined);
  }

  protected getInjectedService(context: string): SiteContext<any> {
    return this.injector.get<SiteContext<any>>(
      this.contextServiceMap[context],
      undefined
    );
  }

  protected getOptionLabel(item: any, context?: string): string {
    switch (context) {
      case LANGUAGE_CONTEXT_ID:
        return item.nativeName;
      case CURRENCY_CONTEXT_ID:
        return item.symbol + ' ' + item.isocode;
      default:
        return item.isocode;
    }
  }
}
