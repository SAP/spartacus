import { Injectable, OnDestroy } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { PageMeta, PageMetaService, PageRobotsMeta } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SeoMetaService implements OnDestroy {
  constructor(
    protected ngTitle: Title,
    protected ngMeta: Meta,
    protected pageMetaService: PageMetaService
  ) {}

  private subscription: Subscription;

  init() {
    this.subscription = this.pageMetaService
      .getMeta()
      .pipe(filter(Boolean))
      .subscribe((meta: PageMeta) => (this.meta = meta));
  }

  protected set meta(meta: PageMeta) {
    this.title = meta.title;
    this.description = meta.description;
    this.image = meta.image;
    // TODO(#10467): since we only resolve robots on SSR, we should consider to drop the defaults
    // with next major, as it's confusing to get the wrong defaults while navigating in CSR.
    this.robots = meta.robots || [PageRobotsMeta.INDEX, PageRobotsMeta.FOLLOW];
  }

  protected set title(title: string) {
    this.ngTitle.setTitle(title || '');
  }

  protected set description(value: string) {
    this.addTag({ name: 'description', content: value });
  }

  protected set image(imageUrl: string) {
    if (imageUrl) {
      this.addTag({ name: 'og:image', content: imageUrl });
    }
  }

  protected set robots(value: PageRobotsMeta[]) {
    if (value && value.length > 0) {
      this.addTag({ name: 'robots', content: value.join(', ') });
    }
  }

  protected addTag(meta: MetaDefinition) {
    if (meta.content) {
      this.ngMeta.updateTag(meta);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
