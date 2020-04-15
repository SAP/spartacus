import { Injectable, isDevMode } from '@angular/core';
import {
  Route,
  UrlMatcher,
  UrlMatchResult,
  UrlSegment,
  UrlSegmentGroup,
} from '@angular/router';
import { GlobService } from '../../util/glob.service';

@Injectable({ providedIn: 'root' })
export class UrlMatcherService {
  constructor(protected globService: GlobService) {}

  /**
   * Returns a matcher that is always fails
   */
  getFalsy(): UrlMatcher {
    return function falsyUrlMatcher(): null {
      return null;
    };
  }

  /**
   * Returns a matcher for given list of paths
   */
  getFromPaths(paths: string[]): UrlMatcher {
    const matchers = paths.map((path) => this.getFromPath(path));
    const matcher = this.getCombined(matchers);
    if (isDevMode()) {
      matcher['_paths'] = paths; // property added for easier debugging of routes
    }
    return matcher;
  }

  /**
   * Returns a matcher that combines the given matchers
   * */
  getCombined(matchers: UrlMatcher[]): UrlMatcher {
    const matcher = function combinedUrlMatchers(
      segments: UrlSegment[],
      segmentGroup: UrlSegmentGroup,
      route: Route
    ): UrlMatchResult | null {
      for (let i = 0; i < matchers.length; i++) {
        const result = matchers[i](segments, segmentGroup, route);
        if (result) {
          return result;
        }
      }
      return null;
    };
    if (isDevMode()) {
      matcher['_matchers'] = matchers; // property added for easier debugging of routes
    }
    return matcher;
  }

  /**
   * Similar to Angular's defaultUrlMatcher. Differences:
   * - the `path` comes from function's argument, not from `route.path`
   * - the empty path `''` is handled here, but in Angular is handled one level higher in the match() function
   */
  protected getFromPath(path: string = ''): UrlMatcher {
    const matcher = function pathUrlMatcher(
      segments: UrlSegment[],
      segmentGroup: UrlSegmentGroup,
      route: Route
    ): UrlMatchResult | null {
      /**
       * @license
       * The MIT License
       * Copyright (c) 2010-2019 Google LLC. http://angular.io/license
       *
       * See:
       * - https://github.com/angular/angular/blob/6f5f481fdae03f1d8db36284b64c7b82d9519d85/packages/router/src/shared.ts#L121
       */

      // use function's argument, not the `route.path`
      if (path === '') {
        if (
          route.pathMatch === 'full' &&
          (segmentGroup.hasChildren() || segments.length > 0)
        ) {
          return null;
        }
        return { consumed: [], posParams: {} };
      }

      const parts = path.split('/'); // use function's argument, not the `route.path`

      if (parts.length > segments.length) {
        // The actual URL is shorter than the config, no match
        return null;
      }

      if (
        route.pathMatch === 'full' &&
        (segmentGroup.hasChildren() || parts.length < segments.length)
      ) {
        // The config is longer than the actual URL but we are looking for a full match, return null
        return null;
      }

      const posParams: { [key: string]: UrlSegment } = {};

      // Check each config part against the actual URL
      for (let index = 0; index < parts.length; index++) {
        const part = parts[index];
        const segment = segments[index];
        const isParameter = part.startsWith(':');
        if (isParameter) {
          posParams[part.substring(1)] = segment;
        } else if (part !== segment.path) {
          // The actual URL part does not match the config, no match
          return null;
        }
      }

      return { consumed: segments.slice(0, parts.length), posParams };
    };
    if (isDevMode()) {
      matcher['_path'] = path; // property added for easier debugging of routes
    }
    return matcher;
  }

  /**
   * Returns URL matcher that accepts almost everything (like `**` route), but not paths accepted by the given matcher
   */
  getOpposite(originalMatcher: UrlMatcher): UrlMatcher {
    const matcher = function oppositeUrlMatcher(
      segments: UrlSegment[],
      group: UrlSegmentGroup,
      route: Route
    ) {
      return originalMatcher(segments, group, route)
        ? null
        : { consumed: segments, posParams: {} };
    };
    if (isDevMode()) {
      matcher['_originalMatcher'] = originalMatcher; // property added for easier debugging of routes
    }
    return matcher;
  }

  /**
   * Returns URL matcher for the given list of glob-like patterns. Each pattern must start with `/` or `!/`.
   */
  getFromGlob(globPatterns: string[]): UrlMatcher {
    const globValidator = this.globService.getValidator(globPatterns);

    const matcher = function globUrlMatcher(
      segments: UrlSegment[]
    ): UrlMatchResult | null {
      const fullPath = `/${segments.map((s) => s.path).join('/')}`;

      return globValidator(fullPath)
        ? { consumed: segments, posParams: {} }
        : null;
    };
    if (isDevMode()) {
      matcher['_globPatterns'] = globPatterns; // property added for easier debugging of routes
    }
    return matcher;
  }
}
