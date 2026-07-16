/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Params, Router, RouterLink, UrlTree } from '@angular/router';
import { FeatureToggles, LanguageService } from '@spartacus/core';
import { skip } from 'rxjs/operators';
import { GenericLinkComponentService } from './generic-link-component.service';

// private
interface RouteParts {
  /** Parsed path: a UrlTree for string URLs (carries site-context) when fixLanguageContextLinks is on, or a string[] when off */
  path?: UrlTree | string[];

  /** Query params — only populated for string-array URLs or when fixLanguageContextLinks is off */
  queryParams?: Params;

  /** Hash fragment — only populated for string-array URLs or when fixLanguageContextLinks is off */
  fragment?: string | null;
}

/**
 * This component navigates using [routerLink] attribute when input 'url' is a relative url. Otherwise (when it's absolute), [href] is used.
 */
@Component({
  selector: 'cx-generic-link',
  templateUrl: './generic-link.component.html',
  imports: [NgIf, NgTemplateOutlet, RouterLink],
})
export class GenericLinkComponent implements OnChanges, OnInit {
  constructor(
    protected router: Router,
    protected service: GenericLinkComponentService
  ) {}

  protected languageService = inject(LanguageService);
  protected cdr = inject(ChangeDetectorRef);
  protected destroyRef = inject(DestroyRef);
  private featureToggles = inject(FeatureToggles);

  /**
   * Used to split url into 2 parts:
   * 1. the path
   * 2. query params + hash fragment
   */
  protected readonly URL_SPLIT = /(^[^#?]*)(.*)/;

  /**
   * Parsed parts of the @Input `url`, when it's a local URL.
   * It should not be used when the `url` is external.
   * @see `url`
   */
  protected routeParts: RouteParts = {};

  @Input() url: string | any[];
  @Input() target: string | null;
  @Input() id: string;
  @Input() class: string;
  @Input() style: string | undefined;
  @Input() title: string;
  @Input() ariaLabel?: string;
  @Input() tabindex: 0 | -1 = 0;

  isExternalUrl(): boolean {
    return this.service.isExternalUrl(this.url);
  }

  get rel() {
    return this.target === '_blank' ? 'noopener' : null;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['url']) {
      this.setUrlParts(changes['url'].currentValue);
    }
  }

  ngOnInit(): void {
    if (this.featureToggles.fixLanguageContextLinks) {
      this.languageService
        .getActive()
        .pipe(skip(1), takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          if (this.url !== undefined && !this.isExternalUrl()) {
            this.routeParts = this.buildRoutePartsForCurrentLanguage(this.url);
            this.cdr.markForCheck();
          }
        });
    }
  }

  /**
   * Re-serializes the given url with the current site-context (language/currency)
   * from the store, then parses the result back into a UrlTree that carries the new
   * site-context in its `siteContext` property.
   *
   * For string URLs that already contain a site-context prefix (e.g. `/ja/USD/...`),
   * `router.parseUrl` extracts and stores those params in `tree.siteContext`.
   * Clearing that property before re-serializing forces `SiteContextUrlSerializer`
   * to fall back to the live store values, producing a URL with the current language.
   * Parsing the result again locks the new language into `siteContext`, which makes
   * RouterLink's signal equality check detect the change and update the DOM href.
   */
  protected buildRoutePartsForCurrentLanguage(url: string | any[]): RouteParts {
    if (typeof url === 'string') {
      const tree: UrlTree & { siteContext?: unknown } = this.router.parseUrl(
        this.getAbsoluteUrl(url)
      );
      delete tree.siteContext;
      return this.splitUrl(this.router.serializeUrl(tree));
    }
    return this.splitUrl(
      this.router.serializeUrl(this.router.createUrlTree(url))
    );
  }

  /**
   * The part with the path of the local url.
   */
  get routerUrl(): UrlTree | string[] | undefined {
    return this.routeParts.path;
  }

  /**
   * The part with the query params of the local url.
   * Returns undefined when routerUrl is a UrlTree (params are embedded in the tree).
   */
  get queryParams(): Params | undefined {
    return this.routeParts.path instanceof UrlTree
      ? undefined
      : this.routeParts.queryParams;
  }

  /**
   * The part with the hash fragment of the local url.
   * Returns undefined when routerUrl is a UrlTree (fragment is embedded in the tree).
   */
  get fragment(): string | undefined {
    return this.routeParts.path instanceof UrlTree
      ? undefined
      : (this.routeParts.fragment ?? undefined);
  }

  /**
   * Parses the given url and sets the property `urlParts` accordingly.
   */
  protected setUrlParts(url: string | any[]) {
    if (typeof url === 'string') {
      if (this.featureToggles.fixLanguageContextLinks) {
        this.routeParts = this.buildRoutePartsForCurrentLanguage(url);
      } else {
        this.routeParts = this.splitUrl(this.getAbsoluteUrl(url));
      }
    } else {
      this.routeParts = { path: url };
    }
  }

  /**
   * Parses the given URL string into route parts.
   *
   * When fixLanguageContextLinks is enabled, returns a UrlTree so that
   * SiteContextUrlSerializer.parse() stores the language in `siteContext`.
   * Passing this UrlTree to `[routerLink]` makes RouterLink's signal equality
   * check detect language changes and update the DOM href.
   *
   * When the toggle is off, falls back to the original behaviour: splits path,
   * queryParams and fragment into separate fields.
   */
  protected splitUrl(url: string = ''): RouteParts {
    if (this.featureToggles.fixLanguageContextLinks) {
      const urlTree = this.router.parseUrl(url);
      return { path: urlTree };
    }

    const { queryParams, fragment } = this.router.parseUrl(url);
    const [, path] = url.match(this.URL_SPLIT) ?? [, ''];
    return { path: [path ?? ''], queryParams, fragment };
  }

  /**
   * Prepends a leading slash to the given URL string, in case it doesn't have it.
   */
  protected getAbsoluteUrl(url: string): string {
    return url.startsWith('/') ? url : '/' + url;
  }
}
