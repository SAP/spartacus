import { Injectable, OnDestroy } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import {
  isNotNullable,
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
      .pipe(filter(isNotNullable))
      .subscribe((meta) => (this.meta = meta));
  }

  protected set meta(meta: PageMeta) {
    this.title = meta.title;
    this.description = meta.description;
    this.image = meta.image;
    this.robots = meta.robots;
    this.canonicalUrl = meta.canonicalUrl;
  }

  protected set title(title: string | undefined) {
    this.ngTitle.setTitle(title || '');
  }

  protected set description(value: string | undefined) {
    if (value) {
      this.addTag({ name: 'description', content: value || '' });
    } else {
      this.ngMeta.removeTag('name="description"');
    }
  }

  protected set image(imageUrl: string | undefined) {
    if (imageUrl) {
      this.addTag({ name: 'og:image', content: imageUrl });
    } else {
      this.ngMeta.removeTag('name="og:image"');
    }
  }

  protected set robots(value: PageRobotsMeta[] | undefined) {
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

  protected addTag(meta: MetaDefinition): void {
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
