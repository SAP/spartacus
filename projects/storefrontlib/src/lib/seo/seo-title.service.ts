import { Injectable, Injector } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PageTitleService } from '@spartacus/core';

export function initSeoService(injector: Injector) {
  return function() {
    const service = injector.get<SeoTitleService>(SeoTitleService);
    service.initPageTitle();
  };
}

@Injectable({
  providedIn: 'root'
})
export class SeoTitleService {
  constructor(
    protected pageTitleService: PageTitleService,
    protected ngTitleService: Title
  ) {}

  initPageTitle() {
    this.pageTitleService
      .getTitle()
      .subscribe(pageTitle => (this.title = pageTitle));
  }

  protected set title(title: string) {
    this.ngTitleService.setTitle(title || '');
  }
}
