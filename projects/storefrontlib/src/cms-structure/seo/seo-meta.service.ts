import { Injectable, OnDestroy } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import {
  PageMeta,
  PageMetaService,
  PageRobotsMeta,
  WindowRef,
} from '@spartacus/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SeoMetaService implements OnDestroy {
  constructor(
    protected ngTitle: Title,
    protected ngMeta: Meta,
    protected pageMetaService: PageMetaService,
    protected winRef?: WindowRef
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
    this.canonicalUrl = meta.canonicalUrl;
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

  /**
   * Add the canonical Url to the head of the page.
   *
   * If the canonical url already exists (which is unlikely as canonical links
   * are typically only added in SSR), the link is removed.
   */
  protected set canonicalUrl(url: string) {
    const id = 'cxCanonical';
    let link: HTMLLinkElement = <HTMLLinkElement>(
      this.winRef.document.getElementById(id)
    );

    if (url) {
      if (!link) {
        link = this.winRef.document.createElement('link');
        link.setAttribute('rel', 'canonical');
        link.setAttribute('id', id);
        // link.rel = 'canonical';
        // link.id = id;
        this.winRef.document.head.appendChild(link);
      }
      link.setAttribute('href', url);
    } else {
      // removing the link is an edge case, but useful if the canonical url is created in CSR
      link?.remove();
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
