import { Injectable } from '@angular/core';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { PageTitleService } from '@spartacus/core';

@Injectable({
  providedIn: 'root'
})
export class SeoMetaService {
  constructor(
    protected ngTitle: Title,
    protected ngMeta: Meta,
    protected pageTitleService: PageTitleService
  ) {}

  init() {
    this.pageTitleService
      .getTitle()
      .subscribe(pageTitle => (this.title = pageTitle));
  }

  protected set title(title: string) {
    this.ngTitle.setTitle(title || '');
  }

  protected set description(value: string) {
    this.meta = { name: 'description', content: value };
  }

  protected set meta(meta: MetaDefinition) {
    this.ngMeta.addTag(meta);
  }
}
