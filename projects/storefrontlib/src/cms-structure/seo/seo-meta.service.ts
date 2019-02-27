import { Injectable } from '@angular/core';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { PageMetaService, PageMeta } from '@spartacus/core';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SeoMetaService {
  constructor(
    protected ngTitle: Title,
    protected ngMeta: Meta,
    protected pageMetaService: PageMetaService
  ) {}

  init() {
    this.pageMetaService
      .getMeta()
      .pipe(filter(Boolean))
      .subscribe((meta: PageMeta) => (this.meta = meta));
  }

  protected set meta(meta: PageMeta) {
    this.title = meta.title;
    this.description = meta.description;
  }

  protected set title(title: string) {
    this.ngTitle.setTitle(title || '');
  }

  protected set description(value: string) {
    this.addTag({ name: 'description', content: value });
  }

  protected addTag(meta: MetaDefinition) {
    if (meta.content) {
      this.ngMeta.updateTag(meta);
    }
  }
}
