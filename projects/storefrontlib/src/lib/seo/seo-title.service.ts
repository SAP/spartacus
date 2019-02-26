import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PageTitleService } from '@spartacus/core';

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
