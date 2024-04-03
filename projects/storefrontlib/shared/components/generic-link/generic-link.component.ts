/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Params, Router } from '@angular/router';
import { GenericLinkComponentService } from './generic-link-component.service';

// private
interface RouteParts {
  /** Path in the Angular-like array format */
  path?: string[];

  /** Query params */
  queryParams?: Params;

  /** Hash fragment */
  fragment?: string | null;
}

/**
 * This component navigates using [routerLink] attribute when input 'url' is a relative url. Otherwise (when it's absolute), [href] is used.
 */
@Component({
  selector: 'cx-generic-link',
  templateUrl: './generic-link.component.html',
})
export class GenericLinkComponent implements OnChanges {
  constructor(
    protected router: Router,
    protected service: GenericLinkComponentService
  ) {}

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

  /**
   * The part with the path of the local url.
   */
  get routerUrl(): string[] | undefined {
    return this.routeParts.path;
  }

  /**
   * The part with the query params of the local url.
   */
  get queryParams(): Params | undefined {
    return this.routeParts.queryParams;
  }

  /**
   * The part with the hash fragment of the local url.
   */
  get fragment(): string | undefined {
    return this.routeParts.fragment ?? undefined;
  }

  /**
   * Parses the given url and sets the property `urlParts` accordingly.
   */
  protected setUrlParts(url: string | any[]) {
    if (typeof url === 'string') {
      url = this.getAbsoluteUrl(url); // string links in CMS sometimes don't have the leading slash, so fix it here
      this.routeParts = this.splitUrl(url as string);
    } else {
      this.routeParts = { path: url };
    }
  }

  /**
   * Parses the given string into 3 parts:
   * - string path (wrapped in an array to be compatible with Angular syntax for the `routerLink`)
   * - query params (as an object)
   * - hash fragment (string)
   */
  protected splitUrl(url: string = ''): RouteParts {
    const { queryParams, fragment } = this.router.parseUrl(url);
    const [, path] = url.match(this.URL_SPLIT) ?? [, ''];

    // wrap path in an array, to have the Angular-like path format
    return { path: [path ?? ''], queryParams, fragment };
  }

  /**
   * Prepends a leading slash to the given URL string, in case it doesn't have it.
   */
  protected getAbsoluteUrl(url: string): string {
    return url.startsWith('/') ? url : '/' + url;
  }
}
