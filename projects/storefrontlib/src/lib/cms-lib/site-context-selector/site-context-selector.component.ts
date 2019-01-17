import { Component, Injector, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, filter, switchMap, take } from 'rxjs/operators';
import {
  CmsSiteContextSelectorComponent,
  SiteContext,
  LanguageService,
  CurrencyService
} from '@spartacus/core';
import { CmsComponentData } from '../../cms/components/cms-component-data';

const LANGUAGE = 'LANGUAGE';
const CURRENCY = 'CURRENCY';

@Component({
  selector: 'cx-site-context-selector',
  templateUrl: './site-context-selector.component.html',
  styleUrls: ['./site-context-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteContextSelectorComponent {
  siteContextService: SiteContext<any>;

  constructor(
    public component: CmsComponentData<CmsSiteContextSelectorComponent>,
    private injector: Injector
  ) {}

  get items$(): Observable<any> {
    return this.service$.pipe(
      switchMap((service: SiteContext<any>) => service.getAll()),
      switchMap(items =>
        this.context$.pipe(
          switchMap(context => {
            items.forEach(item => {
              return (item.label = this.getOptionText(item, context));
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

  get service$(): Observable<SiteContext<any>> {
    return this.component.data$.pipe(
      map(data => data.context),
      map(context => this.getService(context)),
      filter(Boolean)
    );
  }

  get context$(): Observable<string> {
    return this.component.data$.pipe(map(data => data.context));
  }

  /**
   * Injects the proper `SiteContext` service
   * based on the given context.
   */
  protected getService(context: string) {
    if (context === LANGUAGE) {
      return this.injector.get(LanguageService);
    }
    if (context === CURRENCY) {
      return this.injector.get(CurrencyService);
    }
  }

  protected getOptionText(item: any, context?: string) {
    switch (context) {
      case LANGUAGE:
        return item.nativeName;
        break;
      case CURRENCY:
        return item.symbol + ' ' + item.isocode;
        break;
      default:
        return item.isocode;
    }
  }

  set active(value: string) {
    this.service$.pipe(take(1)).subscribe(service => {
      service.setActive(value);
    });
  }

  get label$(): Observable<any> {
    return this.component.data$.pipe(
      map(data => {
        return data.context === LANGUAGE ? 'Language' : 'Currency';
      })
    );
  }
}
