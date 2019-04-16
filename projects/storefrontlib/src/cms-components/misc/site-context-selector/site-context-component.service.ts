import { Injectable, Injector, Input, Optional } from '@angular/core';
import {
  CmsSiteContextSelectorComponent,
  ContextServiceMap,
  CURRENCY_CONTEXT_ID,
  LANGUAGE_CONTEXT_ID,
  SiteContext,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { SiteContextType } from './site-context.model';

const LABELS = {
  [LANGUAGE_CONTEXT_ID]: 'Language',
  [CURRENCY_CONTEXT_ID]: 'Currency',
};

@Injectable()
export class SiteContextComponentService {
  /** the context type can be set as an input. If it's not provided as an input
   * the contexz type will be loaded from the data.  */
  @Input() context: SiteContextType;

  constructor(
    @Optional()
    protected componentData: CmsComponentData<CmsSiteContextSelectorComponent>,
    private contextServiceMap: ContextServiceMap,
    protected injector: Injector
  ) {}

  get items$(): Observable<any> {
    return this.service$.pipe(
      switchMap((service: SiteContext<any>) => service.getAll()),
      switchMap(items =>
        this.context$.pipe(
          switchMap(context => {
            items.forEach(item => {
              return (item.label = this.getOptionLabel(item, context));
            });
            return of(items);
          })
        )
      )
    );
  }

  get activeItem$(): Observable<string> {
    return this.service$.pipe(
      switchMap((service: SiteContext<any>) => service.getActive())
    );
  }

  get label$(): Observable<any> {
    return this.componentData.data$.pipe(
      map(data => {
        return LABELS[data.context];
      })
    );
  }

  set active(value: string) {
    this.service$.pipe(take(1)).subscribe(service => {
      service.setActive(value);
    });
  }

  protected get service$(): Observable<SiteContext<any>> {
    return this.context$.pipe(
      map(context => this.getService(context)),
      filter(Boolean)
    );
  }

  protected get context$(): Observable<string> {
    if (this.context) {
      return of(this.context);
    } else {
      return this.componentData.data$.pipe(map(data => data.context));
    }
  }

  protected getService(context: string): SiteContext<any> {
    return this.injector.get<SiteContext<any>>(
      this.contextServiceMap[context],
      null
    );
  }

  protected getOptionLabel(item: any, context?: string): string {
    switch (context) {
      case LANGUAGE_CONTEXT_ID:
        return item.nativeName;
        break;
      case CURRENCY_CONTEXT_ID:
        return item.symbol + ' ' + item.isocode;
        break;
      default:
        return item.isocode;
    }
  }
}
