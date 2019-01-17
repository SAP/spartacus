import { Component, Injector, HostBinding, OnInit } from '@angular/core';
import {
  CmsSiteContextSelectorComponent,
  LanguageService,
  CurrencyService,
  SiteContext
} from '@spartacus/core';
import { CmsComponentData } from '../../cms/components/cms-component-data';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

const LANGUAGE = 'LANGUAGE';
const CURRENCY = 'CURRENCY';

@Component({
  selector: 'cx-site-context-selector',
  templateUrl: './site-context-selector.component.html',
  styleUrls: ['./site-context-selector.component.scss']
})
export class SiteContextSelectorComponent implements OnInit {
  siteContextService: SiteContext<any>;

  @HostBinding('class.selector') enabled;

  constructor(
    public component: CmsComponentData<CmsSiteContextSelectorComponent>,
    private injector: Injector
  ) {}

  ngOnInit() {
    this.context$
      .pipe(filter(Boolean))
      .subscribe((context: string) => (this.service = context))
      .unsubscribe();
  }

  /**
   * Injects the proper `SiteContext` service
   */
  protected set service(context: string) {
    if (context === LANGUAGE) {
      this.siteContextService = this.injector.get(LanguageService);
    }
    if (context === CURRENCY) {
      this.siteContextService = this.injector.get(CurrencyService);
    }
  }

  protected get items$(): Observable<any> {
    return this.siteContextService.getAll().pipe(
      filter(Boolean),
      tap(l => (this.enabled = l.length > 1))
    );
  }

  protected get activeItem$(): Observable<string> {
    return this.siteContextService.getActive();
  }

  protected get context$(): Observable<string> {
    return this.component.data$.pipe(map(data => data.context));
  }

  protected getOptionText(item: any, context: string) {
    switch (context) {
      case LANGUAGE:
        return item.nativeName;
        break;
      case CURRENCY:
        return item.symbol + ' ' + item.isocode;
        break;
    }
  }

  protected setActive(value: string) {
    this.siteContextService.setActive(value);
  }

  protected get label$(): Observable<any> {
    return this.component.data$.pipe(
      map(data => {
        return data.context === LANGUAGE ? 'Language' : 'Currency';
      })
    );
  }
}
