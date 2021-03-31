import { Injectable, OnDestroy } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import {
  isNonNullable,
  PageMeta,
  PageMetaService,
  PageRobotsMeta,
} from '@spartacus/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PageMetaLinkService } from './page-meta-link.service';

@Injectable({
  providedIn: 'root',
})
export class SeoMetaService implements OnDestroy {
  constructor(
    protected ngTitle: Title,
    protected ngMeta: Meta,
    protected pageMetaService: PageMetaService,
    protected pageMetaLinkService?: PageMetaLinkService
  ) {}

  private subscription: Subscription;

  init() {
    this.subscription = this.pageMetaService
      .getMeta()
      .pipe(filter(isNonNullable))
      .subscribe((meta) => (this.meta = meta));
  }

  protected set meta(meta: PageMeta) {
    this.title = meta.title;
    this.description = meta.description;
    this.image = meta.image;
    // TODO(#10467): since we only resolve robots on SSR, we should consider to drop the defaults
    // with next major, as it's confusing to get the wrong defaults while navigating in CSR.
    this.robots = meta.robots || [PageRobotsMeta.INDEX, PageRobotsMeta.FOLLOW];
    this.canonicalUrl = meta.canonicalUrl;
  }

  protected set title(title: string | undefined) {
    this.ngTitle.setTitle(title || '');
  }

  protected set description(value: string | undefined) {
    this.addTag({ name: 'description', content: value || '' });
  }

  protected set image(imageUrl: string | undefined) {
    if (imageUrl) {
      this.addTag({ name: 'og:image', content: imageUrl });
    }
  }

  protected set robots(value: PageRobotsMeta[]) {
    if (value && value.length > 0) {
      this.addTag({ name: 'robots', content: value.join(', ') });
    }
  }

  /**
   * Add the canonical Url to the head of the page.
   *
   * If the canonical url already exists the link is removed. This is quite
   * unlikely though, since canonical links are (typically) only added in SSR.
   */
  protected set canonicalUrl(url: string | undefined) {
    this.pageMetaLinkService?.setCanonicalLink(url);
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
