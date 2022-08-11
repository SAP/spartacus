import { Injectable } from '@angular/core';
import { PRIMARY_OUTLET, Router, UrlSegmentGroup } from '@angular/router';
import { isParam } from './path-utils';

@Injectable({ providedIn: 'root' })
export class UrlParsingService {
  constructor(private router: Router) {}

  getPrimarySegments(url: string): string[] {
    const urlTree = this.router.parseUrl(url);
    return this._getPrimarySegmentsFromUrlTree(urlTree.root);
  }

  private _getPrimarySegmentsFromUrlTree(tree: UrlSegmentGroup): string[] {
    const segments = tree.segments.map((s) => s.path);
    const childrenSegments = tree.children[PRIMARY_OUTLET]
      ? this._getPrimarySegmentsFromUrlTree(tree.children[PRIMARY_OUTLET])
      : [];
    return segments.concat(childrenSegments);
  }

  /**
   * Tells whether the given url matches the given path.
   *
   * @param urlSegments   string or array of url segments. When it's a string, the preceding
   *                      site-context params are ignored (i.e. '/electronics-spa/en/USD/...')
   *
   * @param pathSegments  string or array of path segments. Dynamic params are allowed in the
   *                      path shape, i.e. `/url/:param1/with/:param2`.
   */
  matchPath(
    urlSegments: string | string[],
    pathSegments: string | string[]
  ): boolean {
    urlSegments = Array.isArray(urlSegments)
      ? urlSegments
      : this.getPrimarySegments(urlSegments);

    pathSegments = Array.isArray(pathSegments)
      ? pathSegments
      : this.getPrimarySegments(pathSegments);

    if (urlSegments.length !== pathSegments.length) {
      return false;
    }

    for (let i = 0; i < pathSegments.length; i++) {
      const pathSeg = pathSegments[i];
      const urlSeg = urlSegments[i];

      // compare only static segments:
      if (!isParam(pathSeg) && pathSeg !== urlSeg) {
        return false;
      }
    }
    return true;
  }
}
