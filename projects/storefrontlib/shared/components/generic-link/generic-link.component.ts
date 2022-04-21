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
  fragment?: string;
}

/**
 * This component navigates using [routerLink] attribute when input 'url' is a relative url. Otherwise (when it's absolute), [href] is used.
 */
@Component({
  selector: 'cx-generic-link',
  templateUrl: './generic-link.component.html',
})
export class GenericLinkComponent implements OnChanges {
  /**
   * Pattern matching string starting with `http://` or `https://`.
   */
  private readonly PROTOCOL_REGEX: RegExp = /^https?:\/\//i;

  /**
   * Pattern matching string starting with `mailto:`.
   */
  protected MAILTO_PROTOCOL_REGEX: RegExp = /^mailto:/i;

  /**
   * Pattern matching string starting with `tel:`.
   */
  protected TEL_PROTOCOL_REGEX: RegExp = /^tel:/i;

  /**
   * @deprecated since version 5.0
   * Use the following constructor instead:
   * ```
   * constructor(
   *   protected router: Router,
   *   protected service?: GenericLinkComponentService
   * )
   * ```
   */
  constructor(router: Router);
  constructor(
    protected router: Router,
    protected service?: GenericLinkComponentService
  ) {}

  /**
   * Used to split url into 2 parts:
   * 1. the path
   * 2. query params + hash fragment
   */
  private readonly URL_SPLIT = /(^[^#?]*)(.*)/;

  /**
   * Parsed parts of the @Input `url`, when it's a local URL.
   * It should not be used when the `url` is external.
   * @see `url`
   */
  private routeParts: RouteParts = {};

  @Input() url: string | any[];
  @Input() target: string | null;
  @Input() id: string;
  @Input() class: string;
  @Input() style: string;
  @Input() title: string;

  isExternalUrl(): boolean {
    return (
      this.service?.isExternalUrl(this.url) ||
      (typeof this.url === 'string' &&
        (this.PROTOCOL_REGEX.test(this.url) ||
          this.MAILTO_PROTOCOL_REGEX.test(this.url) ||
          this.TEL_PROTOCOL_REGEX.test(this.url)))
    );
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
  get routerUrl(): any[] {
    return this.routeParts.path;
  }

  /**
   * The part with the query params of the local url.
   */
  get queryParams(): Params {
    return this.routeParts.queryParams;
  }

  /**
   * The part with the hash fragment of the local url.
   */
  get fragment(): string {
    return this.routeParts.fragment;
  }

  /**
   * Parses the given url and sets the property `urlParts` accordingly.
   */
  private setUrlParts(url: string | any[]) {
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
  private splitUrl(url: string = ''): RouteParts {
    const { queryParams, fragment } = this.router.parseUrl(url);
    const [, path] = url.match(this.URL_SPLIT);

    // wrap path in an array, to have the Angular-like path format
    return { path: [path], queryParams, fragment };
  }

  /**
   * Prepends a leading slash to the given URL string, in case it doesn't have it.
   */
  private getAbsoluteUrl(url: string): string {
    return url.startsWith('/') ? url : '/' + url;
  }
}
