import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Params, Router } from '@angular/router';
import { HamburgerMenuService } from '../../../layout/header/hamburger-menu/hamburger-menu.service';
import { take } from 'rxjs/operators';

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
  constructor(
    protected router: Router,
    protected hamburgerMenuService: HamburgerMenuService
  ) {}

  /**
   * Pattern matching string starting with `http://` or `https://`.
   */
  private readonly PROTOCOL_REGEX: RegExp = /^https?:\/\//i;

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
  @Input() target: string;
  @Input() id: string;
  @Input() class: string;
  @Input() style: string;
  @Input() title: string;
  @Input() isNavLink = false;

  /**
   * Returns true when the @Input `url` is a string starting with `http://` or `https://`.
   */
  isExternalUrl(): boolean {
    return typeof this.url === 'string' && this.PROTOCOL_REGEX.test(this.url);
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
   * Checking each link click to verify if the menu should be closed
   */
  triggerLink(): void {
    if (this.isNavLink) {
      this.hamburgerMenuService.isExpanded
        .pipe(take(1))
        .subscribe((isExpanded) => {
          if (isExpanded) {
            this.hamburgerMenuService.toggle();
          }
        });
    }
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
