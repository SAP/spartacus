/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable, OnDestroy, PLATFORM_ID } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import {
  isNotNullable,
  PageMeta,
  PageMetaService,
  PageRobotsMeta,
} from '@spartacus/core';
import { Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { PageMetaLinkService } from './page-meta-link.service';
import { isPlatformBrowser } from '@angular/common';

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
  private platformId = inject(PLATFORM_ID);
  private subscription: Subscription;

  init() {
    if (isPlatformBrowser(this.platformId)) {
      // In the browser, subscribe to ongoing meta updates
      this.subscription = this.pageMetaService
        .getMeta()
        .pipe(filter(isNotNullable))
        .subscribe((meta) => (this.meta = meta));
    } else {
      // During SSR, set meta tags once without creating an ongoing subscription
      this.subscription = this.pageMetaService
        .getMeta()
        .pipe(
          filter(isNotNullable),
          take(1) // Complete after first emission to avoid pending tasks
        )
        .subscribe((meta) => (this.meta = meta));
    }
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
