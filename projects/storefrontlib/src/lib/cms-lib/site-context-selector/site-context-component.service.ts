import { Injectable, Optional, Injector, Type } from '@angular/core';
import { CmsComponentData } from '../../cms/components/cms-component-data';
import { CmsSiteContextSelectorComponent, SiteContext } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { map, filter, switchMap, take } from 'rxjs/operators';

export abstract class ContextSelectorServiceMap {
  [context: string]: Type<SiteContext<any>>;
}

const LANGUAGE = 'LANGUAGE';

const LABELS = {
  LANGUAGE: 'Language',
  CURRENCY: 'Currency'
};

@Injectable()
export class SiteContextComponentService {
  constructor(
    @Optional()
    protected componentData: CmsComponentData<CmsSiteContextSelectorComponent>,
    private contextServiceMap: ContextSelectorServiceMap,
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
    return this.componentData.data$.pipe(map(data => data.context));
  }

  protected getService(context: string) {
    return this.injector.get<SiteContext<any>>(this.contextServiceMap[context]);
  }

  protected getOptionLabel(item: any, context?: string) {
    switch (context) {
      case LANGUAGE:
        return item.nativeName;
        break;
      default:
        return item.isocode;
    }
  }
}
